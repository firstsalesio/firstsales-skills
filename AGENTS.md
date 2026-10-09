# FirstSales for coding agents

This repository holds agent skills for FirstSales, an outbound sales platform. Agents that read `AGENTS.md` instead of skill folders (for example OpenCode, Cursor or Gemini CLI) can use this file as the entry point.

## How to use FirstSales from an agent

1. Check the CLI: `bash skills/firstsales/scripts/ensure-cli.sh`. If it prints `update-available` or `not-installed`, ask the user, then run it again with `--install`.
2. Check the login: `firstsales auth status --json` and `firstsales whoami --json`. If no key is set, follow [skills/firstsales-setup/SKILL.md](skills/firstsales-setup/SKILL.md). The user stores the key; the agent never sees it.
3. Do the task with [skills/firstsales/SKILL.md](skills/firstsales/SKILL.md). It links one reference page per area.

## Rules

- Read the current state before changing anything.
- Run every write with `--dry-run` first, show the output, and continue only after the user agrees.
- Never put the API key on a command line, in a file or in output.
- Say when an action spends credits.

## Working on this repository

- `npm test` runs every check. Node 20 or newer.
- After a CLI release, regenerate the command tables: `FIRSTSALES_CLI=firstsales node scripts/gen-reference.mjs`.
- Keep `skills/firstsales/scripts/ensure-cli.sh` and `skills/firstsales-setup/scripts/ensure-cli.sh` identical; a test checks it.
- Use placeholder IDs such as `org_123` and `ws_123` in examples.
