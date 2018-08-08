'use strict';
//canvas
const cnvs = document.createElement('canvas');
const cntx = cnvs.getContext('2d');
//приложение
const app = document.querySelector('.app')
const areaForErr = document.querySelector('#error-message');
//медиа
const audio = app.appendChild(document.createElement('audio'));
audio.src = './audio/click.mp3';
const video = app.appendChild(document.createElement('video'))
//управление
const takePhBtn = document.querySelector('#take-photo');
const list = document.querySelector('.list');
const controls = document.querySelector('.controls').style.display = 'block';

//запросить камеру и запустить или вывести сообщение об ошибке
function reqCam() {
	navigator.mediaDevices.getUserMedia({video: true, audio: false})
		.then((stream) => {
			video.srcObject = stream;
			video.width = '20vw';
			video.play();
			})
		.catch(er => {
			areaForErr.textContent = er;
			areaForErr.style.display = 'block';
		})
}
//сделать снимок
function takePhoto() {
	//определить высоту и ширину фото
	cnvs.width = video.videoWidth;
	cnvs.height = video.videoHeight;
	cntx.drawImage(video, 0, 0);
	//проиграть звук фотозатвора
	audio.play();
	setToList(cnvs);
}
//поместить карточку в разметку
function setToList(props) {
	//создать html-разметку фото по шаблону
	const photo = photoHtml(photoTempl(props));
	//навесить прослушку кликов по фото и поместить разметку на страницу
	photo.addEventListener('click', manageClick)
	list.insertBefore(photo, list.firstElementChild);
}
//создать шаблон карточки
function photoTempl(props) {
	return {
		tag: 'figure',
		content: [
		{
			tag: 'img',
			attrs: {
				src: `${cnvs.toDataURL()}`
			}
		},
		{
			tag: 'figcaption',
			content: [
			{
				tag: 'a',
				attrs: {
					href: `${cnvs.toDataURL()}`,
					download: `snapshot.png`
				},
				content: {
					tag: 'i',
					cls: 'material-icons',
					content: 'file_download'
				}
			},
			{
				tag: 'a',
				content: {
					tag: 'i',
					cls: 'material-icons',
					content: 'file_upload'
				}
			},
			{
				tag: 'a',
				content: {
					tag: 'i',
					cls: 'material-icons',
					content: 'delete'
				}
			}
			]
		}
		]
	}
}
//создать html-код карточки
function photoHtml(photo) {
	//если приходит массив
	if (Array.isArray(photo)) {
		return photo.reduce((f, item) => {
			f.append(photoHtml(item));

			return f;
		}, document.createDocumentFragment()); 
	}
	//если приходит строка
	if (typeof photo === 'string') return document.createTextNode(photo)
	//создать элемент
	const el = document.createElement(photo.tag);
	//присваиваем классы
	[].concat(photo.cls || []).forEach(className => el.classList.add(className));
	//присвоить атрибуты
	if (photo.attrs) {
		Object.keys(photo.attrs).forEach(key => el.setAttribute(key, photo.attrs[key]))
	}
	//проверить наличие вложенности
	if (photo.content) el.appendChild(photoHtml(photo.content));

	return list.appendChild(el);
}
//обработать клик
function manageClick(e) {
	//удалить выбранное фото
	if (e.target.textContent === 'delete') list.removeChild(e.currentTarget);
	//загрузить выбранное фото в поток
	if (e.target.textContent === 'file_upload') {

	}
}
//навесить прослушку событий
window.addEventListener('load', reqCam);
takePhBtn.addEventListener('click', takePhoto);






