'use strict';

function createElement(dom) {
	const el = document.createElement(dom.name);
	if (dom.props) el.className = dom.props.class;
	if (Array.isArray(dom)) {
		return dom.reduce((f, el) => {
			f.append(createElement(el));

			return f;
		}, document.createDocumentFragment());
	}
	if (typeof dom === 'string') {
		return document.createTextNode(dom);
	}

	if (dom.childs) el.appendChild(createElement(dom.childs));
	
	return el;
}