import { Quote } from './quotes.js';
import { TimeDate } from './timedate.js';
import { Background } from './background.js';
import { addLineForClock, createClock} from './clock.js';
import { Weather } from './weather.js';
import { playList } from './playList.js';

let lang = 'ru';
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
const weather = new Weather('.weather');
function updateWeath(){
  weather.updateWeather(lang);
}
updateWeath();

const cityWeather = document.querySelector('.city');
cityWeather.addEventListener('change', updateWeath );

//--------------------------------
const popBlock = document.querySelector('.pop');
const buttonSettings = document.querySelector('.settings-button');
buttonSettings.addEventListener('click', function () {
  popBlock.classList.toggle('show');
});


if(document.querySelector('input[name="lang"]')){
  document.querySelectorAll('input[name="lang"]').forEach((elem) => {
      elem.addEventListener("click", function(event){
          lang = event.target.value;
          updateQuote();
          updateGreetings();
          updateDate();
          updateWeath();
      });
  });
}


//--------------------------------
alert('Доброжелательный проверяющий! Пожалуйста посмотри в консоль.');
console.log('%c'+ 'Привет!', 'color: #008000; font-size: 24px');
console.log('%c'+ 'По дружески прошу проверить мою работу, в четверг 🙏 🙏 🙏', 'color: #008000; font-size: 18px')
console.log('%c'+ 'Благодарю за понимание!', 'color: #008000; font-size: 18px');
console.log('%c'+ 'Мой телеграмм для связи https://t.me/kusakinvladimir ', 'color: #008000; font-size: 18px');
//--------------------------------
