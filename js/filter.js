import { parameterList } from './data.js';
import { createCards } from './picture.js';
import { getRandomNumber } from './utils.js';


const filter = () => {

  const parameterCopyList = parameterList.slice();

  const imgFilters = document.querySelector('.img-filters');
  imgFilters.classList.remove('img-filters--inactive');

  const defualtFilter = imgFilters.querySelector('#filter-default');
  const randomFilter = imgFilters.querySelector('#filter-random');
  const discussedFilter = imgFilters.querySelector('#filter-discussed');

  const tenList = () => {

    const parameters = parameterCopyList.slice();
    const total = [];

    while (total.length !== 10) {

      const randomIndex = getRandomNumber(0, parameters.length - 1);
      total.push(parameters.splice(randomIndex, 1)[0]);

    }

    return total;
  };

  const filterList = [

    parameterCopyList.slice(),
    tenList(),
    parameterCopyList.slice().sort((a,b) => b.likes - a.likes)

  ];

  defualtFilter.setAttribute('disabled', 'true');
  defualtFilter.addEventListener('click', () => {

    createCards(filterList[0]);
    defualtFilter.setAttribute('disabled', 'true');
    defualtFilter.classList.add('img-filters__button--active');

    if(randomFilter.classList.contains('img-filters__button--active')) {
      randomFilter.classList.remove('img-filters__button--active');
      randomFilter.removeAttribute('disabled');
    }

    if (discussedFilter.classList.contains('img-filters__button--active')) {
      discussedFilter.classList.remove('img-filters__button--active');
      discussedFilter.removeAttribute('disabled');
    }

  });

  randomFilter.addEventListener('click', () => {

    createCards(filterList[1]);
    randomFilter.classList.add('img-filters__button--active');
    randomFilter.setAttribute('disabled', 'true');

    if(defualtFilter.classList.contains('img-filters__button--active')) {
      defualtFilter.classList.remove('img-filters__button--active');
      defualtFilter.removeAttribute('disabled');
    }

    if (discussedFilter.classList.contains('img-filters__button--active')) {
      discussedFilter.classList.remove('img-filters__button--active');
      discussedFilter.removeAttribute('disabled');
    }

  });
  discussedFilter.addEventListener('click', () => {

    createCards(filterList[2]);
    discussedFilter.classList.add('img-filters__button--active');
    discussedFilter.setAttribute('disabled', 'true');

    if(defualtFilter.classList.contains('img-filters__button--active')) {
      defualtFilter.classList.remove('img-filters__button--active');
      defualtFilter.removeAttribute('disabled');
    }

    if(randomFilter.classList.contains('img-filters__button--active')) {
      randomFilter.classList.remove('img-filters__button--active');
      randomFilter.removeAttribute('disabled');
    }
  });
};

export { filter };
