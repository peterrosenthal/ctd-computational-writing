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
    if (settings.textIndex < story.length - 1 && settings.textIndex > -1) {
        settings.textIndex++;
        setTimeout(() => addText(settings.textIndex), timeout);
    } else {
        document.getElementById("playButton").style.display = "inline-block";
        document.getElementById("pauseButton").style.display = "none";
        setTimeout(() => addText(0), 1000);
    }
};

setTimeout(() => addText(0), 1000);
