export function addLineForClock(className) {
  const clockElements = document.querySelectorAll(className+'-circle');
  for (let i = 0; i < clockElements.length; i++) {
    for (let l = 0; l < 60; l++) {
      let innerDiv = document.createElement('div');
      if( l % 5 == 0 ) innerDiv.className = 'clock-point';
      else innerDiv.className = 'clock-point clock-point-small';
      innerDiv.style.transform = `rotate(${l*6}deg)`;
      clockElements[i].appendChild(innerDiv)
    }
  }
}

export function createClock(className) {
  const clocklineTransition = document.querySelector(className+'-line').style.transition;
  const setDate = () => {

    const now = new Date();
    const clientTimezone = now.getTimezoneOffset() / 60;

    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    //-------------------------------
    // update all clocks

    const secondLine = document.querySelectorAll(className+'-line-sec');
    const secondsDeg = (seconds * 6 + 90);
    for (let i = 0; i < secondLine.length; i++) {

      seconds == 0
      ? (secondLine[i].style.transitionDuration = '0s')
      : (secondLine[i].style.transitionDuration = clocklineTransition);

      secondLine[i].style.transform = `rotate(${secondsDeg}deg)`;
    }

    const minuteLine = document.querySelectorAll(className+'-line-min');
    const minutesDeg = (minutes * 6 + 90);
    for (let i = 0; i < minuteLine.length; i++) {

      minutes == 0
      ? (minuteLine[i].style.transitionDuration = '0s')
      : (minuteLine[i].style.transitionDuration = clocklineTransition);

      minuteLine[i].style.transform = `rotate(${minutesDeg}deg)`;
    }

    const arrClock = document.querySelectorAll(className);
    const hourLine = document.querySelectorAll(className+'-line-hour');
    for (let i = 0; i < hourLine.length; i++) {
      let hour_timezone = 0;
      let timezone = +arrClock[i].dataset.timezone;
      if( isNaN(timezone)  || timezone == 'my') hour_timezone = hours;
      else hour_timezone = hours + timezone + clientTimezone;

      const hoursDeg = 0.5 * (hour_timezone * 60 + minutes) + 90;

      hour_timezone == 0
      ? (hourLine[i].style.transitionDuration = '0s')
      : (hourLine[i].style.transitionDuration = clocklineTransition);

      hourLine[i].style.transform = `rotate(${hoursDeg}deg)`;
    }

  }
  setDate();
  setInterval(setDate, 1000);
}
