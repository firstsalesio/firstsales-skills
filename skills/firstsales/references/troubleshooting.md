# Troubleshooting

## Exit codes

| Code | Meaning | What to do |
|------|---------|------------|
| 0 | OK | Nothing. |
| 1 | Runtime error | Read the message. Retry once if it was a network blip. |
| 2 | Bad usage | A flag is wrong or missing. Check `firstsales help`. |
| 3 | Auth failed | The key is missing, wrong or revoked. Run the firstsales-setup skill. |
| 4 | Not found | Wrong id, or the thing is in another workspace. List first, then pick the id. |
| 5 | Rate limited | Wait a minute, then retry. Do not loop fast. |

## Common problems

- `firstsales: command not found`: run `scripts/ensure-cli.sh`. On `not-installed`, ask the user, then run it again with `--install`.
- `offline` from `ensure-cli.sh`: npm cannot be reached. Carry on with the installed CLI if there is one.
- Wrong workspace: pass `--workspace`, or ask the user to set `FIRSTSALES_WORKSPACE_ID` in their shell. `firstsales whoami` shows where the key points.
- 403 `API key scope insufficient`: the key lacks a scope for that action. The user makes a new key with that scope in the app.
- 409 `idempotency_key_reused`: that key was already used for a different body. Make a new key.
- 409 `idempotency_request_in_progress`: the first try is still running. Wait, then retry with the same key.
- 402: no paid plan, or no credits. See billing-usage.md.
- `npm install -g` fails with a permissions error: the user's npm needs a user-owned prefix. Tell them; do not use `sudo`.

## Before you report a bug

Run `firstsales doctor` and `scripts/ensure-cli.sh` (its first word is the status, then the installed version). Share both with the user. Never share the API key or the config file.
