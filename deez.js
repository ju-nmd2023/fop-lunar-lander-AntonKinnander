//Checkerboard.

//alternate on each row,

/* option one, calculate how many squares fit on the canvas,
draw row by row */

let c1 = 0;
let c2 = 255;
const w = windowWidth;
const h = windowHeight;
const side = 70;
const squareCountX = Math.ceil(w / side);
const squareCountY = Math.ceil(h / side);
const squareTotal = squareCountX * squareCountY;

function draw() {
  for (let i = 0; i < squareCountY; i++) {
    for (let nX = 0; nX < squareCountX; nX++) {
      //Alternate between rows
      if (i % 2 === 0) {
        c1 = 255;
        c2 = 0;
      } else {
        c1 = 0;
        c2 = 255;
      }
      //Draw row squares until the canvas is covered
      if (nX % 2 === 0) {
        fill(c1);
      } else {
        fill(c2);
      }
      rect(nX * side, i * side, side, side);
    }
  }
}
