import { cardValidationWidget } from './cardValidation/widget'

const container = document.querySelector('.container');
const form = new cardValidationWidget(container);

form.bindToDOM();