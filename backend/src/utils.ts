import fs from 'fs';

export const acts = JSON.parse(fs.readFileSync('./acts.json').toString());
