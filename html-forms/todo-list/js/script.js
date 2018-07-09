const inputsArr = Array.from(document.querySelectorAll('input'));
const doneTasks = document.getElementsByTagName('output')[0];
const listBlock = document.querySelector('.list-block');

let index = 0;

for (let i = 0; i < inputsArr.length; i++) {
	if (inputsArr[i].checked) doneTasks.value = `${++index} из ${inputsArr.length}`;
}

inputsArr.forEach(input => input.addEventListener('click', function() {

	this.checked ? doneTasks.value = `${++index} из ${inputsArr.length}`: 
					doneTasks.value = `${--index} из ${inputsArr.length}`;

	index >= inputsArr.length ? listBlock.classList.add('complete') : 
								listBlock.classList.remove('complete');
}));