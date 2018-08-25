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
            } catch (e) {
                outputSIn.textContent = e.message;
            }
        });

    });

    signUp.addEventListener('submit', e => {
        e.preventDefault();

        const userMail = signUp.elements[0];
        const userPass = signUp.elements[1];
        const userPassCheck = signUp.elements[2];
        const userName = signUp.elements[3];
        const dataObj = [];
        Array.from(signUp.elements).forEach(el => {
            if (el.id) {
                dataObj[el.name] = el.value;
            }
        });

        const rqst = new XMLHttpRequest();
        rqst.open('POST', 'https://neto-api.herokuapp.com/signup');
        rqst.send(dataObj);
        rqst.addEventListener('load', e => {
            try {
                var result = JSON.parse(rqst.responseText);
                if (result.error) throw Error(result.message);
                outputSUp.textContent = `Пользователь ${result.name} успешно зарегистрирован`;
            } catch (e) {
                outputSUp.textContent = e.message;
            }
        });
    });
});