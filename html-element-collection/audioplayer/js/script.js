const tracks = [{title: 'LA Chill Tour', addrr: 'https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/LA Chill Tour.mp3'},
{title: 'This is band', addrr: 'https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/This is it band.mp3'},
{title: 'LA Fusion Jam', addrr: 'https://netology-code.github.io/hj-homeworks/html-element-collection/audioplayer/mp3/LA Fusion Jam.mp3'}];
const playerInterface = document.getElementsByClassName('mediaplayer')[0];
const player = playerInterface.getElementsByTagName('audio')[0];
const btnPlay = playerInterface.getElementsByClassName('playstate')[0];
const btnStop = playerInterface.getElementsByClassName('stop')[0];
const btnPrev = playerInterface.getElementsByClassName('back')[0];
const btnNext = playerInterface.getElementsByClassName('next')[0];

let index = 0;
let trackTitle = playerInterface.getElementsByClassName('title')[0];

btnPlay.onclick = () => {
  if (playerInterface.classList.contains('play')) {
    playerInterface.classList.remove('play');
    player.pause();
  } else {
    playerInterface.classList.add('play');
    player.play();
  }
}
btnStop.onclick = () => {
  playerInterface.classList.remove('play');
  player.pause();
  player.currentTime = 0;
}
btnPrev.onclick = () => {
  --index;  
  if (index < 0) index = tracks.length - 1;
  trackTitle.title = tracks[index].title;
  if (!player.paused) {
    player.pause();
    player.src = tracks[index].addrr;
    player.play();
    
  } else {
    player.src = tracks[index].addrr;
  }
}
btnNext.onclick = () => {
  ++index;
  if (index > tracks.length - 1) index = 0;
  trackTitle.title = tracks[index].title;
  if (!player.paused) {
    player.pause();
    player.src = tracks[index].addrr;
    player.play();
    
  } else {
    player.src = tracks[index].addrr;
  }
}