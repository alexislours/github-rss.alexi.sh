#!/bin/bash

deno run --allow-all rss-fetcher.ts
deno run --allow-all rss-builder.ts

npm run build