'use strict';

const url = 'https://neto-api.herokuapp.com/twitter/jsonp';

function setData(data) {

	for(const prop in data) {
		let elem = document.querySelector(`[data-${prop}]`);
		
		if (elem.tagName === 'IMG') {
			elem.src = data[`${prop}`]
		} else {
			elem.textContent = data[`${prop}`]
		}
	}
}

function loadData(url) {
  const funcName = getRndName();
  
  return new Promise((done, fail) => {
    window[funcName] = done;
    
    const script = document.createElement('script');
    script.src = `${url}?jsonp=${funcName}`;
    document.body.appendChild(script);
  });
}

function getRndName() {
	return `call${Math.round(Math.random() * 1000)}`;
}
	
loadData(url)
  .then(setData);
