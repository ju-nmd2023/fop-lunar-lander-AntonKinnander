let zoom = 500;
const fillCol = [208, 103, 82];
const bgCol = [17, 7, 7];

const radius = Math.sqrt(0.5);
const starSize = 0.004;
const PHI = (1 + Math.sqrt(5)) / 2;
let vpFactor;

let stars = [];
let starsDrawn = false;

let verticalSpeed = 0;
let horizontalspeed = 0;

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
    let r = map(this.z, 0, width, 5, 0);
    this.alpha += 0.02;
    fill(fillCol, Math.abs(Math.sin(this.alpha)) * 255);

    ellipse(x, y, r, r);
  }
}

function drawMoon() {
  push();
  scale(2.2);
  let d = width;
  strokeWeight(1);
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

function draw() {
  // background(17, 7, 7, 127); // Slight transparency
  translate(width / 2, (3 * height) / 4);
  rotate(frameCount * 0.005);
  // Display and update each star
  for (let star of stars) {
    star.show();
  }
  drawMoon(); // Draw the moon
}
