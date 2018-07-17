const btns = Array.from(document.querySelectorAll('.add'));

btns.forEach(btn => btn.addEventListener('click', addItem));

function addItem(event) {
	let itemsIn = document.getElementById('cart-count');
	itemsIn.textContent = +itemsIn.textContent + 1;
	getTotalPrice(event);
}
	
function getTotalPrice(event) {	
	let totalPrice = document.getElementById('cart-total-price');
	let btn = event.target;
	let price = +totalPrice.textContent + +btn.dataset.price;
	totalPrice.textContent = getPriceFormatted(price);
}