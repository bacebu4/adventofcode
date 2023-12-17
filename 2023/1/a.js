import { input } from './input.js';

const isNumberCharacter = c => c >= '0' && c <= '9';

const result = input
  .split('\n')
  .map(l => l.split(''))
  .map(l => [parseInt(l.find(isNumberCharacter)), parseInt(l.findLast(isNumberCharacter))])
  .reduce((acc, [firstDigit, secondDigit]) => acc + parseInt(`${firstDigit}${secondDigit}`), 0);

console.log(result);
