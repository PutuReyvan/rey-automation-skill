---
name: rey-absurd-shorts
description: Create 60–90 second absurd fictional vertical story videos in Remotion with an original blocky toy-game 3D cast, escalating rules, active character acting, narration, all-caps word captions, music and sound effects. Use when Rey asks for absurd lore, cursed-town rules, monster comedy, Roblox-like character energy, or short fictional story videos rather than factual explainers.
---

# Rey Absurd Shorts v0.1

Create fast, original 9:16 story videos that feel like someone is explaining impossible local lore with complete seriousness. Speak Indonesian to Rey; write the deliverable in the requested language. Do not use paid APIs or copy proprietary game characters, maps, logos, sounds or UI.

## Workflow

1. **Lock the premise:** reduce the idea to one memorable rule, one consequence and one protagonist. Example shape: `In this town, people must [absurd behavior], or [monster/consequence] wakes up.` Treat user examples as creative direction, not text to copy automatically.
2. **Write the escalation:** read `references/story.md`. For a 90-second episode, target roughly 220–240 spoken words and 10–14 materially different scene setups. Build rule → normal life → attempted violation → warnings → consequence → chase/reversal → punchline.
3. **Design the cast and world:** read `references/visual.md`. Use original blocky toy-game 3D proportions and a small reusable cast. Give every recurring person a silhouette, color role, personality and acting pattern. Never claim official Roblox affiliation.
4. **Storyboard before coding:** every narration beat must cause a visible action, location change, reveal or reaction. A different caption, color or camera orbit does not count as a new scene. Keep geography coherent enough that viewers understand who is where and what changed.
5. **Build in Remotion:** reuse the sibling `reyxplainer-studio` initializer and its caption/audio pipeline when available, then replace the educational scene system with episode-specific story scenes. Keep characters active with walk cycles, head turns, blinks, gestures, expressions and measured word-driven mouth motion. Do not describe word-driven mouth animation as phoneme-accurate lip sync.
6. **Sound and captions:** use ALL-CAPS Poppins ExtraBold word highlights above platform UI. Preserve supplied voiceover at natural speed. Add a restrained music bed, location ambience and event-timed effects; never mask narration.
7. **Review and deliver:** inspect a storyboard/contact sheet, targeted stills and the full video. Check that the hook moves immediately, the rule is understandable without captions, the monster has a staged reveal, shots vary, the ending lands and nothing looks like random decoration. Run the technical QA from `reyxplainer-studio`, then report paths and limitations honestly.

## Creative invariants

- Start motion in the first second. No host standing blankly beside an unexplained object.
- Use one clear absurd rule. Escalate its consequences instead of adding unrelated lore.
- The protagonist must make choices and physically affect the scene.
- Keep the recurring cast visible often enough to build attachment, but use inserts, monster POV, maps, environmental shots and close-ups for variety.
- Show cause and effect: rule broken → warning signs → monster response → human reaction.
- Make the monster readable as a silhouette before the full reveal. Comedy can come from contrast, timing and sincere narration—not visual clutter.
- Keep sexual, violent or otherwise sensitive ideas platform-appropriate for the requested audience. Suggest rather than depict explicit activity unless the user explicitly requests mature content and it is allowed.
- Keep all characters, assets and environments original. “Roblox-like” means readable blocky proportions and playful game-world staging, not copied IP.

## Resources

- Read [references/story.md](references/story.md) for the 60–90 second story engine.
- Read [references/visual.md](references/visual.md) for blocky 3D direction, acting, shot variety and mobile framing.
- Use the sibling [reyxplainer-studio](../reyxplainer-studio/SKILL.md) for initialization, timing, audio, render and QA mechanics.
- Consult sibling `inkbeat-shorts` only for general acting/camera principles; preserve its bundled license notices if code or assets are reused.

