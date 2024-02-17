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

function drawRocket() {
  push();
  noStroke();
  ellipse(0, height / 9 - 9 / Math.pow(12, -1), height / 10);
  ellipse(0, height / 9 - 9 / Math.pow(16, -1), height / 10, height / 6);

  for (let i = 2; i < 10; i++) {
    let f = 9 / Math.pow(i, -1);
    fill(0, 0);
    ellipse(0, 0, height / 9 - f, height / f - f * 2.9);
    ellipse(0, 0, height / 9 - f, height / f - f);
  }
  pop();
}

function keyReleased() {
  if (keyIsDown(39)) {
    horizontalAcceleration = horizontalAcceleration * -1;
  }
}

function draw() {
  background(17, 7, 7, 77); // Slight transparency
  translate(width / 2, (3 * height) / 4);

  if (keyIsDown(39) && !keyIsDown(37)) {
    horizontalY += Math.pow(horizontalSpeed, 2);
    horizontalSpeed += horizontalAcceleration;
    lastKey = 39;
  } else if (keyIsDown(37) && !keyIsDown(39)) {
    horizontalY += Math.pow(horizontalSpeed, 2);
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

  push();
  rotate(horizontalSpeed * 1.3);
  // Display and update each star
  for (let star of stars) {
    star.show();
  }
  pop();
  rotate(horizontalSpeed);
  drawMoon(); // Draw the moon
}
