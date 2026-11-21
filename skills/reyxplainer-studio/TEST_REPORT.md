# V0.1 verification
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
