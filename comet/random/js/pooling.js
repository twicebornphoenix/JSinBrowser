'use strict';

const xhrPoolin = new XMLHttpRequest();
xhrPoolin.addEventListener('load', manageNumber);
setInterval(() => {
    xhrPoolin.open('GET', 'https://neto-api.herokuapp.com/comet/pooling');
    xhrPoolin.send()
}, 4000);

function manageNumber(e) {
    Array.from(document.querySelector('.pooling').children)
        .forEach(number => {
            if (e.target.responseText === number.textContent) number.classList.add('flip-it');
            setTimeout(() => number.classList.remove('flip-it'), 2000);
        })
}