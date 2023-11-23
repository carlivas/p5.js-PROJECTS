let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(30);
}

function draw() {
  translate(width / 2, height / 2);
  scale(1, -1);
  for (let i = 0; i < particles.length; i++) {
    particles[i].show();
    particles[i].update();
  }
}

function mouseClicked() {
  spawnParticle();
}

function spawnParticle() {
  let zoom = 0.05;
  let x = (mouseX - width / 2) * zoom;
  let y = -(mouseY - height / 2) * zoom;
  let pos = createVector(x, y);
  
  let xfunc = (x, y) => y;
  let yfunc = (x, y) => sin(x / TWO_PI);
  let field = createVector(xfunc, yfunc)
  let dt = 0.2;
  append(particles, new Particle(pos, field, dt));
}
