'use strict';

const url = 'https://neto-api.herokuapp.com/profile/me';

function getData(url) {
    //генерируем рандомное имя для функции
    const funcName = randomName();
    return new Promise((success, fail) => {
        //привязываем выполнение функции при успешном исходе
        window[funcName] = success;
        //создаём элемент script, присваиваем ему ссылку с jsonp и помещаем в body
        const script = document.createElement('script');
        script.src = `${url}?callback=${funcName}`;
        document.body.appendChild(script);
    });
}

function parseData(data) {
    const mainInfo = document.querySelector('.firstinfo');
    //обрабатываем полученные данные
    for (const chunck in data) {
        if (chunck === 'id') {
            getData(`https://neto-api.herokuapp.com/profile/${data[chunck]}/technologies`)
                .then(parseData);
        } else {
            const el = document.querySelector(`[data-${chunck}]`);
            console.log(data[chunck])
            // if (el.tagName !== 'IMG') el.textContent = data[chunck];
        }
    }
}

function randomName() {
    const rawName = (Math.random() * 100).toString(36);
    return isNaN(rawName.slice(4)[0]) ? rawName.slice(4) : randomName();
}

getData(url)
    .then(parseData);