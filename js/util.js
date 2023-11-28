// Рандомное число из диапазона от minInt до maxInt

const getRandomInt = (minInt, maxInt) =>
  Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;

// Лимит длины комментария commentStr

const limitComment = (commentStr, maxLength) => commentStr.length <= maxLength;

export { getRandomInt, limitComment };
