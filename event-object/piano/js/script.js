const lowers = ['https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/lower/first.mp3',
    'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/lower/second.mp3',
    'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/lower/third.mp3',
    'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/lower/fourth.mp3',
    'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/lower/fifth.mp3'
];

const middles = ['https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/middle/first.mp3',
    'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/middle/second.mp3',
    'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/middle/third.mp3',
    'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/middle/fourth.mp3',
    'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/middle/fifth.mp3'
];

const highers = ['https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/higher/first.mp3',
    'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/higher/second.mp3',
    'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/higher/third.mp3',
    'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/higher/fourth.mp3',
    'https://netology-code.github.io/hj-homeworks/event-object/piano/sounds/higher/fifth.mp3'
];

const pianoKeys = document.getElementsByTagName('li');
const pianoKeysArr = Array.from(pianoKeys);
const audioPlayers = document.getElementsByTagName('audio');
const audioPlayersArr = Array.from(audioPlayers);

audioPlayersArr.forEach((player, index) => {
    player.src = middles[index]
});

pianoKeysArr.forEach(key => {
    key.addEventListener('click', function() {
        let player = key.children[0];
        if (player.paused) {
            player.play();
        } else {
            player.pause();
            player.currentTime = 0;
            player.play();
        }
    });
});