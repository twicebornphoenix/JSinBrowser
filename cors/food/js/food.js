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
		console.log(el);
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