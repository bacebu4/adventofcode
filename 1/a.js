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
  .reduce((acc, val) => {
    const sum = val.reduce((acc, val2) => acc + parseInt(val2), 0);

    if (sum > acc) {
      return sum;
    }

    return acc;
  }, -Infinity);

console.log({ result });
