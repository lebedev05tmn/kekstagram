import { getRandomInt } from "./util.js";

// Список имен пользователей

const NAME_USERS = [
  "Иван",
  "Хуан Себастьян",
  "Мария",
  "Кристоф",
  "Виктор",
  "Юлия",
  "Люпита",
  "Вашингтон",
];

// Список описаний фотографий

const DESCRIPTION_PHOTOS = [
  "Красивое фото 1",
  "Красивое фото 2",
  "Красивое фото 3",
  "Красивое фото 4",
  "Красивое фото 5",
  "Некрасивое фото 6",
  "Некрасивое фото 7",
  "Некрасивое фото 8",
  "Некрасивое фото 9",
  "Некрасивое фото 10",
  "Отличное фото 11",
  "Отличное фото 12",
  "Отличное фото 13",
  "Отличное фото 14",
  "Отличное фото 15",
  "Супер фото 16",
  "Супер фото 17",
  "Супер фото 18",
  "Супер фото 19",
  "Супер фото 20",
  "Мега фото 21",
  "Мега фото 22",
  "Мега фото 23",
  "Мега фото 24",
  "Мега фото 25",
];

// Список комментариев, оставленных пользователями

const COMMENT_USERS = [
  "Всё отлично!",
  "В целом всё неплохо. Но не всё.",
  "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
  "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
  "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
  "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!",
];

// Функция для генерации объекта карточки фото

const createComments = () => {
  let commentsArray = [];
  for (let i = 0; i <= getRandomInt(0, 25); i++) {
    commentsArray.push({
      id: getRandomInt(1, 200),
      avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
      message:
        getRandomInt(0, 1) == 1
          ? COMMENT_USERS[getRandomInt(0, COMMENT_USERS.length - 1)]
          : COMMENT_USERS[getRandomInt(0, COMMENT_USERS.length - 1)] +
            COMMENT_USERS[getRandomInt(0, COMMENT_USERS.length - 1)],
      name: NAME_USERS[getRandomInt(0, NAME_USERS.length - 1)],
    });
  }
  return commentsArray;
};

const getParameter = (i) => {
  return {
    id: i,
    url: `photos/${i}.jpg`,
    description: DESCRIPTION_PHOTOS[i],
    likes: getRandomInt(15, 200),
    comments: createComments(),
  };
};

// Функция для генерации списка карточек фото

const getParameters = () => {
  let cardsArray = [];

  for (let i = 1; i <= 25; i++) cardsArray.push(getParameter(i));

  return cardsArray;
};

export { getParameters };
