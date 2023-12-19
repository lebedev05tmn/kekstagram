import { getFullSize } from './full-size.js';

const pictureTemplate = document.querySelector('#picture').content.children[0];
const pictureBlock = document.querySelector('.pictures');

const createCards = (cardSettingList) => {
  const test = document.querySelectorAll('.picture');
  test.forEach((elem) => {
    elem.parentNode.removeChild(elem);
  });
  const cardSettingCopyList = cardSettingList.slice();
  const pictureFragment = document.createDocumentFragment();

  cardSettingCopyList.forEach((cardSetting) => {
    const pictureCard = pictureTemplate.cloneNode(true);

    const pictureImage = pictureCard.querySelector('.picture__img');
    const pictureLikes = pictureCard.querySelector('.picture__likes');
    const pictureComments = pictureCard.querySelector('.picture__comments');

    pictureImage.src = cardSetting.url;
    pictureLikes.textContent = cardSetting.likes;
    pictureComments.textContent = cardSetting.comments.length;
    getFullSize(cardSetting, pictureCard);

    pictureFragment.append(pictureCard);
  });

  pictureBlock.append(pictureFragment);
};

export { createCards, pictureBlock };
