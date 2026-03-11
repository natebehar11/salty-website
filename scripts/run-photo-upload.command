#!/bin/bash
cd "$(dirname "$0")/.."
echo "Starting photo upload at $(date)"
echo "Log: scripts/upload-log.txt"
echo ""
node scripts/upload-photos-to-sanity.mjs /tmp/salty-upload 2>&1 | tee scripts/upload-log.txt
echo ""
echo "Finished at $(date)"
read -p "Press Enter to close this window."
