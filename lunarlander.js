/*
  Tutorial by me :)
    https://www.youtube.com/watch?v=RrSOv9FH6uo

  inspiration + explanation for golden ratio:
    Numberphile - The Golden Ratio (why it is so irrational)
    https://www.youtube.com/watch?v=sj8Sg8qnjOg
*/

const size = max(windowWidth, windowHeight);
const radius = Math.sqrt(0.5);
const dotSize = 0.004;
const PHI = (1 + Math.sqrt(5)) / 2;
const fillCol = [208, 103, 82];
const bgCol = [16, 6, 6];

function setup() {
  createCanvas(size, size);
  noStroke();
  background(bgCol);
}

//altered and added to a tutorial by creative coding youtube
function drawStars() {
  noLoop();
  scale(windowWidth, windowHeight);

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

function draw() {
  push();
  translate(size / 2, size / 2);
  fill("pink");
  ellipse(0, 0, 100);
  pop();
  drawStars();
}
