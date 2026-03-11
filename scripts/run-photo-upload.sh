#!/bin/bash
# Run the Sicily + Costa Rica photo upload. Use Terminal.app so it survives closing Cursor.
cd "$(dirname "$0")/.."
echo "Starting upload at $(date)"
echo "Log: scripts/upload-log.txt"
node scripts/upload-photos-to-sanity.mjs /tmp/salty-upload 2>&1 | tee scripts/upload-log.txt
echo "Finished at $(date)"
