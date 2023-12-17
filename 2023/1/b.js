import { input } from './input.js';

const spelledDigits = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const digitForIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const isNumberCharacter = c => c >= '0' && c <= '9';

const digitsMapper = line => {
  let buffer = '';
  const digits = [];

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];

    if (isNumberCharacter(char)) {
      digits.push(parseInt(char));
      continue;
    }

    buffer += char;

    while (!spelledDigits.some(d => d.startsWith(buffer)) && buffer) {
      buffer = buffer.slice(1);
    }

    if (spelledDigits.includes(buffer)) {
      const accumulatedDigit = digitForIndex[spelledDigits.indexOf(buffer)];
      digits.push(accumulatedDigit);
      buffer = buffer.slice(1);
    }
  }

  return digits;
};

const result = input
  .split('\n')
  .map(digitsMapper)
  .map(l => [l.at(0), l.at(-1)])
  .reduce((acc, [firstDigit, secondDigit]) => acc + parseInt(`${firstDigit}${secondDigit}`), 0);

console.log(result);
