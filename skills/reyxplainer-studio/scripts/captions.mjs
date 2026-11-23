import fs from 'node:fs';
import {pathToFileURL} from 'node:url';

const tokens = (text) => text.match(/[A-Za-z0-9]+(?:[-'][A-Za-z0-9]+)*[.,!?;:]?/g) ?? [];
const normal = (text) => text.toLowerCase().replace(/[^a-z0-9]/g, '');

function checkWords(words) {
  if (!Array.isArray(words)) throw Error('Expected word array');
  let previousEnd = 0;
  for (const word of words) {
    if (!word || typeof word.word !== 'string' || !word.word.trim() ||
      !Number.isFinite(word.start) || !Number.isFinite(word.end) ||
      word.start < previousEnd || word.end <= word.start) {
      throw Error('Invalid word timing');
    }
    previousEnd = word.end;
  }
}

const cue = (timed, exact) => {
  const aligned = timed.map((word, index) => ({
    word: exact?.[index] ?? word.word,
    start: word.start,
    end: word.end,
  }));
  return {
    start: aligned[0].start,
    end: aligned.at(-1).end,
    text: aligned.map((word) => word.word).join(' '),
    words: aligned,
  };
};

/** Make caption cues from measured words. Supply phrase lines for an editorial cut. */
export function group(words, phraseLines) {
  checkWords(words);
  if (!words.length) return [];

  if (phraseLines !== undefined) {
    const lines = Array.isArray(phraseLines) ? phraseLines : String(phraseLines).split(/\r?\n/);
    const phrases = lines.map(tokens).filter((line) => line.length);
    const exact = phrases.flat();
    if (exact.length !== words.length || exact.some((word, index) => normal(word) !== normal(words[index].word))) {
      throw Error('Caption phrases must match the timed words exactly and in order');
    }
    let cursor = 0;
    return phrases.map((phrase) => {
      const result = cue(words.slice(cursor, cursor + phrase.length), phrase);
      cursor += phrase.length;
      return result;
    });
  }

  const result = [];
  let current = [];
  const flush = () => { if (current.length) result.push(cue(current)); current = []; };
  for (const word of words) {
    const chars = current.reduce((sum, item) => sum + item.word.length + 1, 0);
    if (current.length && (word.start - current.at(-1).end > 0.4 ||
      current.length >= 6 || chars + word.word.length > 40 ||
      word.end - current[0].start > 3.2)) flush();
    current.push(word);
    if (/[.!?;:]$/.test(word.word) || (/[,:]$/.test(word.word) && current.length >= 3)) flush();
  }
  flush();
  return result;
}

const stamp = (seconds) => {
  const ms = Math.round(seconds * 1000);
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor(ms % 3600000 / 60000);
  const secs = Math.floor(ms % 60000 / 1000);
  const millis = ms % 1000;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')},${String(millis).padStart(3, '0')}`;
};

export function toSrt(words) {
  checkWords(words);
  return words.map((word, index) => `${index + 1}\n${stamp(word.start)} --> ${stamp(word.end)}\n${word.word.toUpperCase()}\n`).join('\n');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const [wordPath, cuePath, phrasePath, srtPath] = process.argv.slice(2);
    if (!wordPath || !cuePath) throw Error('Usage: captions.mjs words.json cues.json [caption-phrases.txt] [captions.srt]');
    const words = JSON.parse(fs.readFileSync(wordPath, 'utf8'));
    const phrases = phrasePath ? fs.readFileSync(phrasePath, 'utf8') : undefined;
    fs.writeFileSync(cuePath, JSON.stringify(group(words, phrases), null, 2) + '\n');
    if (srtPath) fs.writeFileSync(srtPath, toSrt(group(words, phrases).flatMap((item) => item.words)));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
