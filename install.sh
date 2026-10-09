#!/usr/bin/env bash
# Installs the FirstSales skills for Claude Code, Codex, OpenCode and other agents that read ~/.agents/skills.
# Default: symlink, so `git pull` updates them. --copy: copy the files instead.
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
mode=link
[ "${1:-}" = "--copy" ] && mode=copy

for target in "$HOME/.claude/skills" "$HOME/.codex/skills" "$HOME/.agents/skills" "$HOME/.config/opencode/skills"; do
  mkdir -p "$target"
  for skill in "$here"/skills/*/; do
    name="$(basename "$skill")"
    rm -rf "${target:?}/$name"
    if [ "$mode" = copy ]; then cp -R "$skill" "$target/$name"; else ln -s "${skill%/}" "$target/$name"; fi
    echo "$mode $target/$name"
  done
done
echo "Done. Start a new agent session, then ask: \"use the firstsales skill\"."
