'use strict';

const cnvs = document.querySelector('#wall');
const cntxt = cnvs.getContext('2d');

cntxt.width = window.innerWidth;
cntxt.height = window.innerHeight;

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

class Figure {
    contructor() {
        this.x = x;
        this.y = y;
        this.max, this.min;
        this.timeFunc = timeFunctions[Math.random() * (2 - 1) + 1]; 
    }
    get randomValue() {
    	return Math.random() * (max - min) + min;
    	
    }
    set dataForRandom(value) {
    	let max = value[0]
    	let min = value[1]
    	randomValue(max, min);
    }
}

const obj = new Figure(50, 90);
obj.valueForRandom = [0.6, 0.1];
let x = obj.randomSize


console.log(x)