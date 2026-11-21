import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dest = process.argv[2];
if (!dest) {
  console.error('Usage: node init.mjs NEW_DIRECTORY');
  process.exit(1);
}
if (fs.existsSync(dest)) {
  console.error('Destination already exists; refusing overwrite');
  process.exit(1);
}

fs.cpSync(path.join(root, 'templates'), dest, {
  recursive: true,
  errorOnExist: true,
  force: false,
});
fs.mkdirSync(path.join(dest, 'scripts'), {recursive: true});
for (const name of ['validate.mjs', 'captions.mjs', 'qa.mjs', 'generate-audio-bed.py']) {
  fs.copyFileSync(path.join(root, 'scripts', name), path.join(dest, 'scripts', name));
}
fs.cpSync(path.join(root, 'tests'), path.join(dest, 'tests'), {recursive: true});
console.log(`Created ${dest}`);
