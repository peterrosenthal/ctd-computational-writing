export default class Sketch {
    constructor(parent) {
        this.flyingTextItems = []; // since js has the weakest typing known to humankind, I should be clear here: flyingTextItems should only ever be populated by FlyingText objects from the flying-text.js file
        this.fontSize = 32; // default font size 32
        this.backgroundColorR = 255; // default bg color white
        this.backgroundColorG = 255; // default bg color white
        this.backgroundColorB = 255; // default bg color white
        this.foregroundColorR = 0; // default fg color black
        this.foregroundColorG = 0; // default fg color black
        this.foregroundColorB = 0; // default fg color black
        this.width = parent.clientWidth;
        this.height = parent.clientHeight;
        new p5((P5) => {
            let font;
            P5.preload = () => {
                font = P5.loadFont("fonts/FaunaOne-Regular.ttf");
            };
            P5.setup = () => {
                const canvas = P5.createCanvas(this.width, this.height);
                canvas.parent(parent);
                P5.textFont(font);
            };
            P5.draw = () => {
                P5.textSize(Math.floor(this.fontSize));
                P5.background(P5.color(Math.floor(this.backgroundColorR), Math.floor(this.backgroundColorG), Math.floor(this.backgroundColorB)));
                P5.fill(P5.color(Math.floor(this.foregroundColorR), Math.floor(this.foregroundColorG), Math.floor(this.foregroundColorB)));
                this.flyingTextItems.forEach((flyingText) => {
                    flyingText.updatePosition();
                    P5.text(flyingText.text, flyingText.x, flyingText.y);
                });
                this.flyingTextItems = this.flyingTextItems.filter(flyingText => flyingText.x > -P5.width);
            };
        });
    }
}
