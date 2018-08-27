'use strict';


const maxSize = 0.6;
const minSize = 0.1;
const maxAmount = 200;
const minAmount = 50;
const widthStrokePw = 5;
const figuresColor = 'FFFFFF';


const figuresArray = ['Circle', 'Cross'];
const timeFunctions = [
    function nextPoint(x, y, time) {
        return {
            x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
            y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
        };
    },
    function nextPoint(x, y, time) {
        return {
            x: x + Math.sin((x + (time / 10)) / 100) * 5,
            y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
        }
    }
];


class Engine {
	constructor() {

	}
	static getRandomValue(max, min) {
        return Math.random() * (max - min) + min;
	}
	static getFiguresAmount() {
		const amount = Math.round(Engine.getRandomValue(maxAmount, minAmount));
		return ( amount % 2 === 0 ) ? amount : amount - 1;
	}
	static createFigures(amount, context) {
		let emptyArr = new Array(amount);
		
		emptyArr.fill(el => '.').forEach((el, i, arr) => {
				const name = ((i + 1) > arr.length / 2) ? figuresArray[0] : figuresArray[1];
				const position = Engine.getPosition();
				const size = Engine.getRandomValue(maxSize, minSize);
				const func = timeFunctions[Engine.getRandomValue(timeFunctions.length - 1, 0)];
				const figure = `new ${name}(${position.x}, ${position.y}, ${size}, ${func})`;
				figure.draw(context);
		});
	}
	static getPosition() {
		return {x: Engine.getRandomValue(window.innerWidth, 0),
						y: Engine.getRandomValue(window.innerHeight, 0)}
	}
	init() {
		const cnvs = document.querySelector('#wall');
		const cntxt = cnvs.getContext('2d');
		
		cntxt.width = window.innerWidth;
		cntxt.height = window.innerHeight;
		
		const amount = this.getFiguresAmount();
		Engine.createFigures(amount, context);
	}
}

class Figure {
    constructor(x, y, z, f) {
    	this.x = x;
    	this.y = y;
    	this.size = z;
    	this.timeFunc = f;
    }
}

class Cross extends Figure {
	constructor(z) {
		super();
		this.size = z * 20;
	}
	draw(cntxt) {

	}
}

class Circle extends Figure {
	constructor(z) {
		super();
		this.radius = z * 12;
	}
	draw(cntxt) {
		contxt.arc()
	}
}

const engine = new Engine();
engine.init();
