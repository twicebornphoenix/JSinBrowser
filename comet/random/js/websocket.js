'use strict';

const wsNumbers = document.querySelector('.websocket').children;

// const ws = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');
// ws.addEventListener('message', e => {
// 	Array.from(wsNumbers).forEach(number => {
// 		if (e.data === number.textContent) {
// 			console.log(e.data)
// 			number.classList.add('flip-it');
// 			setTimeout(function() {number.classList.remove('flip-it')}, 3000);
// 		}
// 	})
// });

class Wsocket {
	constructor(url, t) {
		this.ws = new WebSocket(url);
		this.t = t || 2000;
	}
	showNumber(e) {
		Array.from(wsNumbers)
			.forEach(number => {
			if (e.data === number.textContent) {
				number.classList.add('flip-it');
				self.hideNumber(number);
			}
		})
	}
	hideNumber(number) {
		setTimeout(function() {
			number.classList.remove('flip-it')
		}, this.t);
	}
	adListener(event) {
		this.ws.addEventListener(event, this.showNumber)
	}
}

const ws = new Wsocket('wss://neto-api.herokuapp.com/comet/websocket');
ws.adListener('message')
