//var tbutton = document.getElementBy
// Define variables
var numStars = 500;

//background animation variables
let canvas, ctx, width, height, stars;

//dropdown selection variables
let mode, languageSelect, prevMode;

//text fields
let textInput, textOutput;

//consts
const EMOJIS = new Array("😄", "👍", "❤️", "😭", "🤣", "🥹");
const EMOJI_REPLACEMENTS = new Map();
EMOJI_REPLACEMENTS.set(new Array("ho", "wa", "he", "bu"), "🥵");
EMOJI_REPLACEMENTS.set(new Array("oo","aw","ep","gl"), "😎");
EMOJI_REPLACEMENTS.set(new Array("col","ic","ee", "ll"), "🥶");
EMOJI_REPLACEMENTS.set(new Array("bo","ba","bl","ex"), "🤯");
EMOJI_REPLACEMENTS.set(new Array("the","po","that", "this", "it"), "🫵");
EMOJI_REPLACEMENTS.set(new Array("be"), "🐝");
EMOJI_REPLACEMENTS.set(new Array("of", "thin"), "🤔");
EMOJI_REPLACEMENTS.set(new Array("up", "an"), "📈");
EMOJI_REPLACEMENTS.set(new Array("wh", "in", "wi"), "🧐");
EMOJI_REPLACEMENTS.set(new Array("ha", "br", "ke", "te"), "💔");
EMOJI_REPLACEMENTS.set(new Array("fi", "to", "on"), "🔥");
EMOJI_REPLACEMENTS.set(new Array("cl", "ap", "is"), "👏");
EMOJI_REPLACEMENTS.set(new Array("se", "sh"), "🤫");
EMOJI_REPLACEMENTS.set(new Array("op", "ra", "ti"), "⌛");
//🥵🥶🤯😃😭🤬😍🤔🫵🐝📈🧐💔🔥👏🤫⌛

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


//upon button press
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
        textOutput.value = [...input].map(item => toBinary(item.charCodeAt(0))).join("");
    } else {
        // convert to morse code using map
        input = input.toLowerCase();
        let morseToReplace = MORSE.entries();
        for (const morseInfo of morseToReplace) {
            //console.log(morseInfo);
            input = input.replaceAll(morseInfo[0], morseInfo[1] + " ");
        }
        input = input.replaceAll(/[^._ ]/g, "");

        //put spaces wrongly
        input = [...input]
        //let count = 1;
        //for (var i = 0; i < input.length; i++) {
        //    if (count == 4) {
        //        input[i] = input[i] + " "
        //        count = 0;
        //    }
        //    count++;
        //}
        textOutput.value = input.join("");
    }
}

function toBinary(num) {
    //console.log(num + " tobin");
    let ans = "";
    while (num > 0) {
        ans = (num % 2 == 1 ? 1 : 0) + ans;
        num = Math.floor(num / 2);
        //console.log(num + " in progress");
    }
    return ans;
}

function allUpdates() {
    drawStars();
}
// Setup function
function setup() {
    // Get canvas element
    canvas = document.getElementById("maincanvas");
    ctx = canvas.getContext("2d");
    languageSelect = document.getElementById("select-language");
    textInput = document.getElementById("textbox");
    textOutput = document.getElementById("displaybox");
    width = window.innerWidth;
    height = window.innerHeight;
    stars = [];

    // Create stars
    for (var i = 0; i < numStars; i++) {
        var x = Math.random() * width;
        var y = Math.random() * height;
        var size = Math.floor(Math.random() * 3 + 1);
        stars.push(new Star(x, y, size));
    }

    console.log(stars);
}

// Draw function
function drawStars() {
    // Set background color
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //if the mode changed
    //we will update the display accordingly
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

        let activateButton = document.getElementById("translate-button");
        //console.log("" + mode + "Button.png");
        activateButton.style.backgroundImage = "url(" + mode + "Button.png)";
        //console.log(activateButton.style.backgroundImage);

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
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = Math.floor(Math.random() * 3 + 1);
        this.type = Math.floor(Math.random() * EMOJIS.length);
    }

    // Draw function
    // Draws either emojis or text depending on mode
    draw() {
        //console.log("drawing star at " + x + " " + y);
        ctx.fillStyle = "slategray";
        ctx.font = "16px serif";
        if (mode == "Emoji") {
            let emoji = EMOJIS[this.type];
            //console.log(EMOJIS);
            //console.log(emoji);
            ctx.fillText(emoji, Math.floor(this.x), Math.floor(this.y));
        } else if (mode == "Binary") {
            ctx.fillText(this.type % 2, Math.floor(this.x), Math.floor(this.y));
        } else {
            ctx.fillText(this.type % 2 == 0 ? "." : "_", Math.floor(this.x), Math.floor(this.y));
        }
    }

    // Updates the position of each star
    // Teleports back to right side if it goes out of the screen
    update() {
        //console.log("updating star at " + this.x + " speed " + this.speed);
        this.x -= this.speed;
        if (this.x < -16) {
            this.x = width;
            this.y = Math.random() * height;
        }
    }
}

//Particle class
//controls miscellaneous particle effects
class Particle {

}
