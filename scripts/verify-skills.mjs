import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const manifestPath = path.join(root, 'skills.txt');
const read = (file) => fs.readFileSync(file, 'utf8');

assert.ok(fs.existsSync(manifestPath), 'skills.txt is missing');
const skills = read(manifestPath)
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith('#'));

assert.deepEqual(
  skills,
  ['reyxplainer-studio', 'rey-absurd-shorts', 'rey-horror-shorts', 'inkbeat-shorts'],
  'The required four-skill manifest changed unexpectedly',
);

const readme = read(path.join(root, 'README.md'));
for (const skill of skills) {
  const skillFile = path.join(root, 'skills', skill, 'SKILL.md');
  assert.ok(fs.existsSync(skillFile), `${skillFile} is missing`);
  const contents = read(skillFile);
  assert.match(contents, new RegExp(`^---\\r?\\nname:\\s*${skill}\\r?$`, 'm'), `${skill} frontmatter name is invalid`);
  assert.ok(readme.includes(`\`${skill}\``), `README does not list ${skill}`);
}

console.log(`Verified ${skills.length} committed skills: ${skills.join(', ')}`);

