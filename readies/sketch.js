class TextItem {
    constructor(text, speed, acceleration) {
        this.text = text;
        this.speed = speed;
        this.acceleration = acceleration;
        this.x = window.innerWidth;
        this.y = window.innerHeight / 2;
    }

    updatePosition = () => {
        this.x -= this.speed * (1 + this.acceleration * Math.abs(this.x - window.innerWidth / 2) / window.innerWidth);
    };

    draw = (p5) => {
        p5.text(this.text, this.x, this.y);
    };
}

let sketch = new p5((p5) => {

    const text = ["this", "is", "some", "example", "text", " ", " ", " "];

    let textIndex = 0;
    let textItems = [];
    let textSpeed = 15;
    let textAcceleration = 20;
    let textFrequency = 20;

    p5.setup = () => {
        p5.createCanvas(window.innerWidth, window.innerHeight);
    };

    p5.draw = () => {
        p5.background(255);
        if (p5.frameCount % textFrequency == 0) {
            textItems.push(new TextItem(text[textIndex], textSpeed, textAcceleration));
            textIndex = (textIndex + 1) % text.length;
        }
        p5.textSize(32)
        p5.fill(0)
        textItems.forEach((textItem) => {
            textItem.updatePosition()
            textItem.draw(p5)
        });
    };
});
