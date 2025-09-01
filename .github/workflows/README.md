Keep Supabase Alive workflow
===========================

This repository contains a GitHub Actions workflow that periodically pings your Supabase project's health endpoint to keep the project active.

Workflow file:

- `.github/workflows/keep-supabase-alive.yml`

Required repository secrets
---------------------------

You must add the following repository secrets (Actions → Secrets and variables → Actions):

- `SUPABASE_URL` — your Supabase project URL, e.g. `https://buqkvkzderfmhsqxgkeb.supabase.co`
- `SUPABASE_ANON_KEY` — your Supabase anon/public key (same as `NEXT_PUBLIC_SUPABASE_ANON_KEY` locally)

Quick manual steps (GitHub UI)
-----------------------------
1. Open your GitHub repository page.
2. Settings → Secrets and variables → Actions → New repository secret.
3. Add `SUPABASE_URL` and `SUPABASE_ANON_KEY` with values from your local `.env.local`.

Optional: automate with GitHub CLI
----------------------------------
If you have the GitHub CLI (`gh`) installed and authenticated, you can run the helper script at the repo root to set secrets automatically from your local `.env.local` file:

PowerShell (Windows) — run in repository root:

pwsh ./scripts/set-github-secrets.ps1

Notes
-----
- The workflow only uses repository secrets; no keys are committed to the repo.
- If secrets are missing, the workflow will fail early with a helpful message visible on the Actions run page.
- If you accidentally pushed keys to the repo in the past, rotate them in Supabase immediately.
