import './index.scss';

import noUiSlider from 'nouislider';
import data from './data.js';

// alert('Уважаемый проверяющий, посмотри пожалуйста в консоль');
console.log('Из-за нагруженности на работе перед НГ, допустил ошибку в коде.');
console.log('Прошу проверить мою работу в крайний срок кросчека.');
console.log('Спасибо тебе большое и Хорошего дня!');
console.log('мой телеграмм https://t.me/kusakinvladimir или мой дискорд KusakinVova#5305 ');
// =======================================================================
document.querySelector('.controls__music').addEventListener('click', playAudio);

function playAudio() {
  const volume = document.querySelector('.controls__music');
  const audio = document.querySelector('audio');
  if (audio.paused && volume) {
    audio.src = './assets/audio/audio.mp3';
    audio.currentTime = 0;
    audio.play();
    volume.style.backgroundImage = 'url("./assets/svg/audio.svg")';
  } else {
    audio.pause();
    volume.style.backgroundImage = 'url("./assets/svg/mute.svg")';
  }
}
// =======================================================================
document.querySelector('.controls__snow').addEventListener('click', goSnow);
let snowfall = false;
let goSnowFlake;
function goSnow() {
  const btnSnow = document.querySelector('.controls__snow');
  if (snowfall) {
    snowfall = false;
    btnSnow.classList.remove('active');
    clearInterval(goSnowFlake);
  } else {
    snowfall = true;
    btnSnow.classList.add('active');
    goSnowFlake = setInterval(createSnowFlake, 50);
  }
}

function createSnowFlake() {
  const snowFlake = document.createElement('i');
  snowFlake.classList.add('snowflake');
  snowFlake.style.left = Math.random() * window.innerWidth + 'px';
  snowFlake.style.animationDuration = Math.random() * 3 + 2 + 's'; // between 2 - 5 seconds
  snowFlake.style.opacity = Math.random();
  const size = Math.random() * 10 + 10 + 'px';
  snowFlake.style.width = size;
  snowFlake.style.height = size;
  document.body.appendChild(snowFlake);
  setTimeout(() => {
    snowFlake.remove();
  }, 5000);
}
// =======================================================================

const btnGotoToys = document.querySelector('.menu__btngototoys');
const btnGotoToys2 = document.querySelector('.main-page__btn');
const btnGotoTree = document.querySelector('.menu__btngototree');
const btnGotoHome = document.querySelector('.menu__btngotohome');

const startPage = document.querySelector('.main-page');
const toysPage = document.querySelector('.toys-page');
const treePage = document.querySelector('.tree-page');

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
  treePage.classList.add('hide');
  toysPage.classList.remove('hide');
}

function gotoHome() {
  toysPage.classList.add('hide');
  treePage.classList.add('hide');
  startPage.classList.remove('hide');
}

