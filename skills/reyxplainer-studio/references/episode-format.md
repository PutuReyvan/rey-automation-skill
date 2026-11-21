# Episode format v0.2

Episode JSON is passed as Remotion composition props. Required fields: `title`, integer `fps`, `width`, `height`, and `scenes`. A scene requires `id`, positive integer `frames`, `title`, `caption`, `code`, `input`, and `mode` (`intro`, `safe`, `overflow`, `defense`, `recap`); `narration` and `revealAt` are optional.

Optional media props refer to files relative to `public/`:

- `audio`: narration/voiceover track.
- `backgroundMusic`: backing-music stem.
- `soundEffects`: effects stem.
- `captions`: an array of non-overlapping `{start,end,text,words?}` cues in seconds.
- `captions[].words`: `{word,start,end}` entries measured against the supplied speech.

Scene frames are contiguous in array order; total duration is `sum(frames) / fps`. Captions use uppercase display styling; keep punctuation and source transcript intact in JSON and SRT. The included validator may cover only some optional fields; add relevant validation when extending the schema. The bundled memory grid only demonstrates its buffer-overflow example; other technical topics need purpose-built visual components and accurate domain-specific explanations.
