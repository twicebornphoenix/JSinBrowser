'use strict';

document.addEventListener('DOMContentLoaded', function() {

	const signIn = document.querySelector('.sign-in-htm');
	const signUp = document.querySelector('.sign-up-htm');

	signIn.addEventListener('submit', function(e) {
		let formData = new FormData(signIn);
		let xhr = new XMLHttpRequest();

		xhr.open('POST', 'https://neto-api.herokuapp.com/signin', true);
		xhr.send(formData);

		xhr.addEventListener('load', function() {
			try {
				var result = JSON.parse(xhr.responseText);
				if (result.error) throw e;
				signIn.querySelector('.error-message').textContent = `Пользователь ${result.name} успешно вошёл`;
			} catch(e) {
				signIn.querySelector('.error-message').textContent = result.message;
			}
		});

		e.preventDefault();
	});

	signUp.addEventListener('submit', function(e) {
		let formData = new FormData(signUp);
		let xhr = new XMLHttpRequest();

		xhr.open('POST', 'https://neto-api.herokuapp.com/signup', true);
		xhr.send(formData);

		xhr.addEventListener('load', function() {
			try {
				var result = JSON.parse(xhr.responseText);
				if (result.error) throw e;
				signUp.querySelector('.error-message').textContent = `Пользователь ${result.name} успешно зарегистрирован`;
			} catch(e) {
				signUp.querySelector('.error-message').textContent = result.message;
			}
		});

		e.preventDefault();
	});
});

