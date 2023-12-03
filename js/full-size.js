const bigPicture = document.querySelector(".big-picture");
const bigPictureImage = bigPicture.querySelector(".big-picture__img img");
const likesCount = bigPicture.querySelector(".likes-count");
const commentsCount = bigPicture.querySelector(".comments-count");
let socialComments = bigPicture.querySelector(".social__comments");
while (socialComments.children.length > 0) {
  socialComments.children[0].remove();
}
const socialCaption = bigPicture.querySelector(".social__caption");
const socialCommentCount = bigPicture.querySelector(".social__comment-count");
const commentsLoader = bigPicture.querySelector(".comments-loader");
const closeButton = bigPicture.querySelector(".cancel");

const getFullSize = function (pictureSetting, card) {
  card.addEventListener("click", function () {
    bigPicture.classList.remove("hidden");
    bigPictureImage.src = pictureSetting.url;
    likesCount.textContent = pictureSetting.likes;
    commentsCount.textContent = pictureSetting.comments.length;
    pictureSetting.comments.forEach((comment) => {
      let newComment = document.createElement("li");
      newComment.classList.add("social__comment");

      let commentImage = document.createElement("img");
      commentImage.classList.add("social__picture");
      commentImage.src = comment.avatar;
      commentImage.alt = comment.name;
      newComment.append(commentImage);

      let commentText = document.createElement("p");
      commentText.classList.add("social__text");
      commentText.textContent = comment.message;

      newComment.append(commentText);
      socialComments.append(newComment);
    });
    socialCommentCount.classList.add("hidden");
    commentsLoader.classList.add("hidden");
    socialCaption.textContent = pictureSetting.description;
    document.body.classList.add("modal-open");
  });
  closeButton.addEventListener("click", function () {
    bigPicture.classList.add("hidden");
    document.body.classList.remove("modal-open");
  });
  document.addEventListener("keydown", function (evt) {
    if (evt.keyCode == 27) {
      bigPicture.classList.add("hidden");
      document.body.classList.remove("modal-open");
    }
  });
};
export { getFullSize };
