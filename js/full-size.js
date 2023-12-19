//Получаем нужные переменные для скрипта

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.cancel');
const socialComments = bigPicture.querySelector('.social__comments');
const commentsLoader = bigPicture.querySelector('.comments-loader');


// Создаем функция для отображения карточки

const getFullSize = function (pictureSetting, card) {

  //Отображаем карточку по клику

  card.addEventListener('click', () => {
    const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
    const likesCount = bigPicture.querySelector('.likes-count');
    const commentsArray = new Array();

    // Обрабатываем массив с комментариями

    while (socialComments.children.length > 0) {
      socialComments.children[0].remove();
    }

    const socialCaption = bigPicture.querySelector('.social__caption');
    const socialCommentCount = bigPicture.querySelector('.social__comment-count');

    //Отображаем карточку

    bigPicture.classList.remove('hidden');

    //Обрабатываем изображение

    bigPictureImage.src = pictureSetting.url;
    likesCount.textContent = pictureSetting.likes;

    //Создаем комментарии

    pictureSetting.comments.forEach((comment) => {

      const newComment = document.createElement('li');
      newComment.classList.add('social__comment');

      const commentImage = document.createElement('img');
      commentImage.classList.add('social__picture');
      commentImage.src = comment.avatar;
      commentImage.alt = comment.name;
      newComment.append(commentImage);

      const commentText = document.createElement('p');
      commentText.classList.add('social__text');
      commentText.textContent = comment.message;

      newComment.append(commentText);
      commentsArray.push(newComment);

    });

    socialCaption.textContent = pictureSetting.description;
    document.body.classList.add('modal-open');


    //Отображаем количество комментариев
    const lengthOfArray = commentsArray.length;
    commentsArray.reverse();
    if (commentsArray.length > 5) {
      socialCommentCount.innerHTML = `5 из <span class="comments-count">${commentsArray.length}</span> комментариев`;
      for (let i = 0; i < 5; i++) {
        socialComments.appendChild(commentsArray.pop());
      }
    } else {
      commentsLoader.classList.add('hidden');
      socialCommentCount.innerHTML = `${commentsArray.length} из <span class="comments-count">${commentsArray.length}</span> комментариев`;
      for (let i = 0; i < 5; i++) {
        try{
          socialComments.appendChild(commentsArray.pop());
        } catch(e) {
          break;
        }
      }
    }

    //Отображаем количество комментариев после клика

    commentsLoader.addEventListener('click', () => {
      for (let i = 0; i < 5; i++) {
        try{
          socialComments.appendChild(commentsArray.pop());
        } catch(e) {
          break;
        }
      }
      socialCommentCount.innerHTML = `${socialComments.children.length} из <span class="comments-count">${lengthOfArray}</span> комментариев`;
      if (socialComments.children.length === Number(socialCommentCount.children[0].textContent)) {
        commentsLoader.classList.add('hidden');
      }
    });
  });

  //Закрываем карточку по клику на кнопку close

  closeButton.addEventListener('click', () => {
    commentsLoader.classList.remove('hidden');
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    socialComments.innerHTML ='';
  });

  //Закрываем карточку по событию escape

  document.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      commentsLoader.classList.remove('hidden');
      bigPicture.classList.add('hidden');
      document.body.classList.remove('modal-open');
      socialComments.innerHTML ='';
    }
  });
};


export { getFullSize };
