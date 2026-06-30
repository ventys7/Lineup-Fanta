#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if ! command -v node >/dev/null 2>&1; then
  echo "Errore: Node.js è richiesto per controllare la sintassi JavaScript." >&2
  exit 1
fi

for file in js/*.js; do
  node --check "$file"
done

python3 - <<'PYCHECK'
from pathlib import Path
import json
import re

html = Path("index.html").read_text(encoding="utf-8")
missing = []
for path in re.findall(r'(?:src|href)="((?:js|css)/[^"?#]+)"', html):
    if not Path(path).is_file():
        missing.append(path)
if missing:
    raise SystemExit("Riferimenti locali mancanti: " + ", ".join(missing))

json.loads(Path("vercel.json").read_text(encoding="utf-8"))
PYCHECK

node scripts/generate-route-pages.mjs --check

for asset in \
  assets/identity/fp-logo.png \
  assets/identity/pd-logo.png \
  fp/favicon.svg \
  fp/apple-touch-icon.png \
  pd/favicon.svg \
  pd/apple-touch-icon.png; do
  if [[ ! -f "$asset" ]]; then
    echo "Errore: asset identita mancante: $asset" >&2
    exit 1
  fi
done

if grep -q '<link rel="apple-touch-icon"' index.html; then
  echo "Errore: la home non deve dichiarare un'icona Apple di lega." >&2
  exit 1
fi

if find . -maxdepth 1 -type d -name '.lineup-backup-*' -print -quit | grep -q .; then
  echo "Errore: è presente una cartella backup della patch nella root." >&2
  exit 1
fi

git diff --check
printf '✓ Controllo statico superato.\n'
