import { Quote } from './quotes.js';
import { TimeDate } from './timedate.js';
import { Background } from './background.js';
import { addLineForClock, createClock} from './clock.js';
import { playList } from './playList.js';

const lang = 'ru';
//--------------------------------
const quote = new Quote;

const buttonUpdateQuote = document.querySelector(".change-quote");
function updateQuote(){
  const quote_val = quote.getRand(lang);
  document.querySelector('.quote').innerHTML = quote_val[1];
  document.querySelector('.author').innerHTML = quote_val[0];
}
buttonUpdateQuote.addEventListener('click', updateQuote);
updateQuote();
//--------------------------------
const background = new Background;

function randBg(){
  let urlimg = background.getRandUrlImg();
  document.querySelector('body').style.backgroundImage = `url('${urlimg}')`;
}
randBg();

const buttonPrevSlide = document.querySelector(".slide-prev");
buttonPrevSlide.addEventListener('click', prevBg);
function prevBg(){
  let urlimg = background.getPrevUrlImg();
  document.querySelector('body').style.backgroundImage = `url('${urlimg}')`;
}

const buttonNextSlide = document.querySelector(".slide-next");
buttonNextSlide.addEventListener('click', nextBg);
function nextBg(){
  let urlimg = background.getNextUrlImg();
  document.querySelector('body').style.backgroundImage = `url('${urlimg}')`;
}
//--------------------------------
const time_date = new TimeDate;

function updateGreetings(){
  document.querySelector('.greeting').innerHTML = time_date.getGreetings(lang);
}
updateGreetings();

function updateTime(){
  document.querySelector('.time').innerHTML = time_date.getTimeStr();
}
updateTime();
setInterval(updateTime, 1000);

function updateDate(){
  document.querySelector('.date').innerHTML = time_date.getDateStr(lang);
}
updateDate();
//--------------------------------
addLineForClock('.clock');
createClock('.clock');
//--------------------------------
// console.log(playList);
//--------------------------------
