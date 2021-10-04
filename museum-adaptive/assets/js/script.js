import { gallery } from './gallery.js';
import { popup } from './popup.js';
import { player } from './player.js';
import { ripple } from './ripple.js';
import { select } from './select.js';

gallery();
popup('.popup');
player();
ripple('.ripple');
select('.buytform__selectstyle');

let console_style = 'color: #ecb830; font-size: 14px';
console.log('%c'+ 'Привет!', 'color: #008000; font-size: 24px');
console.log('%c'+ 'Я не успел сделать работу к Дедлайну.', console_style);
console.log('%c'+ 'Пожалуйста, если не сложно, проверь мою работу в последний день Кросчека.', console_style);
console.log('%c'+ 'Мой телеграмм для связи https://t.me/kusakinvladimir ', console_style);
