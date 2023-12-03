import { getFullSize } from "./full-size.js";

let pictureTemplate = document.querySelector("#picture").content.children[0];
let pictureBlock = document.querySelector(".pictures");

const createCards = (cardSettingList) => {
  const pictureFragment = document.createDocumentFragment();

  cardSettingList.forEach((cardSetting) => {
    let pictureCard = pictureTemplate.cloneNode(true);

    let pictureImage = pictureCard.querySelector(".picture__img");
    let pictureLikes = pictureCard.querySelector(".picture__likes");
    let pictureComments = pictureCard.querySelector(".picture__comments");

    pictureImage.src = cardSetting.url;
    pictureLikes.textContent = cardSetting.likes;
    pictureComments.textContent = cardSetting.comments.length;

    getFullSize(cardSetting, pictureCard);

    pictureFragment.append(pictureCard);
  });

  pictureBlock.append(pictureFragment);
};

export { createCards, pictureBlock };
