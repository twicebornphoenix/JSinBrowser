const btns = Array.from(document.querySelectorAll('.add'));

btns.forEach(btn => btn.addEventListener('click', addItem));

function addItem() {
	let itemsIn = document.getElementById('cart-count');
	let totalPrice = document.getElementById('cart-total-price');

	itemsIn.textContent = +itemsIn.textContent + 1;
	totalPrice.textContent = +totalPrice.textContent + +this.dataset.price;
}