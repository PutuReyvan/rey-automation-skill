import React from 'react';
import '@fontsource/poppins/latin-700.css';
import '@fontsource/poppins/latin-800.css';
import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {MemoryGrid} from './MemoryGrid';

type WordCue = {start: number; end: number; word: string};
type CaptionCue = {start: number; end: number; text: string; words?: WordCue[]};
export type Scene = {
  id: string;
  frames: number;
  title: string;
  caption: string;
  code: string;
  input: string;
  mode: 'intro' | 'safe' | 'overflow' | 'defense' | 'recap';
  narration?: string;
  revealAt?: number[];
};
export type Episode = {
  title: string;
  fps: number;
  width: number;
  height: number;
  scenes: Scene[];
  audio?: string;
  backgroundMusic?: string;
  soundEffects?: string;
  captions?: CaptionCue[];
};

const Beat = ({
  scene: s,
  index,
  total,
  startSeconds,
}: {
  scene: Scene;
  index: number;
  total: number;
  startSeconds: number;
}) => {
  const f = useCurrentFrame();
  const {width, height, fps} = useVideoConfig();
  const scale = Math.min(width / 1080, height / 1920);
  const landscape = width > height;
  const t = startSeconds + f / fps;
  const written = s.revealAt
    ? Math.min(s.revealAt.filter((second) => t >= second).length, s.input.length + 1)
    : ['safe', 'overflow'].includes(s.mode)
      ? Math.min(s.input.length + 1, Math.max(0, Math.floor((f - fps * 0.65) / (fps * 0.35)) + 1))
      : 0;
  const bad = written > 4;
  const status =
    s.mode === 'defense'
      ? ''
      : bad
        ? `${written - 4} byte(s) beyond boundary`
        : s.mode === 'safe' && written === 4
          ? 'Fits exactly'
          : s.mode === 'overflow'
            ? 'Unchecked copy (conceptual)'
            : '';
  const opacity = interpolate(f, [0, 8], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill
      style={{background: '#0d1725', color: '#f2f5f8', fontFamily: 'Arial,sans-serif'}}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 20% 20%,#203447 0%,transparent 65%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: landscape ? 1600 : 900,
          left: '50%',
          top: '50%',
          transform: `translate(-50%,-50%) scale(${landscape ? width / 1920 : scale})`,
          display: 'flex',
          flexDirection: 'column',
          gap: landscape ? 28 : 64,
          opacity,
        }}
      >
        <div style={{fontSize: 24, letterSpacing: 5, color: '#69ddbd', fontWeight: 700}}>
          REYXPLAINER / {String(index + 1).padStart(2, '0')} OF {total}
        </div>
        <div style={{fontSize: landscape ? 72 : 80, fontWeight: 800, lineHeight: 1.03}}>
          {s.title}
        </div>
        {s.code && (
          <div
            style={{
              background: '#142638',
              padding: 24,
              border: '1px solid #40556a',
              borderRadius: 16,
              fontFamily: 'monospace',
              fontSize: 36,
            }}
          >
            {s.code}
          </div>
        )}
        {s.mode !== 'recap' && (
          <>
            <div style={{fontSize: 32, color: '#a6b5c6', fontFamily: 'monospace'}}>
              {s.input ? `Input: "${s.input}"` : 'Capacity: 4 bytes'}
            </div>
            <MemoryGrid input={s.input} written={written} defense={s.mode === 'defense'} />
            {status && (
              <div style={{fontSize: 32, fontWeight: 700, color: bad ? '#fa857d' : '#69ddbd'}}>
                {status}
              </div>
            )}
          </>
        )}
        {s.caption && (
          <div
            style={{
              borderTop: '2px solid #40556a',
              paddingTop: 30,
              fontSize: landscape ? 42 : 48,
              lineHeight: 1.22,
            }}
          >
            {s.caption}
          </div>
        )}
        {s.mode === 'overflow' && (
          <div style={{fontSize: 24, color: '#a6b5c6'}}>
            Illustrative memory, not guaranteed C behavior.
          </div>
        )}
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: height * 0.08,
          left: width * 0.083,
          width: width * 0.834,
          height: 8,
          background: '#314355',
          borderRadius: 8,
        }}
      >
        <div
          style={{
            width: `${((index + f / s.frames) / total) * 100}%`,
            height: 8,
            background: '#69ddbd',
            borderRadius: 8,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

export const Explainer: React.FC<Episode> = (p) => {
  const f = useCurrentFrame();
  const t = f / p.fps;
  let offset = 0;
  const active = p.captions?.find((caption) => t >= caption.start && t < caption.end);
  const activeWord = active?.words?.findIndex((word) => t >= word.start && t < word.end) ?? -1;

  return (
    <AbsoluteFill>
      {p.scenes.map((scene, index) => {
        const from = offset;
        offset += scene.frames;
        return (
          <Sequence key={scene.id} from={from} durationInFrames={scene.frames}>
            <Beat
              scene={scene}
              index={index}
              total={p.scenes.length}
              startSeconds={from / p.fps}
            />
          </Sequence>
        );
      })}
      {p.audio && <Audio src={staticFile(p.audio)} volume={1} />}
      {p.backgroundMusic && <Audio src={staticFile(p.backgroundMusic)} volume={0.85} />}
      {p.soundEffects && <Audio src={staticFile(p.soundEffects)} volume={0.75} />}
      {active && (
        <div
          style={{
            position: 'absolute',
            bottom: '26%',
            left: '8%',
            right: '8%',
            textAlign: 'center',
            fontSize: Math.round(p.width * 0.048),
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 700,
            textTransform: 'uppercase',
            background: '#0d1725',
            color: 'white',
            padding: 14,
            borderRadius: 8,
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0 .28em',
            lineHeight: 1.3,
          }}
        >
          {active.words?.length
            ? active.words.map((word, index) => (
                <span
                  key={`${word.start}-${index}`}
                  style={{
                    color: index === activeWord ? '#0d1725' : '#f2f5f8',
                    background: index === activeWord ? '#69ddbd' : 'transparent',
                    fontWeight: index === activeWord ? 800 : 700,
                    padding: '0 0.12em',
                    borderRadius: 6,
                    boxShadow: index === activeWord ? '0 0 18px #69ddbd55' : 'none',
                  }}
                >
                  {word.word}
                </span>
              ))
            : active.text}
        </div>
      )}
    </AbsoluteFill>
  );
};
