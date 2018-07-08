const navig = document.getElementsByTagName('nav')[0];
const code = ['KeyY', 'KeyT', 'KeyN', 'KeyJ', 'KeyK', 'KeyJ', 'KeyU', 'KeyB', 'KeyZ'];

function showNavigation(event) {
    if (event.ctrlKey && event.altKey && event.keyCode === 84) {
        navig.classList.toggle('visible');
    } 
}

function showEgg(event) {
	do {
		var i = 0;
		if (event.code === code[i]) {
			console.log(code[i])
			i++;
		} else {
			i = 0;
		}
	} while (i < code.length);
}

document.addEventListener('keypress', showEgg);
document.addEventListener('keyup', showNavigation);