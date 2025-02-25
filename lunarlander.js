let zoom = 500;
const fillCol = [208, 103, 82];
let bgCol = [17, 7, 7];

//the height of p5Cannvas display while i was writing haunts this program
//used for scaling when drawing moon and
let d = 752;

let fuelValue;

const radius = Math.sqrt(0.5);
const starSize = 0.004;
const PHI = (1 + Math.sqrt(5)) / 2;

let stars = [];

let rotation = Math.random() * Math.PI * 2;
//random rotation speed
let horizontalVelocity = (Math.random() - 0.5) * 0.04;
let horizontalAcceleration = 0.00017;

let lives = 2; //3 lives 0,1,2
//Display values for lives remaining. works nicely because font is monospace
const livesDisplay = ["[>3      ]", "[>3 >3   ]", "[>3 >3 >3]"];

// Add touch control variables
let isTouchingLeft = false;
let isTouchingRight = false;
let isTouchingMiddle = false;
let isTouchingScreen = false;

let runState = "startScreen";

//font variables
let header;
let subHeader;
let title;

let headerSize;
let subHeaderSize;
let paragraphSize;

function preload() {
  header = loadFont("assets/fonts/Aber-Mono-Bold.otf");
  subHeader = loadFont("assets/fonts/Aber-Mono-Light.otf");
  title = loadFont("assets/fonts/BTE-Sporty.otf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  background(bgCol);
  textAlign(CENTER);
  //Load fonts
  generateStars();
  headerSize = height / 80 + width / 80;
  subHeaderSize = height / 94 + width / 94;
  paragraphSize = height / 150 + width / 150;
  
  // Add touch event listeners for mobile controls
  canvas = document.querySelector('canvas');
  canvas.addEventListener('touchstart', handleTouchStart);
  canvas.addEventListener('touchend', handleTouchEnd);
  canvas.addEventListener('touchmove', handleTouchMove);

  // Add this function to prevent default touch behavior (like scrolling)
  document.addEventListener('touchmove', function(event) {
    if (event.target.nodeName === 'CANVAS') {
      event.preventDefault();
    }
  }, { passive: false });
}

// Handle touch start events
function handleTouchStart(event) {
  event.preventDefault();
  
  // For space bar functionality on mobile (starting/restarting game)
  if (runState != "running") {
    resetGame();
    return;
  }
  
  const touch = event.touches[0];
  const x = touch.clientX;
  
  isTouchingScreen = true;
  
  // Calculate screen thirds for deadzone
  const leftThird = windowWidth / 3;
  const rightThird = windowWidth * 2 / 3;
  
  // Determine which zone is being touched
  if (x < leftThird) {
    // Left third of screen
    isTouchingLeft = true;
    isTouchingRight = false;
    isTouchingMiddle = false;
  } else if (x >= rightThird) {
    // Right third of screen
    isTouchingLeft = false;
    isTouchingRight = true;
    isTouchingMiddle = false;
  } else {
    // Middle third (deadzone for steering)
    isTouchingLeft = false;
    isTouchingRight = false;
    isTouchingMiddle = true;
  }
}

// Handle touch end events
function handleTouchEnd(event) {
  event.preventDefault();
  isTouchingLeft = false;
  isTouchingRight = false;
  isTouchingMiddle = false;
  isTouchingScreen = false;
}

// Handle touch move events
function handleTouchMove(event) {
  event.preventDefault();
  
  const touch = event.touches[0];
  const x = touch.clientX;
  
  // Calculate screen thirds for deadzone
  const leftThird = windowWidth / 3;
  const rightThird = windowWidth * 2 / 3;
  
  // Update which zone is being touched
  if (x < leftThird) {
    // Left third of screen
    isTouchingLeft = true;
    isTouchingRight = false;
    isTouchingMiddle = false;
  } else if (x >= rightThird) {
    // Right third of screen
    isTouchingLeft = false;
    isTouchingRight = true;
    isTouchingMiddle = false;
  } else {
    // Middle third (deadzone for steering)
    isTouchingLeft = false;
    isTouchingRight = false;
    isTouchingMiddle = true;
  }
}

function drawStartScreen() {
  push();
  textSize(headerSize);
  textFont(title);
  text("MARTIAL LANDER", 0, -height / 2.11);
  pop();

  push();
  textFont(subHeader);
  textSize(subHeaderSize);
  text("Press [space] or tap screen to start", 0, 0);
  pop();

  push();
  textFont(header);
  textSize(paragraphSize);
  text("Controls:", 0, -height / 5);
  pop();
  push();
  textFont(subHeader);
  textSize(paragraphSize);
  text("[←][↑][→] or [W][A][D]", 0, -height / 6);
  text("Mobile: Tap for thrust, Tap sides to steer", 0, -height / 8);
  pop();
}
let livesGrammar = "lives";

function drawWinScreen() {
  fuelValue = Math.floor(calculateFuel() * 100);

  if (lives < 1) {
    livesGrammar = "life";
  } else {
    livesGrammar = "lives";
  }
  push();
  textSize(headerSize * 2);
  textFont(header);
  text("YOU WON", 0, -height / 2.11);
  pop();

  push();
  textFont(subHeader);
  textSize(paragraphSize);
  text("Score:", 0, -height / 3.1);
  pop();

  push();
  textSize(headerSize * 2);
  textFont(header);
  // for (let i = 0; i < score; i++) {
  //   text(i, 0, -height / 4);
  // }
  //Display the score, its just a random number, increases exponentially every win to give a sense of progression
  text(score, 0, -height / 4);
  pop();

  push();
  textFont(subHeader);
  textSize(subHeaderSize);

  text(
    "With " +
      (lives + 1) +
      " " +
      livesGrammar +
      " and " +
      fuelValue +
      "% fuel remaining.",
    0,
    -height / 2.5
  );
  pop();
  push();
  textFont(subHeader);
  textSize(subHeaderSize);
  text("Press [space] or tap screen to play again", 0, 0);
  pop();
}
function drawLoseScreen() {
  if (lives < 2) {
    livesGrammar = "life";
  } else {
    livesGrammar = "lives";
  }
  push();
  textSize(headerSize * 2);
  textFont(header);
  text("YOU LOST", 0, -height / 2.11);
  pop();

  push();
  textFont(subHeader);
  textSize(subHeaderSize);
  if (lives < 1) {
    text(
      "No lives remain but it doesnt matter \n they will be replenished :))",
      0,
      -height / 2.5
    );
  } else {
    text(
      "You have " + lives + " " + livesGrammar + " remaining.",
      0,
      -height / 2.5
    );
  }
  pop();

  push();
  textFont(subHeader);
  textSize(subHeaderSize);
  text("Press [space] or tap screen to try again", 0, 0);
  pop();
}

function resetGame() {
  if (runState == "win" || runState == "lost") {
    rotation = Math.random() * Math.PI * 2;
    //random rotation speed
    horizontalVelocity = (Math.random() - 0.5) * 0.04;
    verticalDistance = 0;
    verticalVelocity = 0;
    flameStrength = 3;
    fuel = 1;
  }
  if (runState == "win") {
    lives = 2;
  }
  if (runState == "lost") {
    lives -= 1;
    if (lives < 0) {
      lives = 2;
    }
  }
  runState = "running";
}

let fuel = 1;
const fuelBurnRate = -0.002;
function calculateFuel() {
  if (
    (keyIsDown(39) ||
      keyIsDown(37) ||
      keyIsDown(68) ||
      keyIsDown(65) ||
      keyIsDown(38) ||
      keyIsDown(40) ||
      keyIsDown(87) ||
      isTouchingLeft ||
      isTouchingRight ||
      isTouchingMiddle) &&
    runState == "running"
  ) {
    fuel += fuelBurnRate;
  }
  return max(fuel, 0);
}

function controlRocket() {
  // Right controls (right arrow, D key, or touch right side)
  if (
    ((keyIsDown(39) && !keyIsDown(37)) || 
     (keyIsDown(68) && !keyIsDown(65)) ||
     (isTouchingRight && !isTouchingLeft && !isTouchingMiddle)) &&
    calculateFuel() > 0
  ) {
    //Math.max for lower speed limit / left
    horizontalVelocity = Math.max(
      horizontalVelocity - horizontalAcceleration,
      -0.04
    );
  // Left controls (left arrow, A key, or touch left side)
  } else if (
    ((keyIsDown(37) && !keyIsDown(39)) || 
     (keyIsDown(65) && !keyIsDown(68)) ||
     (isTouchingLeft && !isTouchingRight && !isTouchingMiddle)) &&
    calculateFuel() > 0
  ) {
    //Math.min for upper speed limit / right
    horizontalVelocity = Math.min(
      horizontalVelocity + horizontalAcceleration,
      0.04
    );
  }

  rotation += horizontalVelocity;

  // Vertical thrust (up arrow, W key, D key, or any touch including middle)
  if (
    (keyIsDown(38) || 
     keyIsDown(87) || 
     keyIsDown(40) || 
     isTouchingScreen) &&
    calculateFuel() > 0
  ) {
    verticalDistance += verticalVelocity;
    verticalVelocity += verticalAcceleration;
  } else {
    verticalDistance += verticalVelocity;
    verticalVelocity += gravity;
  }
}

function drawHud() {
  push();
  textFont(subHeader);
  textSize(subHeaderSize);
  push();
  textAlign(LEFT);
  //the font has < > mixed up
  text(livesDisplay[lives], -width / 2.2, -height / 1.47);
  pop();
  push();
  textAlign(RIGHT);
  text(
    "Fuel: " + Math.floor(calculateFuel() * 100) + "%",
    width / 2.2,
    -height / 1.47
  );
  pop();
  pop();
}

//Generative starry background inspired by garrits weekly challenge and this video but its been rewritten alot to have it in a way where i can make it rotate >> https://www.youtube.com/watch?v=RrSOv9FH6uo

class Star {
  constructor() {
    this.x = Math.random() * 2 * width - width;
    this.y = Math.random() * 2 * height - height;
    this.r = Math.random() * width;
  }

  show() {
    fill(fillCol);
    noStroke();
    let x = map(this.x / this.r, 0, 1, 0, width);
    let y = map(this.y / this.r, 0, 1, 0, height);
    let r = map(this.r, 0, width, 7, 0);
    fill(fillCol);

    ellipse(x, y, r, r);
  }
}

function drawStars() {
  for (let star of stars) {
    star.show();
  }
}
function generateStars() {
  for (let i = 0; i < 450; i++) {
    stars.push(new Star());
  }
}

function drawMoon() {
  push();
  scale((3 * height) / d);
  strokeWeight(0.5);
  stroke(fillCol);
  //No stars on the moon
  push();
  fill(bgCol, 100);

  ellipse(0, 0, d / 9);
  pop();
  fill(0, 0);

  for (let i = 1; i < 3; i++) {
    let f = 9 / Math.pow(i, -2);
    ellipse(0, 0, d / 9 - f, d / f - f * 2.9);
    ellipse(0, 0, d / 9 - f, d / f - f);
  }
  pop();
}

//Cover bottom use it as flame, possibly have it depend on fuel use.
function drawRocket(y) {
  scale((0.7 * height) / d);
  push();
  translate(0, -height / 1.9 + y);

  stroke(fillCol);
  fill(bgCol);
  //variable for factor to draw the ellipses that make up the rocket
  let f;

  push();
  //Wipe the smear / screenburn with background color
  noStroke();
  fill(bgCol);
  ellipse(0, -16, d / 9, d / 6);
  pop();

  for (let i = 2; i < 10; i++) {
    f = 11.17 / Math.pow(i, -1);
    fill(0, 0);
    ellipse(0, 0, d / 9 - f, d / f - f * 1.5);
    ellipse(0, 0, d / 9 - f, d / f - f);
  }

  //Bad solution instead of clip
  push();
  noStroke();

  fill(bgCol);
  ellipse(0, 9, d / 9, d / 50);
  ellipse(0, 39, d / 10, d / 9);

  //  fill(0, 255, 0);
  //mask for the flame
  push();

  drawFlame();

  pop();
  ellipse(0, 5, d / 20, d / 70);
  push();

  pop();
  pop();
  pop();
}
let flameStrength = 3;
function drawFlame() {
  push();
  translate(0, height / 110);
  stroke(208, 103, 82, 150 * (Math.random() + 0.9 / 1.9));
  noFill();
  let f = 4;

  if ((keyIsDown(38) || keyIsDown(87) || keyIsDown(40) || isTouchingScreen) && fuel > 0) {
    flameStrength += 0.47;
    // decrease flame when fuel is almost out but not lower than three
  } else if (flameStrength > 3 || fuel < 0.1) {
    flameStrength -= 1.2;
  }

  for (
    let i = 3;
    i < Math.min(Math.floor(flameStrength * (Math.random() / 3 + 0.95)), 9);
    i++
  ) {
    f = 4.17 / Math.pow(i, -1.5);
    ellipse(0, 0, d / 11 - f, d / f - f * 1.5);
    ellipse(0, 0, d / 11 - f, d / f - f);
  }
  pop();
}

//add a score value, the value will never reset and increase everytime the playerwins, to give a sense of progression
let score = 0;
function runStateHandler(y, hv, vv) {
  let groundY = height / 2.79;
  if (y > groundY) {
    //win conditions, if down velocity <1 and horizontal velocity < 0.005, need to land gently
    if (vv < 1 && Math.abs(hv) < 0.005) {
      runState = "win";
      score = Math.floor(Math.pow(Math.random() * (score + 100), 1.33));
    } else {
      runState = "lost";
    }
  }
}

let verticalDistance = 0;
let verticalVelocity = 0;
const verticalAcceleration = -0.03;
const gravity = 0.07;

function draw() {
  background(17, 7, 7, 170); // Slight transparency for glow trails
  translate(width / 2, (3 * height) / 4);
  //Continue rotating because its space
  //Run the game
  if (runState == "running") {
    drawHud();
    controlRocket();
    runStateHandler(verticalDistance, horizontalVelocity, verticalVelocity);
    drawRocket(verticalDistance);
    push();
    //Background rotates faster for depth of field effect
    rotate(rotation * 1.2);
    drawStars();
    pop();
    rotate(rotation);
    drawMoon(); // Draw the moon
  } else if (runState == "win") {
    drawStars();
    drawWinScreen();
  } else if (runState == "lost") {
    drawStars();
    drawLoseScreen();
  } else {
    drawStars();
    drawRocket(0);
    drawStartScreen();

    // drawRocket(0);
  }
  if (keyIsDown(32) && runState != "running") {
    resetGame();
  }
}

// Also update the windowResized function to maintain the canvas size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
  // Recalculate font sizes
  headerSize = height / 80 + width / 80;
  subHeaderSize = height / 94 + width / 94;
  paragraphSize = height / 150 + width / 150;
}
