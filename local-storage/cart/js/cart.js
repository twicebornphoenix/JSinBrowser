'use strict';

const colorsPlace = document.querySelector('#colorSwatch');
const sizesPlace = document.querySelector('#sizeSwatch');
const basketPlace = document.querySelector('#quick-cart');
const addToBasket = document.querySelector('#AddToCartForm');

function setActualData() {
    if (!localStorage.length) {
        getColors();
        getSizes();
    }
}

function getColors() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://neto-api.herokuapp.com/cart/colors', true);
    xhr.send();
    xhr.addEventListener('load', setColors);
}

function setColors(e) {
    let res = JSON.parse(e.target.responseText);

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
}

function getSizes() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://neto-api.herokuapp.com/cart/sizes', true);
    xhr.send();
    xhr.addEventListener('load', setSizes);
}

function setSizes(e) {
    let res = JSON.parse(e.target.responseText);
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
}

window.addEventListener('load', setActualData);
addToBasket.addEventListener('submit', function(e) {
    e.preventDefault();
    let color = Array.from(colorsPlace.getElementsByTagName('label')).filter(color => color.control.checked);
    let size = Array.from(sizesPlace.getElementsByTagName('label')).filter(size => size.control.checked);
    if (color.length && size.length) {
        basketPlace.innerHTML = `<div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-2721888517" style="opacity: 1;">
  <div class="quick-cart-product-wrap">
    <img src="https://neto-api.herokuapp.com/hj/3.3/cart/product_1024x1024.png" title="Tony Hunfinger T-Shirt New York">
    <span class="s1" style="background-color: #000; opacity: .5">$800.00</span>
    <span class="s2"></span>
  </div>
  <span class="count hide fadeUp" id="quick-cart-product-count-2721888517">1</span>
  <span class="quick-cart-product-remove remove" data-id="2721888517"></span>
</div>`;
    }
})
