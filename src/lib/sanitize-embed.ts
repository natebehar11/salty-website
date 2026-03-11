/**
 * Strip all <script> tags from oEmbed HTML and re-add only
 * the platform's own embed script. Prevents XSS from any
 * injected scripts in the oEmbed response.
 */
export function sanitizeEmbedHtml(
  html: string,
  platform: 'instagram' | 'tiktok'
): string {
  let sanitized = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');

  if (platform === 'instagram') {
    sanitized +=
      '\n<script async src="https://www.instagram.com/embed.js"></script>';
  } else {
    sanitized +=
      '\n<script async src="https://www.tiktok.com/embed.js"></script>';
  }

  return sanitized;
}
