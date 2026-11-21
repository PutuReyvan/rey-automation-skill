# Reyxplainer Studio v0.2.1

Successor skill for original, visual-first programming, cybersecurity and computer-science explainers made with Remotion. This project-scoped version preserves the complete v0.1 resource tree and adds word-synced caption styling, optional voice/music/SFX tracks, an original local audio-bed generator, presenter-led acting rules and stricter semantic/diagram QA. The previous `.agents/skills/reyxplainer/` remains available unchanged.

## Initialize a project

From the project root in PowerShell:

```powershell
node .agents/skills/reyxplainer-studio/scripts/init.mjs reyxplainer-video-next
cd reyxplainer-video-next
npm install
npm test
npx tsc --noEmit
npm run studio
```

Preview, then render after the script and visual direction are approved:

```powershell
npm run render
node scripts/qa.mjs out/pilot.mp4 1080 1920 45
```

The initializer refuses to overwrite an existing destination. Node LTS, npm network access, and FFmpeg/ffprobe for metadata QA are recommended. Remotion may download its browser at first render. Use only local project dependencies. Check applicable Remotion licensing before commercial distribution.

## Voiceover and subtitles

Copy the approved voice track into `public/`, then set `audio` to its relative filename in `src/episode.json`. Supply reviewed word-level timings as `captions[].words`, where every word has `word`, `start`, and `end` in seconds. The template renders Poppins 700/800 captions in ALL CAPS and highlights the active word; the `.srt` must be generated from the same timing source. Do not estimate word timing and present it as measured alignment.

## Music and sound effects

Run the generator in a local Python virtual environment after initialization:

```powershell
py -m venv .venv
.venv\Scripts\python.exe -m pip install numpy scipy
.venv\Scripts\python.exe scripts/generate-audio-bed.py
```

It creates original 45-second `public/music-bed.wav` and `public/sfx-track.wav` stems. Set `backgroundMusic` and/or `soundEffects` in the episode JSON to include them. The track gains in the template are starting points, not mastering guarantees; listen and adjust beneath the narrator. For a different duration, update the generator's `DURATION` and verify its output. Use externally sourced audio only with suitable licensing.

## Adapt the visuals

Use creator-supplied references and approved stills. The project also includes the user-provided `inkbeat-shorts` skill under `.agents/skills/inkbeat-shorts/`; consult its character family and look/camera references when a cartoon cast is wanted. Keep its `LICENSE`, `THIRD_PARTY_NOTICES.md` and bundled font license with any reused code/assets. Keep the current animation provisional until its direction has been discussed. For a new mechanism, implement purpose-built components rather than forcing every lesson into the buffer grid. The bundled buffer-overflow diagram is conceptual, not a guaranteed process-memory trace.

See `TEST_REPORT.md` for the original v0.1 baseline and this version's verification notes. See `CHANGELOG.md` for upgrades. For fictional absurd narrative shorts, use the sibling `rey-absurd-shorts` skill so its story rules do not weaken the explainer accuracy gates.
