//var tbutton = document.getElementBy
// Define variables
const numStars = 150;

//background animation variables
let canvas, ctx, width, height, stars;

//dropdown selection variables
let mode, languageSelect, prevMode;

//text fields
let textInput, textOutput, mainBox, translateButton, copyButton;

//consts
const EMOJIS = new Array("π", "π", "β€οΈ", "π­", "π€£", "π₯Ή");
const EMOJI_REPLACEMENTS = new Map();
EMOJI_REPLACEMENTS.set(new Array("ho", "wa", "he", "bu"), "π₯΅");
EMOJI_REPLACEMENTS.set(new Array("oo", "aw", "ep", "gl"), "π");
EMOJI_REPLACEMENTS.set(new Array("col", "ic", "ee", "ll"), "π₯Ά");
EMOJI_REPLACEMENTS.set(new Array("bo", "ba", "bl", "ex"), "π€―");
EMOJI_REPLACEMENTS.set(new Array("the", "po", "that", "this", "it"), "π«΅");
EMOJI_REPLACEMENTS.set(new Array("be"), "π");
EMOJI_REPLACEMENTS.set(new Array("of", "thin"), "π€");
EMOJI_REPLACEMENTS.set(new Array("up", "an"), "π");
EMOJI_REPLACEMENTS.set(new Array("wh", "in", "wi"), "π§");
EMOJI_REPLACEMENTS.set(new Array("ha", "br", "ke", "te"), "π");
EMOJI_REPLACEMENTS.set(new Array("fi", "to", "on"), "π₯");
EMOJI_REPLACEMENTS.set(new Array("cl", "ap", "is"), "π");
EMOJI_REPLACEMENTS.set(new Array("se", "sh"), "π€«");
EMOJI_REPLACEMENTS.set(new Array("op", "ra", "ti"), "β");
//π₯΅π₯Άπ€―ππ­π€¬ππ€π«΅πππ§ππ₯ππ€«β

const MORSE = new Map();
MORSE.set("a", "._");
MORSE.set("b", "_...");
MORSE.set("c", "_._.");
MORSE.set("d", "_..");
MORSE.set("e", ".");
MORSE.set("f", ".._.");
MORSE.set("g", "__.");
MORSE.set("h", "....");
MORSE.set("i", "..");
MORSE.set("j", ".___");
MORSE.set("k", "_._");
MORSE.set("l", "._..");
MORSE.set("m", "__");
MORSE.set("n", "_.");
MORSE.set("o", "___");
MORSE.set("p", ".__.");
MORSE.set("q", "__._");
MORSE.set("r", "._.");
MORSE.set("s", "...");
MORSE.set("t", "_");
MORSE.set("u", ".._");
MORSE.set("v", "..._");
MORSE.set("w", ".__");
MORSE.set("x", "_.._");
MORSE.set("y", "_.__");
MORSE.set("z", "__..");

MORSE.set("0", "_____");
MORSE.set("1", ".____");
MORSE.set("2", "..___");
MORSE.set("3", "...__");
MORSE.set("4", "...._");
MORSE.set("5", ".....");
MORSE.set("6", "_....");
MORSE.set("7", "__...");
MORSE.set("8", "___..");
MORSE.set("9", "____.");

function onLoad() {
    //console.log("ON LOAD CALLED");
    setup();
    setInterval(allUpdates, 20);
}

//upon copy call
function copy() {
    // grab text from output box
    let text = textOutput.value;
    navigator.clipboard.writeText(text);
}

//upon pressing "emojify / binaryfy / morsecodify button"
function activate() {
    let input = textInput.value;
    if (mode == "Emoji") {
        input = input.split(" ");
        let emojisToReplace;
        for (var i = 0; i < input.length; i++) {
            let word = input[i];
            // constructs an iterator over all syllables
            // to replace with emojis
            emojisToReplace = EMOJI_REPLACEMENTS.entries();
            for (const emojiInfo of emojisToReplace) {
                for (const emojiStart of emojiInfo[0]) {
                    // we check every word, if it includes a syllable,
                    // we will append the corresponding emoji to the end.
                    if (word.includes(emojiStart)) {
                        word = word + emojiInfo[1];
                    }
                }
            }
            input[i] = word;
        }
        // join the array back into a string
        textOutput.value = input.join(" ");
    } else if (mode == "Binary") {
        //Interpret the string as a list of chars
        //For every char, get its charCode, then toBinary,
        //then merge all strings together finally.
        textOutput.value = [...input].map(item => toBinary(item.charCodeAt(0))).join("");
    } else {
        // convert to morse code using map
        input = input.toLowerCase();
        let morseToReplace = MORSE.entries();
        for (const morseInfo of morseToReplace) {
            input = input.replaceAll(morseInfo[0], morseInfo[1] + " ");
        }
        //trim unconvertable chars
        input = input.replaceAll(/[^._ ]/g, "");
        textOutput.value = input;
    }
}

