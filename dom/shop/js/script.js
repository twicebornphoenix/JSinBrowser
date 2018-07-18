const btns = Array.from(document.querySelectorAll('.add'));
let totalPrice = document.getElementById('cart-total-price');
let price = +totalPrice.textContent;

function addItem(event) {
	let itemsIn = document.getElementById('cart-count');

	itemsIn.textContent = +itemsIn.textContent + 1;
	getTotalPrice(event.target);
}

function getTotalPrice(target) {
	price = price + +target.dataset.price;

	totalPrice.textContent = getPriceFormatted(price);
}


btns.forEach(btn => btn.addEventListener('click', addItem));
