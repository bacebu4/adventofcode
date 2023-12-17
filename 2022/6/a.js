import fs from 'fs/promises';

const file = await fs.readFile('input.txt').then(f => f.toString());

const isArrayOfUniqueElements = a => new Set(a).size === a.length;

const NUMBER = 14;

const result =
  file
    .split('')
    .map((_, i, arr) => arr.slice(i, i + NUMBER))
    .findIndex(isArrayOfUniqueElements) + NUMBER;

console.log(result);
