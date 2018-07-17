const contentForm = document.querySelector('form');
const sendBtn = document.querySelector('.button-contact');

function showButton() {
	if (isThereEmpty()) sendBtn.removeAttribute(disabled);
}

function isThereEmpty() {
	Array.from(document.querySelectorAll('input')).forEach(input => {
		if (input.value == '') return true;
	});
	return false;
}

window.addEventListener('input', isThereEmpty);