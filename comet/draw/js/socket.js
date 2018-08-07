'use strict';

const ws = new WebSocket('ws://neto-api.herokuapp.com/draw');
ws.binaryType = 'arraybuffer';

ws.addEventListener('open', e => console.log('Соединение открыто'));
ws.addEventListener('error', e => console.log(`Произошла ошибка ${e.data}`))

window.editor.addEventListener('update', sendCanvasState);

function sendCanvasState(e) {
	e.canvas.toBlob(blob => ws.send(blob))
}