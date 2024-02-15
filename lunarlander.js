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
  vpFactor = max(windowWidth, windowHeight) / min(windowWidth, windowHeight);
  createCanvas(windowWidth, windowHeight);
  noStroke();
  generateStars();
  background(bgCol);
}
//Inspiration from  creative coding youtube-
//Using Garrits code from weekly challenge 3

function generateStars() {
  fill(fillCol);
  const count = 717;
  for (let i = 1; i < count; i++) {
    const f = i / count;
    const angle = i * PHI;
    const dist = f * radius;
    const star = {
      x: 0.5 + Math.random() / 10 + cos(angle * TWO_PI) * dist,
      y: 0.5 + Math.random() / 10 + sin(angle * TWO_PI) * dist,
      r: f * starSize * (Math.random() * (0.8 + Math.random())),
      alpha: Math.random(),
    };
    stars.push(star);
  }
}

function drawStars() {
  scale(width, height);
  for (let star of stars) {
    fill(fillCol, Math.abs(Math.sin(star.alpha)) * 255);
    if (width < height) {
      ellipse(star.x, star.y, star.r, star.r / vpFactor);
    } else {
      ellipse(star.x, star.y, star.r / vpFactor, star.r);
    }
  }
}

function drawMoon(zoom) {
  scale(max(width, height) / zoom);
  let d = 752;
  strokeWeight(height / 4000);
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

//Looks cool
// function drawMoon() {
//   for (let i = 0; i < 10; i++) {
//     let f = 3 / Math.pow(i, -2);
//     fill(0, 0);
//     ellipse(0, 0, height / 3 - f, height / f - f);
//     ellipse(0, 0, height / 3 - f, height / f - f);
//   }
// }

function draw() {
  background(bgCol);
  push();
  translate(width / 2, height / 1.5);
  stroke(fillCol);
  // ellipse(0, 0, height / 3); nh
  fill(bgCol);
  //Draw ellipse multiple lines
  strokeWeight(2);
  drawRocket();
  horizontalspeed += 0.02;
  rotate(horizontalspeed);
  drawMoon(zoom);
  pop();
  push();
  translate();

  push();
  translate(0, 0);
  drawStars();
  pop();
  pop();
}
