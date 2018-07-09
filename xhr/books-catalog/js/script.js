const xhr = new XMLHttpRequest();
const content = document.getElementById('content');

xhr.open('GET',
	'https://neto-api.herokuapp.com/book/',
	true);
xhr.send();

function onLoad() {
	let result = JSON.parse(xhr.responseText);
	content.innerHTML = '';
	for (let i = 0; i < result.length; i++) {
		content.innerHTML += `<li data-title="${result[i].title}" data-author="${result[i].author.name}" data-info="${result[i].info}" data-price="${result[i].price}"><img src="${result[i].cover.small}"></li>`;
	}
}

xhr.addEventListener('load', onLoad);