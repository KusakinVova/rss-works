export function player() {

  const rangeVolume = document.querySelector('.player__line_volume');
  const rangeTime = document.querySelector('.player__line_time');

  rangeVolume.addEventListener('change', volumeRangeUpdate);
  rangeVolume.addEventListener('mousemove', volumeRangeUpdate);

  rangeTime.addEventListener('change', timeRangeUpdate);
  rangeTime.addEventListener('mousemove', timeRangeUpdate);

  function volumeRangeUpdate(){
    rangeVolume.style.background = `linear-gradient(to right, #710707 0%, #710707 ${this.value}%, #c4c4c4 ${this.value}%, #c4c4c4 100%)`;
    video[this.name] = this.value / 100;
  }


  function timeRangeUpdate(){
    const time = ( video.duration * this.value ) / 100;
    video.currentTime = time;
    rangeTime.style.background = `linear-gradient(to right, #710707 0%, #710707 ${this.value}%, #c4c4c4 ${this.value}%, #c4c4c4 100%)`;
    rangeTime.value = this.value;
  }

}
