# Render and QA

Use Node LTS, npm and optional FFmpeg/ffprobe. See README for setup. Render via local Remotion CLI.

Before the full render, inspect targeted stills for the opening action, each structural highlight, status/output cards, data-count comparisons, failure/recovery states and takeaway. Confirm that callouts point to their source, enlarged views have locators, host acting matches the beat, diagram counts match the narration, captions clear the platform UI and the focal object remains readable on a phone. Review a contact sheet after the final cut to catch repeated compositions and disconnected visuals.

When matching Rey's Claude-caption references, include at least three caption-heavy frames in the review: a one-line phrase, a two-line phrase, and a moment with a highlighted word over the densest mechanism scene. Compare the actual rendered MP4 frames, not only Remotion stills. Confirm white outlined words, yellow active word, no caption cards, natural phrase boundaries, safe vertical placement, and no important terminal text hidden under the caption. Re-render after any source edit made during an export; an in-progress render may have bundled the older source.

Run `scripts/qa.mjs` on the final MP4 with expected width, height and duration. It probes metadata and audio presence; it does not detect conceptual errors, malformed diagrams, flicker, caption alignment or weak acting. Do not claim full QA until human review. Paid voice or image generation is optional and requires approval. Respect current Remotion licensing terms.
