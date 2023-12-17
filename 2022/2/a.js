import fs from 'fs/promises';

const file = await fs.readFile('input.txt').then(f => f.toString());

const getScoreForChoosing = c => {
  const scoreForChoosingMap = {
    X: 1,
    Y: 2,
    Z: 3,
  };
  return scoreForChoosingMap[c];
};

const GameResult = {
  WON: 'WON',
  LOOSE: 'LOOSE',
  DRAW: 'DRAW',
};

const convertOwnInput = c => {
  const map = {
    X: 'A',
    Y: 'B',
    Z: 'C',
  };

  return map[c];
};

const getScoreForResult = result => {
  const map = {
    [GameResult.DRAW]: 3,
    [GameResult.LOOSE]: 0,
    [GameResult.WON]: 6,
  };
  return map[result];
};

const resultOfGame = (opponentInput, ownInput) => {
  const convertedInput = convertOwnInput(ownInput);

  if (opponentInput === convertedInput) {
    return GameResult.DRAW;
  }

  if (opponentInput === 'A' && convertedInput === 'C') {
    return GameResult.LOOSE;
  }

  if (opponentInput === 'C' && convertedInput === 'B') {
    return GameResult.LOOSE;
  }

  if (opponentInput === 'B' && convertedInput === 'A') {
    return GameResult.LOOSE;
  }

  return GameResult.WON;
};

const result = file
  .split('\n')
  .map(line => line.split(' '))
  .map(([opponentInput, ownInput]) => ({
    gameResult: resultOfGame(opponentInput, ownInput),
    scoreForChoosing: getScoreForChoosing(ownInput),
  }))
  .reduce(
    (acc, { gameResult, scoreForChoosing }) =>
      acc + getScoreForResult(gameResult) + scoreForChoosing,
    0,
  );

console.log({ result });
