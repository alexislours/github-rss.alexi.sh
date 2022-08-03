#!/bin/bash

curl -fsSL https://deno.land/x/install/install.sh | sh

~/.deno/bin/deno run --allow-all rss-fetcher.ts
~/.deno/bin/deno run --allow-all rss-builder.ts
