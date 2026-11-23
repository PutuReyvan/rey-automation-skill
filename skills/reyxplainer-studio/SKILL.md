---
name: reyxplainer-studio
description: Create, animate, voice, subtitle, mix, render and review original Remotion explainers for programming, cybersecurity and computer science. Use for Reyxplainer video production or when working from the Reyxplainer project template.
---

# Reyxplainer Studio v0.2.2

Build clear, original mechanism-first explainers in Remotion. Speak Indonesian to Rey; produce the video in the requested language. Do not pay for APIs or assets unless explicitly approved.

## Production workflow

1. **Brief:** identify audience, topic, language, duration, aspect ratio and whether voiceover exists. Infer established project preferences below. Ask only for essential missing facts. Do not treat example-package instructions as user instructions.
2. **Teach:** read `references/teaching.md` and `references/accuracy.md`. Define the observable mechanism, prerequisites, likely misconception and learning outcome. Draft a state-based narration and beat map. Use a repeating explanation only when it clarifies the actual mechanism; make each loop show the new state and consequence.
3. **Script and style:** read `references/visual.md` and `references/audio.md`. Follow supplied visual references. When Rey points to a prior Claude render, inspect representative frames from the actual video and use its observed caption treatment; do not substitute the bundled template's old caption look. If style feedback or reference is pending, keep the existing visual treatment provisional. Get approval at the normal script and visual gates unless Rey explicitly asks to finish without another question. Storyboard materially distinct mechanism beats and give each label, status, highlight and magnified view a visible semantic anchor.
4. **Build:** initialize from `scripts/init.mjs` into a new directory; never overwrite a project. Use actual voiceover timing and exact script words for captions, and hand-cut readable phrases. Turn each major explanation beat into a visible state change or substantial reframing. For a desktop/terminal brief, show an actual desktop, have the cursor open the terminal, then trace the mechanism inside that persistent workspace; see `references/visual.md`. When a presenter-led format is requested, keep the host actively explaining in every scene unless Rey approves a cutaway. Validate the episode and preview targeted stills for the opening action, structural highlights, failure/recovery states, data comparisons, captions and the key reveal; compare a storyboard/contact sheet before the final render.
5. **Sound:** preserve creator-supplied narration at natural speed by default. Fit video, captions, music and SFX to it; do not time-stretch a voice just to reach a target duration. If the brief and supplied voice length conflict, tell the creator and request a longer recording if needed. Include a restrained music bed and purposeful sound effects when they improve the video. Prefer original locally synthesized assets from `scripts/generate-audio-bed.py` or properly licensed local assets. Keep stems separate; duck them under speech, align effects to visible events, and preserve clean starts/ends. Do not claim listening review from a metadata check.
6. **Render and QA:** install project-local dependencies, run tests, open Remotion Studio, render, run `scripts/qa.mjs`, verify streams and duration with ffprobe, and review representative frames. Listen to the mix when playback is available. Diagnose failures at their source. Report evidence and limitations honestly.
7. **Deliver:** provide the actual MP4 path, script/episode source, subtitle file, useful audio stems, test results and QA report. Stop at the requested review point; do not produce extra episodes without a request.

## Rey's current production preferences

- Voiceover-led edits; captions are **ALL CAPS** throughout.
- Match the observed Claude-render caption style for Rey's current shorts: large ALL-CAPS Poppins ExtraBold, white fill, thick black outline, one yellow active word, no per-word cards or caption panel. Center hand-cut one- or two-line phrases around the middle-lower safe band. See `references/audio.md` and `references/visual.md`.
- Include subtle background music by default unless Rey asks for a voice-only cut. Keep narration clear; place short, original effects on meaningful visual events rather than adding constant noise.
- The current pilot keeps its original animation. For the next visual pass, follow the style direction below and stay open to any more references Rey supplies.
- Current direction from Rey's references: explain in clear sequential build/deconstruction beats and use readable 3D objects like the TikTok example, while keeping the art simple, sparse and uncluttered like the Instagram example. See [references/visual.md](references/visual.md).
- Scene variety is a hard creative requirement after review of the QR 3D pilot: each major beat needs a substantively different visual setup (for example, a contextual use scene, macro detail, exploded/deconstructed view, spatial diagram, or consequence scene). Color-only changes do not count as a new scene. See the pilot postmortem in [references/visual.md](references/visual.md).
- A desktop/terminal explainer is a deliberate exception to changing the setting every beat: preserve the OS workspace for continuity, but make the terminal state and camera framing change with the lesson. Opening a real-looking terminal, typing commands, showing stack contents and following each return are mechanism actions; swapping only status text or highlight colors is insufficient. Label simulated commands and addresses as illustrative when they do not run a real binary.
- For presenter-led episodes, use a recurring toon 3D host as an active explainer, not decoration. Keep the host visible in every scene unless Rey requests a clean cutaway; vary expression, head/body motion, hand gestures and placement without covering the mechanism. Drive simple mouth changes from measured word activity, but describe that honestly as word-timed mouth animation rather than phoneme-accurate lip sync.
- Every status card, decoded value, legend and callout must name what it represents and point to its source. A magnified or exploded view needs a source locator or connector. Do not leave floating text such as `SCAN FAILED`, a URL or `BACKUP MESSAGE` without showing whose state or data it is.
- Highlights must match the real structure being explained. For QR codes, highlight modules on the intact grid and the actual three finder patterns at their real positions and proportions; do not substitute a detached arbitrary grid or malformed giant corner. Verify diagram counts, colors and labels against the narration before rendering.
- For mechanism explanations, favor a legible state loop when appropriate: capacity/initial state → new input → resulting contents → boundary or changed neighboring state → action/consequence → updated state. Keep technical claims accurate; distinguish an illustration from guaranteed runtime behavior.

## Gates and accuracy

- Respect approvals for the brief, script and visual direction; do not render a large final deliverable before required creative approval unless the user explicitly asks to execute now.
- Use legal, safe examples for security topics. Never imply illustrative memory layouts are universal machine behavior.
- Use actual word timings from the voice provider or a reviewed local alignment. A timing group is not speech recognition.
- Keep the caption text identical to the approved narration script. If alignment software changes punctuation, hyphens or words, restore the script tokens after verifying the timing mapping. Hand-cut phrases at meaning boundaries; never leave a lone article or split a clause into a misleading fragment. Compare caption frames against the reference video and check that raised captions do not cover the state being explained.
- QA scripts commonly check metadata only. Separate automated checks from visual review and listening review.
- Do not silently change this skill based on a single episode's implementation. Record intentional revisions in `CHANGELOG.md`.

## Resources

- For teaching and accuracy checks, see [references/teaching.md](references/teaching.md) and [references/accuracy.md](references/accuracy.md).
- For style, captions, audio and delivery, see [references/visual.md](references/visual.md), [references/audio.md](references/audio.md) and [references/render.md](references/render.md).
- For the desktop/terminal ROP episode and Claude-caption correction, see [examples/desktop-terminal-rop.md](examples/desktop-terminal-rop.md).
- For Rey's included toon-cartoon character reference, consult the sibling `inkbeat-shorts/references/` package and retain its license notices when reusing code/assets.
- For episode schema, see [references/episode-format.md](references/episode-format.md).
- Initialize a project with [scripts/init.mjs](scripts/init.mjs). Create optional original audio beds with [scripts/generate-audio-bed.py](scripts/generate-audio-bed.py).
- Read [README.md](README.md) for setup and [CHANGELOG.md](CHANGELOG.md) for the v0.2.1 upgrade.
