import { gallery } from './gallery.js';
import { popup } from './popup.js';
import { player } from './player.js';
import { ripple } from './ripple.js';
import { select } from './select.js';
import { menu } from './menu.js';

gallery();
popup('.popup');
player();
ripple('.ripple');
menu('.headernav', '.headernav__burger', '.welcome__info');
select('.buytform__selectstyle');


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

// let console_style = 'color: #ecb830; font-size: 14px';
// console.log('%c'+ 'Привет!', 'color: #008000; font-size: 24px');
// console.log('%c'+ 'Ты уже видел это сообщение и сегодня 07.10, дедлайн кросчека.', 'color: #008000; font-size: 24px');
// console.log('%c'+ 'Сейчас делаю меню.', 'color: #008000; font-size: 24px');
// console.log('%c'+ 'Пожалуйста, если не сложно, проверь мою работу после 9 вечера в последний день Кросчека.', console_style);
// console.log('%c'+ 'Мой телеграмм для связи https://t.me/kusakinvladimir ', console_style);
