# Личный проект «Кэт-энерджи»

Учебный проект Cat-Energy выполнен в рамках курса Фронтенд разработчик от [htmlacademy](https://htmlacademy.ru)
![htmlacademy](https://ritfest.ru/i/ritfest/2018/reunion/members/html_academy.png)

# Результат работы

### Результат доступен по ссылке [https://lebedev05tmn.github.io/kekstagram](https://lebedev05tmn.github.io/kekstagram)

##### Вид главной страницы при загрузке

![Вид главной страницы при загрузке](https://github.com/lebedev05tmn/kekstagram/blob/main/img/Снимок%20экрана%202023-12-29%20в%2023.55.53.png)

## В рамках проекта усвоены такие практические навыки как:

- ### Работа с DOM-элементами

##### Пример работы с DOM

```js
const bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');
```

- ### Создание DOM-элементов

##### Пример

```js
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
```

- ### Работа c событиями

##### Пример обработки события
```js
document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    commentsLoader.classList.remove('hidden');
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    socialComments.innerHTML ='';
  }
});
```

- ### Работа с внешними API и библиотеками

##### Пример работы с внешним API

```js
noUiSlider.create(formSlider, {
  range: {
  min: 1,
  max: 3,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});
```

- ### Получение и отправление данных формата JSON

##### Пример получения и отправки данных с сервера

```js
fetch('https://25.javascript.pages.academy/kekstagram/data')

// Получаем promise с данными json

  .then((response) => response.json())

// Обрабатываем данные и создаем массив с параметрами

  .then((data) => {
    createParameters(data);
  })

//Обрабатываем и отображаем ошибку

  .catch((error) => {
    createError(error, 0);
  });

// Создаём переменную, которая будет содержать в себе данные для отпрвки на сервер

const formData = new FormData(formUpload);

// Отправляем данные на сервер
fetch(' https://25.javascript.pages.academy/kekstagram', {

  method: 'POST',

  // Передаем полученные данные в promise

  body: formData,

  })

  .then(()=>{

    // Очищаем данные, приводя форму в исходное состояние

    inputList.forEach((inputItem) => {
      inputItem.value = '';
});
```

- ### Создание асинхронности приложения

##### Пример асинхронности


```js
setTimeout(() => {
  createCards(parameterList);
  debounce(filter(),500);
}, 1000);
```

## Цель создания и описание работы:

1. Цель создания:
   - получение практических навыков
   - создание учебного проекта
2. Описание работы:
   - создание асинхронного приложения с помощью vanila js + API noUISlider
