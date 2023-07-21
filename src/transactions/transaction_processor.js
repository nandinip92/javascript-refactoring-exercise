function processTransactions(transActions) {
  let txr = [];

  if (!validateTransactions(transActions)) {
    throw new Error("Undefined collection of transactions");
  }

  let txCount = {};

  transActions.forEach((transaction) =>
    txCount[transaction]
      ? (txCount[transaction] += 1)
      : (txCount[transaction] = 1)
  );

  txCount = sortByAmountThenName(txCount);

  // Place them back in array for returning
  Object.keys(txCount).forEach(function (key, index) {
    txr[index] = `${key} ${txCount[key]}`;
  });

  return txr;
}

function sortByAmountThenName(txCount) {
  let sortedKeys = Object.keys(txCount).sort(function sortingFunction(
    itemOne,
    itemTwo
  ) {
    return (
      txCount[itemTwo] - txCount[itemOne] ||
      itemOne > itemTwo ||
      -(itemOne < itemTwo)
    );
  });

  let sortedResults = {};
  sortedKeys.forEach(
    (objectKey) => (sortedResults[objectKey] = txCount[objectKey])
  );

  return sortedResults;
}

function validateTransactions(transactions) {
  return transactions === undefined ? false : true;
}

module.exports = processTransactions;
