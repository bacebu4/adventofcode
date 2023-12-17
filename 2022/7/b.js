import fs from 'fs/promises';
import path from 'path';

const file = await fs.readFile('input.txt').then(f => f.toString());

const get = (rawPath, target) => {
  return path
    .resolve(...rawPath)
    .split('/')
    .filter(Boolean)
    .reduce((acc, val) => acc[val], target);
};

const calculateSize = target => {
  return Object.values(target).reduce(
    (acc, val) => (typeof val === 'number' ? acc + val : acc + calculateSize(val)),
    0,
  );
};

const cdCommandReducer = (acc, [command]) => {
  const [, path] = command.split(' ');
  return { cursor: [...acc.cursor, path], result: acc.result };
};

const lsCommandReducer = (acc, [, ...commandOutput]) => {
  const currentNode = get(acc.cursor, acc.result);

  commandOutput.forEach(outputLine => {
    if (outputLine.startsWith('dir ')) {
      const [, dirName] = outputLine.split(' ');
      currentNode[dirName] = {};
    } else {
      const [fileSize, fileName] = outputLine.split(' ');
      currentNode[fileName] = Number(fileSize);
    }
  });

  return acc;
};

const { result: fileTree } = file
  .split('$ ')
  .map(l => l.split('\n').filter(Boolean))
  .filter(a => a.length)
  .reduce(
    (acc, [command, ...commandOutput]) => {
      if (command.startsWith('cd')) {
        return cdCommandReducer(acc, [command, ...commandOutput]);
      }

      if (command.startsWith('ls')) {
        return lsCommandReducer(acc, [command, ...commandOutput]);
      }

      throw new Error('Not supported');
    },
    { result: {}, cursor: [] },
  );

const findDirectoryTrees = (target, acc = []) =>
  Object.entries(target).reduce((acc, [key, val]) => {
    if (typeof val === 'number') {
      return acc;
    }

    acc.push([key, val]);
    return findDirectoryTrees(val, acc);
  }, acc);

const TOTAL_SPACE = 70_000_000;
const SPACE_REQUIRED = 30_000_000;

const spaceUsed = calculateSize(fileTree);
const freeSpace = TOTAL_SPACE - spaceUsed;
const neededSpace = SPACE_REQUIRED - freeSpace;

const result = findDirectoryTrees({ '/': fileTree })
  .map(([, val]) => calculateSize(val))
  .filter(v => v >= neededSpace)
  .reduce((acc, val) => Math.min(acc, val), Infinity);

console.log(result);
