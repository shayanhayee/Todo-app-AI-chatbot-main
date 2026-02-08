@echo off
set NODE_OPTIONS=--max-old-space-size=4096
set NEXT_PRIVATE_DISABLE_TURBOPACK=1
npm run dev
