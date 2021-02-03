// A HOUSE OF DUST
// written for (and from) ATLS 5xxx - Computational Writing


const materials = ["SAND", "BRICK", "STRAW", "DRIFTWOOD", "WOOD", "SUNLIGHT", "WIND", "DUST", "STARDUST", "TURBULENT DREAMS", "DREAMS"];
const prepositions = ["IN", "ON", "INSIDE", "OUTSIDE", "UNDERNEATH", "BEHIND"];
const places = ["EARTH", "THE GROUND", "HEAVEN", "HELL", "THE OCEAN", "THE DESERT", "A ROARING RIVER", "A DESOLATE MOON BASE", "A DENSE FOREST", "A DESERT", "A LARGE CITY", "A SMALL TOWN"];
const lights = ["CANDLELIGHT", "ELECTRIC LIGHT", "A CAMPFIRE", "THE SUN"];
const inhabitants = ["ALL OF MY FRIENDS", "MY FAMILY", "ALL OF MY ENEMIES", "SOME PRETTY DANGEROUS ANIMALS"];

let material = "";
let preposition = "";
let place = "";
let lighting = "";
let inhabitant = "";

let numLines = 0;
let deltaLines = 1;

const lineOne = document.getElementById('line1');
const lineTwo = document.getElementById('line2');
const lineThree = document.getElementById('line3');
const lineFour = document.getElementById('line4');

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

const getRandomWord = (list) => list[getRandomInt(0, list.length - 1)];

const setPoem = () => {
    // assign random values and bounce directions at 0 and 4 lines
    if (numLines == 0) {
        material = getRandomWord(materials);
        preposition = getRandomWord(prepositions);
        place = getRandomWord(places);
        lighting = getRandomWord(lights);
        inhabitant = getRandomWord(inhabitants);
        deltaLines = 1;
    }
    if (numLines == 4) {
        deltaLines = -1;
    }

    // fill innerHTMLs based on how many lines we are trying to draw
    lineOne.innerHTML = "<h1>A HOUSE OF</h1>";
    lineTwo.innerHTML = "";
    lineThree.innerHTML = "";
    lineFour.innerHTML = "";
    if (numLines > 0) lineOne.innerHTML = "<h1>A HOUSE OF " + material + "</h1>";
    if (numLines > 1) lineTwo.innerHTML = "<h2>" + preposition + " " + place + "</h2>";
    if (numLines > 2) lineThree.innerHTML = "<h3>USING " + lighting + "</h3>";
    if (numLines > 3) lineFour.innerHTML = "<h4>INHABITED BY " + inhabitant + "</h4>";

    // setTimeout pretty short normally, but linger for a while on the full poem
    let timeout = 500;
    if (numLines == 4) {
        timeout = 4000;
    }
    // increment numLines
    numLines += deltaLines;
    // time loooooooooooooooooooop
    setTimeout(() => setPoem(), timeout);
}

setPoem();
