'use strict';

const itemsList = document.querySelector('.items-list');
let addBtns = Array.from(itemsList.querySelectorAll('.add-to-cart'));

function collectAddBtns() {
	addBtns = Array.from(itemsList.querySelectorAll('.add-to-cart'));
	setListener();
}

function setListener() {
	addBtns.forEach(btn => btn.addEventListener('click', prepareToAdd));
}

function prepareToAdd(e) {
	e.preventDefault();
	addToCart(e.target.dataset);
}

showMore.addEventListener('click', collectAddBtns);
addBtns.forEach(btn => btn.addEventListener('click', prepareToAdd));