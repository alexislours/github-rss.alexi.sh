#!/bin/bash

echo "Building website..."

VITE_BUILD_TIME=$(date +%s)
echo "VITE_BUILD_TIME=$VITE_BUILD_TIME" > .env
npm install
npm run build