import { parameterList } from './data.js';
import { createCards } from './picture.js';
import { showForm } from './form.js';
import { filter } from './filter.js';
import { debounce } from './utils.js';

//Выполняем функцию для создания карточки после получения данных с сервера

setTimeout(() => {
  createCards(parameterList);
  debounce(filter(),500);
}, 1000);

//Отображаем форму редактирования загруженного изображения

showForm();
