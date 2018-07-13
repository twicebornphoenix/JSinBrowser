const slider = document.querySelector('slider');
const slides = Array.from(document.querySelectorAll('.slides > .slide'));
const btns = Array.from(document.querySelectorAll('.slider-nav > a'));

let index = 0;
let currentSlide = slides[index];
currentSlide.classList.add('slide-current');

function changeSlide(event) {
	slides.forEach(slide => slide.classList.remove('slide-current'));
	switch(event.target.dataset.action) {
		case 'next': 
			if (index === slides.length - 1) {
				index = 0;
			}
				currentSlide = slides[index++];
				currentSlide.nextElementSibling.classList.add('slide-current');
			break;
		case 'prev':
			if (index === 0) {
				index = slides.length - 1;
			}
				currentSlide = slides[index--];
				currentSlide.previousElementSibling.classList.add('slide-current');
			break;
		case 'first':
			currentSlide = slides[0];
			currentSlide.classList.add('slide-current');
			index = 0;
			break;
		case 'last':
			currentSlide = slides[slides.length - 1];
			currentSlide.classList.add('slide-current');
			index = slides.length - 1;
			break;
	}
}

btns.forEach(btn => btn.addEventListener('click', changeSlide));
