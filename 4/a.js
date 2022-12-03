import fs from 'fs/promises';

const file = await fs.readFile('input.txt').then(f => f.toString());

const result = file.split('\n');

console.log(result);
