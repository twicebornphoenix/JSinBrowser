'use strict';

document.addEventListener('DOMContentLoaded', function() {
	const signIn = document.querySelector('.sign-in-htm');
	const signUp = document.querySelector('.sign-up-htm');
	const outputSUp = signUp.querySelector('.error-message');
	const outputSIn = signIn.querySelector('.error-message');

	signIn.addEventListener('submit', function(e) {
		e.preventDefault();
		const xhr = new XMLHttpRequest();

		xhr.open('POST', 'https://neto-api.herokuapp.com/signin');
		const formData = new FormData(signIn);
		xhr.send(formData);

		xhr.addEventListener('load', function() {
			try {
				var result = JSON.parse(xhr.responseText);
				if (result.error) throw e;
				outputSIn.textContent = `Пользователь ${result.name} успешно вошёл`;
			} catch(e) {
				outputSIn.textContent = result.message;
			}
		});

	});

	signUp.addEventListener('submit', e => {
		e.preventDefault();
		let dataForm = {};

		const formData = new FormData(signUp);
		for (const [k, v] of formData) {
			dataForm[k] = v;
		}

		fetch('https://neto-api.herokuapp.com/signup', {
			body: JSON.stringify(dataForm),
			method: 'POST'
		})
		.then(res => res.json())
		.then(data => {
			data.error ? outputSUp.textContent = data.message : outputSUp.textContent = 'Пользователь зарегистрирован';
		})
	});
});