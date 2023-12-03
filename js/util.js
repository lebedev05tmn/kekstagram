// Рандомное число из диапазона от minInt до maxInt

const getRandomInt = (minInt, maxInt) =>
  Math.floor(Math.random() * (maxInt - minInt + 1)) + minInt;

// Рандомный элемент массива

const getRandomArrayElement = (arr) => arr[getRandomInt(0, arr.length - 1)];

// Лимит длины комментария commentStr

const limitComment = (commentStr, maxLength) => commentStr.length <= maxLength;

export { getRandomInt, getRandomArrayElement, limitComment };
