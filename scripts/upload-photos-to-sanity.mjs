/**
 * SALTY Retreats — Bulk Photo Uploader with AI Vision Tagging
 * ============================================================
 * Walks a local folder of images, analyzes each with Claude claude-3-5-haiku Vision,
 * uploads to Sanity, and creates a `saltyPhoto` document per image with
 * AI-generated category, tags, and alt text.
 *
 * USAGE
 * -----
 *   node scripts/upload-photos-to-sanity.mjs ./path/to/photos
 *   node scripts/upload-photos-to-sanity.mjs ./path/to/photos --dry-run
 *   node scripts/upload-photos-to-sanity.mjs ./path/to/photos --dataset staging
 *
 * FOLDER CONVENTION
 * -----------------
 * Organize photos by country name only. Claude handles everything else.
 *
 *   photos/
 *     panama/            ← folder name = country
 *     costa-rica/
 *     morocco/
 *     coaches/           ← special: no country, category forced to "coach"
 *     general/           ← no country, category from AI
 *
 * ENV VARS (add to .env.local)
 * ----------------------------
 *   NEXT_PUBLIC_SANITY_PROJECT_ID   your Sanity project ID
 *   NEXT_PUBLIC_SANITY_DATASET      dataset name (default: production)
 *   SANITY_API_TOKEN                write token — sanity.io/manage → API tokens
 *   ANTHROPIC_API_KEY               claude-3-5-haiku vision — console.anthropic.com
 *
 * OUTPUT
 * ------
 *   scripts/upload-results.json    one entry per uploaded photo
 *   scripts/.vision-cache.json     cached AI analysis (keyed by file hash, reused on re-run)
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { createReadStream } from 'fs';
import { createClient } from '@sanity/client';
import Anthropic from '@anthropic-ai/sdk';
import sharp from 'sharp';

// ─── Config ───────────────────────────────────────────────────────────────────

const SUPPORTED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const MAX_RETRIES = 3;
const RETRY_BASE_DELAY_MS = 2000;

const VISION_CACHE_PATH = new URL('./.vision-cache.json', import.meta.url).pathname;
const RESULTS_PATH = new URL('./upload-results.json', import.meta.url).pathname;

// ISO 3166-1 alpha-2 lookup: folder name (lowercased, dashes normalized) → country info
const COUNTRY_LOOKUP = {
  'el-salvador': { name: 'El Salvador', code: 'SV' },
  'elsalvador': { name: 'El Salvador', code: 'SV' },
  'panama': { name: 'Panama', code: 'PA' },
  'morocco': { name: 'Morocco', code: 'MA' },
  'costa-rica': { name: 'Costa Rica', code: 'CR' },
  'costarica': { name: 'Costa Rica', code: 'CR' },
  'italy': { name: 'Italy', code: 'IT' },
  'sicily': { name: 'Italy', code: 'IT' },
  'mexico': { name: 'Mexico', code: 'MX' },
  'bali': { name: 'Indonesia', code: 'ID' },
  'indonesia': { name: 'Indonesia', code: 'ID' },
  'greece': { name: 'Greece', code: 'GR' },
  'colombia': { name: 'Colombia', code: 'CO' },
  'portugal': { name: 'Portugal', code: 'PT' },
  'spain': { name: 'Spain', code: 'ES' },
  'thailand': { name: 'Thailand', code: 'TH' },
  'sri-lanka': { name: 'Sri Lanka', code: 'LK' },
  'srilanka': { name: 'Sri Lanka', code: 'LK' },
  'zanzibar': { name: 'Tanzania', code: 'TZ' },
  'tanzania': { name: 'Tanzania', code: 'TZ' },
  'dominican-republic': { name: 'Dominican Republic', code: 'DO' },
  'nicaragua': { name: 'Nicaragua', code: 'NI' },
  'peru': { name: 'Peru', code: 'PE' },
  'ecuador': { name: 'Ecuador', code: 'EC' },
  'brazil': { name: 'Brazil', code: 'BR' },
  'argentina': { name: 'Argentina', code: 'AR' },
  'chile': { name: 'Chile', code: 'CL' },
  'vietnam': { name: 'Vietnam', code: 'VN' },
  'cambodia': { name: 'Cambodia', code: 'KH' },
  'nepal': { name: 'Nepal', code: 'NP' },
  'india': { name: 'India', code: 'IN' },
  'maldives': { name: 'Maldives', code: 'MV' },
  'fiji': { name: 'Fiji', code: 'FJ' },
  'hawaii': { name: 'United States', code: 'US' },
  'usa': { name: 'United States', code: 'US' },
  'canada': { name: 'Canada', code: 'CA' },
  'france': { name: 'France', code: 'FR' },
  'croatia': { name: 'Croatia', code: 'HR' },
  'turkey': { name: 'Turkey', code: 'TR' },
  'kenya': { name: 'Kenya', code: 'KE' },
  'south-africa': { name: 'South Africa', code: 'ZA' },
};

// ─── .env.local parser ────────────────────────────────────────────────────────

function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) return;
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
    if (!process.env[key]) process.env[key] = val;
  }
}

// ─── Vision cache ─────────────────────────────────────────────────────────────

function loadVisionCache() {
  if (fs.existsSync(VISION_CACHE_PATH)) {
    try {
      return JSON.parse(fs.readFileSync(VISION_CACHE_PATH, 'utf8'));
    } catch {
      return {};
    }
  }
  return {};
}

function saveVisionCache(cache) {
  fs.writeFileSync(VISION_CACHE_PATH, JSON.stringify(cache, null, 2));
}

function fileHash(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('md5').update(buf).digest('hex');
}

// ─── Folder walking ───────────────────────────────────────────────────────────

function findImages(dir) {
  const results = [];
  function walk(current) {
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (SUPPORTED_EXTENSIONS.has(ext)) {
          results.push(fullPath);
        }
      }
    }
  }
  walk(dir);
  return results;
}

// ─── Country detection from folder path ──────────────────────────────────────

function detectCountry(filePath, rootDir) {
  const relative = path.relative(rootDir, filePath);
  const segments = relative.split(path.sep);

  // Check each folder segment (not the filename itself)
  for (const segment of segments.slice(0, -1)) {
    const normalized = segment.toLowerCase().replace(/\s+/g, '-');
    if (COUNTRY_LOOKUP[normalized]) {
      return COUNTRY_LOOKUP[normalized];
    }
  }
  return null;
}

// ─── Claude Vision analysis ───────────────────────────────────────────────────

const VISION_PROMPT = `You are analyzing photos for SALTY Retreats — a fitness retreat company that runs adventure-focused group trips.

Analyze this photo and return ONLY a valid JSON object with these fields:
- "category": one of "hero", "accommodation", "activity", "coach", "destination", "food", "social", "other"
- "tags": array of 3-8 lowercase descriptive strings (e.g. ["beach", "sunset", "pool", "group", "yoga"])
- "altText": natural 8-12 word accessibility description
- "confidence": "high", "medium", or "low"

Category definitions:
- hero: wide scenic or landscape shots suitable for full-width hero banners
- accommodation: rooms, beds, pools, property exteriors, villa amenities
- activity: yoga, surfing, hiking, fitness classes, workouts, sports
- coach: instructor portraits, headshots, or action shots of individual instructors
- destination: cityscapes, landmarks, cultural scenes, street scenes, nature
- food: meals, drinks, dining tables, food prep, restaurants
- social: group shots of guests socializing, beach hangouts, meals together, community moments
- other: anything that doesn't clearly fit above

Return ONLY the JSON object. No explanation, no markdown, no code fences.`;

async function analyzeWithVision(filePath, anthropic) {
  // Resize to max 1500px on longest side and convert to JPEG before sending.
  // Claude's API has a 5MB base64 limit; RAW-processed photos can be 10-20MB.
  const resizedBuffer = await sharp(filePath)
    .resize(1500, 1500, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 85 })
    .toBuffer();

  const mediaType = 'image/jpeg';
  const imageData = resizedBuffer.toString('base64');

  const message = await anthropic.messages.create({
    model: 'claude-3-haiku-20240307',
    max_tokens: 256,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image',
            source: { type: 'base64', media_type: mediaType, data: imageData },
          },
          { type: 'text', text: VISION_PROMPT },
        ],
      },
    ],
  });

  const text = message.content[0].type === 'text' ? message.content[0].text.trim() : '';

  // Strip markdown code fences if Claude adds them
  const cleaned = text.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();

  return JSON.parse(cleaned);
}

// ─── Retry helper ─────────────────────────────────────────────────────────────

async function withRetry(fn, label, maxRetries = MAX_RETRIES) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (attempt === maxRetries) throw err;
      const delay = RETRY_BASE_DELAY_MS * Math.pow(2, attempt - 1);
      console.warn(`  ⚠  ${label} failed (attempt ${attempt}/${maxRetries}), retrying in ${delay / 1000}s…`);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  loadEnv();

  // Parse CLI args
  const args = process.argv.slice(2);
  const photosDir = args.find((a) => !a.startsWith('--'));
  const isDryRun = args.includes('--dry-run');
  const datasetOverride = (() => {
    const idx = args.indexOf('--dataset');
    return idx !== -1 ? args[idx + 1] : null;
  })();

  if (!photosDir) {
    console.error('Usage: node scripts/upload-photos-to-sanity.mjs ./path/to/photos [--dry-run] [--dataset <name>]');
    process.exit(1);
  }

  const resolvedDir = path.resolve(photosDir);
  if (!fs.existsSync(resolvedDir)) {
    console.error(`Error: folder not found: ${resolvedDir}`);
    process.exit(1);
  }

  // Validate env
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = datasetOverride || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
  const sanityToken = process.env.SANITY_API_TOKEN;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;

  if (!projectId) {
    console.error([
      'Error: NEXT_PUBLIC_SANITY_PROJECT_ID is not set.',
      'Add it to .env.local — find it at sanity.io/manage',
    ].join('\n'));
    process.exit(1);
  }
  if (!sanityToken && !isDryRun) {
    console.error([
      'Error: SANITY_API_TOKEN is not set.',
      'Create a write token at sanity.io/manage → your project → API → Tokens',
      'Add SANITY_API_TOKEN=<token> to .env.local',
    ].join('\n'));
    process.exit(1);
  }
  if (!anthropicKey) {
    console.error([
      'Error: ANTHROPIC_API_KEY is not set.',
      'Get a key at console.anthropic.com → API Keys',
      'Add ANTHROPIC_API_KEY=<key> to .env.local',
    ].join('\n'));
    process.exit(1);
  }

  // Clients
  const sanity = createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    token: sanityToken,
    useCdn: false,
  });

  const anthropic = new Anthropic({ apiKey: anthropicKey });

  // Find images
  const images = findImages(resolvedDir);
  if (images.length === 0) {
    console.log(`No supported images found in ${resolvedDir}`);
    process.exit(0);
  }

  console.log(`\nSALTY Photo Uploader`);
  console.log(`──────────────────────────────────────`);
  console.log(`Folder:  ${resolvedDir}`);
  console.log(`Dataset: ${dataset}`);
  console.log(`Images:  ${images.length}`);
  console.log(`Mode:    ${isDryRun ? 'DRY RUN (no uploads)' : 'UPLOAD'}`);
  console.log(`──────────────────────────────────────\n`);

  // Load cache
  const visionCache = loadVisionCache();

  const results = [];
  const failures = [];

  for (let i = 0; i < images.length; i++) {
    const filePath = images[i];
    const filename = path.basename(filePath);
    const folderPath = path.relative(resolvedDir, filePath);
    const progress = `[${i + 1}/${images.length}]`;

    process.stdout.write(`${progress} ${folderPath} … `);

    // Country from folder name
    const countryInfo = detectCountry(filePath, resolvedDir);

    // Vision analysis (with cache)
    let visionResult;
    const hash = fileHash(filePath);

    if (visionCache[hash]) {
      visionResult = visionCache[hash];
      process.stdout.write('(cached) ');
    } else {
      try {
        visionResult = await withRetry(
          () => analyzeWithVision(filePath, anthropic),
          `vision:${filename}`
        );
        visionCache[hash] = visionResult;
        saveVisionCache(visionCache);
      } catch (err) {
        console.warn(`\n  ✗ Vision failed for ${filename}: ${err.message}`);
        visionResult = {
          category: 'other',
          tags: ['untagged'],
          altText: filename.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
          confidence: 'low',
        };
      }
    }

    const entry = {
      filename,
      folderPath,
      country: countryInfo?.name ?? null,
      countryCode: countryInfo?.code ?? null,
      category: visionResult.category,
      tags: visionResult.tags,
      altText: visionResult.altText,
      visionConfidence: visionResult.confidence,
    };

    if (isDryRun) {
      console.log(
        `\n    country=${entry.countryCode ?? 'unknown'} | category=${entry.category} | tags=[${entry.tags.join(', ')}]`
      );
      results.push({ ...entry, assetId: null, url: null, sanityDocId: null });
      continue;
    }

    // Upload asset
    try {
      const asset = await withRetry(
        () =>
          sanity.assets.upload('image', createReadStream(filePath), {
            filename,
            contentType: `image/${path.extname(filename).slice(1).replace('jpg', 'jpeg')}`,
          }),
        `upload:${filename}`
      );

      // Create saltyPhoto document
      const doc = await withRetry(
        () =>
          sanity.create({
            _type: 'saltyPhoto',
            asset: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } },
            originalFilename: filename,
            folderPath,
            altText: entry.altText,
            country: entry.country,
            countryCode: entry.countryCode,
            category: entry.category,
            tags: entry.tags,
            visionConfidence: entry.visionConfidence,
          }),
        `create-doc:${filename}`
      );

      const url = `https://cdn.sanity.io/images/${projectId}/${dataset}/${asset._id.replace('image-', '').replace(/-(\w+)$/, '.$1')}`;

      console.log(`✓ ${asset._id}`);

      results.push({
        ...entry,
        assetId: asset._id,
        url,
        sanityDocId: doc._id,
      });
    } catch (err) {
      console.error(`\n  ✗ Failed: ${err.message}`);
      failures.push({ filename, folderPath, error: err.message });
    }
  }

  // Write results JSON
  fs.writeFileSync(RESULTS_PATH, JSON.stringify(results, null, 2));

  // Summary
  console.log(`\n──────────────────────────────────────`);
  if (isDryRun) {
    console.log(`Dry run complete. ${results.length} images analyzed.`);
    console.log(`Run without --dry-run to upload.`);
  } else {
    const uploaded = results.filter((r) => r.assetId).length;
    console.log(`Done. ${uploaded}/${images.length} uploaded successfully.`);
    if (failures.length > 0) {
      console.log(`\nFailed (${failures.length}):`);
      for (const f of failures) {
        console.log(`  ✗ ${f.folderPath}: ${f.error}`);
      }
    }
    console.log(`\nResults written to: scripts/upload-results.json`);
    console.log(`Vision cache:       scripts/.vision-cache.json`);
  }

  if (failures.length > 0) process.exit(1);
}

main().catch((err) => {
  console.error('\nFatal error:', err.message);
  process.exit(1);
});
