const fillCol = [208, 103, 82];
const bgCol = [17, 7, 7];
stroke(fillCol);
translate(height, height);

function drawRocket() {
  beginClip();
  noStroke();
  ellipse(0, height / 9 - 9 / Math.pow(12, -1), height / 10);
  ellipse(0, height / 9 - 9 / Math.pow(16, -1), height / 10, height / 6);
  endClip();
  for (let i = 2; i < 10; i++) {
    let f = 9 / Math.pow(i, -1);
    fill(0, 0);
    ellipse(0, 0, height / 9 - f, height / f - f * 2.9);
    ellipse(0, 0, height / 9 - f, height / f - f);
  }
}

function draw() {
  translate(height / 2, height / 2);
  drawRocket();
}
