function Particle() {
  this.pos = createVector(random(width), random(height));
  this.vel = createVector(0, 0);
  this.acc = createVector(0, 0);
  this.maxspeed = 2;

  this.update = function () {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  };

  this.applyForce = function (force) {
    this.acc.add(force);
  };

  this.follow = function (vectors) {
    x = floor(this.pos.x / scl);
    y = floor(this.pos.y / scl);

    index = x + y * cols;

    force = vectors[index];
    this.applyForce(force);
  };

  this.edges = function () {
    if (
      this.pos.x > width ||
      this.pos.x < 0 ||
      this.pos.y > height ||
      this.pos.y < 0
    ) {
      this.vel.mult(0);
      this.pos = createVector(random(width), random(height));
    }
  };

  this.show = function () {
    stroke(255, 25);
    strokeWeight(1);
    point(this.pos.x, this.pos.y);
  };
}
