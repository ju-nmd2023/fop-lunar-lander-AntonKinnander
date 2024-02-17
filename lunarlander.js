let zoom = 500;
const fillCol = [208, 103, 82];
let bgCol = [17, 7, 7];

const radius = Math.sqrt(0.5);
const starSize = 0.004;
const PHI = (1 + Math.sqrt(5)) / 2;
let vpFactor;

let stars = [];
let starsDrawn = false;

let verticalSpeed = 0;
let horizontalY = 0;
let horizontalSpeed = 0;
let horizontalAcceleration = 0.02;
let lastKey;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  background(bgCol);
  for (let i = 0; i < 700; i++) {
    stars.push(new Star());
  }
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

function drawMoon() {
  push();
  let d = 752;
  scale((2.2 * width) / d);
  strokeWeight(0.5);
  stroke(fillCol);
  //No stars on the moon
  push();
  fill(bgCol);
  ellipse(0, 0, d / 9);
  pop();
  fill(0, 0);

  for (let i = 0; i < 3; i++) {
    let f = 9 / Math.pow(i, -2);
    ellipse(0, 0, d / 9 - f, d / f - f * 2.9);
    ellipse(0, 0, d / 9 - f, d / f - f);
  }
  pop();
}

//Cover bottom use it as flame, possibly have it depend on fuel use.
function drawRocket() {
  push();
  stroke(fillCol);
  fill(bgCol);
  translate(0, -height / 1.6);
  let f = 11.17;

  for (let i = 2; i < 10; i++) {
    f = 11.17 / Math.pow(i, -1);
    fill(0, 0);
    ellipse(0, 0, 758 / 9 - f, 758 / f - f * 1.5);
    ellipse(0, 0, 758 / 9 - f, 758 / f - f);
  }

  //Bad solution for clip
  push();
  noStroke();
  fill(bgCol);
  ellipse(0, 9, 758 / 9, 758 / 50);
  ellipse(0, 39, 758 / 10, 758 / 9);
  pop();
  pop();
}
function keyReleased() {
  // Check if the released key is 'A'
  if (key === "39") {
    console.log(true);
  }
}
function draw() {
  background(17, 7, 7, 77); // Slight transparency
  translate(width / 2, (3 * height) / 4);

  drawRocket();

  //Change double key logic
  //Continue rotating because its space
  if ((keyIsDown(39) || keyIsDown(68)) && !(keyIsDown(37) || keyIsDown(65))) {
    horizontalY += Math.pow(horizontalSpeed + 1, 2);
    horizontalSpeed += horizontalAcceleration;
    lastKey = 39;
  } else if (
    (keyIsDown(37) || keyIsDown(65)) &&
    !(keyIsDown(39) && keyIsDown(68))
  ) {
    horizontalY += Math.pow(horizontalSpeed + 1, 2);
    horizontalSpeed -= horizontalAcceleration;
    lastKey = 37;
  }
  // if ((lastKey = 39)) {
  //   if (horizontalSpeed>0)   {
  //     horizontalY += horizontalSpeed;
  //     horizontalSpeed -= horizontalAcceleration;
  //   }
  //   lastKey = null;

  // } else if ((lastKey = 37)) {
  //   if (horizontalSpeed<0) {
  //     horizontalY += horizontalSpeed;
  //     horizontalSpeed += horizontalAcceleration/10;
  //   }
  //   lastKey = null;
  // }

  //Display text on a circular path for extra points
  //Rocket rotates based on direction of travel

  // if (lastKey == 39) {
  //   for (let i = 0; i < 50; i++) {
  //     horizontalY += horizontalSpeed/i;
  //     horizontalSpeed -= horizontalAcceleration;
  //   }
  //   lastKey = 0;
  // } else if (lastKey == 37) {
  //   for (let i = frameCount; i+12000< frameCount;) {
  //     horizontalY += horizontalSpeed/i;
  //     horizontalSpeed += horizontalAcceleration;
  //   }
  //   lastKey = 0;
  // }
  push();
  rotate(horizontalSpeed * 1.5);
  // Display and update each star
  for (let star of stars) {
    star.show();
  }
  pop();
  rotate(horizontalSpeed);
  drawMoon(); // Draw the moon
}
