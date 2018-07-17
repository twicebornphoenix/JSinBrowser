const tabsContent = document.querySelector('.tabs-content');
const articles = Array.from(tabsContent.children);
const tabsArea = document.querySelector('.tabs-nav');

for (let i = 0; i < articles.length; i++) {
	let liClone = tabsArea.children[0].cloneNode(true);
	tabsArea.appendChild(liClone);
}

tabsArea.children[0].remove();

const tabs = Array.from(tabsArea.children);

articles.forEach((article, index) => {
	let a = tabs[index].children[0];
	a.classList.add(article.dataset.tabIcon);
	a.textContent = article.dataset.tabTitle;
});

tabs[0].classList.add('ui-tabs-active');

function switchTab(e) {
	tabs.forEach(tab => tab.classList.remove('ui-tabs-active'));
	e.target.parentNode.classList.add('ui-tabs-active');
	articles.forEach(article => {
		if (e.target.classList.contains(article.dataset.tabIcon)) {
			article.hidden = false;
		} else {
			article.hidden = true;
		}
	});	
}

tabs.forEach(tab => {
	tab.addEventListener('click', switchTab);
});