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

const { result: fileTree } = file
  .split('$ ')
  .map(l => l.split('\n').filter(Boolean))
  .filter(a => a.length)
  .reduce(
    (acc, [command, ...commandOutput]) => {
      if (command.startsWith('cd')) {
        const [, path] = command.split(' ');
        return { cursor: [...acc.cursor, path], result: acc.result };
      }

      if (command.startsWith('ls')) {
        const current = get(acc.cursor, acc.result);

        commandOutput.forEach(o => {
          if (o.startsWith('dir ')) {
            const [, dirName] = o.split(' ');
            current[dirName] = {};
          } else {
            const [fileSize, fileName] = o.split(' ');
            current[fileName] = Number(fileSize);
          }
        });

        return acc;
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

const result = findDirectoryTrees({ '/': fileTree })
  .map(([, val]) => calculateSize(val))
  .filter(v => v <= 100_000)
  .reduce((acc, val) => acc + val, 0);

console.log(result);
