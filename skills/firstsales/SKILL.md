---
name: firstsales
description: Run FirstSales outbound sales work from the terminal with the FirstSales CLI. Use it to check campaign results, manage contacts, lists and companies, work the reply inbox, find leads with Signals, manage senders and domains, and read billing and usage. Reads run straight away; every write is shown as a dry run and confirmed first.
---

# FirstSales

FirstSales is an outbound sales platform: campaigns, contacts, a reply inbox, deliverability and lead signals. This skill drives it through the `firstsales` command line tool (`@firstsales.io/cli`).

## Step 0: check the CLI

Run this first, every time:

```bash
bash scripts/ensure-cli.sh
```

The first word of its output is the status:

| Status | What to do |
|--------|------------|
| `up-to-date` | Carry on. |
| `update-available <have> <new>` | Tell the user a new version is out. Install it only if they say yes: `bash scripts/ensure-cli.sh --install`. If they say no, carry on with the installed version. |
| `not-installed <new>` | Ask the user. On yes, run `bash scripts/ensure-cli.sh --install`. |
| `offline` | npm cannot be reached. Carry on with the installed CLI, if there is one. |

## Step 1: check the login

```bash
firstsales auth status --json
firstsales whoami --json
```

If either one fails with exit code 3, or no key is set, use the `firstsales-setup` skill. The API key belongs to the user. Do not ask for it, read it, print it or put it in a command.

## Working rules

- **Read first.** Look at the current state before you change anything. Look again afterwards and say what changed.
- **Writes need a yes.** Before any create, update, delete, send, launch or import, run the same command with `--dry-run`. Show the user the output, then run it for real only after they agree. A dry run makes no network call.
- **Credits.** Signals scans, research and some imports spend credits. Say so before you ask.
- **Machine-readable output.** Add `--json` to reads you need to parse.
- **Scope.** Most commands need `--org` and `--workspace`. Use the IDs from `whoami`, or the defaults the user set with `FIRSTSALES_ORG_ID` and `FIRSTSALES_WORKSPACE_ID`.
- **Bodies.** Pass a JSON body with `--data '<json>'` or `--data-file path.json`.
- **Retries.** For writes that may be retried, pass `--idempotency-key <unique>`. Use the same key only for the same body.

## Where to look

Read only the page for the task at hand.

| Task | Page |
|------|------|
| Campaigns, sequences, launch, testimonials, blocked domains | [references/campaigns.md](references/campaigns.md) |
| Contacts, lists, tags, imports, companies, suppression | [references/contacts-lists-companies.md](references/contacts-lists-companies.md) |
| Reply inbox and reply templates | [references/inbox-templates.md](references/inbox-templates.md) |
| Direct email and compose | [references/emails-compose.md](references/emails-compose.md) |
| Signals (Beta): leads from LinkedIn post engagement | [references/signals.md](references/signals.md) |
| Senders, domains, warm up, DNS records | [references/senders-domains-deliverability.md](references/senders-domains-deliverability.md) |
| Deals, pipelines, activities | [references/crm-deals-activities.md](references/crm-deals-activities.md) |
| Knowledge bases and offerings | [references/knowledge-offerings.md](references/knowledge-offerings.md) |
| Copilot, learning, alerts | [references/copilot-learning-alerts.md](references/copilot-learning-alerts.md) |
| Billing, credits, usage | [references/billing-usage.md](references/billing-usage.md) |
| Account, team, API keys | [references/team-access-keys.md](references/team-access-keys.md) |
| Changelog and dashboard | [references/changelog-dashboard.md](references/changelog-dashboard.md) |
| Raw API calls and the MCP server | [references/api-and-mcp.md](references/api-and-mcp.md) |
| Errors and exit codes | [references/troubleshooting.md](references/troubleshooting.md) |
| Multi-step jobs (weekly review, new campaign, inbox pass) | [playbooks.md](playbooks.md) |

## Example

The user asks: "How is the Q4 campaign doing?"

```bash
firstsales campaigns list --json --org org_123 --workspace ws_123
firstsales campaigns analytics --campaign campaign_123 --json --org org_123 --workspace ws_123
```

Answer in plain words: sent, opened, replied, meetings, and anything stuck.
