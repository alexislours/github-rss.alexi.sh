#!/bin/bash

echo "Scrapping GitHub Trending..."

~/.deno/bin/deno run --allow-all get-languages.ts

~/.deno/bin/deno run --allow-all rss-fetcher.ts
