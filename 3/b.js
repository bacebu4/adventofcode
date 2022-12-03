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

const findCommonCharacter = args => {
  return args[0].split('').find(c => args.slice(1).every(l => l.includes(c)));
};

const result = file
  .split('\n')
  .reduce(
    (acc, val) => {
      const currentGroup = acc[acc.length - 1];

      if (currentGroup.length < 3) {
        currentGroup.push(val);
      } else {
        acc.push([val]);
      }

      return acc;
    },
    [[]],
  )
  .map(g => findCommonCharacter(g))
  .reduce((acc, val) => acc + pointsMap[val], 0);

console.log(result);
