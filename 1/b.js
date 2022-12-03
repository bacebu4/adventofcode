import fs from 'fs/promises';
import { splitLinesReducer } from '../common/split-lines-reducer.js';

const file = await fs.readFile('input.txt').then(f => f.toString());

const result = file
  .split('\n')
  .reduce(...splitLinesReducer(''))
  .map(val => val.reduce((acc, val) => acc + parseInt(val), 0))
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((acc, val) => acc + val, 0);

console.log({ result });
