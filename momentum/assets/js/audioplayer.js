import { playList } from './playList.js';

export function audioPlayer(className) {
  const audio = new Audio();
  let audioPlayNow = false;
  let trackPlay = 0;
  audio.src = playList[trackPlay].src;
  //------------------------------------------------------
  const playlistBlock = document.querySelector(className + ' .play-list');
  playList.forEach((e, i) => {
    e = document.createElement('li');
    e.classList.add('play-item');
    e.setAttribute('track_point', i)
    e.innerHTML = `${playList[i].title}  <span class='end'>${playList[i].duration}<span>` ;
    playlistBlock.append(e);
  });
  //------------------------------------------------------
  const tracks = document.querySelectorAll('.play-item');
  tracks[trackPlay].classList.add('item-active');
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
      checkActiveTrack(track_click);
      // track.classList.add('item-active');
      /*
      const videosource = track.getAttribute('track_point');
      const videoPositionNew = item.getAttribute('data-position');
      if(videoPlay !== videosource){
        let elements = document.getElementsByClassName('video__item_active');
        while(elements.length > 0){
          elements[0].classList.remove('video__item_active');
        }
        videoPosition = videoPositionNew;

        video.setAttribute('src', videosource);
        videoPlay = videosource;
        item.classList.add('video__item_active');
        togglePlay();
      }
      */
    })
  });
  function checkActiveTrack(current){
    for (let i = 0; i < tracks.length; i++) {
      tracks[i].classList.remove('item-active');
    }
    tracks[current].classList.add('item-active');
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
  }

  function playAudioPrev() {
    if(trackPlay === 0) trackPlay = playList.length - 1;
    else trackPlay --;
    audio.src = playList[trackPlay].src;
    audio.play();
    checkActiveTrack(trackPlay);
    console.log(playList[trackPlay].src);

  }

  function playAudioNext(){
    if(trackPlay === (playList.length - 1) ) trackPlay = 0;
    else trackPlay ++;
    audio.src = playList[trackPlay].src;
    audio.play();
    checkActiveTrack(trackPlay);
    console.log(playList[trackPlay].src);
  }




}
