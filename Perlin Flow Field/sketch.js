var inc = 0.01;
var scl = 10;
var cols, rows;

var zoff = 0;

var fr;

var particles = [];
var numOfParticles = 10000;

var flowfield;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(30);
  cols = floor(width / scl);
  rows = floor(height / scl);

  fr = createP("");

  flowfield = new Array(cols * rows);

  for (i = 0; i < numOfParticles; i++) particles[i] = new Particle();
}

function draw() {
  var yoff = 0;
  for (y = 0; y < rows; y++) {
    var xoff = 0;
    for (x = 0; x < cols; x++) {
      var index = x + y * cols;
      var ang = noise(xoff, yoff, zoff) * 4 * PI;
      var v = p5.Vector.fromAngle(ang);
      v.setMag(0.5);
      flowfield[index] = v;
      xoff += inc;

      /*
      stroke(30);
      fill((ang / (2 * PI)) * 255);
      rect(x * scl, y * scl, scl, scl);

      stroke(225, 100);
      strokeWeight(1);
      push();
      translate(x * scl, y * scl);
      rotate(v.heading());
      line(0, 0, scl, 0);
      pop();
      */
    }
    yoff += inc;
  }
  //zoff += inc / 50;

  for (i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }

  fr.html(floor(frameRate()));
}
