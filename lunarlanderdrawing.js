let size;
let x = 0;
let y = 0;
let a = 0;
const seed = Math.random();
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
// function drawMoon() {
//   //generate random moon Phase - can only land on bright side
//   for (let i = 0; i < 9; i++) {
//     ellipse(0, 0, (height / 3) * f, height / 3);
//   }
// }

function drawMoonPhase() {
  //Diameters
  let d1 = width / 4.5;
  let d2 = width / 11.25;

  let phasex = width / 2;
  let phasey = height / 2;

  // moon
  a -= 0.03;
  a %= -Math.PI * 2;

  x = (((Math.cos(a) * d1) / 2) * 5) / 2;
  y = (((Math.sin(a) * d1) / 2) * 5) / 2;
  if (-Math.PI / 2 < a && a < 0) {
    color3 = light_color;
    color4 = light_color;
    color1 = light_color;
    color2 = bg_color;
  } else if (-Math.PI < a && a < -Math.PI / 2) {
    color1 = light_color;
    color3 = bg_color;
    color4 = bg_color;
    color2 = bg_color;
  } else if ((-3 * Math.PI) / 2 < a && a < -Math.PI) {
    color4 = bg_color;
    color2 = light_color;
    color1 = bg_color;
    color3 = bg_color;
  } else if (-2 * Math.PI < a && a < (-3 * Math.PI) / 2) {
    color4 = color(0, 255, 0, 0);
    color3 = light_color;
    color1 = bg_color;
    color2 = light_color;
  }

  fill(color1);
  //let widthMoonPhase = map(Math.sin(a), -1, 1, -d2, d2);
  arc(phasex, phasey, d2, d2, PI / 2, (3 * PI) / 2);
  fill(color2);
  arc(phasex, phasey, d2, d2, (3 * PI) / 2, PI / 2);

  let heightPhase = d2;
  let widthPhase = map(Math.cos(a), 0, 1, 0, d2);

  fill(color3);
  arc(phasex, phasey, widthPhase - 2, heightPhase + 1, PI / 2, (3 * PI) / 2);
  fill(color4);
  arc(phasex, phasey, widthPhase - 2, heightPhase + 1, (3 * PI) / 2, PI / 2);
}

// function draw() {
//   push();
//   translate(size / 2, size / 2);
//   stroke(fillCol);
//   // ellipse(0, 0, height / 3); nh
//   fill(bgCol);
//   //Draw ellipse multiple lines
//   strokeWeight(2);
//   // ellipse(0, 0, height / 3);
//   drawMoonPhase();
//   pop();
//   drawStars();
// }
function draw() {
  drawMoonPhase();
}
