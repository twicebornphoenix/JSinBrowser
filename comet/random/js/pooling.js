'use strict';

const xhr = new XMLHttpRequest();
xhr.addEventListener('load', manageNumber);
setInterval(() => {
    xhr.open('GET', 'https://neto-api.herokuapp.com/comet/pooling');
    xhr.send()
}, 4000);

function manageNumber(e) {
    Array.from(document.querySelector('.pooling').children)
        .forEach(number => {
            if (e.target.responseText === number.textContent) number.classList.add('flip-it');
            setTimeout(() => number.classList.remove('flip-it'), 2000);
        })
}