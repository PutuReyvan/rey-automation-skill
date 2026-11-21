param(
  [string]$ProjectRoot = ".",
  [ValidateSet("claude", "codex")]
  [string]$Agent = "claude"
)

$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$sourceRoot = Join-Path $repoRoot "skills"
$manifest = Join-Path $repoRoot "skills.txt"
$resolvedProject = (Resolve-Path -LiteralPath $ProjectRoot).Path
$agentDirectory = if ($Agent -eq "claude") { ".claude" } else { ".agents" }
$targetRoot = Join-Path $resolvedProject "$agentDirectory\skills"

if (-not (Test-Path -LiteralPath $manifest -PathType Leaf)) {
  throw "Missing skill manifest: $manifest"
}

$skills = Get-Content -LiteralPath $manifest |
  ForEach-Object { $_.Trim() } |
  Where-Object { $_ -and -not $_.StartsWith("#") }

if ($skills.Count -eq 0) {
  throw "The skill manifest is empty."
}

New-Item -ItemType Directory -Force -Path $targetRoot | Out-Null

foreach ($skill in $skills) {
  $source = Join-Path $sourceRoot $skill
  $sourceEntry = Join-Path $source "SKILL.md"
  if (-not (Test-Path -LiteralPath $sourceEntry -PathType Leaf)) {
    throw "Repository is incomplete: $sourceEntry is missing."
  }

  $destination = Join-Path $targetRoot $skill
  New-Item -ItemType Directory -Force -Path $destination | Out-Null
  Get-ChildItem -LiteralPath $source -Force |
    Copy-Item -Destination $destination -Recurse -Force

  $installedEntry = Join-Path $destination "SKILL.md"
  if (-not (Test-Path -LiteralPath $installedEntry -PathType Leaf)) {
    throw "Installation verification failed: $installedEntry is missing."
  }

  Write-Output "Installed $skill -> $destination"
}

Write-Output "Verified $($skills.Count) skills for $Agent. Start a fresh agent session to reload them."

