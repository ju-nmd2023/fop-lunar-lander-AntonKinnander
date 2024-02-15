function drawMoon() {
  let d = 752;
  strokeWeight(2);
  stroke(255);
  //No stars on the moon
  push();
  fill(2);
  ellipse(0, 0, d / 9);
  pop();
  fill(0, 0);

  for (let i = 0; i < 3; i++) {
    let f = 9 / Math.pow(i, -2);
    ellipse(0, 0, d / 9 - f, d / f - f * 2.9);
    ellipse(0, 0, d / 9 - f, d / f - f);
  }
}
function draw() {
  drawMoon();
}
