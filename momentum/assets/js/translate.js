export class Translate {
  constructor() {
    this.translate = {
      ru : {
        placeholdername: '[Введите ваше имя]',
        placeholdercity: '[Введите ваш город]',
        settings : 'Настройки',
        settingslang : 'Язык:',
        settingsshohide : 'Показать / Скрыть:',
        settingsweather : 'Погода:',
        settingsquotes : 'Цитаты:',
        settingstime : 'Время:',
        settingsdate : 'Дата:',
        settingsgreeting : 'Приветствие:',
        settingsplayer : 'Плеер:',
        settingsfooter : 'Футер:',
        settingsClock : 'Часы:',
        footertask : 'Задание',
      },
      en : {
        placeholdername: '[Enter name]',
        placeholdercity: '[Enter city]',
        settings : 'Settings',
        settingslang : 'Language:',
        settingsshohide : 'Show / Hide:',

        settingsweather : 'Weather:',
        settingsquotes : 'Quotes:',
        settingstime : 'Time:',
        settingsdate : 'Date:',
        settingsgreeting : 'Welcome:',
        settingsplayer : 'Player:',
        settingsfooter : 'Footer:',
        settingsClock : 'Clock:',

        footertask : 'Task',

      }
    }
  };

  update(lang){
    if(lang !== 'ru' && lang !== 'en') lang = 'en';
    document.querySelector('.user__name').setAttribute('placeholder', this.translate[lang].placeholdername);
    document.querySelector('.user__city').setAttribute('placeholder', this.translate[lang].placeholdercity);
    document.querySelector('.pop__title').textContent = this.translate[lang].settings;
    document.querySelector('.title_lang').textContent = this.translate[lang].settingslang;
    document.querySelector('.title_show_hide').textContent = this.translate[lang].settingsshohide;

    document.querySelector('.settingsweather').textContent = this.translate[lang].settingsweather;
    document.querySelector('.settingsquotes').textContent = this.translate[lang].settingsquotes;
    document.querySelector('.settingstime').textContent = this.translate[lang].settingstime;
    document.querySelector('.settingsdate').textContent = this.translate[lang].settingsdate;
    document.querySelector('.settingsgreeting').textContent = this.translate[lang].settingsgreeting;
    document.querySelector('.settingsplayer').textContent = this.translate[lang].settingsplayer;
    document.querySelector('.settingsfooter').textContent = this.translate[lang].settingsfooter;
    document.querySelector('.settingsClock').textContent = this.translate[lang].settingsClock;

    document.querySelector('.footertask').textContent = this.translate[lang].footertask;

  };
};
