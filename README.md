# Rey Automation Skills

Reusable Claude Code and Codex skills for producing original vertical Remotion videos.

## Included skills

| Skill | Use it for |
|---|---|
| `reyxplainer-studio` v0.2.1 | Programming, cybersecurity and computer-science explainers with mechanism-first visuals, active presenters, word-synced captions, music, SFX, render and QA rules |
| `rey-absurd-shorts` v0.1 | 60–90 second fictional absurd stories with original blocky toy-game 3D characters, escalating world rules, monster comedy and fast scene variety |
| `inkbeat-shorts` | Shared toon-character, acting, camera and visual references used by the production skills |

The skills do not require paid APIs. Voice, image or asset services are optional and must be approved separately.

## Install for Claude Code

Run these commands from the project where Claude Code will make videos.

### PowerShell

```powershell
if (Test-Path .rey-automation-skill/.git) {
  git -C .rey-automation-skill pull --ff-only
} else {
  git clone https://github.com/PutuReyvan/rey-automation-skill.git .rey-automation-skill
}
powershell -ExecutionPolicy Bypass -File .rey-automation-skill/install.ps1 -ProjectRoot . -Agent claude
```

### macOS or Linux

```bash
if [ -d .rey-automation-skill/.git ]; then
  git -C .rey-automation-skill pull --ff-only
else
  git clone https://github.com/PutuReyvan/rey-automation-skill.git .rey-automation-skill
fi
bash .rey-automation-skill/install.sh . claude
```

The installer reads `skills.txt`, refuses an incomplete repository, copies every listed skill and verifies each installed `SKILL.md`. Start a new Claude Code session in that project so it reloads the skills.

## Install for Codex

Use the same installer with the Codex target:

```powershell
if (Test-Path .rey-automation-skill/.git) {
  git -C .rey-automation-skill pull --ff-only
} else {
  git clone https://github.com/PutuReyvan/rey-automation-skill.git .rey-automation-skill
}
powershell -ExecutionPolicy Bypass -File .rey-automation-skill/install.ps1 -ProjectRoot . -Agent codex
```

## Verify the repository

Run this from the cloned repository:

```powershell
node scripts/verify-skills.mjs
```

It fails unless all three skill directories, their `SKILL.md` entry points and their README listings agree. The same check runs automatically on every GitHub push and pull request.

## Try the absurd-story workflow

```text
Use rey-absurd-shorts to create a 90-second English 9:16 story.

Premise: In this town, everyone must keep performing a bizarre ritual or the monster under the street wakes up.

Use an original blocky toy-game 3D cast, a completely serious documentary voice, 10–14 materially different scene setups, ALL-CAPS word-highlight captions, background music and event-timed sound effects. Give me the narration and storyboard first. Do not render until I approve them.
```

“Roblox-like” is treated as broad inspiration for blocky proportions and playful game-world staging. The skill requires original characters, environments, sounds and UI rather than copied Roblox IP.

## Try the explainer workflow

```text
Use reyxplainer-studio to make a 75-second English 9:16 explainer about how QR error correction works. Give me a consequence-first hook, narration and shot-by-shot storyboard before rendering. Keep the presenter active in every scene and make every highlight point to the real QR structure.
```

## Prerequisites

- Node.js LTS and npm
- FFmpeg and ffprobe for media inspection and technical QA
- Python only when generating the included local music/SFX bed
- A local Remotion-compatible browser, which Remotion can download on first render

To initialize an explainer project after installation:

```powershell
node .claude/skills/reyxplainer-studio/scripts/init.mjs my-video
cd my-video
npm install
npm test
npx tsc --noEmit
npm run studio
```

The initializer refuses to overwrite an existing destination. Check current Remotion licensing terms before commercial distribution.

## Production rules worth keeping

- Preserve supplied narration at natural speed; fit the edit to the voice instead of stretching it.
- Use Poppins ExtraBold ALL-CAPS captions with active-word highlighting above platform UI.
- A new color or label is not a new scene. Change location, framing, action, visual mode or revealed relationship.
- Treat presenters as actors, not decoration. Use expressions, gestures, head/body motion and honest word-driven mouth animation.
- Connect labels, statuses, enlarged views and data blocks to their source. Verify diagram geometry and counts against the narration.
- Inspect targeted stills, a contact sheet, the complete video and the audio mix before claiming success.

## Repository layout

```text
skills/
  reyxplainer-studio/
  rey-absurd-shorts/
  inkbeat-shorts/
```

`inkbeat-shorts` retains its bundled `LICENSE` and `THIRD_PARTY_NOTICES.md`. Keep those files when reusing its code, fonts or assets.

