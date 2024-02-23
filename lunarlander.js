let zoom = 500;
const fillCol = [208, 103, 82];
let bgCol = [17, 7, 7];

//the height of p5Cannvas display while i was writing haunts this program
let d = 752;

let fuelValue;

const radius = Math.sqrt(0.5);
const starSize = 0.004;
const PHI = (1 + Math.sqrt(5)) / 2;
let vpFactor;

let stars = [];
let starsDrawn = false;

let rotation = Math.random() * Math.PI * 2;
let horizontalVelocity = (Math.random() - 0.5) * 0.06;
let horizontalAcceleration = 0.002;
let lastKey;

let lives = 2; //3 lives
const livesDisplay = ["[>3      ]", "[>3 >3   ]", "[>3 >3 >3]"];

let runState = "startScreen";

//p5 reference https://p5js.org/reference/#/p5/loadFont

let header;
let subHeader;
let title;

let headerSize;
let subHeaderSize;
let paragraphSize;

function preload() {
  header = loadFont("assets/fonts/Aber-Mono-Bold.otf");
  subHeader = loadFont("assets/fonts/Aber-Mono-Light.otf");
  title = loadFont("assets/fonts/BTE-Sporty.otf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  background(bgCol);
  textAlign(CENTER);
  //Load fonts
  generateStars();
  headerSize = height / 80 + width / 80;
  subHeaderSize = height / 94 + width / 94;
  paragraphSize = height / 150 + width / 150;
}

function drawStartScreen() {
  push();
  textSize(headerSize);
  textFont(title);
  text("MARTIAL LANDER", 0, -height / 2.11);
  pop();

  push();
  textFont(subHeader);
  textSize(subHeaderSize);
  text("Press [space] to start", 0, 0);
  pop();

  push();
  textFont(header);
  textSize(paragraphSize);
  text("Controls:", 0, -height / 5);
  pop();
  push();
  textFont(subHeader);
  textSize(paragraphSize);
  text("[←][↑][→] or [W][A][D]", 0, -height / 6);
  pop();
}
let livesGrammar = "lives";

function drawWinScreen() {
  fuelValue = Math.floor(calculateFuel() * 100);

  if (lives < 1) {
    livesGrammar = "life";
  } else {
    livesGrammar = "lives";
  }
  push();
  textSize(headerSize * 2);
  textFont(header);
  text("YOU WON", 0, -height / 2.11);
  pop();

  push();
  textFont(subHeader);
  textSize(paragraphSize);
  text("Score:", 0, -height / 3.1);
  pop();

  push();
  textSize(headerSize * 2);
  textFont(header);
  // for (let i = 0; i < score; i++) {
  //   text(i, 0, -height / 4);
  // }
  //Display the score, its just a random number, increases exponentially every win to give a sense of progression
  text(score, 0, -height / 4);
  pop();

  push();
  textFont(subHeader);
  textSize(subHeaderSize);

  text(
    "With " +
      (lives + 1) +
      " " +
      livesGrammar +
      " and " +
      fuelValue +
      "% fuel remaining.",
    0,
    -height / 2.5
  );
  pop();
  push();
  textFont(subHeader);
  textSize(subHeaderSize);
  text("Press [space] to play again", 0, 0);
  pop();
}
function drawLoseScreen() {
  if (lives < 2) {
    livesGrammar = "life";
  } else {
    livesGrammar = "lives";
  }
  push();
  textSize(headerSize * 2);
  textFont(header);
  text("YOU LOST", 0, -height / 2.11);
  pop();

  push();
  textFont(subHeader);
  textSize(subHeaderSize);
  if (lives < 1) {
    text(
      "No lives remain but it doesnt matter \n they will be replenished :))",
      0,
      -height / 2.5
    );
  } else {
    text(
      "You have " + lives + " " + livesGrammar + " remaining.",
      0,
      -height / 2.5
    );
  }
  pop();

  push();
  textFont(subHeader);
  textSize(subHeaderSize);
  text("Press [space] to try again", 0, 0);
  pop();
}

function resetGame() {
  if (runState == "win" || runState == "lost") {
    rotation = Math.random() * Math.PI * 2;
    horizontalVelocity = (Math.random() - 0.5) * 0.06;
    verticalDistance = 0;
    verticalVelocity = 0;
    flameStrength = 3;
    fuel = 1;
  }
  if (runState == "win") {
    lives = 2;
  }
  if (runState == "lost") {
    lives -= 1;
    if (lives < 0) {
      lives = 2;
    }
  }
}

let fuel = 1;
const fuelBurnRate = -0.002;
function calculateFuel() {
  if (
    (keyIsDown(39) ||
      keyIsDown(37) ||
      keyIsDown(68) ||
      keyIsDown(65) ||
      keyIsDown(38) ||
      keyIsDown(87)) &&
    runState == "running"
  ) {
    fuel += fuelBurnRate;
  }
  return max(fuel, 0);
}

function controlRocket() {
  if (
    ((keyIsDown(39) && !keyIsDown(37)) || (keyIsDown(68) && !keyIsDown(65))) &&
    calculateFuel() > 0
  ) {
    //Math.max for lower speed limit / left
    horizontalVelocity = Math.max(
      horizontalVelocity - horizontalAcceleration,
      -0.04
    );
  } else if (
    (keyIsDown(37) && !keyIsDown(39)) ||
    (keyIsDown(65) && !keyIsDown(68) && calculateFuel() > 0)
  ) {
    //Math.min for upper speed limit / right
    horizontalVelocity = Math.min(
      horizontalVelocity + horizontalAcceleration,
      0.04
    );
  }

  rotation += horizontalVelocity;

  if ((keyIsDown(38) || keyIsDown(87)) && calculateFuel() > 0) {
    verticalDistance += verticalVelocity;
    verticalVelocity += verticalAcceleration;
  } else {
    verticalDistance += verticalVelocity;
    verticalVelocity += gravity;
  }
}

function drawHud() {
  push();
  textFont(subHeader);
  textSize(subHeaderSize);
  push();
  textAlign(LEFT);
  //the font has < > mixed up
  text(livesDisplay[lives], -width / 2.2, -height / 1.47);
  pop();
  push();
  textAlign(RIGHT);
  text(
    "Fuel: " + Math.floor(calculateFuel() * 100) + "%",
    width / 2.2,
    -height / 1.47
  );
  pop();
  pop();
}
class Star {
  constructor() {
    this.x = Math.random() * 2 * width - width;
    this.y = Math.random() * 2 * height - height;
    this.z = Math.random() * width;
    this.alpha = Math.random();
  }

  show() {
    fill(fillCol);
    noStroke();
    let x = map(this.x / this.z, 0, 1, 0, width);
    let y = map(this.y / this.z, 0, 1, 0, height);
    let r = map(this.z, 0, width, 7, 0);
    this.alpha += 0.04;
    fill(fillCol, Math.abs(Math.sin(this.alpha)) * 255);

    ellipse(x, y, r, r);
  }
}

function drawStars() {
  for (let star of stars) {
    star.show();
  }
}
function generateStars() {
  for (let i = 0; i < 450; i++) {
    stars.push(new Star());
  }
}

function drawMoon() {
  push();
  scale((3 * height) / d);
  strokeWeight(0.5);
  stroke(fillCol);
  //No stars on the moon
  push();
  fill(bgCol, 100);

  ellipse(0, 0, d / 9);
  pop();
  fill(0, 0);

  for (let i = 1; i < 3; i++) {
    let f = 9 / Math.pow(i, -2);
    ellipse(0, 0, d / 9 - f, d / f - f * 2.9);
    ellipse(0, 0, d / 9 - f, d / f - f);
  }
  pop();
}

//Cover bottom use it as flame, possibly have it depend on fuel use.
function drawRocket(y) {
  scale((0.7 * height) / d);
  push();
  translate(0, -height / 1.9 + y);

  stroke(fillCol);
  fill(bgCol);

  let f = 11.17;
  push();
  //Wipe the smear / screenburn with background color
  noStroke();
  fill(bgCol);
  ellipse(0, -16, d / 9, d / 6);
  pop();

  for (let i = 2; i < 10; i++) {
    f = 11.17 / Math.pow(i, -1);
    fill(0, 0);
    ellipse(0, 0, d / 9 - f, d / f - f * 1.5);
    ellipse(0, 0, d / 9 - f, d / f - f);
  }

  //Bad solution instead of clip
  push();
  noStroke();

  fill(bgCol);
  ellipse(0, 9, d / 9, d / 50);
  ellipse(0, 39, d / 10, d / 9);

  //  fill(0, 255, 0);
  //mask for the flame
  push();

  drawFlame();

  pop();
  ellipse(0, 5, d / 20, d / 70);
  push();

  pop();
  pop();
  pop();
}
let flameStrength = 3;
function drawFlame() {
  push();
  translate(0, height / 110);
  stroke(208, 103, 82, 150 * (Math.random() + 0.9 / 1.9));
  noFill();
  let f = 4;

  if ((keyIsDown(38) || keyIsDown(87)) && fuel > 0) {
    flameStrength += 0.47;
    // decrease flame when fuel is almost out but not lower than three
  } else if (flameStrength > 3 || fuel < 0.1) {
    flameStrength -= 1.2;
  }

  for (
    let i = 3;
    i < Math.min(Math.floor(flameStrength * (Math.random() / 3 + 0.95)), 9);
    i++
  ) {
    f = 4.17 / Math.pow(i, -1.5);
    ellipse(0, 0, d / 11 - f, d / f - f * 1.5);
    ellipse(0, 0, d / 11 - f, d / f - f);
  }
  pop();
}

//add a score value, the value will never reset and increase everytime the playerwins, to give a sense of progression
let score = 0;
function runStateHandler(y, v) {
  let groundY = height / 2.79;
  let maxVelocity = 1;

  if (y > groundY) {
    if (v < maxVelocity && Math.abs(horizontalVelocity) < 0.005) {
      runState = "win";
      score = Math.floor(Math.pow(Math.random() * (score + 100), 1.33));
    } else {
      runState = "lost";
    }
  }
}

let verticalDistance = 0;
let verticalVelocity = 0;
const verticalAcceleration = -0.03;
const gravity = 0.07;

function draw() {
  background(17, 7, 7, 170); // Slight transparency for glow trails
  translate(width / 2, (3 * height) / 4);
  //Change double key logic
  //Continue rotating because its space
  //Run the game
  if (runState == "running") {
    //Hotfix so you cant change fuel value on the win screen (this value only increases when game is running)

    drawHud();
    controlRocket();
    runStateHandler(verticalDistance, verticalVelocity);
    drawRocket(verticalDistance);
    push();
    //Background rotates faster for depth of field effect
    rotate(rotation * 1.2);
    drawStars();
    pop();
    rotate(rotation);
    drawMoon(); // Draw the moon
  } else if (runState == "win") {
    drawStars();
    drawWinScreen();
  } else if (runState == "lost") {
    drawStars();
    drawLoseScreen();
  } else {
    drawStars();
    drawRocket(0);
    drawStartScreen();

    // drawRocket(0);
  }
  if (keyIsDown(32) && runState != "running") {
    resetGame();
    runState = "running";
  }
}
