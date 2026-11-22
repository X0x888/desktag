#!/usr/bin/env bash
set -euo pipefail

# Replaces SITE_URL, APP_STORE_URL and SUPPORT_EMAIL across the static site
# before deploying to GitHub Pages.
#
# Usage:
#   ./scripts/configure.sh \
#     --site-url "https://username.github.io/desktag-site" \
#     --app-store-url "https://apps.apple.com/app/id1234567890" \
#     --support-email "support@example.com" \
#     [--cname "desktag.example.com"]

SITE_URL=""
APP_STORE_URL=""
SUPPORT_EMAIL=""
CNAME_HOST=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --site-url) SITE_URL="${2:-}"; shift 2 ;;
    --app-store-url) APP_STORE_URL="${2:-}"; shift 2 ;;
    --support-email) SUPPORT_EMAIL="${2:-}"; shift 2 ;;
    --cname) CNAME_HOST="${2:-}"; shift 2 ;;
    -h|--help)
      sed -n '3,12p' "$0" | sed 's/^# \{0,1\}//'
      exit 0
      ;;
    *)
      echo "Unknown option: $1" >&2
      exit 1
      ;;
  esac
done

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TARGETS=(
  "$ROOT/index.html"
  "$ROOT/support.html"
  "$ROOT/privacy.html"
  "$ROOT/robots.txt"
  "$ROOT/sitemap.xml"
)

# Strip trailing slash from SITE_URL so SITE_URL/ never doubles slashes.
SITE_URL="${SITE_URL%/}"

replace_token() {
  local token="$1"
  local value="$2"
  [[ -z "$value" ]] && return 0
  python3 - "$token" "$value" "${TARGETS[@]}" <<'PY'
import sys, pathlib
token, value, *files = sys.argv[1:]
for f in files:
    p = pathlib.Path(f)
    if p.exists():
        text = p.read_text(encoding="utf-8")
        if token in text:
            p.write_text(text.replace(token, value), encoding="utf-8")
            print(f"updated {p.name}: {token} -> {value}")
PY
}

replace_token "SITE_URL" "$SITE_URL"
replace_token "APP_STORE_URL" "$APP_STORE_URL"
replace_token "SUPPORT_EMAIL" "$SUPPORT_EMAIL"

if [[ -n "$CNAME_HOST" ]]; then
  printf '%s\n' "$CNAME_HOST" > "$ROOT/CNAME"
  echo "wrote CNAME -> $CNAME_HOST"
fi

echo
echo "Remaining placeholders:"
grep -rn "SITE_URL\|APP_STORE_URL\|SUPPORT_EMAIL" "${TARGETS[@]}" || echo "None — ready to deploy."
