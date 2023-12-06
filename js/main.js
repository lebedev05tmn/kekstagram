import { getParameters } from './data.js';
import { createCards } from './picture.js';
import { showForm } from './form.js';

const parameterList = getParameters();

createCards(parameterList);
showForm();
