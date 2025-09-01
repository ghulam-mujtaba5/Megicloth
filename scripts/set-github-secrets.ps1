<#
Reads .env.local in the repository root and sets two GitHub Actions repository secrets
using the GitHub CLI (`gh`).

Requirements:
- GitHub CLI (`gh`) installed and authenticated (`gh auth login`).
- Run this script from the repository root.

Usage:
pwsh ./scripts/set-github-secrets.ps1
#>

$envFile = Join-Path $PSScriptRoot '..' '.env.local' | Resolve-Path -ErrorAction SilentlyContinue
if (-not $envFile) {
    Write-Error ".env.local not found in repository root. Create the file with SUPABASE values and retry."
    exit 1
}

$lines = Get-Content $envFile
$map = @{}
foreach ($line in $lines) {
    if ($line -match '^\s*#') { continue }
    if ($line -match '^\s*$') { continue }
    $parts = $line -split '=', 2
    if ($parts.Count -ne 2) { continue }
    $key = $parts[0].Trim()
    $val = $parts[1].Trim()
    $map[$key] = $val
}

if (-not $map.ContainsKey('NEXT_PUBLIC_SUPABASE_URL')) {
    Write-Error "NEXT_PUBLIC_SUPABASE_URL not found in .env.local"
    exit 1
}
if (-not $map.ContainsKey('NEXT_PUBLIC_SUPABASE_ANON_KEY')) {
    Write-Error "NEXT_PUBLIC_SUPABASE_ANON_KEY not found in .env.local"
    exit 1
}

Write-Host "Setting repository secrets using gh (requires gh auth)."
Write-Host "Repository: will use current repository context from gh if available."

$supabaseUrl = $map['NEXT_PUBLIC_SUPABASE_URL']
$supabaseAnon = $map['NEXT_PUBLIC_SUPABASE_ANON_KEY']

Write-Host "Setting SUPABASE_URL..."
gh secret set SUPABASE_URL --body $supabaseUrl
if ($LASTEXITCODE -ne 0) { Write-Error "Failed to set SUPABASE_URL"; exit 1 }

Write-Host "Setting SUPABASE_ANON_KEY..."
gh secret set SUPABASE_ANON_KEY --body $supabaseAnon
if ($LASTEXITCODE -ne 0) { Write-Error "Failed to set SUPABASE_ANON_KEY"; exit 1 }

Write-Host "Secrets set. Verify in GitHub → Settings → Secrets and variables → Actions."
