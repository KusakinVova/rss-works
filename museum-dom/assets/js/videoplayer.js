export function videoplayer() {

  function decimalAdjust(type, value, exp) {
    // Если степень не определена, либо равна нулю...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // Если значение не является числом, либо степень не является целым числом...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Сдвиг разрядов
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Обратный сдвиг
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }
  Math.round10 = function(value, exp) {
    return decimalAdjust('round', value, exp);
  };

  // ============================================
  // определение положение елемента в документе.
  function offset(el){
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {top: rect.top + scrollTop, left: rect.left + scrollLeft};
  }
  // ============================================
  // Elements
  let volumeVal = 0; // буфер для значения звука

  const player = document.querySelector('.video__player');
  const video = player.querySelector('.video');
  const videoBlock = player.querySelector('.player__videoblock');
  const blockInfoText = player.querySelector('.player__infotext');
  const blockInfo = player.querySelector('.player__info');

  const buttonPlayBig = player.querySelector('.player__button_playvideo');
  const buttonPlaySm = player.querySelector('.player__button_play');
  const buttonVolume = player.querySelector('.player__button_volume');

  const rangeVolume = document.querySelector('.player__line_volume');
  volumeVal = rangeVolume.value;
  const rangeTime = document.querySelector('.player__line_time');

  const buttonFullScreen = player.querySelector('.player__button_fullscreen');
  const panelControl = player.querySelector('.player__controls');

  // const itemsVideo = document.querySelectorAll('.video__item');
  let videoPlay = video.getAttribute('src');
  let videoPosition = video.getAttribute('data-position');
  // ============================================
  // Functions
  function togglePlay() {
    if (video.paused || video.ended) {
      buttonPlayBig.classList.add('toggle');
      buttonPlaySm.classList.add('toggle');
      video.play();
    } else {
      buttonPlayBig.classList.remove('toggle');
      buttonPlaySm.classList.remove('toggle');
      video.pause();
    }
  }
  function toggleMuted() {
    if (video.muted) {
      rangeVolume.value = volumeVal;
      volumeUpdate(rangeVolume, volumeVal);
      updateTextInfo('Mute Off!');
      video.muted = false;
    } else {
      rangeVolume.value = 0;
      volumeUpdate(rangeVolume, 0);
      updateTextInfo('Mute ON!', 'show');
      video.muted = true;
    }
  }

  function toggleRateUp(){
    video.playbackRate = Math.round10(video.playbackRate + 0.1, -1);
    updateTextInfo('Play rateup > ' + video.playbackRate);
  }

  function toggleRateDown(){
    video.playbackRate = Math.round10(video.playbackRate - 0.1, -1);
    updateTextInfo('Play ratedown < ' + video.playbackRate);
  }

  function updateTextInfo(text, animate = true){

    blockInfoText.textContent = text;

    if(animate === true) {
      blockInfo.classList.add('active');
      setTimeout( () => {
        blockInfo.classList.remove('active');
      }, 2000);
    }

    if(animate === 'show') blockInfo.classList.add('active');
    if(animate === 'hide') blockInfo.classList.remove('active');

  }
  // function nextVideo(){

  //   let videoPositionNew = +videoPosition + 1;
  //   if(itemsVideo.length < videoPositionNew) videoPositionNew = '1';
  //   videoPosition = ''+videoPositionNew;
  //   const videosource = itemsVideo[+videoPosition-1].getAttribute('data-source');

  //   let elements = document.getElementsByClassName('video__item_active');
  //   while(elements.length > 0){
  //     elements[0].classList.remove('video__item_active');
  //   }
  //   video.setAttribute('src', videosource);
  //   videoPlay = videosource;
  //   itemsVideo[+videoPosition-1].classList.add('video__item_active');
  //   togglePlay();
  // }

  // function prewVideo(){
  //   let videoPositionNew = +videoPosition -1;
  //   if(videoPositionNew == 0) videoPositionNew = itemsVideo.length;
  //   videoPosition = ''+videoPositionNew;
  //   const videosource = itemsVideo[+videoPosition-1].getAttribute('data-source');

  //   let elements = document.getElementsByClassName('video__item_active');
  //   while(elements.length > 0){
  //     elements[0].classList.remove('video__item_active');
  //   }
  //   video.setAttribute('src', videosource);
  //   videoPlay = videosource;
  //   itemsVideo[+videoPosition-1].classList.add('video__item_active');
  //   togglePlay();
  // }

  function skipVideo(value){
    video.currentTime += value;
  }

  function volumeRangeUpdate(){
    volumeVal = +this.value;
    volumeUpdate(this, volumeVal);
  }

  function volumeUpdate(element, volumeVal){
    rangeVolume.style.background = `linear-gradient(to right, #710707 0%, #710707 ${volumeVal}%, #c4c4c4 ${volumeVal}%, #c4c4c4 100%)`;
    video[element.name] = volumeVal / 100;
    if (volumeVal >= 50){
      buttonVolume.classList.remove('toggle');
      buttonVolume.classList.remove('half');
    }
    if (volumeVal < 50){
      buttonVolume.classList.remove('toggle');
      buttonVolume.classList.add('half');
    }
    if (volumeVal === 0){
      buttonVolume.classList.remove('half');
      buttonVolume.classList.add('toggle');
    }
  }


  function timeProgress(){
    const percent = ( video.currentTime / video.duration ) * 100;
    rangeTime.value = percent;
    timeUpdateLine(percent);
    if(percent === 100){
      buttonPlayBig.classList.remove('toggle');
      buttonPlaySm.classList.remove('toggle');
      timeUpdateLine('0');
      video.pause();
      rangeTime.value = 0;
    }

  }

  function timeRangeUpdate(){
    let timePoint = +this.value;
    rangeTime.value = timePoint;
    const time = ( video.duration * timePoint ) / 100;
    video.currentTime = time;
    timeUpdateLine(timePoint);
  }

  function timeUpdateLine(value){
    rangeTime.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`;
  }

  function videoFullScreen(){
    if (document.fullscreenElement) {
      document.exitFullscreen().then(() => {
        videoBlock.classList.remove('full');
        video.classList.remove('full');
        panelControl.classList.remove('player__controls_fullscreen');
        buttonFullScreen.classList.remove('toggle');
      });
    } else {
      player.requestFullscreen().then(() => {
        videoBlock.classList.add('full');
        video.classList.add('full');
        panelControl.classList.add('player__controls_fullscreen');
        buttonFullScreen.classList.add('toggle');
      });
    }
  }

  function videoFullScreen2(){
    // document.exitFullscreen().then(() => {
      videoBlock.classList.remove('full');
      video.classList.remove('full');
      panelControl.classList.remove('player__controls_fullscreen');
      buttonFullScreen.classList.remove('toggle');
    // });
  }

  // ============================================
  // Hook event listners
  video.addEventListener('timeupdate', timeProgress);
  video.addEventListener('click', togglePlay);

  buttonPlayBig.addEventListener('click', togglePlay);
  buttonPlaySm.addEventListener('click', togglePlay);
  // buttonPauseBig.addEventListener('click', togglePlay);
  // buttonPauseSm.addEventListener('click', togglePlay);

  // buttonMuted.addEventListener('click', toggleMuted);
  buttonVolume.addEventListener('click', toggleMuted);

  // buttonRateUp.addEventListener('click', toggleRateUp);
  // buttonRateDown.addEventListener('click', toggleRateDown);

  buttonFullScreen.addEventListener('click', videoFullScreen);

  rangeVolume.addEventListener('change', volumeRangeUpdate);
  rangeVolume.addEventListener('mousemove', volumeRangeUpdate);

  rangeTime.addEventListener('change', timeRangeUpdate);

  // ============================================
  // Disable scroll down when spacebar is pressed
  window.onkeydown = function(e) {
    return !(e.keyCode == 32);
  };
  // ============================================
  // Hook event listners keyboard

  document.body.onkeyup = function(e){
    // console.log(e.keyCode);
    if(e.keyCode === 32 || e.keyCode === 75){
      // пробел - пауза или проигрывать
      // k - Приостановить или продолжить воспроизведение
      togglePlay();
      e.preventDefault();
    }

    if(e.keyCode === 77){
      // М - вкл или выкл звук
      toggleMuted();
    }

    if(e.keyCode === 190){
      // > -  ускорить воспроизведение
      toggleRateUp();
    }

    if(e.keyCode === 188){
      // < - замедлить воспроизведение
      toggleRateDown();
    }

    if(e.keyCode === 74){
      // j - Перемотать ролик на 10 секунд назад
      skipVideo(-10);
    }

    if(e.keyCode === 76){
      // l - Перемотать ролик на 10 секунд вперед
      skipVideo(10);
    }

    if(e.keyCode === 80){
      // p - Перейти к предыдущему видео
      prewVideo();
    }

    if(e.keyCode === 78){
      // n - Перейти к следующему видео
      nextVideo();
    }

    if(e.keyCode === 70){
      // f  - Включить или выключить полноэкранный режим
      videoFullScreen();
    }

    if(e.keyCode === 27){
      // esc - Включить или выключить полноэкранный режим
      // return false;/
      videoFullScreen2();
    }

  }
  // ============================================
  // splider playlist
  const splide__playlist = new Splide( '.splide__playlist', {
    type   : 'loop',
    perPage: 3,
    perMove: 1,
    drag : false,
    arrows : false,
    pagination : false,
    gap : '42px',
    cover : true,
  });
  splide__playlist.mount();

  const slider_left_playlist = document.querySelector('.control__arrow_left');
  slider_left_playlist.addEventListener('click', function (e) {
    splide__playlist.go( '<' );
  });

  const slider_right_playlist = document.querySelector('.control__arrow_right');
  slider_right_playlist.addEventListener('click', function (e) {
    splide__playlist.go( '>' );
  });

  const slider_control__dots = document.querySelectorAll('.control__dot');

  Array.prototype.forEach.call(slider_control__dots, function (slider_control__dots, index) {
    slider_control__dots.addEventListener('click', function () {
      splide__playlist.go(index);
    });
  });

  function updateinfoPlaylist(){
    const img_index = splide__playlist.index;
    [].forEach.call(slider_control__dots, function(el) {el.classList.remove('control__dot_active')});
    slider_control__dots[img_index].classList.add('control__dot_active');

    video.setAttribute('src', 'https://kusakin.pro/video/video'+img_index+'.mp4');
    video.setAttribute('poster', './assets/img/video/poster'+img_index+'.jpg');
  }

  splide__playlist.on( 'mounted move', function () {
    updateinfoPlaylist();
  });

  // ============================================
  // itemsVideo.addEventListener( "click" , () => alert('Спасибо!'));
  // let temp_item;
  // itemsVideo.forEach(item => {
  //   item.addEventListener('click', event => {
  //     //handle click
  //     // temp_item = item;
  //     const videosource = item.getAttribute('data-source');
  //     const videoPositionNew = item.getAttribute('data-position');
  //     if(videoPlay !== videosource){
  //       let elements = document.getElementsByClassName('video__item_active');
  //       while(elements.length > 0){
  //         elements[0].classList.remove('video__item_active');
  //       }
  //       videoPosition = videoPositionNew;

  //       video.setAttribute('src', videosource);
  //       videoPlay = videosource;
  //       item.classList.add('video__item_active');
  //       togglePlay();
  //     }
  //   })
  // })

  // ============================================
  // player.onmousemove = handler;
  // player.onmouseover = player.onmouseout = player.onmousemove = handler;
  // player.onmousemove = handler;
  // function handler(event) {

  //   if(video.paused === false){
  //     buttonPauseBig.classList.remove('player__hidden');
  //     setTimeout( () => {
  //       buttonPauseBig.classList.add('player__hidden')
  //     }, 3000);
  //   }
  // }
  // ============================================


}
