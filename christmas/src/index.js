import './index.scss';

// alert('Уважаемый проверяющий. Если у тебя еще есть ');

import noUiSlider from 'nouislider';
import data from './data.js';

// =======================================================================

const btnGotoToys = document.querySelector('.menu__btngototoys');
const btnGotoToys2 = document.querySelector('.main-page__btn');
const btnGotoHome = document.querySelector('.menu__btngotohome');

const startPage = document.querySelector('.main-page');
const toysPage = document.querySelector('.toys-page');

const cardsBlock = document.querySelector('.toys-block__cards');

const countSlider = document.querySelector('.count-slider-container');
const yearSlider = document.querySelector('.year-slider-container');

const shapeBtns = document.querySelectorAll('.shape-select button');
const colorBtns = document.querySelectorAll('.color-select button');
const sizeBtns = document.querySelectorAll('.filter__size-elem input[type="checkbox"]');
const favBtns = document.querySelector('.filter__favorite input[type="checkbox"]');
const resetBtn = document.querySelector('.reset-filter');
const sortSelector = document.querySelector('.filter__select-elem');
const searchField = document.querySelector('.control__search');

const maxYear = Math.max.apply(null,
  data.map((elem) => elem.year));
const minYear = Math.min.apply(null,
  data.map((elem) => elem.year));
const minCount = Math.min.apply(null,
  data.map((elem) => elem.count));
const maxCount = Math.max.apply(null,
  data.map((elem) => elem.count));

let count = [minCount, maxCount];
let year = [minYear, maxYear];
let color = [];
let shape = [];
let size = [];
let favorite = false;
let sortFunc = () => 0;
let searchValue = '';
let bookmarks = [];

function gotoStart() {
  startPage.classList.add('hide');
  toysPage.classList.remove('hide');
}

function gotoHome() {
  startPage.classList.remove('hide');
  toysPage.classList.add('hide');
}

noUiSlider.create(countSlider, {
  start: [minCount, maxCount],
  step: 1,
  connect: true,
  behaviour: 'tap',
  range: {
    min: minCount,
    max: maxCount,
  },
});

noUiSlider.create(yearSlider, {
  start: [minYear, maxYear],
  step: 1,
  connect: true,
  range: {
    min: minYear,
    max: maxYear,
  },
});

function isCount(elem) {
  return (elem.count >= count[0] && elem.count <= count[1]);
}

function isYear(elem) {
  return (elem.year >= year[0] && elem.year <= year[1]);
}

function isColor(elem) {
  return color.length === 0 || color.includes(elem.color);
}

function isShape(elem) {
  return shape.length === 0 || shape.includes(elem.shape);
}

function isSize(elem) {
  return size.length === 0 || size.includes(elem.size);
}

function isFavorite(elem) {
  return !favorite || elem.favorite;
}

function isSearch(elem) {
  return elem.name.toLowerCase().includes(searchValue.toLowerCase());
}

function cardToBookmark() {
  if (bookmarks.includes(this.dataset.num)) {
    bookmarks = bookmarks.filter((item) => item !== this.dataset.num);
  } else {
    bookmarks.push(this.dataset.num);
  }
}

function render() {
  const cards = data.filter((elem) => isCount(elem) && isYear(elem) && isColor(elem) && isShape(elem) && isSize(elem) && isFavorite(elem) && isSearch(elem)).sort(sortFunc).reduce((arr, elem) => `${arr}
<div class="card" data-num="${elem.num}">
  <h2 class="card-title">${elem.name}</h2>
  <img class="card-img" src="./assets/toys/${elem.num}.png" alt="toy">
  <div class="card-description">
    <p class="count">Количество:<span>${elem.count}</span></p>
    <p class="year">Год покупки:<span>${elem.year}</span></p>
    <p class="shape">Форма:<span>${elem.shape}</span></p>
    <p class="color">Цвет:<span>${elem.color}</span></p>
    <p class="size">Размер:<span>${elem.size}</span></p>
    <p class="favorite">Любимая:<span>${elem.favorite ? 'да' : 'нет'}</span></p>
  </div>
</div>`, '');

  cardsBlock.innerHTML =
    cards.length === 0 ? '<p>Нет игрушек, отвечающих критериям поиска</p>' : cards;

  const cardsArr = document.querySelectorAll('.card');
  cardsArr.forEach((card) => card.addEventListener('click', cardToBookmark));
}