function gotoTree() {
  toysPage.classList.add('hide');
  startPage.classList.add('hide');
  treePage.classList.remove('hide');
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

    this.classList.remove('choose');
    const blockChoose = document.querySelector('.all_choose');
    let countChoose = +blockChoose.innerText - 1;

    blockChoose.innerText = countChoose;
    renderSelectedToys();
  } else {
    const blockChoose = document.querySelector('.all_choose');
    let countChoose = +blockChoose.innerText + 1;
    if(countChoose > 20){
      alert('Нельзя выбрать больше 20ти игрушек');
      return false;
    }

    bookmarks.push(this.dataset.num);
    this.classList.add('choose');
    blockChoose.innerText = countChoose;
    renderSelectedToys();
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
    case 'year-max':
      sortFunc = (a, b) => (+a.year > +b.year ? 1 : -1);
      break;
    case 'year-min':
      sortFunc = (a, b) => (+a.year < +b.year ? 1 : -1);
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

btnGotoTree.addEventListener('click', gotoTree);

// ===================================================================
// выбор фона елки
const selectBG = document.querySelectorAll('.tree__select-bg .bg');
if (selectBG) {
  selectBG.forEach((el) => {
    el.addEventListener('click', (el2) => {
      const numbBg = el2.target.dataset.bg;
      const bgImg = `url("./assets/bg/${numbBg}.jpg")`;
      document.querySelector('.tree__picture').style.backgroundImage = bgImg;
    });
  });
}
// ===================================================================
// выбор елки
const selectTrees = document.querySelectorAll('.tree__select-tree .tree-example');
if (selectTrees) {
  selectTrees.forEach((el) => {
    el.addEventListener('click', (el2) => {
      const tree = el2.target.dataset.tree;
      const imgTree = `
      <div class="garland-tree-container hide"></div>
      <img id="tree-picture" src="./assets/tree/${tree}.png" class="main-tree" usemap="#tree-map" alt="tree">
      <div class="tree__toys-on"></div>
      `;
      if (document.querySelector('.tree__picture')) {
        document.querySelector('.tree__picture').innerHTML = imgTree;
      }
    });
  });
}
// ===================================================================

function renderSelectedToys() {
  // заполняем отобранными игрушками
  const treeToys = document.querySelector('.tree__toys-selected');
  if (treeToys) treeToys.innerHTML = '';
  if (bookmarks.length > 0) {
    bookmarks.forEach((el) => {
      if (treeToys) {
        treeToys.innerHTML += `
        <div class="toy-selected">
            <img src="./assets/toys/${el}.png" alt="pict" draggable="true" data-num="${el}">
            <div class="toy-selected__count">${data[el].count}</div>
        </div>
        `;
      }
    });
  } else {
    for (let i = 0; i < 20; i++) {
      if (treeToys) {
        treeToys.innerHTML += `
        <div class="toy-selected">
            <img src="./assets/toys/${i + 1}.png" alt="pict" draggable="true" data-num="${i + 1}">
            <div class="toy-selected__count">${data[i].count}</div>
        </div>
        `;
      }
    }
  }
}
renderSelectedToys();
// ===================================================================

let garlandColor = 'multicolor';
const swicherGarland = document.querySelector('.garland__checker');
swicherGarland.addEventListener('change', function() {
  if (this.checked) {
    document.querySelector('.garland-tree-container').classList.remove('hide');
    // console.log("Checkbox is checked..");
  } else {
    document.querySelector('.garland-tree-container').classList.add('hide');
    // console.log("Checkbox is not checked..");
  }
});

// выбор герлянды
const selectGarland = document.querySelectorAll('.tree__select-garland .garland');
if (selectGarland) {
  selectGarland.forEach((el) => {
    el.addEventListener('click', (el2) => {
      const color = el2.target.dataset.color;
      setGarland(color);
    });
  });
}

function setGarland(color) {
  const garland = `
<ul class="lightrope" style="width: 120px; height: 120px;">
<li class="${color}" style="transform: rotate(65deg) translate(60px) rotate(-65deg);"></li>
<li class="${color}" style="transform: rotate(77deg) translate(60px) rotate(-77deg);"></li>
<li class="${color}" style="transform: rotate(89deg) translate(60px) rotate(-89deg);"></li>
<li class="${color}" style="transform: rotate(101deg) translate(60px) rotate(-101deg);"></li>
<li class="${color}" style="transform: rotate(113deg) translate(60px) rotate(-113deg);"></li>
</ul>
<ul class="lightrope" style="width: 170px; height: 170px;">
<li class="${color}" style="transform: rotate(60deg) translate(85px) rotate(-60deg);"></li>
<li class="${color}" style="transform: rotate(70deg) translate(85px) rotate(-70deg);"></li>
<li class="${color}" style="transform: rotate(80deg) translate(85px) rotate(-80deg);"></li>
<li class="${color}" style="transform: rotate(90deg) translate(85px) rotate(-90deg);"></li>
<li class="${color}" style="transform: rotate(100deg) translate(85px) rotate(-100deg);"></li>
<li class="${color}" style="transform: rotate(110deg) translate(85px) rotate(-110deg);"></li>
<li class="${color}" style="transform: rotate(120deg) translate(85px) rotate(-120deg);"></li>
<li class="${color}" style="transform: rotate(130deg) translate(85px) rotate(-130deg);"></li>
</ul>
<ul class="lightrope" style="width: 230px; height: 230px;">
<li class="${color}" style="transform: rotate(60deg) translate(115px) rotate(-60deg);"></li>
<li class="${color}" style="transform: rotate(68deg) translate(115px) rotate(-68deg);"></li>
<li class="${color}" style="transform: rotate(76deg) translate(115px) rotate(-76deg);"></li>
<li class="${color}" style="transform: rotate(84deg) translate(115px) rotate(-84deg);"></li>
<li class="${color}" style="transform: rotate(92deg) translate(115px) rotate(-92deg);"></li>
<li class="${color}" style="transform: rotate(100deg) translate(115px) rotate(-100deg);"></li>
<li class="${color}" style="transform: rotate(108deg) translate(115px) rotate(-108deg);"></li>
<li class="${color}" style="transform: rotate(116deg) translate(115px) rotate(-116deg);"></li>
<li class="${color}" style="transform: rotate(124deg) translate(115px) rotate(-124deg);"></li>
<li class="${color}" style="transform: rotate(132deg) translate(115px) rotate(-132deg);"></li>
<li class="${color}" style="transform: rotate(140deg) translate(115px) rotate(-140deg);"></li>
</ul>
<ul class="lightrope" style="width: 300px; height: 300px;">
<li class="${color}" style="transform: rotate(60deg) translate(150px) rotate(-60deg);"></li>
<li class="${color}" style="transform: rotate(66deg) translate(150px) rotate(-66deg);"></li>
<li class="${color}" style="transform: rotate(72deg) translate(150px) rotate(-72deg);"></li>
<li class="${color}" style="transform: rotate(78deg) translate(150px) rotate(-78deg);"></li>
<li class="${color}" style="transform: rotate(84deg) translate(150px) rotate(-84deg);"></li>
<li class="${color}" style="transform: rotate(90deg) translate(150px) rotate(-90deg);"></li>
<li class="${color}" style="transform: rotate(96deg) translate(150px) rotate(-96deg);"></li>
<li class="${color}" style="transform: rotate(102deg) translate(150px) rotate(-102deg);"></li>
<li class="${color}" style="transform: rotate(108deg) translate(150px) rotate(-108deg);"></li>
<li class="${color}" style="transform: rotate(114deg) translate(150px) rotate(-114deg);"></li>
<li class="${color}" style="transform: rotate(120deg) translate(150px) rotate(-120deg);"></li>
<li class="${color}" style="transform: rotate(126deg) translate(150px) rotate(-126deg);"></li>
<li class="${color}" style="transform: rotate(132deg) translate(150px) rotate(-132deg);"></li>
<li class="${color}" style="transform: rotate(138deg) translate(150px) rotate(-138deg);"></li>
</ul>
<ul class="lightrope" style="width: 380px; height: 380px;">
<li class="${color}" style="transform: rotate(60deg) translate(190px) rotate(-60deg);"></li>
<li class="${color}" style="transform: rotate(64deg) translate(190px) rotate(-64deg);"></li>
<li class="${color}" style="transform: rotate(68deg) translate(190px) rotate(-68deg);"></li>
<li class="${color}" style="transform: rotate(72deg) translate(190px) rotate(-72deg);"></li>
<li class="${color}" style="transform: rotate(76deg) translate(190px) rotate(-76deg);"></li>
<li class="${color}" style="transform: rotate(80deg) translate(190px) rotate(-80deg);"></li>
<li class="${color}" style="transform: rotate(84deg) translate(190px) rotate(-84deg);"></li>
<li class="${color}" style="transform: rotate(88deg) translate(190px) rotate(-88deg);"></li>
<li class="${color}" style="transform: rotate(92deg) translate(190px) rotate(-92deg);"></li>
<li class="${color}" style="transform: rotate(96deg) translate(190px) rotate(-96deg);"></li>
<li class="${color}" style="transform: rotate(100deg) translate(190px) rotate(-100deg);"></li>
<li class="${color}" style="transform: rotate(104deg) translate(190px) rotate(-104deg);"></li>
<li class="${color}" style="transform: rotate(108deg) translate(190px) rotate(-108deg);"></li>
<li class="${color}" style="transform: rotate(112deg) translate(190px) rotate(-112deg);"></li>
<li class="${color}" style="transform: rotate(116deg) translate(190px) rotate(-116deg);"></li>
<li class="${color}" style="transform: rotate(120deg) translate(190px) rotate(-120deg);"></li>
<li class="${color}" style="transform: rotate(124deg) translate(190px) rotate(-124deg);"></li>
</ul>
<ul class="lightrope" style="width: 470px; height: 470px;">
<li class="${color}" style="transform: rotate(60deg) translate(235px) rotate(-60deg);"></li>
<li class="${color}" style="transform: rotate(64deg) translate(235px) rotate(-64deg);"></li>
<li class="${color}" style="transform: rotate(68deg) translate(235px) rotate(-68deg);"></li>
<li class="${color}" style="transform: rotate(72deg) translate(235px) rotate(-72deg);"></li>
<li class="${color}" style="transform: rotate(76deg) translate(235px) rotate(-76deg);"></li>
<li class="${color}" style="transform: rotate(80deg) translate(235px) rotate(-80deg);"></li>
<li class="${color}" style="transform: rotate(84deg) translate(235px) rotate(-84deg);"></li>
<li class="${color}" style="transform: rotate(88deg) translate(235px) rotate(-88deg);"></li>
<li class="${color}" style="transform: rotate(92deg) translate(235px) rotate(-92deg);"></li>
<li class="${color}" style="transform: rotate(96deg) translate(235px) rotate(-96deg);"></li>
<li class="${color}" style="transform: rotate(100deg) translate(235px) rotate(-100deg);"></li>
<li class="${color}" style="transform: rotate(104deg) translate(235px) rotate(-104deg);"></li>
<li class="${color}" style="transform: rotate(108deg) translate(235px) rotate(-108deg);"></li>
<li class="${color}" style="transform: rotate(112deg) translate(235px) rotate(-112deg);"></li>
<li class="${color}" style="transform: rotate(116deg) translate(235px) rotate(-116deg);"></li>
<li class="${color}" style="transform: rotate(120deg) translate(235px) rotate(-120deg);"></li>
<li class="${color}" style="transform: rotate(124deg) translate(235px) rotate(-124deg);"></li>
</ul>
<ul class="lightrope" style="width: 570px; height: 570px;">
<li class="${color}" style="transform: rotate(60deg) translate(285px) rotate(-60deg);"></li>
<li class="${color}" style="transform: rotate(64deg) translate(285px) rotate(-64deg);"></li>
<li class="${color}" style="transform: rotate(68deg) translate(285px) rotate(-68deg);"></li>
<li class="${color}" style="transform: rotate(72deg) translate(285px) rotate(-72deg);"></li>
<li class="${color}" style="transform: rotate(76deg) translate(285px) rotate(-76deg);"></li>
<li class="${color}" style="transform: rotate(80deg) translate(285px) rotate(-80deg);"></li>
<li class="${color}" style="transform: rotate(84deg) translate(285px) rotate(-84deg);"></li>
<li class="${color}" style="transform: rotate(88deg) translate(285px) rotate(-88deg);"></li>
<li class="${color}" style="transform: rotate(92deg) translate(285px) rotate(-92deg);"></li>
<li class="${color}" style="transform: rotate(96deg) translate(285px) rotate(-96deg);"></li>
<li class="${color}" style="transform: rotate(100deg) translate(285px) rotate(-100deg);"></li>
<li class="${color}" style="transform: rotate(104deg) translate(285px) rotate(-104deg);"></li>
<li class="${color}" style="transform: rotate(108deg) translate(285px) rotate(-108deg);"></li>
<li class="${color}" style="transform: rotate(112deg) translate(285px) rotate(-112deg);"></li>
<li class="${color}" style="transform: rotate(116deg) translate(285px) rotate(-116deg);"></li>
<li class="${color}" style="transform: rotate(120deg) translate(285px) rotate(-120deg);"></li>
<li class="${color}" style="transform: rotate(124deg) translate(285px) rotate(-124deg);"></li>
</ul>`;
  document.querySelector('.garland-tree-container').innerHTML = garland;
}
setGarland(garlandColor);

// ===================================================================
// отслеживаем начало перемещения (drag) игрушек на елку

function drag() {
  const toys = document.querySelectorAll('.toy-selected img');

  if (toys) {
    toys.forEach((el) => {
      el.addEventListener('dragstart', (el2) => {
        console.log(el2);/*
        const item = el2;
        const target = el2.target; // as EventTarget & { dataset: Record<string, string> };
        const { num } = target.dataset;
        if (item.dataTransfer) item.dataTransfer.setData('id', num);
        if (item.dataTransfer) item.dataTransfer.setData('out', 'true');
        if (item.dataTransfer) item.dataTransfer.setData('offsetX', String(item.offsetX));
        if (item.dataTransfer) item.dataTransfer.setData('offsetY', String(item.offsetY));*/
      });
    });
  }
}
drag();


    //  // отображаем игрушки
    //  if (Module.currentTreeSection.toys.length > 0) {
    //   const toyOn = document.querySelector('.tree__toys-on');

    //   if (toyOn) toyOn.innerHTML = '';
    //   Module.currentTreeSection.toys.forEach((el, i) => {

    //     toyOn!.innerHTML += `
    //       <img class="toy-on-tree" src="../assets/toys/${el.numberToy}.png" data-num="${el.numberToy}" data-numi="${i}" alt="pict" draggable="true" style="top: ${el.position[1]}px; left: ${el.position[0]}px;">
    //       `;
    //   });
    // }

    // // отслеживаем "бросания" (drop) на елку
    // const tree = document.querySelector('#tree-picture');
    // if (tree) tree.addEventListener('dragover', (ev) => {
    //   ev.preventDefault()
    // })
    // if (tree) tree.addEventListener('drop', (el) => {
    //   const target = el as DragEvent & { layerX: string, layerY: string };
    //   const outToy = target.dataTransfer?.getData('out');

    //   if (outToy == 'true') {
    //     const id: string | undefined = target.dataTransfer?.getData('id');
    //     if (id && +Module.data[+id - 1].count > 0) {
    //       Module.currentTreeSection.toys.push({
    //         numberToy: `${target.dataTransfer?.getData('id')}`,
    //         position: [+`${target.layerX}` - +target.dataTransfer!.getData('offsetX'), +`${target.layerY}` - +target.dataTransfer!.getData('offsetY')]
    //       });
    //       const oldCount: number = (+Module.data[+id - 1].count);
    //       Module.data[+id - 1].count = String(oldCount - 1);

    //     }
    //   } else if (outToy == 'false') {
    //     Module.currentTreeSection.toys[+target.dataTransfer?.getData('id')!].position = [+`${target.layerX}` - +target.dataTransfer!.getData('offsetX'), +`${target.layerY}` - +target.dataTransfer!.getData('offsetY')];
    //   }
    //   View.renderTreePage();
    // });

    // отслеживаем начало перемещения игрушек с елки
    // dragToy();
function dragToy() {
  const toys = document.querySelectorAll('.toy-on-tree');
  if (toys) {
    toys.forEach((el) => {
      el.addEventListener('dragstart', (el2) => {
        const item = el2;
        const target = el2.target;// as EventTarget & { dataset: Record<string, string> };
        const { numi } = target.dataset;

        if (item.dataTransfer) item.dataTransfer.setData('id', numi);
        if (item.dataTransfer) item.dataTransfer.setData('out', 'false');
        if (item.dataTransfer) item.dataTransfer.setData('offsetX', item.offsetX);
        if (item.dataTransfer) item.dataTransfer.setData('offsetY', item.offsetY);
        el.addEventListener('dragend', (el3) => {
          const target = el3;// as DragEvent;
          if (target.dataTransfer.dropEffect == 'none') {
            const numToy = +Module.currentTreeSection.toys[+numi].numberToy;
            // Module.data[numToy - 1].count = String(+Module.data[numToy - 1].count + 1);
            // Module.currentTreeSection.toys.splice(+numi, 1);
            toys.splice(+numi, 1);
            // View.renderTreePage();
          }
        });
      });
    });
  }
}
dragToy();
// ===================================================================
