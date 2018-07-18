const sendBtn = document.querySelectorAll('.button-contact');
const form = document.querySelector('.contentform');
const message = document.querySelector('main');
const inputs = Array.from(form.querySelectorAll('input'));
const outputs = Array.from(message.querySelectorAll('output'))
const textarea = form.querySelector('textarea');
const zip = form.elements.zip;

zip.type = 'number';

function checkValue() {
	let result = inputs.every(input => input.value);
	if (result && textarea.value) {
		showBtn();
	} else {
		closeBtn();
	}
}

function showBtn() {
	sendBtn[0].disabled = false;
}

function closeBtn() {
	sendBtn[0].disabled = true;
}

function sendMsg(event) {
	event.preventDefault();
	form.classList.toggle('hidden');
	message.classList.toggle('hidden');

	for (let i = 0; i < inputs.length; i++) {
		for (let j = 0; j < outputs.length; j++) {
			if (inputs[i].name === outputs[j].id) outputs[j].value = inputs[i].value;
		}
	}

	outputs[outputs.length - 1].value = textarea.value;
}

inputs.forEach(input => input.addEventListener('change', checkValue));
textarea.addEventListener('change', checkValue);
Array.from(sendBtn).forEach(btn => btn.addEventListener('click', sendMsg))
