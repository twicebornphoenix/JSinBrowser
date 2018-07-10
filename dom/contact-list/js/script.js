const contactsData = JSON.parse(loadContacts());
const contactsItem = document.querySelector('.contacts-list');

 contactsItem.innerHTML = '';

 for(let i = 0; i < contactsData.length; i++) {
 	 contactsItem.innerHTML += `<li data-email="${contactsData[i].email}" data-phone="${contactsData[i].phone}"><strong>${contactsData[i].name}</strong></li>`;
 }