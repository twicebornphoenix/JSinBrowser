const slider = document.querySelector('slider');
const slides = Array.from(document.querySelectorAll('.slides > .slide'));
const btns = Array.from(document.querySelectorAll('.slider-nav > a'));

let index = 0;
slides[index].classList.add('slide-current');
// btns.forEach(btn => {
//     if (btn.dataset.action === 'prev' || btn.dataset.action === 'first') btn.classList.add('disabled');
// });

function changeSlide(event) {
    switch (event.target.dataset.action) {
        case 'next':
            if (slides[index].nextElementSibling) {
                slides[index].classList.remove('slide-current');
                slides[++index].classList.add('slide-current');
                if (!slides[index].nextElementSibling) {
                    btns.forEach(btn => {
                        if (btn.dataset.action === 'next' || btn.dataset.action === 'last') btn.classList.add('disabled');
                    });
                    return;
                }
            }
            break;
        case 'prev':
            if (slides[index].previousElementSibling) {
                slides[index].classList.remove('slide-current');
                slides[--index].classList.add('slide-current');
                if (!slides[index].previousElementSibling) {
                    btns.forEach(btn => {
                        if (btn.dataset.action === 'prev' || btn.dataset.action === 'first') btn.classList.add('disabled');
                    });
                    return;
                }
            }
            break;
        case 'first':
            console.log('first');
            break;
        case 'last':
            console.log('last');
            break;
    }
}

btns.forEach(btn => btn.addEventListener('click', changeSlide));