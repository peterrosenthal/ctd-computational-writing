export default class FlyingText {
    constructor(text, speed, acceleration, boundsWidth, boundsHeight) {
        this.text = text;
        this.speed = speed;
        this.acceleration = acceleration;
        this.boundsWidth = boundsWidth;
        this.boundsHeight = boundsHeight;
        this.x = boundsWidth;
        this.y = boundsHeight / 2;
    }

    updatePosition = () => {
        this.x -= this.speed * (1 + this.acceleration * Math.abs(this.x - this.boundsWidth / 2) / this.boundsWidth);
    };
}
