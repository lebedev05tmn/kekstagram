//Массив с параметрами

const parameterList = [];

//Функция для создания карточек из массива с параметрами

const createParameters = (parameters) => {
  parameters.forEach((element) => {
    parameterList.push(element);
  });
};

//��ункция для отображения ошибки

const createError = (error, type) => {

  //Получаем шаблон ошибки

  const errorMessage = document.querySelector('#error').content.children[0];
  const errorButton = errorMessage.children[0].children[1];

  if (!type) {
    //Отображаем ошибку

    errorMessage.children[0].textContent = error;
    errorMessage.children[0].setAttribute('style','padding: 50px 30px');
  }

  document.body.append(errorMessage);

  errorButton.addEventListener('click', () => {
    document.body.removeChild(errorMessage);
  });
};

//Запрос к серверу

fetch('https://25.javascript.pages.academy/kekstagram/data')

//Получаем promise с данными json

  .then((response) => response.json())

//Обрабатываем данные и создаем массив с параметрами

  .then((data) => {
    createParameters(data);
  })

//Обрабатываем и отображаем ошибку

  .catch((error) => {
    createError(error, 0);
  });


export { parameterList, createError };
