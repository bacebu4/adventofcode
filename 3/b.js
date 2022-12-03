import fs from 'fs/promises';
import { groupLinesReducer } from '../common/group-lines-reducer.js';

const file = await fs.readFile('input.txt').then(f => f.toString());

const formPointsMap = ({ firstChar, lastChar, startPoints }) => {
  const lowercaseFirstChar = firstChar.charCodeAt(0);
  const lowercaseLastChar = lastChar.charCodeAt(0);

  const map = {};
  let points = startPoints;

  for (let i = lowercaseFirstChar; i <= lowercaseLastChar; i += 1) {
    map[String.fromCharCode(i)] = points;
    points += 1;
  }

  return map;
};

const pointsMap = {
  ...formPointsMap({ firstChar: 'a', lastChar: 'z', startPoints: 1 }),
  ...formPointsMap({ firstChar: 'A', lastChar: 'Z', startPoints: 27 }),
};

const findCommonCharacter = ([firstLine, ...restLines]) => {
  return firstLine.split('').find(c => restLines.every(l => l.includes(c)));
};

const result = file
  .split('\n')
  .reduce(...groupLinesReducer(({ currentGroup }) => currentGroup.length < 3))
  .map(g => findCommonCharacter(g))
  .reduce((acc, val) => acc + pointsMap[val], 0);

console.log(result);
