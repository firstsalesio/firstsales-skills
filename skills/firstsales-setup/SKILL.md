---
name: firstsales-setup
description: Set up the FirstSales CLI so the firstsales skill can work. Installs or updates @firstsales.io/cli when the user agrees, guides the user to store their own API key without the agent seeing it, and checks the login, organization and workspace. Use it on first run, after an auth error (exit code 3), or when switching accounts.
---

# FirstSales setup

Gets the `firstsales` command line tool installed and logged in. The user keeps their API key to themselves the whole time.

## Step 0: check the CLI

```bash
bash scripts/ensure-cli.sh
```

| Status | What to do |
|--------|------------|
| `up-to-date` | Go to step 1. |
| `update-available <have> <new>` | Ask the user. On yes: `bash scripts/ensure-cli.sh --install`. |
| `not-installed <new>` | Ask the user. On yes: `bash scripts/ensure-cli.sh --install`. |
| `offline` | npm cannot be reached. If the CLI is installed, go on. If not, ask the user to try again when online. |

If the install fails with a permissions error, tell the user their npm needs a user-owned prefix. Do not use `sudo`.

## Step 1: is a key already set?

```bash
firstsales auth status --json
```

If it shows a key (masked), go to step 3.

`firstsales doctor` lists what is missing, if anything. Share its output with the user, never the config file.

## Step 2: the user stores their key

Do not ask for the key, and do not type it, print it or pass it on a command line. Tell the user to do one of these in their own terminal:

1. No account yet? Sign up at https://app.firstsales.io first.
2. Make a key in the FirstSales app under **Settings → API → API Keys**. Give it only the scopes they need.
3. Then either:
   - save it to the CLI profile, typed hidden:

     ```bash
     read -rs FS_KEY && firstsales auth login --api-key "$FS_KEY"; unset FS_KEY
     ```

   - or set it for the shell session, typed hidden:

     ```bash
     read -rs FIRSTSALES_API_KEY && export FIRSTSALES_API_KEY
     ```

Wait for the user to say it is done.

## Step 3: check the login

```bash
firstsales auth status --json
firstsales whoami --json
```

`whoami` shows the user, the organization and the workspaces the key can reach. If there is more than one workspace, ask which one to use. The user can make it the default in their own shell:

```bash
export FIRSTSALES_ORG_ID=org_123
export FIRSTSALES_WORKSPACE_ID=ws_123
```

Check the key works in that workspace:

```bash
firstsales campaigns list --org org_123 --workspace ws_123 --json
```

An empty list is fine. Exit code 3 or 403 means the key is wrong or lacks a scope: go back to step 2.

## Step 4: hand over

Tell the user setup is done and which organization and workspace are active. Go back to the `firstsales` skill for the real task.

## Switching accounts

Use one named profile per account or workspace. The user runs, in their own terminal:

```bash
read -rs FS_KEY && firstsales auth login --profile client-b --api-key "$FS_KEY"; unset FS_KEY
```

Then pass `--profile client-b` to commands for that account. `firstsales auth logout --profile client-b` removes it.
