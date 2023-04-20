//1. Select DOM elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');

const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');

const toggle = player.querySelector('.toggle');
const skipBtns = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

//2. Build Functions Handlers
function handlePlay() {
    video.paused ? video.play()
    : video.pause();
}

function handleButton() {
   toggle.textContent = this.paused ? '▶️' : '⏸';
}

function handleSkip() {
   // console.log(this.dataset.skip);

   video.currentTime += parseFloat(this.dataset.skip);
}

function handleRange() {
   // console.log(this.name);
   // console.log(this.value);

    video[this.name] = this.value;
}

function handleProgressBar() {
    const percent = (video.currentTime / video.duration) * 100;

    progressBar.style.flexBasis = `${percent}%`;
}

function handlePick(e) {
    // console.log(e);
    const pickedTime = (e.offsetX / progress.offsetWidth) * video.duration;

    video.currentTime = pickedTime;
}

function openFullScreen() {

    if(video.requestFullscreen) {
        video.requestFullscreen();
    }
}

//3. Connect with the event listeners
video.addEventListener('click', handlePlay);
video.addEventListener('play', handleButton);
video.addEventListener('pause', handleButton);

video.addEventListener('timeupdate', handleProgressBar);


toggle.addEventListener('click', handlePlay);

skipBtns.forEach(button => button.addEventListener('click', handleSkip));

ranges.forEach(range => range.addEventListener('change', handleRange));
ranges.forEach(range => range.addEventListener('click', handleRange));

let mousedown = false;

progress.addEventListener('click', handlePick)
progress.addEventListener('mousemove', (e) => mousedown && handlePick(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);



