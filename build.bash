#!/bin/bash

set -e

echo "Fetching Deno..."
curl -fsSL https://deno.land/x/install/install.sh | sh

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
