export default class Settings {
    constructor(sketch) {
        const formObject = document.getElementById("settings");
        const textSpeedObject = document.getElementById("textSpeed");
        const textAccelerationObject = document.getElementById("textAcceleration");
        const textFrequencyObject = document.getElementById("textFrequency");
        const fontSizeObject = document.getElementById("fontSize");
        const bgColorObject = document.getElementById("backgroundColor");
        const fgColorObject = document.getElementById("foregroundColor");

        formObject.addEventListener("submit", (e) => {
            e.preventDefault();
            this.textSpeed = textSpeedObject.value;
            this.textAcceleration = textAccelerationObject.value;
            this.textFrequency = textFrequencyObject.value;
            sketch.fontSize = fontSizeObject.value;
            sketch.backgroundColor = bgColorObject.value;
            sketch.foregroundColor = fgColorObject.value;
        });
        formObject.addEventListener("reset", (e) => {
            e.preventDefault();
            textSpeedObject.value = this.textSpeed;
            textAccelerationObject.value = this.textAcceleration;
            textFrequencyObject.value = this.textFrequency;
            fontSizeObject.value = sketch.fontSize;
            bgColorObject.value = sketch.backgroundColor;
            fgColorObject.value = sketch.foregroundColor;
        });

        this.textSpeed = textSpeedObject.value;
        this.textAcceleration = textAccelerationObject.value;
        this.textFrequency = textFrequencyObject.value;
        sketch.fontSize = fontSizeObject.value;
        sketch.backgroundColor = bgColorObject.value;
        sketch.foregroundColor = fgColorObject.value;
    }
}