const countNodes = [document.querySelector('.count-min'), document.querySelector('.count-max')];

countSlider.noUiSlider.on('update', (values, handle) => {
  countNodes[handle].innerHTML = +values[handle];
  count[handle] = +values[handle];
  render();
});

const yearNodes = [document.querySelector('.year-min'), document.querySelector('.year-max')];

yearSlider.noUiSlider.on('update', (values, handle) => {
  yearNodes[handle].innerHTML = +values[handle];
  year[handle] = +values[handle];
  render();
});

function shapeSelect() {
  this.classList.toggle('shape-button-active');
  if (shape.includes(this.dataset.shape)) {
    shape = shape.filter((item) => item !== this.dataset.shape);
  } else {
    shape.push(this.dataset.shape);
  }
  render();
}

function colorSelect() {
  this.classList.toggle('color-button-active');
  if (color.includes(this.dataset.color)) {
    color = color.filter((item) => item !== this.dataset.color);
  } else {
    color.push(this.dataset.color);
  }
  render();
}

function sizeSelect() {
  if (size.includes(this.dataset.size)) {
    size = size.filter((item) => item !== this.dataset.size);
  } else {
    size.push(this.dataset.size);
  }
  render();
}

function favSelect() {
  favorite = this.checked;
  render();
}

function sortFunction() {
  switch (this.value) {
    case 'disabled':
      sortFunc = () => 0;
      break;
    case 'name-max':
      sortFunc = (a, b) => (a.name > b.name ? 1 : -1);
      break;
    case 'name-min':
      sortFunc = (a, b) => (a.name < b.name ? 1 : -1);
      break;
    case 'count-max':
      sortFunc = (a, b) => (+a.count > +b.count ? 1 : -1);
      break;
    case 'count-min':
      sortFunc = (a, b) => (+a.count < +b.count ? 1 : -1);
      break;
    default:
      break;
  }
  render();
}

function searchText() {
  searchValue = this.value;
  render();
}

function resetSelect() {
  count = [minCount, maxCount];
  year = [minYear, maxYear];
  color = [];
  shape = [];
  /* size = []; */
  favorite = false;
  sortFunc = () => 0;
  countSlider.noUiSlider.set([minCount, maxCount]);
  yearSlider.noUiSlider.set([minYear, maxYear]);
  shapeBtns.forEach((elem) => elem.classList.remove('shape-button-active'));
  colorBtns.forEach((elem) => elem.classList.remove('color-button-active'));
  sizeBtns.forEach((elem) => {
    /* const element = elem;
    element.checked = false; */
    if (elem.checked) {
      elem.click();
    }
  });
  favBtns.checked = false;
  sortSelector.value = 'disabled';
  searchValue = '';
  searchField.value = '';
  render();
}

shapeBtns.forEach((elem) => elem.addEventListener('click', shapeSelect));
colorBtns.forEach((elem) => elem.addEventListener('click', colorSelect));
sizeBtns.forEach((elem) => elem.addEventListener('change', sizeSelect));
favBtns.addEventListener('change', favSelect);
resetBtn.addEventListener('click', resetSelect);
sortSelector.addEventListener('change', sortFunction);
searchField.addEventListener('input', searchText);

// startBtn.addEventListener('click', gotoStart);
btnGotoToys2.addEventListener('click', gotoStart);
btnGotoToys.addEventListener('click', gotoStart);

// toHomeBtn.addEventListener('click', gotoHome);
btnGotoHome.addEventListener('click', gotoHome);
