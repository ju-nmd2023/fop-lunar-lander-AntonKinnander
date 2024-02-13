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
  translate(height, height);
  vpFactor = max(windowWidth, windowHeight) / min(windowWidth, windowHeight);
  createCanvas(windowWidth, windowHeight);
  noStroke();
  generateStars();
  background(bgCol);
  rectMode(CENTER);
}
//Inspiration from  creative coding youtube-
//Using Garrits code from weekly challenge 3

function generateStars() {
  fill(fillCol);
  const count = 717;
  stars.push({ x: width / 2, y: height / 2, r: 1000, alpha: 1 });
  for (let i = 1; i < count; i++) {
    const f = i / count;
    const angle = i * PHI;
    const dist = f * radius;
    const star = {
      x: Math.random() / 10 + cos(angle * TWO_PI) * dist,
      y: Math.random() / 10 + sin(angle * TWO_PI) * dist,
      r: f * starSize * (Math.random() * (0.8 + Math.random())),
      alpha: Math.random(),
    };
    stars.push(star);
  }
}

function drawStars() {
  translate(height);
  for (let star of stars) {
    fill(fillCol, Math.abs(Math.sin(star.alpha)) * 255);
    if (width < height) {
      ellipse(star.x, star.y, star.r, star.r / vpFactor);
    } else {
      ellipse(star.x, star.y, star.r / vpFactor, star.r);
    }
  }
}

function draw() {
  fill(255, 0, 0);
  rect(width, height);
  background(bgCol);
  horizontalspeed += 0.01;
  circle(width / 2, height / 2, radius);
  push();
  scale(width, height);
  rotate(horizontalspeed);
  push();

  push();

  drawStars();
  pop();
  pop();
  pop();
}
