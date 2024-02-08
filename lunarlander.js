let size;
const radius = Math.sqrt(0.5);
const dotSize = 0.004;
const PHI = (1 + Math.sqrt(5)) / 2;
const fillCol = [208, 103, 82];
const bgCol = [17, 7, 7];

function setup() {
  size = max(windowWidth, windowHeight);
  createCanvas(size, size);
  noStroke();
  background(bgCol);
}

//altered and added to a tutorial by creative coding youtube
function drawStars() {
  scale(size, size);

  fill(fillCol);

  const count = 600;
  for (let i = 1; i < count; i++) {
    noLoop();
    const f = i / count;
    const angle = i * PHI;
    const dist = f * radius;
    let x = 0.5 + Math.random() / 10 + cos(angle * TWO_PI) * dist;
    const y = 0.5 + Math.random() / 10 + sin(angle * TWO_PI) * dist;
    let r = f * dotSize * (Math.random() * (0.8 + Math.random()));

    circle(x, y, r);
  }
}
function drawMoon() {
  for (let i = 2; i < 10; i++) {
    let f = 9 / Math.pow(i, -1);
    fill(0, 0);
    ellipse(0, 0, height / 9 - f, height / f - f * 2.9);
    ellipse(0, 0, height / 9 - f, height / f - f);
  }
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
  push();
  translate(size / 2, size / 2);
  stroke(fillCol);
  // ellipse(0, 0, height / 3); nh
  fill(bgCol);
  //Draw ellipse multiple lines
  strokeWeight(2);
  drawMoon();
  pop();
  push();
  drawStars();
  pop();
}
