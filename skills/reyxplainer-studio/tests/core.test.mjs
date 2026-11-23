import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import {validate} from '../scripts/validate.mjs';import {group} from '../scripts/captions.mjs';
const projectEpisode=new URL('../src/episode.json',import.meta.url);
const packagedEpisode=new URL('../templates/src/episode.json',import.meta.url);
const load=()=>JSON.parse(fs.readFileSync(fs.existsSync(projectEpisode)?projectEpisode:packagedEpisode,'utf8'));
test('pilot is valid and 45s',()=>{const e=load();assert.deepEqual(validate(e),[]);assert.equal(e.scenes.reduce((a,s)=>a+s.frames,0)/e.fps,45);});
test('reject zero duration and duplicate ids',()=>{const e=load();e.scenes[0].frames=0;e.scenes[1].id=e.scenes[0].id;assert.equal(validate(e).length,2);});
test('reject false safe example',()=>{const e=load();e.scenes[1].input='CATS';assert.ok(validate(e).length);});
test('reject invalid caption',()=>{const e=load();e.captions=[{start:44,end:46,text:'x'}];assert.ok(validate(e).length);});
test('group aligned words with highlight cues',()=>assert.deepEqual(group([{word:'Hi',start:0,end:.2},{word:'there',start:.2,end:.5}]),[{start:0,end:.5,text:'Hi there',words:[{word:'Hi',start:0,end:.2},{word:'there',start:.2,end:.5}]}]));
test('reject overlapping word timings',()=>assert.throws(()=>group([{word:'a',start:0,end:1},{word:'b',start:.5,end:2}])));
test('hand-cut phrases preserve exact script tokens and word timing',()=>{
 const timed=[{word:'Instead',start:0,end:.3},{word:'of',start:.3,end:.5},{word:'returning',start:.5,end:1},{word:'to',start:1,end:1.2},{word:'the',start:1.2,end:1.4},{word:'caller',start:1.4,end:1.8}];
 const cues=group(timed,'Instead of returning to the caller,');
 assert.equal(cues.length,1);
 assert.equal(cues[0].text,'Instead of returning to the caller,');
 assert.equal(cues[0].words.at(-1).end,1.8);
 assert.throws(()=>group(timed,'Instead of returning to a caller,'));
});
