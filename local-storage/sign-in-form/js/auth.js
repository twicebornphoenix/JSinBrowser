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
				let result = JSON.parse(xhr.responseText);
				if (result.error) throw new Error(result.message);
				outputSIn.textContent = `Пользователь ${result.name} успешно вошёл`;
			} catch(e) {
				outputSIn.textContent = e.message;
			}
		});

	});

	signUp.addEventListener('submit', e => {
		e.preventDefault();

		// const userMail = signUp.elements[0];
		// const userPass = signUp.elements[1];
		// const userPassCheck = signUp.elements[2];
		// const userName = signUp.elements[3];
		// const formData = new FormData();
		// Array.from(signUp.elements).forEach(el => {
		// 	if (el.id) {
		// 		formData.append(el.name, el.value);
		// 	}
		// });

		// formData.append(userMail.name, userMail.value);
		// formData.append(userPass.name, userPass.value);
		// formData.append(userPassCheck.name, userPassCheck.value);
		// formData.append(userName.name, userName.value);

		// let dataForm = {};

		// for (const [k, y] of formData) {
		// 	dataForm[k] = y;
		// }

		// dataForm[userMail.name] = userMail.value;
		// dataForm[userPass.name] = userPass.value;
		// dataForm[userPassCheck.name] = userPassCheck.value;
		// dataForm[userName.name] = userName.value;

		const rqst = new XMLHttpRequest();
		rqst.open('POST', 'https://neto-api.herokuapp.com/signup');
		rqst.send(formData);
		rqst.addEventListener('load', e => {
			try {
				var result = JSON.parse(rqst.responseText);
				if (result.error) throw Error(result.message);
				outputSUp.textContent = `Пользователь ${result.name} успешно зарегистрирован`;
			} catch(e) {
				outputSUp.textContent = e.message;
			}
		});

		// fetch('https://neto-api.herokuapp.com/signup', {
		// 	body: formData,
		// 	method: 'POST'
		// })
		// .then(res => res.json())
		// .then(data => {
		// 	data.error ? outputSUp.textContent = data.message : outputSUp.textContent = 'Пользователь зарегистрирован';
		// });
	});
>>>>>>> 363ce6b65cbe85642d3c6f6f59d4632ed522aa53
});