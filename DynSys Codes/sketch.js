let plot1;
let xlim = 5;
let ylim = 5;
let particles = [];
let num_particles = 2000;
let xfunc;
let yfunc;
let Xfactor;
let Yfactor;

function setup() {
  createCanvas(windowHeight, windowHeight);
  background(30);
  translate(width / 2, height / 2);
  scale(1, -1);

  plot1 = new PhasePlanePlot();
  plot1.set_xlim(-xlim, xlim);
  plot1.set_ylim(-ylim, ylim);
  plot1.set_arrowlength(5);
  plot1.set_num_arrows(44);


  // // CONSTANT
  // xfunc = (x, y) => 0.025;
  // yfunc = (x, y) => 0.025;

  /*
  // CENTER
  xfunc = (x, y) => y;
  yfunc = (x, y) => -x;
  */

  
  // STING RAY
  xfunc = (x, y) => y - pow(y, 3);
  yfunc = (x, y) => -x - sq(y);
  

  
  // // SPIRAL AND SADDLE
  // xfunc = (x, y) => 1;
  // yfunc = (x, y) => x*(y+1);
  

  /*
  // Van Der Pool (INCORRECT)
  a = 5;
  xfunc = (x, y) => y - a * (pow(x, 3) / 3 - sq(x));
  yfunc = (x, y) => -x/a;
  */

  /*
  // PENDULUM
  xfunc = (x, y) => 2 * y + x;
  yfunc = (x, y) => cos(x * 2 + 1.5);
  */

  /*
  // STROGATZ PP. 246
  a = 2;
  b = -2;
  xfunc = (x, y) => -a * x + y + 0.1;
  yfunc = (x, y) => sq(x) / (1 + sq(x)) - b * y;
  */
  
  /*
  // Exercies 7.3.4 - Limit Cycle
  xfunc = (x, y) => x * (1 - 4 * sq(x) - sq(y)) - (y * (1 + x)) / 2;
  yfunc = (x, y) => y * (1 - 4 * sq(x) - sq(y)) + 2 * x * (1 + x);
  */
  
  
  // // Exercise 8.2.1 - biased van der Pol oscillator
  // a = 0;
  // mu = 0.2;
  // xfunc = (x, y) => y;
  // yfunc = (x, y) => a - mu * (sq(x) - 1) * y - x;
  

  plot1.set_xfunc(xfunc);
  plot1.set_yfunc(yfunc);

  plot1.drawVectors = true;
  plot1.drawGrid = false;
  //plot1.show();

  Xfactor = width / (2 * xlim);
  Yfactor = height / (2 * ylim);

  xrange = createVector(-width / 2, width / 2);
  yrange = createVector(-height / 2, height / 2);
  spawnRandomParticles(xrange, yrange, num_particles, (variableColor = true));
}

function draw() {
  translate(width / 2, height / 2);
  scale(1, -1);

  if (frameCount == 0 || frameCount % 200 == 0) {
    particles = [];
    xrange = createVector(-width / 2, width / 2);
    yrange = createVector(-height / 2, height / 2);
    spawnRandomParticles(xrange, yrange, num_particles, (variableColor = true));
  }

  Xfactor = width / (2 * xlim);
  Yfactor = height / (2 * ylim);
  for (let i = 0; i < particles.length; i++) {
    particles[i].show(Xfactor, Yfactor);
    particles[i].edges(Xfactor, Yfactor);
    particles[i].update();
  }
}

function mouseClicked() {
  //spawnParticle();
  spawnParticleCluster();
}

function spawnParticle() {
  Xfactor = width / (2 * xlim);
  Yfactor = height / (2 * ylim);

  let x = (mouseX - width / 2) / Xfactor;
  let y = -(mouseY - height / 2) / Yfactor;
  let pos = createVector(x, y);

  let field = createVector(plot1.xfunc, plot1.yfunc);
  let dt = 0.1;
  append(particles, new Particle(pos, field, dt));
}

function spawnParticleCluster() {
  Xfactor = width / (2 * xlim);
  Yfactor = height / (2 * ylim);

  let x = (mouseX - width / 2) / Xfactor;
  let y = -(mouseY - height / 2) / Yfactor;

  let xrange = createVector(x - xlim / 10, x + xlim / 10);
  let yrange = createVector(y - ylim / 10, y + ylim / 10);

  let field = createVector(plot1.xfunc, plot1.yfunc);
  let dt = 0.1;
  for (let i = 0; i < 100; i++) {
    let x = random(xrange.x, xrange.y);
    let y = random(yrange.x, yrange.y);
    let pos = createVector(x, y);
    particles[i] = new Particle(pos, field, dt);
    particles[i].variableColor = variableColor;
  }
}

function spawnRandomParticles(xrange, yrange, num_particles, variableColor) {
  let field = createVector(plot1.xfunc, plot1.yfunc);
  let dt = 0.1;
  for (let i = 0; i < num_particles; i++) {
    let x = ((random(xrange.x, xrange.y) / Xfactor) * 2) / 2;
    let y = ((random(yrange.x, yrange.y) / Yfactor) * 2) / 2;
    let pos = createVector(x, y);
    particles[i] = new Particle(pos, field, dt);
    particles[i].variableColor = variableColor;
  }
}
