'use strict';

function longPooling(url) {
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', e => {
        console.log(e)
        Array.from(document.querySelector('.long-pooling').children)
            .forEach(number => {
                if (e.target.responseText.trim() === number.textContent) {
                    number.classList.add('flip-it');
	                setTimeout(() => {number.classList.remove('flip-it');
	                }, 2000)
                }
            });
	    longPooling(url);
    });

    xhr.addEventListener('error', e => {
        console.log(e)
        longPooling(url);
    });

    xhr.open('GET', url);
    xhr.send();
}

longPooling('https://neto-api.herokuapp.com/comet/long-pooling')