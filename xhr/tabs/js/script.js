const request = new XMLHttpRequest();
const content = document.getElementById('content');
const tabs = document.querySelectorAll('a');
const tabsArr = Array.from(tabs);
const preLoader = document.getElementById('preloader');

request.open('GET', 'components/email-tab.html', true);
request.send();

function onLoad() {
	const response = request.responseText;
	content.innerHTML = response;
}

function changeTab(event) {
	let self = this;
	content.innerHTML = '';
	preLoader.classList.remove('hidden');
	event.preventDefault();
	setTimeout(function() {
		request.open('GET', self.getAttribute('href'), true);
		request.send();
		preLoader.classList.add('hidden');
	}, 3000);
	tabsArr.forEach(tab => tab.classList.remove('active'));
	this.classList.add('active');
}

tabs.forEach(tab => tab.addEventListener('click', changeTab));

request.addEventListener('load', onLoad);

