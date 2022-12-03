export const groupLinesReducer = cb => [
  (acc, val) => {
    const currentGroup = acc[acc.length - 1];

    if (cb({ currentGroup, val })) {
      currentGroup.push(val);
    } else {
      acc.push([val]);
    }

    return acc;
  },
  [[]],
];
