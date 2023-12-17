import fs from 'fs/promises';

const file = await fs.readFile('input.txt').then(f => f.toString());

const GameResult = {
  WON: 'WON',
  LOOSE: 'LOOSE',
  DRAW: 'DRAW',
};

const mapOfGame = {
  A: {
    C: GameResult.LOOSE,
    A: GameResult.DRAW,
    B: GameResult.WON,
  },
  B: {
    A: GameResult.LOOSE,
    B: GameResult.DRAW,
    C: GameResult.WON,
  },
  C: {
    B: GameResult.LOOSE,
    C: GameResult.DRAW,
    A: GameResult.WON,
  },
};

const convertStrategyToResult = strategyInput => {
  const map = {
    X: GameResult.LOOSE,
    Y: GameResult.DRAW,
    Z: GameResult.WON,
  };
  return map[strategyInput];
};

const getOwnGameInput = (opponentInput, strategyInput) => {
  const resultNeeded = convertStrategyToResult(strategyInput);

  const opponentMap = mapOfGame[opponentInput];

  return Object.entries(opponentMap).find(([key, value]) => value === resultNeeded)[0];
};

const getScoreForChoosing = c => {
  const scoreForChoosingMap = {
    A: 1,
    B: 2,
    C: 3,
  };
  return scoreForChoosingMap[c];
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
  return mapOfGame[opponentInput][ownInput];
};

const result = file
  .split('\n')
  .map(line => line.split(' '))
  .map(([opponentInput, strategyInput]) => ({
    gameResult: resultOfGame(opponentInput, getOwnGameInput(opponentInput, strategyInput)),
    scoreForChoosing: getScoreForChoosing(getOwnGameInput(opponentInput, strategyInput)),
  }))
  .reduce(
    (acc, { gameResult, scoreForChoosing }) =>
      acc + getScoreForResult(gameResult) + scoreForChoosing,
    0,
  );

console.log({ result });
