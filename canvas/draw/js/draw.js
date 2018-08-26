'use strict';
const cnvs = document.querySelector('#draw');
const cntxt = cnvs.getContext('2d');

let isDrawing = false, brushSizeCur = 100, brushSizePrev, progress = 0;

function clearSize() {
    cnvs.width = window.innerWidth; cnvs.height = window.innerHeight;
    cntxt.clearRect(0, 0, cnvs.width, cnvs.height);
}

function startDrawing(e) {
    isDrawing = true; cntxt.beginPath(); cntxt.moveTo(e.clientX, e.clientY);
}

function draw(e) {
    cntxt.lineJoin = 'round'; cntxt.lineCap = 'round';

    if (isDrawing) {
        cntxt.strokeStyle = `hsl(${progress}, 100%, 50%)`;
        cntxt.lineTo(e.clientX, e.clientY);
        cntxt.lineWidth = brushSizeCur; cntxt.stroke();
    }
    ++progress > 359 ? progress = 0 : progress = progress;    
    
    if (brushSizeCur === 100 || brushSizePrev > brushSizeCur) {
        brushSizePrev = brushSizeCur; brushSizeCur--;
    }
    if (brushSizeCur === 5 || brushSizePrev < brushSizeCur) {
        brushSizePrev = brushSizeCur; brushSizeCur++;
    }
}

function stopDrawing() {
    isDrawing = false;
}

window.addEventListener('mouseup', stopDrawing);
window.addEventListener('load', clearSize);
window.addEventListener('resize', clearSize);
window.addEventListener('mousedown', startDrawing);
cnvs.addEventListener('dblclick', clearSize);
cnvs.addEventListener('mousemove', draw);