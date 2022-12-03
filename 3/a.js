import fs from 'fs/promises';

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

const result = file
  .split('\n')
  .map(line => [line.slice(0, line.length / 2), line.slice(line.length / 2, line.length)])
  .map(([l1, l2]) => l1.split('').find(c => l2.includes(c)))
  .reduce((acc, val) => acc + pointsMap[val], 0);

console.log(result);
