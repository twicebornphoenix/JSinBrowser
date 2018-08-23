'use strict';

const urlRecipe = 'https://neto-api.herokuapp.com/food/42';
const urlRating = 'https://neto-api.herokuapp.com/food/42/rating';
const urlConsumers = 'https://neto-api.herokuapp.com/food/42/consumers'

function getData(url) {
    const funcName = randomName();

    return new Promise((success, fail) => {
        window[funcName] = success;

        const script = document.createElement('script');
        script.src = `${url}?callback=${funcName}`;
        document.body.appendChild(script);
    });
}

function parseData(data) {
	for (const chunk in data) {
		const el = document.querySelector(`[data-${chunk}]`);
		switch (chunk) {
			case 'id': console.log('id');
				break;
			case 'rating': console.log('rating');
				break;
			case 'votes': console.log('vote');
				break;
			case 'total': console.log('total');
				break;
			case 'consumers': {
				const fragment = document.createDocumentFragment();
				for (let i = 0; i < 4; i++) {
					const el = document.createElement('img');
					el.src = data[chunk][i]['pic'];
					el.title = data[chunk][i]['name'];
					fragment.append(el);
				}
				document.querySelector(`[data-${chunk}]`).appendChild(fragment);
			}
				break;
			default: {
				if (el.classList.contains('cover')) {
					el.style.background = `url(${data[chunk]})`;
				} else {
					el.textContent = data[chunk];
				}
			}
		}
	}
}

function randomName() {
    const rawName = (Math.random() * 100).toString(36);
    return isNaN(rawName.slice(4)[0]) ? rawName.slice(4) : randomName();
}

getData(urlRecipe)
    .then(parseData);
getData(urlRating)
		.then(parseData);
getData(urlConsumers)
		.then(parseData);