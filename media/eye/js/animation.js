const wrapper = document.querySelector('.wrapper');
const pupil = document.querySelector('.big-book__pupil');
const eye = document.querySelector('.big-book__eye');

function animate(e) {
    let offset = eye.getBoundingClientRect();

    let eyeX = (offset.left + 5) + (offset.width / 2);
    let eyeY = (offset.top) + (offset.height / 2);
    
    let cursorX = e.clientX;
    let cursorY = e.clientY;

    let radian = Math.atan2(cursorX - eyeX, cursorY - eyeY);
    let degree = (radian * (180 / Math.PI) * 1);

    pupil.style.setProperty('--pupil-x', `${pupil.offsetLeft + pageXOffset}px`);
    pupil.style.setProperty('--pupil-y', `${pupil.offsetTop + pageYOffset}px`);
}

document.addEventListener('mousemove', animate)