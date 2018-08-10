'use strict';

window.addEventListener('mousemove', e => {

    const eye = document.querySelector('.big-book__eye');
    const pupil = document.querySelector('.big-book__pupil');

    (function getDistance() {
        const pupilCoords = pupil.getBoundingClientRect();
        const x1 = pupilCoords['left'] + (pupilCoords['width'] / 2);
        const y1 = pupilCoords['top'] + (pupilCoords['height'] / 2);

        const x2 = e.clientX;
        const y2 = e.clientY;

        const distance = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));

        console.log(`Расстояние между курсором и зрачком: ${distance}px,
        	Координаты курсора мыши: ${e.clientX}px ${e.clientY}px`);

        return distance;
    }());

});