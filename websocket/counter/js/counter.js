'use strict';

const ws = new WebSocket('wss://neto-api.herokuapp.com/counter');
const counter = document.querySelector('.counter');
const errors = document.querySelector('.errors');

ws.addEventListener('message', function(e) {
	let connection = JSON.parse(e.data);
	counter.innerHTML = connection.connections;
	errors.innerHTML = connection.errors;
})

window.addEventListener('beforeunload', function(e) {
	ws.close(1000, "Соединение будет закрыто");
});