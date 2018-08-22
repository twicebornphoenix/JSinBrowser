'use strict';

const url = 'https://neto-api.herokuapp.com/profile/me';

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
	for (let chunck in data) {
		console.log(data[chunck])
	}
}

function randomName() {
	const rawName = (Math.random() * 100).toString(36);
	return isNaN(rawName.slice(4)[0]) ? rawName.slice(4) : randomName();
}

getData(url)
	.then(parseData);
