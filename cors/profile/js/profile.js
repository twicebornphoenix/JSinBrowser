'use strict';

const profileUrl = 'https://neto-api.herokuapp.com/profile/me';

function setAttrs(profile) {
	for(let prop in profile) {
		if (prop === 'id') loadData(`https://neto-api.herokuapp.com/profile/${profile.id}/technologies`); 
		let elem = document.querySelector(`[data-${prop}]`);
		console.log(elem, prop)
		if (elem.tagName === 'IMG') {
			elem.src = profile[`${prop}`]
		} else {
			elem.textContent = profile[`${prop}`]
		}
	}
}

function loadData(url) {
    const functionName = randomName();

    return new Promise((done, fail) => {
        window[functionName] = done;

        const script = document.createElement('script');
        script.src = `${url}?jsonp=${functionName}`;
        document.body.appendChild(script);
    });
}

function randomName() {
	return `ave${Math.round(Math.random() * 10000)}`;
}

window.addEventListener('load', () => loadData(profileUrl)
		.then(setAttrs));