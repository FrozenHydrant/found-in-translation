//var tbutton = document.getElementBy
// Define variables
var numStars = 500;

//background animation variables
let canvas, ctx, width, height, stars;

//dropdown selection variables
let mode, languageSelect, prevMode;

//consts
const EMOJIS = new Array("😄", "👍", "❤️", "😭", "🤣","🥹");

function onLoad() {
    //console.log("ON LOAD CALLED");
    setup();
    setInterval(allUpdates, 20);
}


//upon button press
function activate() {

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
    width = window.innerWidth;
    height = window.innerHeight;
    stars = [];
  
    // Create stars
    for (var i = 0; i < numStars; i++) {
        var x = Math.random() * width;
        var y = Math.random() * height;
        var size = Math.floor(Math.random()*3 + 1);
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
        activateButton.style.backgroundImage = "url(../" + mode + "Button.png)";

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
      this.speed = Math.floor(Math.random()*3+1);
      this.type = Math.floor(Math.random()*EMOJIS.length);
    }
      
      // Draw function
      // Draws either emojis or text depending on mode
    draw() {
        //console.log("drawing star at " + x + " " + y);
        ctx.fillStyle ="slategray";
        ctx.font = "16px serif";
        if (mode == "Emoji") {
            let emoji = EMOJIS[this.type];
            //console.log(EMOJIS);
            //console.log(emoji);
            ctx.fillText(emoji, Math.floor(this.x), Math.floor(this.y));
        } else if (mode == "Binary") {
            ctx.fillText(this.type%2, Math.floor(this.x), Math.floor(this.y));
        }
    }
    
    // Updates the position of each star
    // Teleports back to right side if it goes out of the screen
    update() {
    //console.log("updating star at " + this.x + " speed " + this.speed);
        this.x -= this.speed;
        if (this.x < -16) {
            this.x = width;
            this.y = Math.random()*height;
        }    
    }
}
