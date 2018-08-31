'use strict'; 

class AnimatedFigure { 
    constructor(ops, w, h) { 
        this.width = w; 
        this.height = h; 
        const options = ops; 
    } 

    static getRandomValue(max, min) { 
        return Math.random() * (max - min) + min; 
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
                index = 0; 
            } else { 
                index = Math.ceil(index / (amount / classesAmount)) -1; 
            } 

            const x = this.getRandomValue(root.clientWidth, 0); 
            const y = this.getRandomValue(root.clientHeight, 0); 
            const size = this.getRandomValue(options.maxSize, options.minSize); 
            const timeFunc = options.timeFuncs[Math.round(this.getRandomValue(options.timeFuncs.length - 1, 0))]; 

            const figure = new classes[index](x, y, size, timeFunc); 
            figures[index].push(figure); 
        } 
        return figures; 
    } 

    static startAnimation(ctxt, figures) {
        const start = performance.now();
        const duration = 1000 / options.fps;

        requestAnimationFrame(function animate(time) {
            let collapsed = time - start;

            if (collapsed > duration) {
                collapsed = 0;
                ctxt.clearRect(0, 0, ctxt.canvas.width, ctxt.canvas.height);
                figures.forEach(cls => {
                    cls.forEach(f => {
                        f.draw(ctxt);
                    })
                })
            }
            requestAnimationFrame(animate);   
        })
    }

    init() { 
        const canvas = document.querySelector('#wall'); 
        const context = canvas.getContext('2d'); 

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight; 

        const classes = options.types; 
        const amount = AnimatedFigure.getFigureAmount(); 
        const figures = AnimatedFigure.createFigures(classes, amount); 

        context.strokeStyle = options.figuresColor; 

        AnimatedFigure.startAnimation(context, figures);
    } 
} 

class Figure { 
    constructor(x, y, z, f) { 
        this.x = x;  
        this.y = y; 
        this.z = z; 
        this.f = f; 
        this.lineW = z * 5; 
        this.baseCords = [this.x, this.y]; 
    } 
} 

class Circle extends Figure { 
    constructor(x, y, z, f) { 
        super(x, y, z, f); 
        this.radius = z * 12; 
    } 

    draw(ctxt) {
        const figCords = this.f(this.baseCords[0], this.baseCords[1], Date.now());
        
        ctxt.beginPath(); 
        ctxt.arc(figCords.x, figCords.y, this.radius, 0, 2 * Math.PI); 
        ctxt.lineWidth = this.lineW; 
        ctxt.stroke(); 
    } 
} 

class Cross extends Figure { 
    constructor(x, y, z, f) { 
        super(x, y, z, f); 
        this.side = z * 20; 
        this.xC = this.side / 2 + x; 
        this.yC = this.side / 2 + y; 
    } 

    draw(ctxt) { 
        const figCords = this.f(this.baseCords[0], this.baseCords[1], Date.now());

        ctxt.beginPath(); 
        ctxt.moveTo(this.x, this.y);
        ctxt.lineTo(this.x + this.side, this.y + this.side); 
        ctxt.moveTo(this.x + this.side, this.y); 
        ctxt.lineTo(this.x, this.y + this.side);
        ctxt.lineWidth = this.lineW; 
        ctxt.stroke(); 
    } 
} 

const options = { 
    types: [Circle, Cross], 
    maxSize: 0.6, 
    minSize: 0.1,
    maxAmount: 200, 
    minAmount: 50, 
    fps: 20, 
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