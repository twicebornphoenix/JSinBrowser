const thumbPics = document.getElementsByTagName('a');
const thumbPicsArr = Array.from(thumbPics);

let fullSize = document.getElementsByClassName('gallery-view')[0];

function clearAll() {
	thumbPicsArr.forEach(a => a.classList.remove('gallery-current'));
}

function changeState(event) {
		event.preventDefault();
		clearAll();
		fullSize.src = this.href;
		this.classList.add('gallery-current');
	};

thumbPicsArr.forEach((pic, index) => {
	pic.addEventListener('click', changeState);
});