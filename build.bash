#!/bin/bash

curl -fsSL https://deno.land/x/install/install.sh | sh

~/.deno/bin/deno run --allow-all rss-fetcher.ts &&
~/.deno/bin/deno run --allow-all rss-builder.ts

VITE_BUILD_TIME=$(date +%s)
echo "VITE_BUILD_TIME=$VITE_BUILD_TIME" > .env
npm run build
