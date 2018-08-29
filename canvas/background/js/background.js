'use strict';

class AnimatedFigure {
    constructor(ops, w, h) {
        this.width = w;
        this.height = h;
        const options = ops;
    }

    static getRandomValue(max, min) {
        return Math.random() * (max - min + 1) + min;
    }

    static getFigureAmount() {
        let amount = this.getRandomValue(options.maxAmount, options.minAmount);
        const delta = amount % options.types.length;
        if (delta !== 0) amount -= delta;

        return amount;
    }

    static createFigures(classes, amount) {
        const classesAmount = classes.length;
        const figures = classes.map(cls => []);

        for (let i = 1; i <= amount; i++) {
        	let index = i;
        	
            if (index < (amount / classesAmount)) {
                index = 0;
            } else if (index === (amount / classesAmount)) {
            	console.log('hi')
            	index = 0;
            } else {
                index = Math.ceil(index / (amount / classesAmount)) -1;
            }
            const x = this.getRandomValue(root.clientWidth, 0);
            const y = this.getRandomValue(root.clientHeight, 0);
            const size = this.getRandomValue(options.maxSize, options.minSize);
            const figure = new classes[index](x, y, size);

            figures[index].push(figure)
        }

        return figures;
    }

    init() {
        const canvas = document.querySelector('#wall');
        const context = canvas.getContext('2d');

        const amount = AnimatedFigure.getFigureAmount();
        const classes = options.types;
        const figures = AnimatedFigure.createFigures(classes, amount);

        canvas.width = this.width;
        canvas.height = this.height;

        context.strokeStyle = options.figuresColor;
        
        figures.forEach(cls => {
        	cls.forEach(f => f.draw(context));
        });	
    }
}

class Figure {
    constructor(x, y, sz) {
        this.x = x;
        this.y = y;
        this.size = sz;
        this.stroke = sz * 5;
    }
}

class Circle extends Figure {
    constructor(x, y, sz, stroke) {
        super(x, y);
        this.radius = sz * 12;
    }

    draw(ctxt) {
        ctxt.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctxt.stroke();
    }
}

class Cross extends Figure {
    constructor(x, y, sz) {
        super(x, y);
        this.size = sz * 20;
        this.xC = this.size / 2 + x;
        this.yC = this.size / 2 + y;
    }

    draw(ctxt) {
        ctxt.moveTo(this.x, this.y);
        ctxt.lineTo(this.x + this.size, this.y + this.size);
        ctxt.moveTo(this.x + this.size, this.y);
        ctxt.lineTo(this.x, this.y + this.size)
        ctxt.stroke();
    }
}

const options = {
    types: [Circle, Cross],
    maxSize: 0.6,
    minSize: 0.1,
    maxAmount: 200,
    minAmount: 50,
    figuresColor: '#ffffff',
    timeFuncs: [
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
    ]
}

const root = document.documentElement;
const animBg = new AnimatedFigure(options, root.clientWidth, root.clientHeight);
animBg.init();