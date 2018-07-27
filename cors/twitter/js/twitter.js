'use strict';

const url = 'https://neto-api.herokuapp.com/twitter/jsonp';

function setDataAttrValues(profile) {
	for(let prop in profile) {
		let elem = document.querySelector(`[data-${prop}]`);
		if (elem.tagName === 'IMG') {
			elem.src = profile[`${prop}`]
		} else {
			elem.textContent = profile[`${prop}`]
		}
	}
}

function loadData(url) {
  const functionName = getRandomName();
  
  return new Promise((done, fail) => {
    window[functionName] = done;
    
    const script = document.createElement('script');
    script.src = `${url}?jsonp=${functionName}`;
    document.body.appendChild(script);
  });
}

function getRandomName() {
	return `call${Math.round(Math.random() * 1000)}`;
}
	
loadData(url)
  .then(setDataAttrValues);
