'use strict';

const colorsPlace = document.querySelector('#colorSwatch');
const sizesPlace = document.querySelector('#sizeSwatch');
const basketPlace = document.querySelector('#quick-cart');
const addToBasket = document.querySelector('#AddToCartForm');
const thumbs = Array.from(document.querySelectorAll('.thumb-image'));

function setActualData() {
    getColors('https://neto-api.herokuapp.com/cart/colors');
    getSizes('https://neto-api.herokuapp.com/cart/sizes');
}


function getColors(target) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', target, true);
    xhr.send();
    xhr.addEventListener('load', setColors);
}

function setColors(e) {
    let res = localStorage.color ? JSON.parse(localStorage.getItem('color')) : JSON.parse(e.target.responseText);
    if (!localStorage.color) {
        let serial = JSON.stringify(res);
        localStorage.setItem('color', serial);
    }
    res.forEach(color => {
        let isAvailable = color.isAvailable ? 'available' : 'soldout';
        let isDisabled = color.isAvailable ? '' : 'disabled';

        colorsPlace.innerHTML += `<div data-value="${color.code}" class="swatch-element color ${color.code} ${isAvailable}">
  <div class="tooltip">${color.title}</div>
  <input quickbeam="color" id="swatch-1-${color.code}" type="radio" name="color" value="${color.code}" ${isDisabled}>
  <label for="swatch-1-${color.code}" style="border-color: ${color.code};">
    <span style="background-color: ${color.code};"></span>
    <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
  </label>
</div>`;
    });
    setSelectedInputs(colorsPlace);
}

function setSelectedInputs(item) {
    const inputs = item.querySelectorAll('input');
    if (localStorage.item) {
    	let x = document.querySelector(`#${localStorage.item}`);
    	console.log(x)
    	x.setAttribute('checked', true);
    }
    inputs.forEach(input => {
        input.addEventListener('click', function(e) {
            localStorage.item = e.target.id;
        })
    })
}

function getSizes(target) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', target, true);
    xhr.send();
    xhr.addEventListener('load', setSizes);
}

function setSizes(e) {
    let res = localStorage.size ? JSON.parse(localStorage.getItem('size')) : JSON.parse(e.target.responseText);
    if (!localStorage.size) {
        let serial = JSON.stringify(res);
        localStorage.setItem('size', serial);
    }
    res.forEach(size => {

        let isAvailable = size.isAvailable ? 'available' : 'soldout';
        let isDisabled = size.isAvailable ? '' : 'disabled';
        sizesPlace.innerHTML += `<div data-value="${size.type}" class="swatch-element plain ${size.type} ${isAvailable}">
  <input id="swatch-0-${size.type}" type="radio" name="size" value="${size.type}" ${isDisabled}>
  <label for="swatch-0-${size.type}">
    ${size.title}
    <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
  </label>
</div>`;
    });
    setSelectedInputs(sizesPlace);
}

function getBasket(e) {
    e.preventDefault();
    let color = Array.from(colorsPlace.getElementsByTagName('label')).filter(color => color.control.checked);
    let size = Array.from(sizesPlace.getElementsByTagName('label')).filter(size => size.control.checked);
    if (color.length && size.length) {
        const form = new FormData(e.target);
        form.append('productId', addToBasket.dataset.productId);
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://neto-api.herokuapp.com/cart', true);
        xhr.send(form);
        xhr.addEventListener('load', setBasket);
    }
}

function setBasket(e) {
    const res = JSON.parse(e.target.responseText);
    res.forEach(obj => {
        basketPlace.innerHTML = `<div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-${obj.id}" style="opacity: 1;">
  <div class="quick-cart-product-wrap">
    <img src="${obj.pic}" title="${obj.title}">
    <span class="s1" style="background-color: #000; opacity: .5">$${obj.price}.00</span>
    <span class="s2"></span>
  </div>
  <span class="count hide fadeUp" id="quick-cart-product-count-${obj.id}">${obj.quantity}</span>
  <span class="quick-cart-product-remove remove" data-id="${obj.id}"></span>
</div>`;
        basketPlace.innerHTML += `<a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico open">
  <span>
    <strong class="quick-cart-text">Оформить заказ<br></strong>
    <span id="quick-cart-price">$${obj.price * obj.quantity}.00</span>
  </span>
</a>`;
    })
    deleteItem();
}

function deleteItem() {
    let btn = document.querySelector('.remove');
    btn.addEventListener('click', function(e) {
        const form = new FormData();
        form.append('productId', e.target.dataset.id);
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://neto-api.herokuapp.com/cart/remove', true);
        xhr.send(form);
        xhr.addEventListener('load', function() {
            let res = Array.from(JSON.parse(xhr.responseText));
            if (res.length) {
                res.forEach(obj => {
                    basketPlace.innerHTML = `<div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-${obj.id}" style="opacity: 1;">
  <div class="quick-cart-product-wrap">
    <img src="${obj.pic}" title="${obj.title}">
    <span class="s1" style="background-color: #000; opacity: .5">$${obj.price}.00</span>
    <span class="s2"></span>
  </div>
  <span class="count hide fadeUp" id="quick-cart-product-count-${obj.id}">${obj.quantity}</span>
  <span class="quick-cart-product-remove remove" data-id="${obj.id}"></span>
</div>`;
                    basketPlace.innerHTML += `<a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico open">
  <span>
    <strong class="quick-cart-text">Оформить заказ<br></strong>
    <span id="quick-cart-price">$${obj.price * obj.quantity}.00</span>
  </span>
</a>`;
                })
                deleteItem();
            } else {
                document.querySelector('#quick-cart-pay').classList.remove('open');
                basketPlace.innerHTML = '';
            }
        })
    })
}

function setBigImage(e) {
    e.preventDefault();
    const target = e.target.closest('a');
    thumbs.forEach(thumb => {
        thumb.classList.remove('active');
    })
    target.classList.add('active');
    let url = target.href;
    const bigImage = document.getElementById('big-image');
    bigImage.style.backgroundImage = `url('${url}')`;
}

window.addEventListener('load', setActualData);
thumbs.forEach(thumb => {
    thumb.addEventListener('click', setBigImage);
});
addToBasket.addEventListener('submit', getBasket);