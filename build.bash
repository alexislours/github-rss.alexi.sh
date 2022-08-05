#!/bin/bash

set -e

echo "Fetching Deno..."
curl -fsSL https://deno.land/x/install/install.sh | sh

chmod +x fetch.bash
chmod +x build-rss.bash
chmod +x build-website.bash

if ./fetch.bash; then
  echo "Scrapping done."
  if ./build-rss.bash; then
    echo "RSS feeds built."
    if ./build-website.bash; then
      echo "Website built."
    fi
  else
    exit 1
  fi
else
  echo "Fetch failed"
  exit 1
fi
