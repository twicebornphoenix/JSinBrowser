const require = new XMLHttpRequest();
const from = document.getElementById('from');
const to = document.getElementById('to');
const output = document.getElementById('result');
const type = document.getElementById('source');

let data;

require.open('GET',
	'https://neto-api.herokuapp.com/currency',
	'true');
require.send();

function spreadCode(direction) {
	Array.from(data).forEach(obj => {
		let option = document.createElement('option');
		direction.appendChild(option);
		option.innerHTML = obj.code;
	});
}

function getData() {
	loader.classList.remove('hidden');
	data = JSON.parse(require.response);
	spreadCode(from);
	spreadCode(to);
	setTimeout(imitation, 2000);
	showResult();
}

function imitation() {
	loader.classList.add('hidden');
	content.classList.remove('hidden');
}

function showResult() {
	output.value = type.value;
}

require.addEventListener('load', getData);
type.addEventListener('input', showResult);