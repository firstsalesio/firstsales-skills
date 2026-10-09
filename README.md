<div align="center">

# FirstSales Agent Skills

**Run your outbound sales from Claude Code, Codex, Cursor, OpenCode or Gemini CLI.**

Ask your coding agent how a campaign is doing, clean a contact list, work the reply inbox or pull fresh leads from LinkedIn posts. The skills drive the [FirstSales CLI](https://www.npmjs.com/package/@firstsales.io/cli). Every change is shown as a dry run and waits for your yes.

[![Tests](https://github.com/firstsalesio/firstsales-skills/actions/workflows/test.yml/badge.svg)](https://github.com/firstsalesio/firstsales-skills/actions/workflows/test.yml)
[![npm CLI](https://img.shields.io/npm/v/@firstsales.io/cli?label=%40firstsales.io%2Fcli)](https://www.npmjs.com/package/@firstsales.io/cli)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[Install](#install) · [Quick start](#quick-start) · [What it can do](#what-it-can-do) · [Safety](#safety) · [Guide](GUIDE.md) · [Docs](https://developer.firstsales.io)

</div>

---

## Install

Pick the one that matches your agent. All of them install the same two skills: `firstsales` and `firstsales-setup`.

### Claude Code plugin (recommended for Claude Code)

```bash
claude plugin marketplace add firstsalesio/firstsales-skills
claude plugin install firstsales@firstsales
```

Or inside a Claude Code session:

```text
/plugin marketplace add firstsalesio/firstsales-skills
/plugin install firstsales@firstsales
```

Update later with `claude plugin marketplace update firstsales`.

### Any agent with `npx skills`

Works with Claude Code, Codex, Cursor, OpenCode, Gemini CLI, GitHub Copilot and [many more](https://github.com/vercel-labs/skills).

```bash
npx skills add firstsalesio/firstsales-skills
```

Useful flags:

```bash
npx skills add firstsalesio/firstsales-skills --list                 # see the skills first
npx skills add firstsalesio/firstsales-skills -g                     # install for your user, not the project
npx skills add firstsalesio/firstsales-skills -a claude-code -a codex # pick agents
```

### Install script (Claude Code, Codex, OpenCode)

```bash
git clone https://github.com/firstsalesio/firstsales-skills.git
cd firstsales-skills
./install.sh          # symlinks, so `git pull` keeps you up to date
./install.sh --copy   # or copy the files instead
```

It places the skills in `~/.claude/skills`, `~/.codex/skills`, `~/.agents/skills` and `~/.config/opencode/skills`.

### Manual

Copy `skills/firstsales` and `skills/firstsales-setup` into your agent's skills folder. For agents that read `AGENTS.md` instead of skills, point them at [AGENTS.md](AGENTS.md).

## Quick start

1. **Get an API key.** In the FirstSales app, open **Settings → API → API Keys** and create one with the scopes you need.
2. **Ask your agent to set up.** Say *"set up FirstSales"*. The `firstsales-setup` skill installs the CLI if you agree, then tells you how to store the key yourself:

   ```bash
   read -rs FS_KEY && firstsales auth login --api-key "$FS_KEY"; unset FS_KEY
   ```

   You type the key hidden, in your own terminal. The agent never sees it.
3. **Ask for real work.** For example:
   - *"How are my campaigns doing this week?"*
   - *"Show me replies in the inbox that still need an answer, and draft responses."*
   - *"Import contacts.csv into a new list called Q4 founders."*
   - *"Create a signal for people engaging with posts about AI SDR tools."*
   - *"Is my sending domain healthy? Check DKIM and warm up."*

In Claude Code you can also call the skills directly: `/firstsales:firstsales` (plugin) or `/firstsales` (skills folder). In Codex: `$firstsales`.

## What it can do

The skills cover every command in the FirstSales CLI. Each area has its own reference page, so the agent loads only what the task needs.

| Area | What you can ask for | Reference |
|------|----------------------|-----------|
| Campaigns | Create, set up, test, launch, pause; progress and analytics | [campaigns.md](skills/firstsales/references/campaigns.md) |
| Contacts and lists | Import, tag, dedupe companies, suppress, manage lists | [contacts-lists-companies.md](skills/firstsales/references/contacts-lists-companies.md) |
| Inbox | Read threads, draft and send replies, snooze, assign, templates | [inbox-templates.md](skills/firstsales/references/inbox-templates.md) |
| Signals (Beta) | Find leads who engage with LinkedIn posts by keyword, person or company | [signals.md](skills/firstsales/references/signals.md) |
| Deliverability | Senders, domains, DNS records, warm up, health checks | [senders-domains-deliverability.md](skills/firstsales/references/senders-domains-deliverability.md) |
| Email | Draft, send or schedule one-off emails, including to new addresses | [emails-compose.md](skills/firstsales/references/emails-compose.md) |
| CRM | Deals, pipelines, activities | [crm-deals-activities.md](skills/firstsales/references/crm-deals-activities.md) |
| Knowledge | Knowledge bases and offerings the writer uses | [knowledge-offerings.md](skills/firstsales/references/knowledge-offerings.md) |
| Copilot | Ask Copilot, learning insights, alerts | [copilot-learning-alerts.md](skills/firstsales/references/copilot-learning-alerts.md) |
| Billing | Plan, credits, usage | [billing-usage.md](skills/firstsales/references/billing-usage.md) |
| Team | Members, invitations, groups, API keys | [team-access-keys.md](skills/firstsales/references/team-access-keys.md) |
| Updates | Changelog and dashboard | [changelog-dashboard.md](skills/firstsales/references/changelog-dashboard.md) |
| Raw access | Any v1 API route, and the read-only MCP server | [api-and-mcp.md](skills/firstsales/references/api-and-mcp.md) |

Multi-step recipes (weekly review, new campaign from a file, daily inbox pass, LinkedIn leads) live in [playbooks.md](skills/firstsales/playbooks.md). Errors and exit codes are in [troubleshooting.md](skills/firstsales/references/troubleshooting.md).

## Safety

- **Your key stays yours.** The skills never ask for, print or pass your API key. You store it with `firstsales auth login` or `FIRSTSALES_API_KEY`, in your own terminal.
- **Every write waits for you.** Before anything is created, changed, sent or deleted, the agent shows the `--dry-run` output and asks. A dry run makes no network call.
- **Credits are called out.** Actions that spend credits, like Signals scans, are flagged before you agree.
- **CLI updates are your call.** Each run checks npm for a newer `@firstsales.io/cli`. It installs only when you say yes, only the version it checked, and never downgrades.
- **Least privilege.** Give the API key only the scopes you need. A key scoped to one workspace cannot touch the others.

## How it works

```text
you ──ask──▶ agent ──loads──▶ firstsales skill ──runs──▶ firstsales CLI ──HTTPS──▶ FirstSales API v1
                                    │
                                    └─ reads only the reference page for the task
```

- **Engine:** the `firstsales` CLI, version 0.1.12 or newer.
- **Fallback:** `firstsales api <METHOD> <path>` reaches any v1 route the CLI has no command for.
- **MCP:** the FirstSales MCP server is read-only; use the CLI for changes.

## Requirements

- Node.js 20 or newer, with npm.
- A FirstSales account and an API key.
- macOS or Linux. On Windows, use WSL.

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `firstsales: command not found` | Ask the agent to run setup, or `npm install -g @firstsales.io/cli`. |
| Exit code 3 | The key is missing, wrong or revoked. Run setup again. |
| Exit code 4 | Wrong ID or wrong workspace. Run `firstsales whoami`. |
| 403 `API key scope insufficient` | Make a key with that scope. |
| `npm install -g` permission error | Give npm a user-owned prefix. Do not use `sudo`. |

More in [troubleshooting.md](skills/firstsales/references/troubleshooting.md).

## Support

- Developer docs: [developer.firstsales.io](https://developer.firstsales.io)
- CLI on npm: [@firstsales.io/cli](https://www.npmjs.com/package/@firstsales.io/cli)
- Bugs and requests: [open an issue](https://github.com/firstsalesio/firstsales-skills/issues). Include the output of `firstsales doctor` and `bash skills/firstsales/scripts/ensure-cli.sh`. Never paste your API key.

## Contributing

```bash
npm test
```

The tests check that:

- every CLI command is documented;
- every runnable example passes a dry run;
- the skills install in each agent;
- the docs contain no secrets.

Command tables are generated: run `node scripts/gen-reference.mjs` after a CLI release. See [CHANGELOG.md](CHANGELOG.md).

## License

[MIT](LICENSE)
