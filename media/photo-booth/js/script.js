'use strict';

const cnvs = document.createElement('canvas');
const cntx = cnvs.getContext('2d');

const app = document.querySelector('.app')
const areaForErr = document.querySelector('#error-message');

const audio = app.appendChild(document.createElement('audio'));
audio.src = './audio/click.mp3';
const video = app.appendChild(document.createElement('video'))

const takePhBtn = document.querySelector('#take-photo');
const list = document.querySelector('.list');
const controls = document.querySelector('.controls').style.display = 'block';


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

function takePhoto() {

	cnvs.width = video.videoWidth;
	cnvs.height = video.videoHeight;
	cntx.drawImage(video, 0, 0);

	audio.play();
	setToList(cnvs);
}

function setToList(props) {

	const photo = photoHtml(photoTempl(props));

	photo.addEventListener('click', manageClick);
	list.insertBefore(photo, list.firstElementChild);
}

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

function photoHtml(photo) {

	if (Array.isArray(photo)) {
		return photo.reduce((f, item) => {
			f.append(photoHtml(item));

			return f;
		}, document.createDocumentFragment()); 
	}

	if (typeof photo === 'string') return document.createTextNode(photo)

	const el = document.createElement(photo.tag);

	[].concat(photo.cls || []).forEach(className => el.classList.add(className));

	if (photo.attrs) {
		Object.keys(photo.attrs).forEach(key => el.setAttribute(key, photo.attrs[key]))
	}

	if (photo.content) el.appendChild(photoHtml(photo.content));

	return list.appendChild(el);
}

function manageClick(e) {
	if (e.target.textContent === 'delete') list.removeChild(e.currentTarget);
	if (e.target.textContent === 'file_upload') {
		cnvs.width = e.currentTarget.children[0].width;
		cnvs.height = e.currentTarget.children[0].height;

		cnvs.toBlob( blob => {
			const formData = new FormData();
			formData.append('image', blob);
			fetch('https://neto-api.herokuapp.com/photo-booth', {
				method: 'POST',
				body: formData
			})
		})
	}
}

window.addEventListener('load', reqCam);
takePhBtn.addEventListener('click', takePhoto);






