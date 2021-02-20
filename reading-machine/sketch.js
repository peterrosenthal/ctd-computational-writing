export default class Sketch {
    constructor(width, height, fontSize, backgroundColor, foregroundColor) {
        this.flyingTextItems = []; // since js has the weakest typing known to humankind, I should be clear here: flyingTextItems should only ever be populated by FlyingText objects from the flying-text.js file
        this.fontSize = fontSize;
        this.backgroundColor = backgroundColor;
        this.foregroundColor = foregroundColor;
        this.sketch = new p5((P5) => {
            P5.setup = () => {
                P5.createCanvas(width, height);
            };
            P5.draw = () => {
                P5.textSize(this.fontSize);
                P5.background(this.backgroundColor);
                P5.fill(this.foregroundColor);
                this.flyingTextItems.forEach((flyingText) => {
                    flyingText.updatePosition();
                    P5.text(flyingText.text, flyingText.x, flyingText.y);
                });
                this.flyingTextItems = this.flyingTextItems.filter(flyingText => flyingText.x > -P5.width);
            };
        });
    }
}
