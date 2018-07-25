'use strict';

const canvas = document.getElementsByTagName('canvas')[0];
const ws = new WebSocket('wss://neto-api.herokuapp.com/mouse');

ws.addEventListener('open', e => showBubbles(e.target));

canvas.addEventListener('click', e => {
	ws.send(JSON.stringify({'x':e.clientX,'y':e.clientY}));
});
