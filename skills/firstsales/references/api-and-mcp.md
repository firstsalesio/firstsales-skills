# Raw API and MCP

## When no command fits

`firstsales api` calls any public `/api/v1` route, signed with the user's key. You never handle the key.

```bash
firstsales api GET /api/v1/organizations/org_123/workspaces --json
```

- Base URL: `https://api.app.firstsales.io`. Override with `--base-url` or `FIRSTSALES_BASE_URL` only for a test server the user names.
- Use `api` only for reads. It has no dry-run, so agents must not use it for writes, even with confirmation. If no named command supports the write with dry-run, ask the user to perform it in the app.
- Prefer a named command. Run `firstsales commands --json` to list them all.

## MCP

FirstSales also has an MCP server at `https://api.app.firstsales.io/mcp`, signed in with OAuth. It covers a smaller set of tools than the CLI.

- Use it to read when the CLI is not installed and the host already has the MCP connected.
- Do all writes through the CLI, so the confirm-first rules in this skill apply.

## Never

- Never call the API with `curl` and a pasted key. The key must stay out of the chat, the shell history and any file you write.
- Never print `~/.firstsales/config.json`. It holds the key.
