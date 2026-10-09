# Raw API and MCP

## When no command fits

`firstsales api` calls any public `/api/v1` route, signed with the user's key. You never handle the key.

```bash
firstsales api GET /api/v1/organizations/org_123/workspaces --json
firstsales api POST /api/v1/organizations/org_123/workspaces/ws_123/campaigns --data-file campaign.json --json
```

- Base URL: `https://api.app.firstsales.io`. Override with `--base-url` or `FIRSTSALES_BASE_URL` only for a test server the user names.
- Writes through `api` skip the CLI's safety checks. Show the body and get a yes, as for any write.
- Add `--idempotency-key <unique>` to writes, so a retry does not do the work twice.
- Prefer a named command. Run `firstsales commands --json` to list them all.

## MCP

FirstSales also has an MCP server at `https://api.app.firstsales.io/mcp`, signed in with OAuth. It covers a smaller set of tools than the CLI.

- Use it to read when the CLI is not installed and the host already has the MCP connected.
- Do all writes through the CLI, so the confirm-first rules in this skill apply.

## Never

- Never call the API with `curl` and a pasted key. The key must stay out of the chat, the shell history and any file you write.
- Never print `~/.firstsales/config.json`. It holds the key.
