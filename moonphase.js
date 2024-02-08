// x and y to calculate the coordinates of the moon
let x = 0;
let y = 0;

// 1 is the earth and 2 is the moon
// d is the diameter
// a is the angle bewtween the center of the moon and the center of the earth
//let d1 = 200; // if width = 900 and height = 600
//let d2 = 80; // if width = 900 and height = 600
let a = 0;

var c;

function draw() {
  // it's a while loop
  let bg_color = color(17, 7, 7);
  let light_color = color(208, 103, 82);
  background(bg_color);

  let d1 = width / 4.5;
  let d2 = width / 11.25;

  noStroke();
  ellipseMode(CENTER);

  // earth
  let earthx = width / 2;
  let earthy = height / 2;

  // moon
  a -= 0.03;
  a %= -Math.PI * 2;

  x = earthx + (((Math.cos(a) * d1) / 2) * 5) / 2;
  y = earthy + (((Math.sin(a) * d1) / 2) * 5) / 2;

  // moon phases or roatating
  noStroke();
  let phasex = width / 2;
  let phasey = height / 2;

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

  push();
  stroke(17, 7, 7);
  strokeWeight(2);
  fill(0, 0);
  ellipse(width / 2, height / 2, d1 / 2.5, d1 / 5);
  ellipse(width / 2, height / 2, d1 / 5, d1 / 2.5);
  ellipse(width / 2, height / 2, d1 / 2.5, d1 / 3);
  ellipse(width / 2, height / 2, d1 / 3, d1 / 2.5);
  ellipse(width / 2, height / 2, d1 / 2.5, d1 / 6);
  ellipse(width / 2, height / 2, d1 / 6, d1 / 2.5);

  line(width / 2, height / 2 - d1 / 5, width / 2, height / 2 + d1 / 5);
  line(width / 2 - d1 / 5, height / 2, width / 2 + d1 / 5, height / 2);
  pop();
}
