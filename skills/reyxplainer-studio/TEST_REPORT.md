# Verification history

## v0.2.2 validation (2026-11-23)

- Fresh initialization into `work/reyxplainer-studio-smoke-v022`: passed; local `npm install` added 298 packages and reported 0 vulnerabilities.
- Packaged and initialized Node tests: 7/7 passed. The new test verifies exact hand-cut phrase text and ordered word timing.
- TypeScript check (`npx tsc --noEmit`) in the fresh project: passed.
- The new caption script processed the ROP pilot's 189 timed words plus its manual phrase file into 46 cues and a matching SRT: passed without token mismatch.
- Rendered and visually inspected a 1080×1920 starter-template frame with a highlighted word. White text, black outline and yellow highlight rendered without word boxes. The first smoke frame exposed overlap with the buffer legend; the template was corrected by lifting lesson content and suppressing the duplicate scene description while timed captions are present. The second frame was inspected and the legend/caption no longer collide.
- A full 45-second render of the refreshed starter template was not run; the actual 64-second ROP episode was rendered and QA-checked in its own project before this reusable skill update.

## v0.1 baseline

- Node 22.16.0; npm 10.9.2.
- Bootstrap into a new directory: passed.
- Node test suite: 6/6 passed (duration, invalid scene timing/duplicate IDs, safe input bounds, caption bounds, caption grouping, overlapping words).
- Example JSON validator: passed; 45 seconds at 30 fps.
- npm registry probe: failed with EAI_AGAIN (DNS/network unavailable).
- Remotion dependency installation, TypeScript build, browser preview and video render: not verified. No MP4 included. Run these locally before treating the renderer as production-ready.
- Voiceover: not included. Caption grouping requires actual supplied word timings.
- QA script checks metadata only; no creative or visual validation has been run.

## v0.2.0 template verification (2026-11-21)

- Fresh initialization into `work/reyxplainer-studio-check`: passed; destination contained the upgraded template and generator.
- Local dependency installation: passed; 299 packages audited, 0 vulnerabilities reported.
- Automated tests: 6/6 passed.
- TypeScript check (`npx tsc --noEmit`): passed.
- Episode validator: passed; bundled example is 45 seconds.
- Audio generator: passed; created stereo 48 kHz music and SFX stems. `ffprobe` confirmed each is 45 seconds.
- Template inspection confirmed Poppins 700/800, uppercase subtitle styling, and optional voiceover/music/SFX props.
- A full Remotion render of the v0.2 starter template was not part of this verification. The creator's separate, finished pilot has its own render and QA evidence in the project outputs.
