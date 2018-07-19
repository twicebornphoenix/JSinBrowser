'use strict';

const counter = document.getElementById('counter');
const btns = document.querySelector('.wrap-btns');
const users = {};

let index;

function User(id, index) {
    this.id = id;
    this.index = index;
}

function setCurrentCounter() {
    if (localStorage.length === 0) {
        index = 0;
    } else {
        let currentUser = JSON.parse(localStorage.getItem('1'));
        index = currentUser.index;
    }
    counter.textContent = index;
}

function changeValue(e) {
    counter.textContent = checkTarget(e);
    let user = new User(1, index);
    
    localStorage.setItem('1', JSON.stringify(user));
}

function checkTarget(e) {
    switch (e.target.id) {
        case 'increment':
            return increment();
        case 'decrement':
            return decrement();
        case 'reset':
            return reset();
    }
}

function increment() {
    index += 1;
    return index;
}

function decrement() {
    index > 0 ? index -= 1 : index = 0;
    return index;
}

function reset() {
    index = 0;
    return index;
}

document.addEventListener('DOMContentLoaded', setCurrentCounter);
btns.addEventListener('click', changeValue);