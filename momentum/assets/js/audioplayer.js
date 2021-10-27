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

  const buttonPlay = document.querySelector(className + ' .play');
  const buttonPlayPrev = document.querySelector(className + ' .play-prev');
  const buttonPlayNext = document.querySelector(className + ' .play-next');
  buttonPlay.addEventListener("click", playAudio);
  buttonPlayPrev.addEventListener("click", playAudioPrev);
  buttonPlayNext.addEventListener("click", playAudioNext);



  function playAudio() {
    buttonPlay.classList.toggle("pause");
    if (!audioPlayNow) {
      audio.play();
      audioPlayNow = true;
    } else {
      audio.pause();
      audioPlayNow = false;
    }
  }

  function playAudioPrev() {
    if(trackPlay === 0) trackPlay = playList.length - 1;
    else trackPlay --;
    audio.src = playList[trackPlay].src;
    audio.play();
    console.log(playList[trackPlay].src);
  }

  function playAudioNext(){
    if(trackPlay === (playList.length - 1) ) trackPlay = 0;
    else trackPlay ++;
    audio.src = playList[trackPlay].src;
    audio.play();
    console.log(playList[trackPlay].src);
  }




}
