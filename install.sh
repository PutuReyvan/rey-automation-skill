#!/usr/bin/env bash
set -euo pipefail

project_root="${1:-.}"
agent="${2:-claude}"
repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source_root="$repo_root/skills"
manifest="$repo_root/skills.txt"

case "$agent" in
  claude) agent_directory=".claude" ;;
  codex) agent_directory=".agents" ;;
  *) echo "Agent must be 'claude' or 'codex'." >&2; exit 1 ;;
esac

if [[ ! -f "$manifest" ]]; then
  echo "Missing skill manifest: $manifest" >&2
  exit 1
fi

target_root="$project_root/$agent_directory/skills"
mkdir -p "$target_root"
installed=0

while IFS= read -r raw_skill || [[ -n "$raw_skill" ]]; do
  skill="${raw_skill//$'\r'/}"
  [[ -z "$skill" || "$skill" == \#* ]] && continue

  source="$source_root/$skill"
  if [[ ! -f "$source/SKILL.md" ]]; then
    echo "Repository is incomplete: $source/SKILL.md is missing." >&2
    exit 1
  fi

  destination="$target_root/$skill"
  mkdir -p "$destination"
  cp -R "$source"/. "$destination"/

  if [[ ! -f "$destination/SKILL.md" ]]; then
    echo "Installation verification failed: $destination/SKILL.md is missing." >&2
    exit 1
  fi

  echo "Installed $skill -> $destination"
  installed=$((installed + 1))
done < "$manifest"

echo "Verified $installed skills for $agent. Start a fresh agent session to reload them."

