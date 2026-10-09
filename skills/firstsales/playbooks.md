# Playbooks

Step-by-step recipes for common jobs. Each step names the reference page with the details. Ask before every step marked **(confirm)**.

## "How are we doing?"

1. `firstsales whoami --json`: check which organization and workspace the key points at.
2. `firstsales dashboard get --json`: the headline numbers.
3. `firstsales campaigns list --json`, then `campaigns progress` and `campaigns analytics` for the active ones (campaigns.md).
4. `firstsales alerts list --json`: anything that needs a human (copilot-learning-alerts.md).

Report in plain words: what is sending, what is replying, what is stuck.

## New campaign from a contact file

1. Make or pick a list: `firstsales contact-lists list --json` (contacts-lists-companies.md).
2. Import the rows into it with `contact-imports create --data-file import.json` **(confirm)**.
3. `firstsales campaigns create --data '{"name":"Q4 founders","campaignType":"outreach","goal":"meeting"}'` **(confirm)**.
   - `campaignType`: `outreach` or `marketing`.
   - `goal`: `meeting`, `demo`, `download`, `order`, `reply` or `custom`.
4. Point it at the list and a sender: `campaigns workflow-update` with `includeListIds` and `senderConnectorIds` **(confirm)**.
5. Check the sender is healthy: `connectors test` and `warmup status` (senders-domains-deliverability.md).
6. Send a test email to a workspace member, then launch with the three-step flow in campaigns.md **(confirm)**.

## Daily inbox pass

1. `firstsales inbox threads --tab needs-reply --json` (inbox-templates.md).
2. For each reply that needs an answer, read the thread, then draft a reply.
3. Show each draft to the user. Send only the ones they approve **(confirm)**.

## Leads from LinkedIn posts

1. Create a signal with a keyword, person or company target **(confirm: it spends credits)** (signals.md).
2. Next day, `firstsales signals leads --signal-id <id> --sort score --json`.
3. Show the user the best leads. Add the ones they pick to a list **(confirm)**.

## Before you change anything

- Read the current state first. Read it again after the change and tell the user what changed.
- Show `--dry-run` output for every write.
- One write at a time. Stop at the first error and explain it.

## Sender and domain health

1. `firstsales connectors list --json`: the sender mailboxes (senders-domains-deliverability.md).
2. `firstsales connectors test --connector <id>` and `firstsales warmup status --connector <id> --json` for each one.
3. `firstsales email-auth status --json`: SPF, DKIM and DMARC for each sending domain.
4. If DKIM fails, the user fixes the DNS record at their domain host. Then `firstsales email-auth verify --domain <domain> --dkim-selector <selector>`.

Report each sender as healthy, warming up or broken, with the fix for each broken one.

## Credits check

1. `firstsales billing credits --json`: the balance (billing-usage.md).
2. `firstsales billing usage-summary --days 30 --json`: what used them.
3. Low balance? Tell the user. A top-up (`billing top-up`) charges their card **(confirm, with the amount)**.

## One email to one person

1. Find the contact, or create one (contacts-lists-companies.md). Pick a sender with `connectors list`.
2. `firstsales emails draft` with `--subject`, `--body` and an `--idempotency-key` (emails-compose.md). Show the draft.
3. On a yes, run `emails send` with `--dry-run`, show it, then send **(confirm)**. Or `emails schedule --at <time>`.

## A route with no command

1. Look up the route in the API reference at https://developer.firstsales.io.
2. Reads: `firstsales api GET <path> --json` (api-and-mcp.md).
3. Writes: `firstsales api POST <path> --data-file body.json --dry-run`. Show the preview and get a yes before running the same command without `--dry-run`.
