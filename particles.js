let particles = [];
//random letters and green for matrix

//create function to create random particle

function createParticle(x, y) {
  //return {x: x, y: y} simple shit particle same coords
  //Give it some movement I aint seeing enough movement
  //Velocity
  const velocity = 0.2 + Math.random();
  const maxLife = 1000 + Math.floor(Math.random() * 100);
  const angle = Math.PI * 2 * Math.random();
  //life 0 will track time since created
  return {
    x: x,
    y: y,
    velocity: velocity,
    maxLife: maxLife,
    life: 0,
    angle: angle,
  };
}

// :))) Matte  shit throwback gymnasiet
//Icks list for guys when he know math on the icks axis

function mousePressed() {
  for (let i = 0; i < 200; i++) {
    //add a new particle to particle array from mouse y and mouse x coords
    particles.push(createParticle(mouseX, mouseY));
  }
}

//takes single particle and updates (x,y,velocity)
function updateParticle(particle) {
  //add velocity to y, create movement (accelerates?)
  //alot of small things on a small level, this creates a way more impressive effect. adds up
  //one particle boring, many give cool effect
  particle.x = particle.x + Math.cos(particle.angle) * particle.velocity;
  particle.y = particle.y + Math.sin(particle.angle) * particle.velocity;
  //count particle lifetime since born
  particle.life++;
  if (particle.life > particle.maxLife) {
    const particleIndex = particles.indexOf(particle);
    particles.splice(particleIndex, 1);
  }
}

function drawParticle(particle) {
  push();
  //Translate controls position because ellipse is drawn at 0,0 but moved
  translate(particle.x, particle.y);
  noStroke();
  fill(100, 255, 120, 20);
  ellipse(0, 0, 6);
  pop();
}

function draw() {
  background(0);
  for (let particle of particles) {
    updateParticle(particle);
    drawParticle(particle);
  }
}

//how to draw a circle
// radius sin cosine and angle
