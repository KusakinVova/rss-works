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

// let console_style = 'color: #ecb830; font-size: 14px';
// console.log('%c'+ 'Привет!', 'color: #008000; font-size: 24px');
// console.log('%c'+ 'Ты уже видел это сообщение и сегодня 07.10, дедлайн кросчека.', 'color: #008000; font-size: 24px');
// console.log('%c'+ 'Сейчас делаю меню.', 'color: #008000; font-size: 24px');
// console.log('%c'+ 'Пожалуйста, если не сложно, проверь мою работу после 9 вечера в последний день Кросчека.', console_style);
// console.log('%c'+ 'Мой телеграмм для связи https://t.me/kusakinvladimir ', console_style);
