'use strict';

const doc = document.documentElement;

doc.addEventListener('mousemove', e => {
	const pupil = document.querySelector('.big-book__pupil');
	const pupilPos = pupil.getBoundingClientRect();

	const pupilCX = pupilPos.left + (pupilPos.width / 2);
	const pupilCY = pupilPos.top + (pupilPos.height / 2);
	
	const rightDistance = doc.clientWidth - pupilCX;
	const bottomDistance = doc.clientHeight - pupilCY;
	
	let percentX, percentY, x, y, size;
	
	if (e.clientX < pupilCX) {
		percentX = (pupilCX - e.clientX) * 100 / pupilCX;
		x = -percentX * 30 / 100 + 'px';
	}
	if (e.clientX > pupilCX) {
		percentX = (e.clientX - pupilCX) * 100 / rightDistance;
		x = percentX * 30 / 100 + 'px';
	}
	if (e.clientY < pupilCY) {
		percentY = (pupilCY - e.clientY) * 100 / pupilCY;
		y = -percentY * 30 / 100 + 'px';
	}
	if (e.clientY > pupilCY) {
		percentY = (e.clientY - pupilCY) * 100 / bottomDistance;
		y = percentY * 30 / 100 + 'px';
	}

	(percentX < 33 && percentY < 33) ? size = 3 : (percentX < 66 && percentY < 66) ? size = 2 : size = 1;

	pupil.style.setProperty('--pupil-x', x);
	pupil.style.setProperty('--pupil-y', y);
	pupil.style.setProperty('--pupil-size', size);
});
