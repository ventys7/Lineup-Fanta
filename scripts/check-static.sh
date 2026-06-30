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
import re

html = Path("index.html").read_text(encoding="utf-8")
missing = []
for path in re.findall(r'(?:src|href)="((?:js|css)/[^"?#]+)"', html):
    if not Path(path).is_file():
        missing.append(path)
if missing:
    raise SystemExit("Riferimenti locali mancanti: " + ", ".join(missing))
PYCHECK

if find . -maxdepth 1 -type d -name '.lineup-backup-*' -print -quit | grep -q .; then
  echo "Errore: è presente una cartella backup della patch nella root." >&2
  exit 1
fi

git diff --check
printf '✓ Controllo statico superato.\n'
