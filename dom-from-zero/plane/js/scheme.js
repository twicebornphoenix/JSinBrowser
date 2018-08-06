'use strict'
//элементы, с которыми будем работать
const form = document.querySelector('.form-inline');
const select = form.querySelector('select');
const showSheme = form.querySelector('#btnSeatMap');
const setFull = form.querySelector('#btnSetFull');
const setEmpty = form.querySelector('#btnSetEmpty');
const schemeArea = document.querySelector('#seatMapDiv');
const mapTitle = document.querySelector('#seatMapTitle');
const mapDiv = document.querySelector('#seatMapDiv');
const total = document.querySelector('#totalPax');
const adult = document.querySelector('#totalAdult');
const half = document.querySelector('#totalHalf');

//переменная с полученными данными
let currentData;

//деактивируем кнопки Заполнить и Очисить
setFull.disabled = true;
setEmpty.disabled = true;

//функция получения данных с сервера
function getData(e) {
    const id = e ? e.target.value : 'a319';
    console.log('Отправка запроса...')
    const data = fetch(`https://neto-api.herokuapp.com/plane/${id}`);
    data.then(res => {
            console.log('Обработка запроса...');
            return res.json();
        })
        .then(json => {
            console.log('Данные получены - ', json);
            currentData = json;
        })
        .catch(error => console.error(`Произошла ошибка - ${error.message}`));
}

//функция применения полученных данных
function setData(e) {
    e.preventDefault();
    console.log('Данные готовы к использованию', currentData);

    console.log('Объект ряда', getRowObj(currentData));

    //Создаём ряды

    const rows = currentData.scheme.reduce((f, row, i) => {
        f.append(getRow(getRowObj(row, i)));

        return f;
    }, document.createDocumentFragment());

    //активируем кнопки Заполнить и Очистить
    setFull.disabled = false;
    setEmpty.disabled = false;

    //прописываем название самолёта и количества пассажиров
    let passengerWordEnd;
    switch (currentData.passengers % 10) {
        case 1:
            passengerWordEnd = '';
            break;
        case 2:
        case 3:
        case 4:
            passengerWordEnd = 'а';
            break;
        default:
            passengerWordEnd = 'ов';
    }
    mapTitle.textContent = `${currentData.title} (${currentData.passengers} пассажир${passengerWordEnd})`;
    
    //выводим схему самолёта в интерфес
    Array.from(schemeArea.children).forEach(child => child.remove());
    schemeArea.append(rows)
}

//функция определения статуса места в ряду
function getLetter(row, i) {
    switch (row) {
        case 6:
            return true;
        case 4:
        	return i % 5 == 0 ? false : true;
        case 0:
            return false;
    }
}

//функция создания объекта ряда
function getRowObj(row, i) {
    return {
        tag: 'div',
        cls: ['row', 'seating-row', 'text-center'],
        content: [{
                tag: 'div',
                cls: ['col-xs-1', 'row-number'],
                content: {
                    tag: 'h2',
                    cls: '',
                    content: `${i + 1}`
                }
            },
            {
                tag: 'div',
                cls: 'col-xs-5',
                content: [{
                        tag: 'div',
                        cls: ['col-xs-4', `${getLetter(row, 0) ? 'seat' : 'no-seat'}`],
                        content: {
                            tag: 'span',
                            cls: 'seat-label',
                            content: getLetter(row, 0) ? 'A' : ''
                        }
                    },
                    {
                        tag: 'div',
                        cls: ['col-xs-4', `${getLetter(row, 1) ? 'seat' : 'no-seat'}`],
                        content: {
                            tag: 'span',
                            cls: 'seat-label',
                            content: getLetter(row, 1)  ? 'B' : ''
                        }
                    },
                    {
                        tag: 'div',
                        cls: ['col-xs-4', `${getLetter(row, 2) ? 'seat' : 'no-seat'}`],
                        content: {
                            tag: 'span',
                            cls: 'seat-label',
                            content: getLetter(row, 2) ? 'C' : ''
                        }
                    }
                ]
            },
            {
                tag: 'div',
                cls: 'col-xs-5',
                content: [{
                        tag: 'div',
                        cls: ['col-xs-4', `${getLetter(row, 3) ? 'seat' : 'no-seat'}`],
                        content: {
                            tag: 'span',
                            cls: 'seat-label',
                            content: getLetter(row, 3) ? 'D' : ''
                        }
                    },
                    {
                        tag: 'div',
                        cls: ['col-xs-4', `${getLetter(row, 4) ? 'seat' : 'no-seat'}`],
                        content: {
                            tag: 'span',
                            cls: 'seat-label',
                            content: getLetter(row, 4) ? 'E' : ''
                        }
                    },
                    {
                        tag: 'div',
                        cls: ['col-xs-4', `${getLetter(row, 5) ? 'seat' : 'no-seat'}`],
                        content: {
                            tag: 'span',
                            cls: 'seat-label',
                            content: getLetter(row, 5) ? 'F' : ''
                        }
                    }
                ]
            }
        ]
    }
}

//функция создания ряда
function getRow(block) {
    if (Array.isArray(block)) {
        return block.reduce((f, el) => {
            f.append(getRow(el));
            return f;

        }, document.createDocumentFragment());
    }
    if (typeof block === 'string') {
        return document.createTextNode(block)
    }

    const el = document.createElement(block.tag);
    [].concat(block.cls || []).forEach(className => el.classList.add(className));

    if (block.content) el.appendChild(getRow(block.content))
    // console.log(el)
    return el;
}

//устанавливаем обработчики событий 
form.addEventListener('change', getData);
showSheme.addEventListener('click', setData);
setFull.addEventListener('click', e => {
	e.preventDefault();
	Array.from(document.querySelectorAll('.seat'))
		.forEach(seat => seat.classList.add('adult'));
});
setEmpty.addEventListener('click', e => {
	e.preventDefault();
	Array.from(document.querySelectorAll('.seat'))
		.forEach(seat => {
			seat.classList.remove('adult');
			seat.classList.remove('half');
		})
})

console.log('Отправка запроса...')

//отправляем запрос на сервер при открытии страницы
fetch('https://neto-api.herokuapp.com/plane/a319')
    .then(res => {
        console.log('Обработка данных...')
        return res.json();
    })
    .then(json => {
        console.log('Данные получены - ', json);
        currentData = json;
    })