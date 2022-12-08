import fs from 'fs/promises';

const file = await fs.readFile('input.txt').then(f => f.toString());

const matrix = file.split('\n').map(l => l.split(''));

const range = n => {
  const result = [];
  for (let i = 0; i < n; i += 1) {
    result.push(i);
  }
  return result;
};

const distances = [];

const getScenicScore = (i, j) => {
  const currentElementValue = matrix[i][j];

  const getDistance = values => {
    const index = values.findIndex(v => v >= currentElementValue);
    if (index === -1) {
      return values.length;
    }
    return index + 1;
  };

  const topValues = range(i).map(v => matrix[i - v - 1][j]);
  const bottomValues = range(matrix.length - i - 1).map(v => matrix[i + v + 1][j]);
  const leftValues = range(j).map(v => matrix[i][j - v - 1]);
  const rightValues = range(matrix[0].length - j - 1).map(v => matrix[i][j + v + 1]);

  return (
    getDistance(topValues) *
    getDistance(bottomValues) *
    getDistance(leftValues) *
    getDistance(rightValues)
  );
};

for (let i = 0; i < matrix.length; i += 1) {
  for (let j = 0; j < matrix[0].length; j += 1) {
    distances.push(getScenicScore(i, j));
  }
}

console.log({ result: Math.max(...distances) });
