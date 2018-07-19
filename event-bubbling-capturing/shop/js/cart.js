'use strict';

function checkTarget(e) {
		e.preventDefault();
		if (e.target.className === 'add-to-cart') {
				addToCart(e.target.dataset);
		}
}

document.querySelector('.items-list')
		.addEventListener('click', checkTarget);