'use strict';
class WebS {
    constructor(url) {
        this.webS = new WebSocket(url);
    }

    static hideN(number) {
        setTimeout(() => number.classList.remove('flip-it'), 2000);
    }

    static showNumber(e) {
        Array.from(document.querySelector('.websocket').children)
            .forEach(number => {
                if (e.data === number.textContent) {
                    number.classList.add('flip-it');

                    WebS.hideN(number);
                }
            })
    }
    addListener(event) {
        this.webS.addEventListener(event, WebS.showNumber)
    }
}

const ws = new WebS('wss://neto-api.herokuapp.com/comet/websocket');
ws.addListener('message');
