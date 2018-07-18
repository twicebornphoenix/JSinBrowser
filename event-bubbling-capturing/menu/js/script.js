const dropdownMenus = Array.from(document.querySelectorAll('.dropdown-menu'));

function showSelected(e) {
	e.preventDefault();
	e.stopPropagation();
}

dropdownMenus.forEach(dropdownMenu => {
	dropdownMenu.addEventListener('click', showSelected);
});