import fs from 'fs/promises';
import { splitLinesReducer } from '../common/split-lines-reducer.js';

const file = await fs.readFile('input.txt').then(f => f.toString());

const result = file
  .split('\n')
  .reduce(...splitLinesReducer(''))
  .map(val => val.reduce((acc, val) => acc + parseInt(val), 0))
  .reduce((acc, val) => Math.max(acc, val), -Infinity);

console.log({ result });
