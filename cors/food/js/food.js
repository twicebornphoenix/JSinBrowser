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
            case 'id':
                break;
            case 'rating':
                {
                    document.querySelector(`[data-${chunk}]`).textContent = data[chunk].toFixed(2);
                    const starWidth = (data[chunk].toFixed(2) / 10) * 100;
                    document.querySelector('[data-star]').style.width = starWidth + 'px';
                }
                break;
            case 'votes':
                document.querySelector(`[data-${chunk}]`).textContent = `(${data[chunk]} оценок)`;
                break;
            case 'total':
                {
                    const el = document.createElement('span');
                    el.textContent = `(+${data['total'] - data['consumers'].length})`;
                    document.querySelector(`[data-consumers]`).appendChild(el);
                }
                break;
            case 'consumers':
                {
                    const fragment = document.createDocumentFragment();
                    for (let i = 0; i < data['consumers'].length; i++) {
                        const el = document.createElement('img');
                        el.src = data[chunk][i]['pic'];
                        el.title = data[chunk][i]['name'];
                        fragment.append(el);
                    }
                    document.querySelector(`[data-${chunk}]`).appendChild(fragment);
                }
                break;
            default:
                {
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