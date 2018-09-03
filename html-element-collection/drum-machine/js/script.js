'use strict';

const drumKeys = document.getElementsByClassName('drum-kit__drum');
const drumKeysArr = Array.from(drumKeys);

drumKeysArr.forEach(drum => {
  let audioSrc = drum.getElementsByTagName('audio')[0].src;
  let drumClass = drum.className.split('-');
  let soundStr = drumClass[drumClass.length - 1];
  let re = new RegExp(soundStr, 'i');
  if (audioSrc.search(re) !== -1) {
    drum.onclick = function() {
      if (drum.getElementsByTagName('audio')[0].play()) {
        drum.getElementsByTagName('audio')[0].pause();
        drum.getElementsByTagName('audio')[0].currentTime = 0;
      }
      drum.getElementsByTagName('audio')[0].play();
    }
  }
})