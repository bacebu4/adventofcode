import fs from 'fs/promises';

const file = await fs.readFile('input.txt').then(f => f.toString());

const result = file
  .split('\n')
  .reduce(
    (acc, value) => {
      const currentAccGroup = acc[acc.length - 1];

      if (value !== '') {
        currentAccGroup.push(value);
      } else {
        acc.push([]);
      }

      return acc;
    },
    [[]],
  )
  .map(val => val.reduce((acc, val2) => acc + parseInt(val2), 0))
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((acc, val) => acc + val, 0);

console.log({ result });
