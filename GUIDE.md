# FirstSales skills: the in-depth guide

The [README](README.md) gets you running. This guide explains how the pieces fit, so you can trust what the agent does and fix it when it goes wrong.

## Contents

1. [Install](#1-install)
2. [Your API key and safety](#2-your-api-key-and-safety)
3. [Settings and which one wins](#3-settings-and-which-one-wins)
4. [How the skill thinks](#4-how-the-skill-thinks)
5. [What it covers](#5-what-it-covers)
6. [Recipes](#6-recipes)
7. [Errors](#7-errors)
8. [Talking to the agent](#8-talking-to-the-agent)

## 1. Install

Pick one. Each installs two skills: `firstsales` does the work, `firstsales-setup` gets you logged in.

```bash
# Claude Code plugin
claude plugin marketplace add firstsalesio/firstsales-skills
claude plugin install firstsales@firstsales

# Any agent that reads skills (Claude Code, Codex, Cursor, OpenCode, Gemini CLI and more)
npx skills add firstsalesio/firstsales-skills

# From a clone: symlinks by default, --copy to copy
./install.sh
```

The skills need the FirstSales CLI, `@firstsales.io/cli` 0.1.12 or newer, on Node.js 20 or newer. You do not need to install it yourself: the skill checks npm on every run and offers to install or update it. It installs only after you say yes, installs exactly the version it checked, and never downgrades.

## 2. Your API key and safety

The key is yours. The agent never asks for it, never sees it and never puts it on a command line.

1. In the app, open **Settings → API → API Keys**. Make a key with only the scopes you need. A key scoped to one workspace cannot touch the others.
2. In your own terminal, store it, typed hidden:

   ```bash
   read -rs FS_KEY && firstsales auth login --api-key "$FS_KEY"; unset FS_KEY
   ```

   The CLI saves it in `~/.firstsales/config.json`, readable only by you (mode 600).
3. Or keep it for one shell session: `read -rs FIRSTSALES_API_KEY && export FIRSTSALES_API_KEY`.

If you ever paste a key into a chat, revoke it in the app and make a new one. The agent will tell you the same.

Every write (create, update, send, launch, import, delete) is first run with `--dry-run`. A dry run checks the command and prints the request it would send, without calling the API. The agent shows you that and waits for your yes. Anything that spends credits or charges your card is called out before you agree.

## 3. Settings and which one wins

Each setting comes from the first place that has it:

| Setting | 1. Flag | 2. Environment | 3. Saved profile | 4. Default |
|---------|---------|----------------|------------------|------------|
| API key | `--api-key` (not for agents) | `FIRSTSALES_API_KEY` | `apiKey` | none |
| Organization | `--org` | `FIRSTSALES_ORG_ID` | `org` | none |
| Workspace | `--workspace` | `FIRSTSALES_WORKSPACE_ID` | `workspace` | none |
| API address | `--base-url` | `FIRSTSALES_BASE_URL` | `baseUrl` | `https://api.app.firstsales.io` |

The profile in use is `--profile`, else `FIRSTSALES_PROFILE`, else the last one you logged in with. `FIRSTSALES_CONFIG` moves the config file somewhere else. Use one profile per account or client:

```bash
read -rs FS_KEY && firstsales auth login --profile client-b --api-key "$FS_KEY"; unset FS_KEY
firstsales whoami --profile client-b
```

## 4. How the skill thinks

Every run goes the same way:

1. **Check the CLI.** `scripts/ensure-cli.sh` prints one word: `up-to-date`, `update-available`, `not-installed` or `offline`.
2. **Check the login.** `firstsales auth status` and `firstsales whoami`. Exit code 3 hands over to `firstsales-setup`.
3. **Ask once, if needed.** Only what changes the result and cannot be looked up: which workspace, which campaign, which sender.
4. **Read first.** Look at the current state.
5. **Dry run, then yes, then write.** One write at a time. Stop at the first error.
6. **Read again** and tell you what changed.

The skill loads only the reference page for the task, so it stays fast and cheap on context.

## 5. What it covers

Every command in the CLI is documented, and a test fails if a new CLI command has no page. The pages live in [skills/firstsales/references](skills/firstsales/references):

| Page | Covers |
|------|--------|
| [campaigns.md](skills/firstsales/references/campaigns.md) | Create, workflow, test send, launch, pause, progress, analytics |
| [contacts-lists-companies.md](skills/firstsales/references/contacts-lists-companies.md) | Contacts, lists, tags, imports, companies, suppression |
| [inbox-templates.md](skills/firstsales/references/inbox-templates.md) | Reply inbox, drafts, snooze, assign, reply templates |
| [emails-compose.md](skills/firstsales/references/emails-compose.md) | One-off emails: draft, send, schedule, cancel |
| [signals.md](skills/firstsales/references/signals.md) | Leads from LinkedIn post engagement |
| [senders-domains-deliverability.md](skills/firstsales/references/senders-domains-deliverability.md) | Senders, warm up, SPF/DKIM/DMARC, tracking domains |
| [crm-deals-activities.md](skills/firstsales/references/crm-deals-activities.md) | Deals, pipelines, activities |
| [knowledge-offerings.md](skills/firstsales/references/knowledge-offerings.md) | Knowledge bases and offerings |
| [copilot-learning-alerts.md](skills/firstsales/references/copilot-learning-alerts.md) | Copilot, learning insights, alerts |
| [billing-usage.md](skills/firstsales/references/billing-usage.md) | Plan, credits, usage, top-ups |
| [team-access-keys.md](skills/firstsales/references/team-access-keys.md) | Members, invitations, groups, API keys |
| [changelog-dashboard.md](skills/firstsales/references/changelog-dashboard.md) | Changelog and dashboard |
| [api-and-mcp.md](skills/firstsales/references/api-and-mcp.md) | Read-only v1 routes with `firstsales api`, and the read-only MCP server |
| [troubleshooting.md](skills/firstsales/references/troubleshooting.md) | Exit codes and common problems |

## 6. Recipes

[playbooks.md](skills/firstsales/playbooks.md) has step-by-step recipes:

- Weekly "how are we doing?" review
- New campaign from a contact file
- Daily inbox pass
- Leads from LinkedIn posts
- Sender and domain health
- Credits check
- One email to one person
- A route with no command yet

## 7. Errors

| Exit code | Meaning | Fix |
|-----------|---------|-----|
| 0 | OK | - |
| 1 | Runtime error | Read the message; retry once for a network blip |
| 2 | Bad usage | A flag is wrong or missing |
| 3 | Auth failed | Key missing, wrong or revoked: run setup |
| 4 | Not found | Wrong id, or another workspace |
| 5 | Rate limited | Wait a minute |

`firstsales doctor` shows what is missing without showing the key. More in [troubleshooting.md](skills/firstsales/references/troubleshooting.md).

## 8. Talking to the agent

Plain requests work best. Name the outcome, not the command:

- "How did the Q4 founders campaign do this week?"
- "Draft answers to the replies that need one. Don't send yet."
- "Make a signal for people who comment on posts about voice AI, 100 credits a day."
- "Is acme.com's DKIM set up?"

Say "just do it" for reads you do not want to be asked about. Writes always wait for your yes.

In Claude Code: `/firstsales` (or `/firstsales:firstsales` from the plugin). In Codex: `$firstsales`. Other agents pick the skill up from its description, or from [AGENTS.md](AGENTS.md).
