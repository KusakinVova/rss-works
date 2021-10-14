import { gallery } from './gallery.js';
import { popup } from './popup.js';
import { player } from './player.js';
import { ripple } from './ripple.js';
import { select } from './select.js';
import { menu } from './menu.js';
import { videoplayer } from './videoplayer.js';

gallery();
popup('.popup');
player();
ripple('.ripple');
menu('.headernav', '.headernav__burger', '.welcome__info');
select('.buytform__selectstyle');
videoplayer();

// --------------------------------------------
// welcome slider
function welcome_slider(){
  const splide__welcome = new Splide( '.splide__welcome', {
    type   : 'loop',
    arrows : false,
    pagination : false,
  });
  splide__welcome.mount();

  const slider_left = document.querySelector('.slider__controlarrow_left');
  slider_left.addEventListener('click', function (e) {
    splide__welcome.go( '<' );
  });

  const slider_right = document.querySelector('.slider__controlarrow_right');
  slider_right.addEventListener('click', function (e) {
    splide__welcome.go( '>' );
  });

  const slider_dots = document.querySelectorAll('.slider__controldots_dot');

  Array.prototype.forEach.call(slider_dots, function (slider_dots, index) {
    slider_dots.addEventListener('click', function () {
      splide__welcome.go(index);
    });
  });

  function updateinfo(){
    const img_index = splide__welcome.index;
    const img_numb = img_index + 1;

    const block_numb = document.querySelector('.slider__controlnumb_cur');
    block_numb.innerHTML = '0'+img_numb;

    [].forEach.call(slider_dots, function(el) {el.classList.remove('slider__controldots_dot_active')});
    slider_dots[img_index].classList.add('slider__controldots_dot_active');
  }

  splide__welcome.on( 'mounted move', function () {
    updateinfo();
  });

}
welcome_slider();

// --------------------------------------------
// map
function createMap(){
  mapboxgl.accessToken = 'pk.eyJ1IjoiYmlnb2QiLCJhIjoiY2t1bjNpeWh5MWp2cTJxbzYydjBseW5pdyJ9.vQCpWdNpmMveX_bxVrqPwA';
  const map = new mapboxgl.Map({
      container: 'mapContacts', // container ID
      style: 'mapbox://styles/mapbox/light-v10', // style URL
      center: [2.3364, 48.86091], // starting position
      zoom: 15.75, // starting zoom
  });
  map.addControl(new mapboxgl.NavigationControl());

  const markers = {
    0 : { text: 'Museum marker1', color: '#171717', coordinates : [2.3364, 48.86091] },
    1 : { text: 'Museum marker2', color: '#757575', coordinates : [2.3333, 48.8602] },
    2 : { text: 'Museum marker3', color: '#757575', coordinates : [2.3397, 48.8607] },
    3 : { text: 'Museum marker4', color: '#757575', coordinates : [2.3330, 48.8619] },
    4 : { text: 'Museum marker5', color: '#757575', coordinates : [2.3365, 48.8625] },
  };

  for (const [key, value] of Object.entries(markers)) {
    let mappopup = new mapboxgl.Popup({ offset: 25 }).setText(value.text);

    new mapboxgl.Marker({color: value.color ,draggable: false})
      .setLngLat(value.coordinates)
      .setPopup(mappopup)
      .addTo(map);
  }
}
createMap();
// --------------------------------------------
// explorer line
function updateExplorer(){
  const explore__imgs = document.querySelector('.explore__imgs');
  const explorer_line = document.querySelector('.explore__img_arrow');
  const explore__img_before = document.querySelector('.explore__img_before');
  const explore__img_after = document.querySelector('.explore__img_after');

  let line_position = explorer_line.offsetLeft;
  let line_width_half = explorer_line.offsetWidth / 2;
  let block_maxwidth = explore__imgs.offsetWidth;
  let line_start_pos = line_position + line_width_half;
  let line_position_old, line_position_new = 0;

  explore__imgs.addEventListener('mouseup', upMouse);
  document.querySelector('body').addEventListener('mouseup', upMouse);

  function upMouse() {
    explore__imgs.removeEventListener('mousemove', moveMouse);
  }

  function downMouse(e) {
    line_position_old = e.clientX;
    explore__imgs.addEventListener('mousemove', moveMouse);
  }

  function moveMouse(e) {
    line_position_new = e.clientX;
    line_start_pos -= (line_position_old - line_position_new);
    if (line_start_pos > block_maxwidth) line_start_pos = block_maxwidth;
    if (line_start_pos < 0) line_start_pos = 0;
    updateBlock(line_start_pos);
    line_position_old = line_position_new;
  }

  function updateBlock(position) {
    explorer_line.style.left = (position - line_width_half) + "px";
    explore__img_before.style.maxWidth = (position) + "px";
    explore__img_after.style.maxWidth = (block_maxwidth - position) + "px";
    explorer_line.addEventListener('mousedown', downMouse);
  }

  updateBlock(line_start_pos);
}
updateExplorer();
// --------------------------------------------
function goup(){
  let rootElement = document.documentElement;
  let mybutton = document.querySelector(".button_goup");
  mybutton.addEventListener("click", scrollToTop);
  function scrollToTop(){
    rootElement.scrollTo({ top: 0, behavior: "smooth"});
  }

  window.onscroll = function() {scrollFunction()};

  function scrollFunction() {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
      mybutton.classList.add('show');
    } else {
      mybutton.classList.remove('show');
    }
  }
}
goup();
// --------------------------------------------


// раскоменти ЮТУБ видео
// alert('Доброжелательный проверяющий! Пожалуйста посмотри в консоль.');
// console.log('%c'+ 'Сейчас делаю калькулятор', 'color: #008000; font-size: 24px');
// console.log('%c'+ 'Привет!', 'color: #008000; font-size: 24px');
// console.log('%c'+ 'Возможно вы уже видели мое сообщение с просьбой!', 'color: #008000; font-size: 18px');
// console.log('%c'+ 'По дружески прошу проверить мою работу, после 9ти часов вечера 🙏 🙏 🙏', 'color: #008000; font-size: 18px')
// console.log('%c'+ 'Благодарю за понимание!', 'color: #008000; font-size: 18px');
// console.log('%c'+ 'Мой телеграмм для связи https://t.me/kusakinvladimir ', 'color: #008000; font-size: 18px');
console.log('%c'+ 'Благодарю 🙏 🙏 🙏, что пошли на встречу, и проверяете мою работу в последний момент', 'color: #008000; font-size: 18px');
console.log('%c'+ 'Моя оценка 134 из 160:', 'color: #008000; font-size: 18px');
console.log('%c'+ 'Какие пункты выполнены на текущий момент:', 'color: #008000; font-size: 18px');
console.log('+   1 Слайдер в секции Welcome (+24)');
console.log('+   2 Слайдер в секции Video (+20)');
console.log('+   3 Кастомный видеоплеер (+36)');
console.log('+   4 Слайдер сравнения изображений в секции Explore (+10)');
console.log('+   5 Анимация при прокрутке изображений в секции Galery (+8)');
console.log('+   6 Калькулятор продажи билетов в секции Tiskets (+10)');
console.log('+/- 7 Калькулятор продажи билетов в форме продажи билетов (+14)');
console.log('    8 Валидация формы (+16)');
console.log('+   9 Интерактивная карта в секции Contacts (+12)');
console.log('+   10 Кнопка GoUp. Любой собственный дополнительный функционал (+10)');
