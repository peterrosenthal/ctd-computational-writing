export default class Sketch {
    constructor(parent, width, height) {
        this.flyingTextItems = []; // since js has the weakest typing known to humankind, I should be clear here: flyingTextItems should only ever be populated by FlyingText objects from the flying-text.js file
        this.fontSize = 32; //default font size 32
        this.backgroundColor = 255; //default bg color white
        this.foregroundColor = 0; //default fg color black
        this.sketch = new p5((P5) => {
            P5.setup = () => {
                const canvas = P5.createCanvas(width, height);
                canvas.parent(parent);
            };
            P5.draw = () => {
                P5.textSize(Math.floor(this.fontSize));
                P5.background(Math.floor(this.backgroundColor));
                P5.fill(Math.floor(this.foregroundColor));
                this.flyingTextItems.forEach((flyingText) => {
                    flyingText.updatePosition();
                    P5.text(flyingText.text, flyingText.x, flyingText.y);
                });
                this.flyingTextItems = this.flyingTextItems.filter(flyingText => flyingText.x > -P5.width);
            };
        });
    }
}