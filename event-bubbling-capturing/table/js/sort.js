'use strict';

function handleTableClick(event) {
  if (event.target.tagName !== 'TH') return;
  
  event.target.getAttribute('data-dir') === '1' ?
  	event.target.setAttribute('data-dir', '-1') : 
  	event.target.setAttribute('data-dir', '1');

  const table = document.querySelector('table');
  table.setAttribute('data-sort-by', event.target.dataset.propName);

  sortTable(table.dataset.sortBy, event.target.getAttribute('data-dir'));
}
