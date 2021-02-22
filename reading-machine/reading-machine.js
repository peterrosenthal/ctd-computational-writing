import Sketch from "./sketch.js";
import FlyingText from "./flying-text.js";
import Settings from "./settings.js";

const textForTesting = ["this", "is", "some", "test", "text", " ", " ", " "];

const sketch = new Sketch(document.getElementById("sketch"));
const settings = new Settings(sketch);

const addText = (index) => {
    const newText = new FlyingText(textForTesting[index], settings.textSpeed, settings.textAcceleration, sketch.width, sketch.height);
    const timeout = 1000 / settings.textFrequency;
    index = (index + 1) % textForTesting.length;
    
    sketch.flyingTextItems.push(newText);
    setTimeout(() => addText(index), timeout);
};

addText(0);
