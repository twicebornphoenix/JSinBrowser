const tasks = Array.from(document.querySelectorAll('label'));
const undone = document.querySelector('.todo-list .undone');
const done = document.querySelector('.todo-list .done');

function manageTask(e) {
	if (e.currentTarget.children[0].checked) {
		done.appendChild(e.currentTarget);
	} else {
		undone.appendChild(e.currentTarget);
	}
}

tasks.forEach(task => task.addEventListener('click', manageTask, true));


