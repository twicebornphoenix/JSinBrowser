'use strict';

const chat = document.querySelector('.chat');
const messages = chat.getElementsByClassName('messages-content')[0];
const message = chat.getElementsByClassName('message')[0].nextElementSibling;
const status = chat.getElementsByClassName('chat-status')[0];
const messageStatus = chat.getElementsByClassName('message-status')[0];
const sendBtn = chat.getElementsByClassName('message-submit')[0];

const ws = new WebSocket('wss://neto-api.herokuapp.com/chat');

console.log(message)

ws.addEventListener('open', function(e) {
	if (e.target.onerror) {
		throw new Error();
	} else {
		let statusText = messageStatus.cloneNode(true);
		statusText.textContent = `Пользователь появился в сети`;
		sendBtn.disabled = false;
		status.textContent = status.dataset.online;
		messages.appendChild(statusText);
	}
});

ws.addEventListener('message', function(e) {
	if (e.data === '...') {
		let statusText = messageStatus.cloneNode(true);
		statusText.textContent = `Пользователь печатает сообщение`;
		messages.appendChild(statusText)
	} else {
		let messageText = message.cloneNode(true);
		messageText.children[1].textContent = e.data;
		messageText.children[2].textContent = new Date().toTimeString().slice(0, 5);
		messages.appendChild(messageText);
	}
});

ws.addEventListener('close', function() {
	status.textContent = status.dataset.offline;
	sendBtn.disabled = true;
	let statusText = messageStatus.cloneNode(true);
	statusText.textContent = `Пользователь не в сети`;
	messages.appendChild(statusText);
});