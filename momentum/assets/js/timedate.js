export class TimeDate {
  constructor(lang){
    this.Names = {
      ru : {
        month : ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'],
        weekdays : ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        greetings : ['Доброй ночи', 'Доброе утро', 'Добрый день', 'Добрый вечер']
      },
      en : {
        month : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        weekdays : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thuresday', 'Friday', 'Saturday'],
        greetings : ['Good night', 'Good morning', 'Good afternoon', 'Good evening']
      }
    };
    this.daytime = ['night', 'morning', 'afternoon', 'evening'];
  }

  getMonthName(lang, value){
    if(lang !== 'ru' && lang !== 'en') lang = 'en';
    return this.Names[lang].month[value];
  }

  getWeekDayName(lang, value){
    if(lang !== 'ru' && lang !== 'en') lang = 'en';
    return this.Names[lang].weekdays[value];
  }

  getGreetings(lang){
    if(lang !== 'ru' && lang !== 'en') lang = 'en';
    const value = this.getPartDate();
    return this.Names[lang].greetings[value];
  }

  getPartDateName(){
    const value = this.getPartDate();
    return this.daytime[value];
  }

  getPartDate(){
    const now = new Date();
    const hours = now.getHours();
    const value = Math.floor( hours / 6) ;
    return value;
  }

  getTime(){
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();
    return {hours: hours, minutes: minutes, seconds: seconds};
  }

  getTimeStr(){
    const time = this.getTime();
    let hours, minutes, seconds = 0;
    time.hours < 10 ? hours = '0'+ time.hours : hours = time.hours;
    time.minutes < 10 ? minutes = '0'+ time.minutes : minutes = time.minutes;
    time.seconds < 10 ? seconds = '0'+ time.seconds : seconds = time.seconds;
    return `${hours}:${minutes}:${seconds}`;
  }

  getDateStr(lang){
    if(lang !== 'ru' && lang !== 'en') lang = 'en';
    const now = new Date();
    const year = now.getFullYear();
    const date = now.getDate();
    const monthName = this.getMonthName(lang, now.getMonth());
    const weekdayName = this.getWeekDayName(lang, now.getDay());
    let fulldateLine = '';
    if(lang === 'en') fulldateLine = `${weekdayName}, ${monthName} ${date}`;
    if(lang === 'ru') fulldateLine = `${weekdayName}, ${date} ${monthName}`;
    return fulldateLine;
  }


}
