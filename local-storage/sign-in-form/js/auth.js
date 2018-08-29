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
        const objectData = {};
        formData.forEach((k, v) => objectData[v] = k);

        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.send(JSON.stringify(objectData));
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

        const rqst = new XMLHttpRequest();
        rqst.open('POST', 'https://neto-api.herokuapp.com/signup');
        
        const forma = new FormData(signUp);
        const objFromForm = {};
        forma.forEach((v, k) => objFromForm[k] = v);

        rqst.setRequestHeader('Content-Type', 'application/json')

        rqst.send(JSON.stringify(objFromForm));
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