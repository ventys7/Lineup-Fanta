#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if [[ ! -d dashboard/node_modules ]]; then
  npm --prefix dashboard ci
fi

npm --prefix dashboard run build
node scripts/generate-route-pages.mjs
./scripts/check-static.sh
