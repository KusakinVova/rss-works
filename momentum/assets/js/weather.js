export class Weather {
  constructor(className) {
    this.text = {
      ru : {
        error_1 : 'Ошибка! ',
        error_2 : ' - город не найден!',
        windy : 'Скорость ветра: ',
        windy_ms : ' м/с',
        humidity : 'Влажност: ',
      },
      en : {
        error_1 : 'Error! ',
        error_2 : ' - city not found!',
        windy : 'Wind speed: ',
        windy_ms : ' m/s',
        humidity : 'Humidity: ',
      }
    },
    this.className = className;
  }

  async updateWeather(lang) {
    if(lang !== 'ru' && lang !== 'en') lang = 'en';

    const parentBlock = document.querySelector(this.className);
    const weatherCityInput = parentBlock.querySelector('.city');
    const weatherIconBlock = parentBlock.querySelector('.weather-icon');
    const weatherTemperatureBlock = parentBlock.querySelector('.temperature');
    const weatherDescriptionBlock = parentBlock.querySelector('.weather-description');
    const weatherWindBlock = parentBlock.querySelector('.wind');
    const weatherHumidityBlock = parentBlock.querySelector('.humidity');
    const weatherErrorBlock = parentBlock.querySelector('.weather-error');

    let city = weatherCityInput.value;
    if(city === '') city = 'Minsk';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=bfe22651f723c15dc83c2951d6345744&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod === '404' || data.cod === '400') {
      weatherErrorBlock.textContent = this.text[lang].error_1 + city + this.text[lang].error_2;
      weatherIconBlock.className = 'weather-icon owf';
      weatherTemperatureBlock.textContent = '';
      weatherDescriptionBlock.textContent = '';
      weatherWindBlock.textContent = '';
      weatherHumidityBlock.textContent = '';
      return;
    }

    weatherErrorBlock.textContent = '';
    weatherIconBlock.className = 'weather-icon owf';
    weatherIconBlock.classList.add(`owf-${data.weather[0].id}`);
    weatherTemperatureBlock.textContent = `${Math.floor(data.main.temp)}°C`;
    weatherDescriptionBlock.textContent = data.weather[0].description;
    weatherWindBlock.textContent = this.text[lang].windy + Math.round(data.wind.speed) + this.text[lang].windy_ms;
    weatherHumidityBlock.textContent = this.text[lang].humidity + Math.round(data.main.humidity) + '%';
  }

}
