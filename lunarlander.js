let zoom = 500;
const fillCol = [208, 103, 82];
let bgCol = [17, 7, 7];
//the height of p5 canvas display while i was writing haunts this program
let d = 752;

const radius = Math.sqrt(0.5);
const starSize = 0.004;
const PHI = (1 + Math.sqrt(5)) / 2;
let vpFactor;

let stars = [];
let starsDrawn = false;

let rotation = 0;
let horizontalSpeed = Math.random() * Math.PI * 2;
let horizontalAcceleration = 0.02;
let lastKey;

let runState = "startScreen";

//p5 reference https://p5js.org/reference/#/p5/loadFont

let header;
let subHeader;
function preload() {
  header = loadFont("assets/fonts/Aber-Mono-Bold.otf");
  subHeader = loadFont("assets/fonts/Aber-Mono-Light.otf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  background(bgCol);
  textAlign(CENTER);
  //Load fonts
  generateStars();
}

function drawStartScreen() {
  const headerSize = width / 47;
  const subHeaderSize = width / 47;
  textFont(subHeader);
  textSize(subHeaderSize);
  text("press [space] to start", 0, 0);
}

function drawHud() {
  const headerSize = width / 47;
  const subHeaderSize = width / 47;
  // push();
  // textFont(subHeader);
  // textSize(headerSize);
  // text("Press [spacebar] to start ", 0, 0);
  // pop();

  push();
  textFont(subHeader);
  textSize(subHeaderSize);
  push();
  textAlign(LEFT);
  //the font has < > mixed up
  text("[>3 >3 >3]", -width / 2.4, -height / 1.55);
  pop();
  push();
  textAlign(RIGHT);
  text("Fuel:74%", width / 2.4, -height / 1.55);
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
  translate(0, -height / 1.6 + y);

  stroke(fillCol);
  fill(bgCol);

  let f = 11.17;
  push();
  //Wipe the smear / screenburn with background color
  noStroke();
  ellipse(0, -127, 758 / 10, 758 / 50);
  pop();

  for (let i = 2; i < 10; i++) {
    f = 11.17 / Math.pow(i, -1);
    fill(0, 0);
    ellipse(0, 0, d / 9 - f, d / f - f * 1.5);
    ellipse(0, 0, d / 9 - f, d / f - f);
  }

  //Bad solution for clip
  push();
  noStroke();

  fill(bgCol);
  ellipse(0, 9, 758 / 9, 758 / 50);
  ellipse(0, 39, 758 / 10, 758 / 9);
  //  fill(0, 255, 0);
  //mask for the flame
  ellipse(0, 5, 758 / 20, 758 / 70);
  push();
  // drawFlame();
  pop();
  pop();
  pop();
}
// function drawRocket(y) {
//   push();

//   scale((0.7 * height) / d);
//   stroke(fillCol);
//   fill(bgCol);
//   translate(0, -height / 1.6 + y);
//   let f = 11.17;

//   for (let i = 2; i < 10; i++) {
//     f = 11.17 / Math.pow(i, -1);
//     fill(0, 0);
//     ellipse(0, 0, d / 9 - f, d / f - f * 1.5);
//     ellipse(0, 0, d / 9 - f, d / f - f);
//   }

//   //Bad solution for clip
//   push();
//   noStroke();
//   fill(bgCol);
//   ellipse(0, 9, 758 / 9, 758 / 50);
//   ellipse(0, 39, 758 / 10, 758 / 9);
//   pop();
//   pop();
// }

//add fuel
function winLossHandler(y, v) {
  let groundY = height / 2.2;
  let maxVelocity = 3;

  if (y > groundY) {
    if (v < maxVelocity) {
      runState = "startScreen";
    } else {
      runState = "startScreen";
    }
  }
}

let verticalDistance = 0;
let verticalVelocity = 0;
const verticalAcceleration = -0.03;
const gravity = 0.07;

function draw() {
  background(17, 7, 7, 77); // Slight transparency
  translate(width / 2, (3 * height) / 4);
  //Change double key logic
  //Continue rotating because its space

  //Run the game
  if (runState == "running") {
    drawHud();
    if (
      (keyIsDown(39) && !keyIsDown(37)) ||
      (keyIsDown(68) && !keyIsDown(65))
    ) {
      rotation += Math.pow(horizontalSpeed + 1, 2);
      horizontalSpeed += horizontalAcceleration;
      lastKey = 39;
    } else if (
      (keyIsDown(37) && !keyIsDown(39)) ||
      (keyIsDown(65) && !keyIsDown(68))
    ) {
      rotation += Math.pow(horizontalSpeed + 1, 2);
      horizontalSpeed -= horizontalAcceleration;
      lastKey = 37;
    }

    if (keyIsDown(38) || keyIsDown(87)) {
      verticalDistance += verticalVelocity;
      verticalVelocity += verticalAcceleration;
    } else {
      verticalDistance += verticalVelocity;
      verticalVelocity += gravity;
    }
    winLossHandler(verticalDistance, verticalVelocity);
    drawRocket(verticalDistance);
    push();
    rotate(horizontalSpeed * 1.5);
    drawStars();
    pop();
    rotate(horizontalSpeed);
    drawMoon(); // Draw the moon
  } else {
    drawStartScreen();
    drawStars();
    if (keyIsDown(32)) {
      runState = "running";
    }
  }
}
