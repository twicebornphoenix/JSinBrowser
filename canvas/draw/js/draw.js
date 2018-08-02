'use strict';

const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

canvas.style.display = 'block';
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let isActive = false;

function clearSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function changeHSL(e) {
    const startHSL = 0;
    const endHSL = 359;
    let curHSL = 0;

    e.shiftKey ? curHSL-- : curHSL++;

    if (curHSL > 359) {
        curHSL = 0;
    } else if (curHSL < 0) {
        curHSL = 359;
    }

    return curHSL;
}

function changeSize() {
    const minSize = 5;
    const maxSize = 100;
    let curSize = 0;

    if (maxSize > curSize) {
        curSize++;
    } else {
        curSize--;
    }
    if (curSize === 100) {
        maxSize = 5;
    }
    if (curSize === 5) {
        maxSize = 100;
    }

    return curSize;
}

function draw(e) {
    if (isActive) {
    	let x = e.clientX;
    let y = e.clientY;
    let curHSL = changeHSL(e);
    let curSize = changeSize()
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.lineTo(x, y);
    ctx.strokeStyle = `hsl(${curHSL}, 100%, 50%)`;
    ctx.lineWidth = curSize;
    ctx.stroke();
}
}

window.addEventListener('resize', clearSize);
canvas.addEventListener('dblclick', clearSize);
canvas.addEventListener('mousemove', draw)
canvas.addEventListener('mousedown', () => {
    isActive = true;
});
canvas.addEventListener('mouseup', () => {
    isActive = false;
})