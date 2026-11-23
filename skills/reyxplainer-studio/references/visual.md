# Visual language

Follow creator-supplied references and explicit feedback. Inspect available reference videos before committing to a look, and treat any style that has not yet been reviewed as provisional. Build original diagrams and animation rather than copying another creator's frames.

## Desktop and terminal explainers

For an episode Rey requests as a desktop or terminal simulation, treat the desktop as a setting with actions, not a decorative wallpaper behind generic cards. The ROP pixel pilot established this sequence: show a legible OS wallpaper and icons; move the cursor to Terminal and open it; type a command; then keep the terminal as the continuing workspace while the lesson progresses through a normal trace, the changed state, program code, a step-by-step chain, defenses and a recap. A Linux or Windows-inspired original interface can work. Show what the narrator is describing inside the terminal at that moment.

- Keep a coherent workspace across beats so the viewer understands where each result came from. Change commands, output layout, zoom and pointer position when the state changes. A static terminal with swapped headline text is not enough.
- Make the causal loop visible: command/input → current stack or program state → changed address → the next instruction or result. If a pointer moves, its highlight must agree with the highlighted destination.
- Show addresses, gadgets and memory layouts as conceptual unless the project actually runs a test binary. Do not imply that arbitrary illustrative addresses or a particular overflow layout are universal.
- Preserve room for the raised captions. If they cover a terminal footer, move or remove the footer rather than shrinking the captions back into tiny boxes.

## Rey's reference direction

- **Explanation grammar:** follow the TikTok reference's clear, sequential build/deconstruction. Establish the whole mechanism, then isolate one part or state at a time; show what changes and why before moving on. Narration phrases should trigger visible state changes, not just camera movement.
- **3D craft:** use the TikTok reference as a target for attractive, readable 3D explanatory objects and step-by-step assembly/reveal. Keep 3D purposeful; don't add elaborate environments or characters where a simpler scene teaches better.
- **Art simplicity:** follow the Instagram reference's restraint: sparse frames, clean shapes, strong negative space, limited palette and uncluttered linework. A warm paper background and dark isometric line art are useful options, not a requirement to copy its exact scene.
- **Hybrid:** combine the TikTok breakdown and 3D assets with the Instagram visual simplicity. One primary object/state per beat; auxiliary labels only when they explain a relationship.
- **Characters:** optional unless the creator requests a presenter-led format. When the lesson benefits from a character, consult the user-provided `inkbeat-shorts` skill at `../inkbeat-shorts/` (`references/characters.md`, `references/look-and-ink.md`, `references/camera-and-editing.md`, `references/shorts.md`) for its toon 3D family and acting. Preserve its MIT license and third-party notices when reusing code or bundled fonts. Keep character designs and staging simple, and do not let them obscure the mechanism.

## Presenter-led visual grammar

When Rey asks for the person to explain throughout the video, the presenter remains part of every scene. Do not park the host beside a prop with a neutral face.

- Give the host a scene-specific job: point, compare, recoil, trace a path, hold a prop, operate the camera, reveal a panel or react to the result.
- Change mouth state while measured words are active, and add independent blinks, head turns, body bobs, arm gestures and expression changes. This is word-driven acting, not phoneme-accurate lip sync unless real viseme data exists.
- Reposition or rescale the host instead of removing them when a diagram needs room. Use a deliberate picture-in-picture or over-the-shoulder setup when useful.
- The opening must contain an immediate action or reaction tied to the hook. A motionless host waiting beside an unexplained object is a failed opening.

## Semantic anchoring and diagram truth

Every visible object or text should answer at least one question: what is it, where did it come from, or what changed?