function toBinary(num) {
    //we will use a divison algorithm for binary conversion
    let ans = "";
    while (num > 0) {
        ans = (num % 2 == 1 ? 1 : 0) + ans;
        num = Math.floor(num / 2);
    }
    return ans;
}

//perform all canvas updates
function allUpdates() {
    drawStars();
    //updateAllThings();
}

// Setup function
function setup() {
    // Get canvas element and its context
    mainBox = document.getElementById("mainbox");
    translateButton = document.getElementById("translate-button");
    copyButton = document.getElementById("copy-button");
    canvas = document.getElementById("maincanvas");
    ctx = canvas.getContext("2d");

    // Get textboxes and other elements and set variables
    languageSelect = document.getElementById("select-language");
    textInput = document.getElementById("textbox");
    textOutput = document.getElementById("displaybox");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //console.log("SCREEN SIZE: " + width + " " + height)
    stars = [];

    // Create stars as indicated by numStars
    for (var i = 0; i < numStars; i++) {
        var x = Math.random() * canvas.width;
        var y = Math.random() * canvas.height;
        stars.push(new Star(x, y));
    }
}

function updateAllThings() {
    //resize the canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    //textInput.style.height = (canvas.height * 0.5) + "px";
    //textOutput.style.height = (canvas.height * 0.5) + "px";

    //mainBox.style.height = (canvas.height * 0.75) + "px";

    //translateButton.style.top = (canvas.height * 0.6) + "px";
}

// Draw function
function drawStars() {
    updateAllThings();
    // Set background color
    // to reset the canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // if the mode changed
    // we will update the drop-down-menu accordingly
    // as well as the button icon
    if (prevMode != mode) {
        //change which option says "selected" on it from the dropdown menu
        let optionOne = document.getElementById("option-one");
        let optionTwo = document.getElementById("option-two");
        let optionThree = document.getElementById("option-three");
        optionOne.textContent = "Emoji";
        optionTwo.textContent = "Binary";
        optionThree.textContent = "Morse code";
        if (mode == "Emoji") {
            optionOne.textContent = "Emoji (Selected)";
        } else if (mode == "Binary") {
            optionTwo.textContent = "Binary (Selected)";
        } else {
            optionThree.textContent = "Morse code (Selected)";
        }

        //change the button image to the option which is selected
        let activateButton = document.getElementById("translate-button");
        activateButton.style.backgroundImage = "url(" + mode + "Button.png)";

        prevMode = mode;
    }
    mode = languageSelect.value;
    //console.log(mode);

    // Draw stars
    for (var i = 0; i < stars.length; i++) {
        stars[i].draw();
        stars[i].update();
    }
}


// Star class
// Controls the "Stars which fly across the background"
class Star {
    //every star has some random speed, size, and type
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.floor(Math.random() * 32 + 32);
        this.speed = Math.random() * 2 + 1;
        this.type = Math.floor(Math.random() * EMOJIS.length);
    }

    // Draw function
    // Draws either emojis or text depending on mode
    draw() {
        ctx.fillStyle = "slategray";
        ctx.font = (this.size) + "px serif";
        if (mode == "Emoji") {
            let emoji = EMOJIS[this.type];
            ctx.fillText(emoji, Math.floor(this.x), Math.floor(this.y));
        } else if (mode == "Binary") {
            ctx.fillText(this.type % 2, Math.floor(this.x), Math.floor(this.y));
        } else {
            ctx.fillText(this.type % 2 == 0 ? "." : "_", Math.floor(this.x), Math.floor(this.y));
        }
    }

    // Updates the position of each star
    update() {
        this.x -= this.speed;
        // Teleports back to right side if it goes out of the screen
        // It will get a random speed and location when doing so
        if (this.x < -64) {
            this.x = canvas.width;
            this.y = Math.random() * canvas.height;
            this.speed = Math.random() * 2 + 1;
        }
    }
}

//Particle class
//controls miscellaneous particle effects
class Particle {

}
