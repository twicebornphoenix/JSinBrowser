'use strict';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const colors = ['#ffffff', '#ffe9c4', '#d4fbff']

canvas.style.backgroundColor = '#000'

canvas.width = 800;
canvas.height = 400;

generateStarField();
canvas.addEventListener('click', generateStarField);

function generateStarField() {
    const stars = Math.floor(randomValue(400, 200));

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < stars; i++) {
        const brightness = +randomValue(1, 0.8).toFixed(1);
        const size = +randomValue(1.1, 0).toFixed(1);
        const color = colors[Math.floor(randomValue(2, 0))];

        const x = Math.round(randomValue(0, canvas.width));
        const y = Math.round(randomValue(0, canvas.height));

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.globalAlpha = brightness;
        ctx.fillRect(x, y, size, size);
    }
}

function randomValue(max, min) {
    const diff = max - min;
    return Math.random() * diff + min;
}