- A status card names its source and outcome, for example `CAMERA RESULT — QR NOT FOUND`, plus a visible reason when the narration gives one.
- A decoded value names its type, for example `DECODED MESSAGE`, rather than presenting a bare URL. A message or backup label uses a connector to the exact blocks it describes.
- A magnified, exploded or detached view needs a source locator, crop box or connector. Never overlap two views without explaining their relationship.
- A highlight must sit on the real structure. For a QR explanation, scan or highlight modules on the intact code; show the three actual 7×7 finder patterns at their true positions and comparable scale. Do not use an arbitrary detached grid or a giant substitute corner that changes the geometry.
- Counts, colors, legends and narration must agree. If the voice says eight message blocks and four backup blocks, the diagram must show exactly that distribution. Treat this as correctness, not styling.
- Remove decorative circles, dots, labels and shapes that have no explanatory role.

## Scene variety: explicit post-pilot requirement

Rey's review of the QR 3D pilot identified a clear failure: one QR board stayed in nearly the same centered composition throughout the video. Small camera motion and changing module colors/highlights made it feel like a static 3D object, rather than a sequence that opens up and explains the mechanism. Do not repeat that approach.

- Plan the video as a shot list before building animation. For a 60–90 second explainer, start with at least six clearly different scene setups, then add beats when the mechanism needs them.
- A new beat should change the actual visual staging: scale or angle, setting, prop arrangement, visual mode, or action. Useful modes include contextual use, a clean full-object view, macro close-up, exploded/deconstructed parts, a spatial/data-flow diagram, and a consequence or recovery scene.
- Reuse the same mechanism across scenes only when the view or action reveals a new relationship. A new color, label, status badge, or slight camera orbit alone does not make a new scene.
- Let narration trigger the visual change. Isolate and inspect one part at a time, then show how it connects back to the whole. Use transitions, cuts, and camera moves to make the breakdown feel deliberate.
- Preserve simple art direction and one focal event at a time; variety means distinct staging, not adding clutter or unrelated decoration.
- Before the full render, inspect a storyboard/contact sheet at thumbnail size. Adjacent beats should not read as the same picture with a different highlight. If they do, change the framing, environment, visual mode, or action.
- For this QR regeneration, Rey requested a person/character in every scene as the explainer. Use the Inkbeat toon 3D family for a recurring host who grounds the scan in a relatable situation and reacts to failure/recovery. Change expression, gesture and placement to suit the beat; preserve their presence by reframing rather than dropping them from diagram scenes.

Rey's additional Instagram reference: [ton_map reel Df-K0-xxhCZ](https://www.instagram.com/reel/Df-K0-xxhCZ/?bqrl=OHk5eDE5emNtYmZk). The accessible portion showed an in-context close view of a phone held in a hand, with a phone-screen story visual and large captions. Use the reference as support for changing the scene setup with the explanation beat; do not copy its artwork.

These are style references and user preferences; don't copy the referenced creators' exact designs or scenes. Resolve any conflict in favor of Rey's direct instruction.

For Rey's current subtitle treatment, visually match the four Claude-rendered examples he supplied in `01_SLOP_REELS/Vid`: heavy ALL-CAPS white text, thick black stroke/shadow, a yellow active word that advances with speech, and no rectangles behind individual words or behind the phrase. On the reviewed 1080×1920 frames, the two-line block sat roughly in the y=1240–1450 band; make a phone-size check instead of relying on a single CSS percentage. Use Poppins ExtraBold or a face that actually matches the reference. Hand-cut phrases by meaning, often three to six words, and keep the approved script wording and punctuation. A word-timing group of four words can cross a sentence and is not an editorial caption phrase. Move or remove nearby terminal labels that collide with the caption; keep the mechanism readable.

Keep one focal event at a time, hold meaningful states long enough to read, use labels and shapes alongside color, and calibrate cuts to comprehension. Preserve stable composition where it helps compare successive mechanism states. Use portrait 1080×1920 or landscape 1920×1080 unless the brief asks otherwise.

Preview targeted renderer stills for the opening acting, structural highlights, status/output cards, data-count comparisons, failure state, recovery state and key reveal. Then inspect the final contact sheet and whole render when practical. Save only reviewed, approved stills as future references. Never claim references exist until supplied or created and reviewed.
