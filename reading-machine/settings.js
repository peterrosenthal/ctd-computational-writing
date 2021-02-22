export default class Settings {
    constructor(sketch) {
        const buttonsGroup = document.getElementById("buttons");
        const showSettingsButton = document.getElementById("showSettings");
        const settingsObject = document.getElementById("settings");
        const applySettingsButton = document.getElementById("applySettings");
        const closeSettingsButton = document.getElementById("closeSettings");
        const settingsTypeCheckbox = document.getElementById("settingsType");
        const simpleSettingsSection = document.getElementById("simpleSettings");
        const simpleSpeedObject = document.getElementById("simpleSpeed");
        const advancedSettingsSection = document.getElementById("advancedSettings");
        const textSpeedObject = document.getElementById("textSpeed");
        const textAccelerationObject = document.getElementById("textAcceleration");
        const textFrequencyObject = document.getElementById("textFrequency");
        const fontSizeObject = document.getElementById("fontSize");
        const bgColorObject = document.getElementById("backgroundColor");
        const fgColorObject = document.getElementById("foregroundColor");

        showSettingsButton.addEventListener("click", () => {
            settingsObject.style.display = "block";
            buttonsGroup.style.display = "none";
        });

        settingsTypeCheckbox.addEventListener("click", () => {
            if (settingsTypeCheckbox.checked === true) {
                simpleSettingsSection.style.display = "none";
                advancedSettingsSection.style.display = "block";
            } else {
                simpleSettingsSection.style.display = "block";
                advancedSettingsSection.style.display = "none";
            }
        });

        applySettingsButton.addEventListener("click", () => {
            if (settingsTypeCheckbox.checked === true) {
                this.textSpeed = textSpeedObject.value;
                this.textAcceleration = textAccelerationObject.value;
                this.textFrequency = textFrequencyObject.value;
            } else {
                this.textSpeed = 5 + simpleSpeedObject.value / 6;
                this.textAcceleration = 3 + simpleSpeedObject.value / 20;
                this.textFrequency = 1 + simpleSpeedObject.value / 10;
                textSpeedObject.value = this.textSpeed;
                textAccelerationObject.value = this.textAcceleration;
                textFrequencyObject.value = this.textFrequency;
            }
            sketch.fontSize = fontSizeObject.value;
            sketch.backgroundColor = bgColorObject.value;
            sketch.foregroundColor = fgColorObject.value;
        });

        closeSettingsButton.addEventListener("click", () => {
            textSpeedObject.value = this.textSpeed;
            textAccelerationObject.value = this.textAcceleration;
            textFrequencyObject.value = this.textFrequency;
            fontSizeObject.value = sketch.fontSize;
            bgColorObject.value = sketch.backgroundColor;
            fgColorObject.value = sketch.foregroundColor;

            formObject.style.display = "none";
            buttonsGroup.style.display = "block";
        });

        if (settingsTypeCheckbox.checked === true) {
            simpleSettingsSection.style.display = "none";
            advancedSettingsSection.style.display = "block";
            this.textSpeed = textSpeedObject.value;
            this.textAcceleration = textAccelerationObject.value;
            this.textFrequency = textFrequencyObject.value;
        } else {
            simpleSettingsSection.style.display = "block";
            advancedSettingsSection.style.display = "none";
            this.textSpeed = 5 + simpleSpeedObject.value / 6;
            this.textAcceleration = 3 + simpleSpeedObject.value / 20;
            this.textFrequency = 1 + simpleSpeedObject.value / 10;
            textSpeedObject.value = this.textSpeed;
            textAccelerationObject.value = this.textAcceleration;
            textFrequencyObject.value = this.textFrequency;
        }
        sketch.fontSize = fontSizeObject.value;
        sketch.backgroundColor = bgColorObject.value;
        sketch.foregroundColor = fgColorObject.value;
    }
}
