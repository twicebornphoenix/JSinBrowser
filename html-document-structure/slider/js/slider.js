const slider = document.querySelector('slider');
const slides = Array.from(document.querySelectorAll('.slides > .slide'));
const btns = Array.from(document.querySelectorAll('.slider-nav > a'));

let index = 0;

slides[0].classList.add('slide-current');
btns.forEach(btn => {
	if (btn.dataset.action === 'prev' || btn.dataset.action === 'first') btn.classList.add('disabled');
});

function changeBtnStatus() {
	if (slides[index].nextElementSibling && slides[index].previousElementSibling) {
		btns.forEach(btn => {
			btn.classList.remove('disabled');
		});
	} else if (!slides[index].nextElementSibling && slides[index].previousElementSibling) {
		btns.forEach(btn => {
			if (btn.dataset.action === 'next' || btn.dataset.action === 'last') {
				btn.classList.add('disabled');	
			} else {
				btn.classList.remove('disabled');
			}
		});
	} else if (!slides[index].previousElementSibling && slides[index].nextElementSibling) {
		btns.forEach(btn => {
			if (btn.dataset.action === 'prev' || btn.dataset.action === 'first') {
				btn. classList.add('disabled');
			} else {
				btn.classList.remove('disabled');
			}
		});
	}
}

function changeSlide(event) {
	switch(event.target.dataset.action) {
		case 'next': 
			if (!slides[index].nextElementSibling) {
				return;
			}
			slides[index].classList.remove('slide-current');
			++index;
			slides[index].classList.add('slide-current');
			break;
		case 'prev':
			if (!slides[index].previousElementSibling) {
				return;
			}
			slides[index].classList.remove('slide-current');
			--index;
			slides[index].classList.add('slide-current');
			break;
		case 'first':
			slides[index].classList.remove('slide-current');
			slides[0].classList.add('slide-current');
			index = 0;
			break;
		case 'last':
			slides[index].classList.remove('slide-current');
			slides[slides.length - 1].classList.add('slide-current');
			index = slides.length - 1;
			break;
	}
	changeBtnStatus();
}

btns.forEach(btn => btn.addEventListener('click', changeSlide));