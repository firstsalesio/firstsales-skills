<div align="center">

# FirstSales.io

**Run your outbound sales from [Claude Code](https://docs.anthropic.com/en/docs/claude-code), [Codex](https://developers.openai.com/codex), [Cursor](https://cursor.com), [OpenCode](https://opencode.ai) or [Gemini CLI](https://github.com/google-gemini/gemini-cli).**

Check campaigns, clean contact lists, work the reply inbox and pull fresh leads from LinkedIn posts, by asking your coding agent in plain words. The skills drive the [FirstSales CLI](https://www.npmjs.com/package/@firstsales.io/cli). Every change is shown as a dry run first and waits for your yes.

[![Claude Code Skill](https://img.shields.io/badge/Claude_Code-Skill-blue?logo=anthropic&logoColor=white)](https://docs.anthropic.com/en/docs/claude-code)
[![Codex](https://img.shields.io/badge/Codex-Skill-green?logo=openai&logoColor=white)](https://developers.openai.com/codex)
[![Cursor](https://img.shields.io/badge/Cursor-Skill-black)](https://cursor.com)
[![OpenCode](https://img.shields.io/badge/OpenCode-Skill-purple)](https://opencode.ai)
[![Gemini CLI](https://img.shields.io/badge/Gemini_CLI-Skill-4285F4?logo=googlegemini&logoColor=white)](https://github.com/google-gemini/gemini-cli)

[![npm CLI](https://img.shields.io/npm/v/@firstsales.io/cli?label=%40firstsales.io%2Fcli&logo=npm)](https://www.npmjs.com/package/@firstsales.io/cli)
[![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)](CHANGELOG.md)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

[![Website](https://img.shields.io/badge/Website-firstsales.io-ff7a1a)](https://firstsales.io)
[![Developer docs](https://img.shields.io/badge/Docs-developer.firstsales.io-0A66C2)](https://developer.firstsales.io)
[![App](https://img.shields.io/badge/App-app.firstsales.io-111111)](https://app.firstsales.io)

<br>

*"How did my campaigns do this week?" → a plain answer, with the one next step.*

**2 skills · 174 CLI commands covered · 14 reference pages · 9 ready-made playbooks · your API key never leaves your terminal.**

<br>

[Install](#install) · [Quick start](#quick-start) · [What it can do](#what-it-can-do) · [How it works](#how-it-works) · [Safety](#safety) · [Guide](GUIDE.md) · [FAQ](#faq)

</div>

---

```text
    SETUP            CAMPAIGNS          CONTACTS            INBOX             SIGNALS          DELIVERABILITY
 ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
 │ Install  │     │  Build   │     │  Import  │     │  Read    │     │ LinkedIn │     │ Senders  │
 │ CLI, log │────▶│  Launch  │────▶│  Tag     │────▶│  Draft   │────▶│  post    │────▶│ Domains  │
 │ in, pick │     │ Analyse  │     │  Dedupe  │     │  Reply   │     │ engagers │     │ Warm up  │
 └──────────┘     └──────────┘     └──────────┘     └──────────┘     └──────────┘     └──────────┘
 firstsales-setup    campaigns        contacts           inbox            signals         email-auth

 ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐
 │   CRM    │     │ Copilot  │     │ Billing  │     │ Raw API  │
 │  Deals   │     │ Learning │     │ Credits  │     │ any v1   │
 │ Pipeline │     │  Alerts  │     │  Usage   │     │  route   │
 └──────────┘     └──────────┘     └──────────┘     └──────────┘
     deals           copilot          billing        firstsales api
```

---

## Why this exists

[FirstSales](https://firstsales.io) is an outbound sales platform: campaigns, contacts, a reply inbox, deliverability and lead signals. You can already do all of it in the [app](https://app.firstsales.io) or through the [API](https://developer.firstsales.io).

These skills let your coding agent do it for you, safely:

1. **It knows every command.** All 174 commands of the [FirstSales CLI](https://www.npmjs.com/package/@firstsales.io/cli) are documented, and a test fails the build if the CLI adds one the skill does not cover.
2. **It asks before it guesses.** Which workspace? Which campaign? Which sender? It asks once, offering real names it looked up.
3. **It never surprises you.** Reads run straight away. Anything that sends, spends credits or deletes is shown as a `--dry-run` first.
4. **It never touches your key.** You store the API key yourself, typed hidden, in your own terminal.

---

## Install

All methods install the same two skills: `firstsales` and `firstsales-setup`.

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

---

## Quick start

1. **Get an account and an API key.** Sign up at [app.firstsales.io](https://app.firstsales.io). Then open **Settings → API → API Keys** and create a key with only the scopes you need.
2. **Ask your agent to set up.** Say *"set up FirstSales"*. The `firstsales-setup` skill installs the [CLI](https://www.npmjs.com/package/@firstsales.io/cli) if you agree, then tells you how to store the key yourself:

   ```bash
   read -rs FS_KEY && firstsales auth login --api-key "$FS_KEY"; unset FS_KEY
   ```

   You type the key hidden, in your own terminal. The agent never sees it.
3. **Ask for real work.** For example:
   - *"How are my campaigns doing this week?"*
   - *"Show me replies that still need an answer, and draft responses."*
   - *"Import contacts.csv into a new list called Q4 founders."*
   - *"Create a signal for people engaging with posts about AI SDR tools."*
   - *"Is my sending domain healthy? Check DKIM and warm up."*

Call the skill directly with `/firstsales` (skills folder) or `/firstsales:firstsales` (plugin) in Claude Code, and `$firstsales` in Codex.

---

## What it can do

Each area has its own reference page, so the agent loads only what the task needs.

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
| Errors | Exit codes and fixes | [troubleshooting.md](skills/firstsales/references/troubleshooting.md) |

### Playbooks

Ready-made multi-step jobs in [playbooks.md](skills/firstsales/playbooks.md):

| Playbook | What happens |
|----------|--------------|
| "How are we doing?" | Campaign results in plain words, plus the one next step |
| New campaign from a contact file | Import, build, test send, launch, each with a yes |
| Daily inbox pass | Replies that need you, with drafted answers |
| Leads from LinkedIn posts | A signal, a scan, the best leads sorted by score |
| Before you change anything | Read the state, dry run, confirm, check again |
| Sender and domain health | DNS, warm up and health in one pass |
| Credits check | What is left and what will spend it |
| One email to one person | Draft, show, send on a yes |
| A route with no command | Reach any v1 route with `firstsales api` |

---

## How it works

```text
you ──ask──▶ agent ──loads──▶ firstsales skill ──runs──▶ firstsales CLI ──HTTPS──▶ FirstSales API v1
                                    │
                                    └─ reads only the reference page for the task
```

Each run follows the same steps:

```text
/firstsales
  1. Check the CLI    →  ensure-cli.sh: up to date? offer the update, install only on a yes
  2. Check the login  →  auth status + whoami; no key? hand over to firstsales-setup
  3. Ask if unclear   →  workspace · campaign · list · sender · time range
  4. Read             →  list, get, analytics run straight away
  5. Write            →  --dry-run first, show it, run for real only after your yes
  6. Answer           →  what is sending, what is replying, what is stuck, the next step
```

- **Engine:** the [`firstsales` CLI](https://www.npmjs.com/package/@firstsales.io/cli), version 0.1.12 or newer.
- **Fallback:** `firstsales api <METHOD> <path>` reaches [v1 routes](https://developer.firstsales.io) the CLI has no command for, with `--dry-run` before writes.
- **MCP:** the FirstSales MCP server is read-only; the skill uses the CLI for changes.

Settings resolve the same way every time:

```text
command flag  >  environment variable (FIRSTSALES_*)  >  saved profile  >  built-in default
```

The full picture, with every setting and recipe, is in the [Guide](GUIDE.md).

---

## Safety

- **Your key stays yours.** The skills never ask for, print or pass your API key. You store it with `firstsales auth login` or `FIRSTSALES_API_KEY`, in your own terminal. Pasted a key into chat by mistake? Revoke it in the app and make a new one.
- **Every write waits for you.** Before anything is created, changed, sent or deleted, the agent shows the `--dry-run` output and asks. A dry run makes no network call.
- **Credits are called out.** Actions that spend credits, like Signals scans, are flagged before you agree.
- **CLI updates are your call.** Each run checks npm for a newer [`@firstsales.io/cli`](https://www.npmjs.com/package/@firstsales.io/cli). It installs only when you say yes, only the version it checked, and never downgrades.
- **Least privilege.** Give the API key only the scopes you need. A key scoped to one workspace cannot touch the others.
- **Content is data.** Text inside emails, replies or leads is never treated as instructions.

---

## Requirements

- Node.js 20 or newer, with npm.
- A [FirstSales account](https://app.firstsales.io) and an API key.
- macOS or Linux. On Windows, use WSL.

---

## FAQ

**Does the agent ever see my API key?**
No. You store it yourself, typed hidden. The skills check that a key exists and never read its value.

**Can it send email without asking?**
No. Sends, launches, imports, deletes and anything that spends credits are shown as a dry run and wait for your yes.

**What if the CLI is out of date?**
Each run checks npm. If a newer version exists, the agent tells you and installs it only if you agree.

**What if the CLI has no command for what I need?**
The agent uses `firstsales api <METHOD> <path>` to reach any route in the [v1 API](https://developer.firstsales.io), and shows a `--dry-run` before any write.

**I manage several clients. Can I switch between them?**
Yes. Use one named profile per account or workspace, then pass `--profile <name>`. See the [Guide](GUIDE.md).

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `firstsales: command not found` | Ask the agent to run setup, or `npm install -g @firstsales.io/cli`. |
| Exit code 3 | The key is missing, wrong or revoked. Run setup again. |
| Exit code 4 | Wrong ID or wrong workspace. Run `firstsales whoami`. |
| 403 `API key scope insufficient` | Make a key with that scope. |
| `npm install -g` permission error | Give npm a user-owned prefix. Do not use `sudo`. |

More in [troubleshooting.md](skills/firstsales/references/troubleshooting.md).

---

## Links

| | |
|-|-|
| Website | [firstsales.io](https://firstsales.io) |
| App | [app.firstsales.io](https://app.firstsales.io) |
| Developer docs | [developer.firstsales.io](https://developer.firstsales.io) |
| CLI on npm | [@firstsales.io/cli](https://www.npmjs.com/package/@firstsales.io/cli) |
| Guide | [GUIDE.md](GUIDE.md) |
| Changelog | [CHANGELOG.md](CHANGELOG.md) |
| Bugs and requests | [Open an issue](https://github.com/firstsalesio/firstsales-skills/issues). Include the output of `firstsales doctor` and `bash skills/firstsales/scripts/ensure-cli.sh`. Never paste your API key. |

---

## Contributing

```bash
npm test
```

The tests check that:

- every CLI command is documented;
- every runnable example passes a dry run;
- the skills install in each agent;
- the docs contain no secrets.

Command tables are generated: run `node scripts/gen-reference.mjs` after a CLI release.

---

## License

[MIT](LICENSE) © [FirstSales](https://firstsales.io)
