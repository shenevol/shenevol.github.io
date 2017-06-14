/* global document */

const player = document.querySelector('.videoPlayer');
const video = player.querySelector('.myVideo');
const barStatus = player.querySelector('.barStatus');
const barStatusNow = player.querySelector('.barStatusNow');
const playButton = player.querySelector('.playButton');
const controlButtons = player.querySelectorAll('.controlButton');
const ranges = player.querySelectorAll('input[type=range]');

function updateBarStatus() {
  const currentStatus = (video.currentTime / video.duration) * 100;
  barStatusNow.style.flexBasis = `${currentStatus}%`;
}

function togglePlay() {
  const status = video.paused ? 'play' : 'pause';
  video[status]();
}

function updatePlayButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  playButton.innerHTML = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
  updateBarStatus();
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function scrollBarStatus(e) {
  const updatedTime = (e.offsetX / barStatus.offsetWidth) * video.duration;
  video.currentTime = updatedTime;
}

playButton.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);

video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);
video.addEventListener('timeupdate', updateBarStatus);

barStatus.addEventListener('click', scrollBarStatus);

let mousedown = false;

barStatus.addEventListener('mousedown', mousedown = true);
barStatus.addEventListener('mouseup', mousedown = false);
barStatus.addEventListener('mousemove', e => mousedown && scrollBarStatus(e));

controlButtons.forEach((controlButton) => {
  controlButton.addEventListener('click', skip);
});

ranges.forEach((range) => {
  range.addEventListener('change', handleRangeUpdate);
});






