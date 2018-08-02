'use strict'

const form = document.querySelector('.form-inline');
const shemeArea = document.querySelector('#seatMapDiv');
const showSheme = form.querySelector('#btnSeatMap');
const setFull = form.querySelector('#btnSetFull');
const setEmpty = form.querySelector('#btnSetEmpty');
const mapTitle = document.querySelector('#seatMapTitle');
const total = document.querySelector('#totalPax');
const adult = document.querySelector('#totalAdult');
const half = document.querySelector('#totalHalf');
const select = Array.from(form.elements).find((el, index) => form[index].tagName === 'SELECT' ? el : false );

setFull.disabled = true;
setEmpty.disabled = true;
let plain;

function getData(e) {
	return fetch(`https://neto-api.herokuapp.com/plane/${e.target.value}`)
		.then(res => res.json())
		.then(json => plain = json);
}

function showData(e, obj) {
	e.preventDefault();
	
	obj = plain;
	mapTitle.textContent = `${obj.title} (${obj.passengers} пассажиров)`;
	
}

form.addEventListener('change', getData);
showSheme.addEventListener('click', showData);