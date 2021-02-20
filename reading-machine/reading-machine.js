import Sketch from "./sketch.js";
import FlyingText from "./flying-text.js";

const textForTesting = ["this", "is", "some", "test", "text", " ", " ", " "];

const sketchSpeed = 5;
const textSpeed = 15;
const textAcceleration = 20;
const fontSize = 32;

const sketch = new Sketch(window.innerWidth, window.innerHeight, fontSize, 255, 0);

const addText = (index) => {
    sketch.flyingTextItems.push(new FlyingText(textForTesting[index], textSpeed, textAcceleration, window.innerWidth, window.innerHeight));
    setTimeout(() => addText((index + 1) % textForTesting.length), 1000 / sketchSpeed);
};

addText(0);
