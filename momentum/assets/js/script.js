import { Quote } from './quotes.js';
import { TimeDate } from './timedate.js';
import { Background } from './background.js';
import { addLineForClock, createClock} from './clock.js';
import { Weather } from './weather.js';
import { audioPlayer } from './audioplayer.js';
import { Translate } from './translate.js';

//--------------------------------
let lang = localStorage.getItem('lang') || 'en';

document.querySelector('input[name="lang"][value="'+lang+'"]').checked = true

const translate = new Translate;
translate.update(lang);

if(document.querySelector('input[name="lang"]')){
  document.querySelectorAll('input[name="lang"]').forEach((elem) => {
      elem.addEventListener("click", function(event){
          lang = event.target.value;
          updateQuote();
          updateGreetings();
          updateDate();
          updateWeath();
          translate.update(lang);
          localStorage.setItem('lang', lang);
      });
  });
}

//--------------------------------
// setings



const checkerClock = document.querySelector('.chcker-clock');
checkerClock.addEventListener('change', function () {
  document.querySelector('.clock-block').classList.toggle('hide');
  localStorage.setItem('clock', checkerClock.checked);
});
if(localStorage.getItem('clock') === 'false') {
  document.querySelector('.clock-block').classList.add('hide');
  checkerClock.checked = false;
}


const checkerTime = document.querySelector('.chcker-time');
checkerTime.addEventListener('change', function () {
  document.querySelector('.time').classList.toggle('hide');
  localStorage.setItem('time', checkerTime.checked);
});
if(localStorage.getItem('time') === 'false') {
  document.querySelector('.time').classList.add('hide');
  checkerTime.checked = false;
}


const checkerDate = document.querySelector('.chcker-date');
checkerDate.addEventListener('change', function () {
  document.querySelector('.date').classList.toggle('hide');
  localStorage.setItem('date', checkerDate.checked);
});
if(localStorage.getItem('date') === 'false'){
  document.querySelector('.date').classList.add('hide');
  checkerDate.checked = false;
}

const checkerWeather = document.querySelector('.chcker-weather');
checkerWeather.addEventListener('change', function () {
  document.querySelector('.weather-block').classList.toggle('hide');
  localStorage.setItem('weather', checkerWeather.checked);
});
if(localStorage.getItem('weather') === 'false'){
  document.querySelector('.weather-block').classList.add('hide');
  checkerWeather.checked = false;
}


const checkerQuote = document.querySelector('.chcker-quote');
checkerQuote.addEventListener('change', function () {
  document.querySelector('.quote__block').classList.toggle('hide');
  localStorage.setItem('quote', checkerQuote.checked);
});
if(localStorage.getItem('quote') === 'false'){
  document.querySelector('.quote__block').classList.add('hide');
  checkerQuote.checked = false;
}


const checkerGreeting = document.querySelector('.chcker-greeting');
checkerGreeting.addEventListener('change', function () {
  document.querySelector('.greeting-container').classList.toggle('hide');
  localStorage.setItem('greeting', checkerGreeting.checked);
});
if(localStorage.getItem('greeting') === 'false'){
  document.querySelector('.greeting-container').classList.add('hide');
  checkerGreeting.checked = false;
}


const checkerPlayer = document.querySelector('.chcker-player');
checkerPlayer.addEventListener('change', function () {
  document.querySelector('.player-block').classList.toggle('hide');
  localStorage.setItem('player', checkerPlayer.checked);
});
if(localStorage.getItem('player') === 'false'){
  document.querySelector('.player-block').classList.add('hide');
  checkerPlayer.checked = false;
}


const checkerFooter = document.querySelector('.chcker-footer');
checkerFooter.addEventListener('change', function () {
  document.querySelector('.footer__list').classList.toggle('hide');
  localStorage.setItem('footer', checkerFooter.checked);
});
if(localStorage.getItem('footer') === 'false'){
  document.querySelector('.footer__list').classList.add('hide');
  checkerFooter.checked = false;
}

//--------------------------------
// pop show
const popBlock = document.querySelector('.pop');
const buttonCloser = document.querySelector('.pop-closer');
const buttonSettings = document.querySelector('.settings-button');
buttonSettings.addEventListener('click', function () {
  popBlock.classList.toggle('show');
});

buttonCloser.addEventListener('click', function () {
  popBlock.classList.toggle('show');
});
//--------------------------------
audioPlayer('.player');
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

const userCity = document.querySelector('.user__city');
let userCityValue = localStorage.getItem('user__city') || 'Minsk';
userCity.value = userCityValue;
const weather = new Weather('.weather');
function updateWeath(){
  weather.updateWeather(lang);
}
updateWeath();

userCity.addEventListener('change', function () {
  userCityValue = userCity.value;
  localStorage.setItem('user__city', userCityValue);
  updateWeath();
});

//--------------------------------
const userName = document.querySelector('.user__name');
userName.value = localStorage.getItem('user__name') || '';
userName.addEventListener('input', function () {
    localStorage.setItem('user__name', userName.value);
});
//--------------------------------







//--------------------------------
console.log('%c'+ 'Моя оценка 144 из 160:', 'color: #008000; font-size: 18px');
console.log('%c'+ 'Какие пункты не выполнены на текущий момент:', 'color: #008000; font-size: 18px');
console.log('-   в качестве источника изображений может использоваться Unsplash API');
console.log('-   в качестве источника изображений может использоваться Flickr API');
console.log('-   в настройках приложения можно указать источник получения фото для фонового изображения: коллекция изображений GitHub, Unsplash API, Flickr API');
console.log('-   если источником получения фото указан API, в настройках приложения можно указать тег/теги, для которых API будет присылает фото');
//--------------------------------
