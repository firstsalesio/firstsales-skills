#!/usr/bin/env bash
# Checks the FirstSales CLI against npm. Run at the start of every skill.
# Prints one status line on stdout:
#   up-to-date <version>           nothing to do
#   update-available <have> <new>  ask the user; on yes, run again with --install
#   not-installed <new>            ask the user; on yes, run again with --install
#   offline <have|none>            npm unreachable; carry on with what is installed
# Installs only with --install, and only the exact version it just checked,
# so a release published after the user said yes is never pulled in. Never downgrades.
PKG=@firstsales.io/cli

latest=$(npm view "$PKG" version 2>/dev/null)
installed=$(npm ls -g "$PKG" --json 2>/dev/null | sed -n 's/.*"version": *"\([^"]*\)".*/\1/p' | head -1)

if [ -z "$latest" ]; then
  echo "offline ${installed:-none}"
  exit 0
fi

newest=$(printf '%s\n%s\n' "$latest" "${installed:-0.0.0}" | sort -V | tail -1)
if [ -n "$installed" ] && { [ "$newest" != "$latest" ] || [ "$latest" = "$installed" ]; }; then
  echo "up-to-date $installed"
  exit 0
fi

if [ "$1" != "--install" ]; then
  if [ -n "$installed" ]; then echo "update-available $installed $latest"; else echo "not-installed $latest"; fi
  exit 0
fi

npm install -g "$PKG@$latest" || { echo "install failed; try: npm install -g $PKG@$latest" >&2; exit 1; }
