'use strict'

const form = document.querySelector('.form-inline');
const select = form.querySelector('select');
const showSheme = form.querySelector('#btnSeatMap');
const setFull = form.querySelector('#btnSetFull');
const setEmpty = form.querySelector('#btnSetEmpty');
const schemeArea = document.querySelector('#seatMapDiv');
const mapTitle = document.querySelector('#seatMapTitle');
const total = document.querySelector('#totalPax');
const adult = document.querySelector('#totalAdult');
const half = document.querySelector('#totalHalf');

let currentData;
let currentPlaces;
setFull.disabled = true;
setEmpty.disabled = true;

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

function setData(e) {
    e.preventDefault();

    const rows = currentData.scheme.reduce((f, row, i) => {
        f.append(getRow(getRowObj(row, i)));

        return f;
    }, document.createDocumentFragment());

    setFull.disabled = false;
    setEmpty.disabled = false;

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

    Array.from(schemeArea.children).forEach(child => child.remove());
    schemeArea.append(rows);
    schemeArea.addEventListener('click', e => manageSeatClasses(e, null, ['adult', 'half']))
}

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
                            content: getLetter(row, 1) ? 'B' : ''
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

    if (block.content) el.appendChild(getRow(block.content));

    return el;
}

function getAmountPlaces() {
    adult.textContent = document.querySelectorAll('.adult').length;
    half.textContent = document.querySelectorAll('.half').length;
    total.textContent = +adult.textContent + +half.textContent;
}

form.addEventListener('change', getData);
showSheme.addEventListener('click', setData);
setFull.addEventListener('click', e => manageSeatClasses(e, true, ['adult']));
setEmpty.addEventListener('click', e => manageSeatClasses(e, false, ['adult', 'half']));

function manageSeatClasses(e, op, cls) {
    e.preventDefault();
    currentPlaces = Array.from(document.querySelectorAll('.seat'));
    const mainSeat = e.target.parentNode.classList;
    const mainSeatDbl = e.target.classList;

    if (op !== null) {

        currentPlaces.forEach(seat => {
            if (op) {
                seat.classList.remove('half');
                seat.classList.add(...cls);
            } else {
                seat.classList.remove(...cls);
            }
        });

    } else {

        if (e.target.classList.contains('seat-label')) {

            if (!e.altKey) {

                mainSeat.contains(cls[1]) ?
                    changeClass(mainSeat, cls[1], cls[0]) : mainSeat.toggle(cls[0]);

            } else {

                mainSeat.contains(cls[0]) ?
                    changeClass(mainSeat, cls[0], cls[1]) : mainSeat.toggle(cls[1])

            }

        } else if (e.target.classList.contains('seat')) {

            if (!e.altKey) {

                mainSeatDbl.contains(cls[1]) ?
                    changeClass(mainSeatDbl, cls[1], cls[0]) : mainSeatDbl.toggle(cls[0])

            } else {

                mainSeatDbl.contains(cls[0]) ?
                    changeClass(mainSeatDbl, cls[0], cls[1]) : mainSeatDbl.toggle(cls[1])

            }
        }
    }
    getAmountPlaces();
}

function changeClass(el, clsToR, clsToT) {
    el.remove(clsToR);
    el.toggle(clsToT);
}

fetch('https://neto-api.herokuapp.com/plane/a319')
    .then(res => {
        console.log('Обработка данных...')
        return res.json();
    })
    .then(json => {
        console.log('Данные получены - ', json);
        currentData = json;
    });