import { playList } from './playList.js';

export function audioPlayer(className) {
  const audio = new Audio();
  let audioPlayNow = false;
  let trackPlay = 0;
  audio.src = playList[trackPlay].src;
  //------------------------------------------------------
  const trackName = document.querySelector(className + ' .track-name');
  trackName.textContent = playList[trackPlay].title;
  //------------------------------------------------------
  function sToTime(t) {
    return padZero(parseInt((t / (60 * 60)) % 24)) + ":" +
           padZero(parseInt((t / (60)) % 60)) + ":" +
           padZero(parseInt((t) % 60));
  }
  function sToMinutes(t) {
    return padZero(parseInt((t / (60)) % 60)) + ":" +
           padZero(parseInt((t) % 60));
  }
  function padZero(v) {
    return (v < 10) ? "0" + v : v;
  }
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
  //------------------------------------------------------
  // Создание плейлиста
  const playlistBlock = document.querySelector(className + ' .play-list');
  playList.forEach((e, i) => {
    e = document.createElement('li');
    e.classList.add('play-item');
    e.setAttribute('track_point', i)
    e.innerHTML = `<span class='play'></span> ${playList[i].title}  <span class='end'>${playList[i].duration}</span>` ;
    playlistBlock.append(e);
  });
  //------------------------------------------------------
  // клик по треку из листа
  const tracks = document.querySelectorAll('.play-item');
  tracks.forEach(track => {
    track.addEventListener('click', event => {
      const track_click = +track.getAttribute('track_point');
      if(trackPlay !== track_click){
        audio.src = playList[track_click].src;
        trackPlay = track_click;
        playAudio();
      }
      else{
        if(audioPlayNow) pauseAudio();
        else playAudio();
      }
      trackName.textContent = playList[trackPlay].title;
      checkActiveTrack(track_click);
    })
  });
  //------------------------------------------------------
  // выделить нужный трек
  function checkActiveTrack(current){
    for (let i = 0; i < tracks.length; i++) {
      tracks[i].classList.remove('item-active');
    }
    tracks[current].classList.add('item-active');
  }
  checkActiveTrack(trackPlay);
  //------------------------------------------------------
  const timeline = document.querySelector(className + ' .play-time-line');
  const currenttimeblock = document.querySelector(className + ' .current-time');
  const alltimeblock = document.querySelector(className + ' .all-time');
  audio.addEventListener('timeupdate', timeProgress);

  async function updatetimeinfo(currentTime, duration){
    currenttimeblock.innerHTML = sToMinutes(currentTime);
    alltimeblock.innerHTML = sToMinutes(duration);
  }

  function timeProgress(){
    if(!isNaN(audio.duration)){
      const percent = Math.round10(( audio.currentTime / audio.duration ) * 100, -2);
      timeline.style.background = `linear-gradient(to right, #009914 0%, #009914 ${percent}%, #ffffff ${percent}%, #ffffff 100%)`;
      timeline.value = percent;
      updatetimeinfo(audio.currentTime, audio.duration);
      if(percent > 99) playAudioNext();
    }
  }

  timeline.addEventListener('input', timeRangeUpdate);
  function timeRangeUpdate(){
    const time = ( audio.duration * this.value ) / 100;
    audio.currentTime = time;
  }

  //------------------------------------------------------
  const buttonVolume = document.querySelector('.play-volume');
  buttonVolume.addEventListener("click", toggleMuted);
  const rangeVolume = document.querySelector('.play-volume-line');
  rangeVolume.addEventListener('change', volumeRangeUpdate);
  rangeVolume.addEventListener('mousemove', volumeRangeUpdate);

  let volumeVal = rangeVolume.value;

  function toggleMuted() {
    if (audio.muted) {
      rangeVolume.value = volumeVal;
      volumeUpdate(volumeVal);
      audio.muted = false;
    } else {
      rangeVolume.value = 0;
      volumeUpdate(0);
      audio.muted = true;
    }
  }

  function volumeUpdate(volumeVal){
    rangeVolume.style.background = `linear-gradient(to right, #009914 0%, #009914 ${volumeVal}%, #ffffff ${volumeVal}%, #ffffff 100%)`;
    audio.volume = volumeVal / 100;
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

  function volumeRangeUpdate(){
    volumeVal = +this.value;
    volumeUpdate(volumeVal);
  }
  //------------------------------------------------------

  const buttonPlay = document.querySelector(className + ' .play');
  const buttonPlayPrev = document.querySelector(className + ' .play-prev');
  const buttonPlayNext = document.querySelector(className + ' .play-next');
  buttonPlay.addEventListener("click", togglePlayAudio);
  buttonPlayPrev.addEventListener("click", playAudioPrev);
  buttonPlayNext.addEventListener("click", playAudioNext);



  function togglePlayAudio() {
    // buttonPlay.classList.toggle("pause");
    if (!audioPlayNow) {
      playAudio();
    } else {
      pauseAudio();
    }
  }

  function playAudio(){
    audio.play();
    audioPlayNow = true;
    buttonPlay.classList.add("pause");
  }

  function pauseAudio(){
    audio.pause();
    audioPlayNow = false;
    buttonPlay.classList.remove("pause");
    console.log(audio.duration)
    console.log(audio.currentTime)
  }
  //------------------------------------------------------
  // клик по предыдущему треку
  function playAudioPrev() {
    if(trackPlay === 0) trackPlay = playList.length - 1;
    else trackPlay --;
    audio.src = playList[trackPlay].src;
    trackName.textContent = playList[trackPlay].title;
    playAudio();
    checkActiveTrack(trackPlay);
  }
  //------------------------------------------------------
  // клик по следующему треку
  function playAudioNext(){
    if(trackPlay === (playList.length - 1) ) trackPlay = 0;
    else trackPlay ++;
    audio.src = playList[trackPlay].src;
    trackName.textContent = playList[trackPlay].title;
    playAudio();
    checkActiveTrack(trackPlay);
    // console.log(playList[trackPlay].src);
  }



}
