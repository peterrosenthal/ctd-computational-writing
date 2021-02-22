import Sketch from "./sketch.js";
import FlyingText from "./flying-text.js";
import Settings from "./settings.js";
import { story } from "./bob-brown-text.js";

const sketch = new Sketch(document.getElementById("sketch"));
const settings = new Settings(sketch);

const addText = (index) => {
    const newText = new FlyingText(story[index], settings.textSpeed, settings.textAcceleration, sketch.width, sketch.height);
    const timeout = 1000 / settings.textFrequency;
    
    sketch.flyingTextItems.push(newText);
    if (settings.textIndex < story.length) {
        settings.textIndex++;
        setTimeout(() => addText(settings.textIndex), timeout);
    }
};

setTimeout(() => addText(0), 1000);
