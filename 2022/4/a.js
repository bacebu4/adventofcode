import fs from 'fs/promises';

const file = await fs.readFile('input.txt').then(f => f.toString());

const populateRange = ([a, b]) => {
  const result = [];

  for (let i = a; i <= b; i += 1) {
    result.push(i);
  }

  return result;
};

const rangesFullyOverlaps = ([a, b]) => {
  return a.every(n => b.includes(n)) || b.every(n => a.includes(n));
};

const result = file
  .split('\n')
  .map(l =>
    l
      .split(',')
      .map(range => range.split('-').map(Number))
      .map(populateRange),
  )
  .filter(rangesFullyOverlaps).length;

console.log(result);
