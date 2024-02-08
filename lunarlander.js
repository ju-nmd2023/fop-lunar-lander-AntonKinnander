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
  //generate random moon Phase - can only land on bright side
  for (let i = 0; i < 9; i++) {
    ellipse(0, 0, (height / 3) * f, height / 3);
  }

  //ROSEGARDEN
  //ROSEGARDEN
  //ROSEGARDEN
  //ROSEGARDEN
  //ROSEGARDEN
  //ROSEGARDEN
  //ROSEGARDEN
  //ROSEGARDEN
  //ROSEGARDEN
  //ROSEGARDEN
  //ROSEGARDEN
  //ROSEGARDEN
  //Jag bjud 90%
  //ROSEGARDEN
}

function draw() {
  push();
  translate(size / 2, size / 2);
  stroke(fillCol);
  // ellipse(0, 0, height / 3); nh
  fill(bgCol);
  //Draw ellipse multiple lines
  strokeWeight(2);
  ellipse(0, 0, height / 3);
  // ellipse(0, 0, height / 3, height / 4);
  // ellipse(0, 0, height / 3, height / 5);
  // ellipse(0, 0, height / 3, height / 6);
  // ellipse(0, 0, height / 3, height / 7);
  // ellipse(0, 0, height / 3, height / 8);
  // ellipse(0, 0, height / 3, height / 9);
  // ellipse(0, 0, height / 3, height / 10);
  // ellipse(0, 0, height / 3, height / 11);
  pop();
  drawStars();
}
