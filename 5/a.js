import fs from 'fs/promises';
import { groupLinesReducer } from '../common/group-lines-reducer.js';

const file = await fs.readFile('input.txt').then(f => f.toString());

const [scheme, moves] = file.split('\n\n').map(l => l.split('\n'));

scheme.pop();
const parsedScheme = scheme.map(l =>
  l
    .split('')
    .reduce(...groupLinesReducer(({ currentGroup }) => currentGroup.length < 4))
    .map(g => g.slice(0, 3))
    .map(g => g[1]),
);

const formSchemesByStack = () => {
  const result = {};

  for (let i = 1; i <= parsedScheme[0].length; i += 1) {
    result[i] = parsedScheme.map(p => p[i - 1]).filter(c => c !== ' ');
  }

  return result;
};

const parsedMoves = moves
  .map(l => l.split(' '))
  .map(([, amount, , from, , to]) => ({ amount: Number(amount), from, to }));

const getResultedStack = () => {
  const stacks = formSchemesByStack();

  parsedMoves.forEach(({ amount, from, to }) => {
    for (let i = 0; i < amount; i += 1) {
      const fromStack = stacks[from];
      const toStack = stacks[to];
      const element = fromStack.shift();
      toStack.unshift(element);
    }
  });

  return stacks;
};

const result = Object.entries(getResultedStack())
  .sort(([key1], [key2]) => Number(key1) - Number(key2))
  .map(([, value]) => value)
  .map(([firstElement]) => firstElement)
  .join('');

console.log(result);