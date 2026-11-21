import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
export function validate(e) {
 const errors=[]; const fail=(m)=>errors.push(m);
 if(!e || typeof e!=='object') return ['Episode must be an object'];
 if(typeof e.title!=='string'||!e.title.trim()) fail('Missing title');
 for(const k of ['fps','width','height']) if(!Number.isInteger(e[k])||e[k]<1) fail('Invalid '+k);
 if(!Array.isArray(e.scenes)||!e.scenes.length) return [...errors,'Missing scenes'];
 const ids=new Set(); let frames=0;
 for(const [i,s] of e.scenes.entries()) {
  if(!s||typeof s!=='object'){fail(`Scene ${i} invalid`);continue;}
  if(typeof s.id!=='string'||!s.id||ids.has(s.id)) fail(`Scene ${i}: invalid/duplicate id`); ids.add(s.id);
  if(!Number.isInteger(s.frames)||s.frames<1) fail(`Scene ${i}: invalid frames`); else frames+=s.frames;
  if(!['intro','safe','overflow','defense','recap'].includes(s.mode)) fail(`Scene ${i}: unsupported mode`);
  for(const k of ['title','caption','code','input']) if(typeof s[k]!=='string') fail(`Scene ${i}: invalid ${k}`);
  if(typeof s.input==='string'&&!/^[A-Z]{0,8}$/.test(s.input)) fail(`Scene ${i}: invalid ASCII input`);
  if(s.mode==='safe'&&s.input?.length>3) fail(`Scene ${i}: safe input over capacity`);
  if(s.mode==='overflow'&&s.input?.length<4) fail(`Scene ${i}: overflow input too short`);
 }
 if(e.audio!==undefined && (typeof e.audio!=='string'||!e.audio||e.audio.includes('..')||/^[\\/]|:/.test(e.audio))) fail('Invalid local audio path');
 if(e.captions!==undefined){if(!Array.isArray(e.captions))fail('Invalid captions');else {let end=0;for(const c of e.captions){if(!c||!Number.isFinite(c.start)||!Number.isFinite(c.end)||c.start<end||c.end<=c.start||c.end>frames/e.fps||typeof c.text!=='string'||!c.text.trim())fail('Invalid caption timing/text');else end=c.end;}}}
 return errors;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){try{const e=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));const errors=validate(e);if(errors.length)throw new Error(errors.join('\n'));console.log(`Valid: ${e.scenes.reduce((a,s)=>a+s.frames,0)/e.fps}s`);}catch(e){console.error(e.message);process.exitCode=1;}}
