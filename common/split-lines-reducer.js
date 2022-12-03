export const splitLinesReducer = splitter => [
  (acc, val) => {
    const currentGroup = acc[acc.length - 1];

    if (val !== splitter) {
      currentGroup.push(val);
    } else {
      acc.push([]);
    }

    return acc;
  },
  [[]],
];
