'use strict'

const form = document.querySelector('.form-inline');
const shemeArea = document.querySelector('#seatMapDiv');
const showSheme = form.querySelector('#btnSeatMap');
const setFull = form.querySelector('#btnSetFull');
const setEmpty = form.querySelector('#btnSetEmpty');
const mapTitle = document.querySelector('#seatMapTitle');
const mapDiv = document.querySelector('#seatMapDiv');
const total = document.querySelector('#totalPax');
const adult = document.querySelector('#totalAdult');
const half = document.querySelector('#totalHalf');
const select = form.querySelector('select');

setFull.disabled = true;
setEmpty.disabled = true;
let data = getData(); 

function getData(e) {
	const id = e ? e.target.value : 'a319'; 
	fetch(`https://neto-api.herokuapp.com/plane/${id}`)
		.then(res => res.json())
		.then(json => data = json);
}

function setData(e) {
	e.preventDefault();
	
	// mapTitle.textContent = `${data.title} (${data.passengers} пассажиров)`;
	

	let x = createRowTempl(data)
	console.log(x, data)
}

function createRowTempl(data) {
	return {
		tag: 'div',
		cls: ['row', 'seating-row', 'text-center'],
		block: [
		{
			tag: 'div',
			cls: ['col-xs-1', 'row-number'],
			block: {
				tag: 'h2',
				cls: '',
				block: 'Номер ряда'
			}
		},
		{
			tag: 'div',
			cls: 'col-xs-5',
			block: [
			{
				tag: 'div',
				cls: ['col-xs-4', 'seat'],
				block: {
					tag: 'span',
					cls: 'seat-label',
					block: 'Буква места'
				}
			},
			{
				tag: 'div',
				cls: ['col-xs-4', 'seat'],
				block: {
					tag: 'span',
					cls: 'seat-label',
					block: 'Буква места'
				}
			},
			{
				tag: 'div',
				cls: ['col-xs-4', 'seat'],
				block: {
					tag: 'span',
					cls: 'seat-label',
					block: 'Буква места'
				}
			}]
		},
		{
			tag: 'div',
			cls: 'col-xs-5',
			block: [
			{
				tag: 'div',
				cls: ['col-xs-4', 'seat'],
				block: {
					tag: 'span',
					cls: 'seat-label',
					block: 'Буква места'
				}
			},
			{
				tag: 'div',
				cls: ['col-xs-4', 'seat'],
				block: {
					tag: 'span',
					cls: 'seat-label',
					block: 'Буква места'
				}
			},
			{
				tag: 'div',
				cls: ['col-xs-4', 'seat'],
				block: {
					tag: 'span',
					cls: 'seat-label',
					block: 'Буква места'
				}
			}]
		}]
	}
}

form.addEventListener('change', getData);
showSheme.addEventListener('click', setData);