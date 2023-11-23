class Mover {
  constructor(x, y, m) {
    this.m = m;
    this.r = sqrt(this.m) * 10;
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector();
    this.topSpeed = 0.01;
  }

  friction() {
    let diff = height - (this.pos.y + this.r);
    if (diff < 1) {
      
      let friction = this.vel.copy();
      friction.normalize();
      friction.mult(-1);

      //let mu = 0.1;
      let normal = this.m;

      friction.setMag(mu * normal);
      this.applyForce(friction);
    }
  }
  
  drag() {
    let drag = this.vel.copy();
    drag.normalize();
    drag.mult(-1);
    
    //let c = 0.1;
    
    drag.setMag(c * this.r * this.vel.magSq())
    this.applyForce(drag);
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.m);
    this.acc.add(f);
  }

  edges() {
    if (this.pos.y >= height - this.r) {
      this.pos.y = height - this.r;
      this.vel.y *= -1;
    }
    if (this.pos.y <= this.r) {
      this.pos.y = this.r;
      this.vel.y *= -1;
    }
    if (this.pos.x <= this.r) {
      this.pos.x = this.r;
      this.vel.x *= -1;
    }
    if (this.pos.x >= width - this.r) {
      this.pos.x = width - this.r;
      this.vel.x *= -1;
    }
  }

  update() {
    this.vel.add(this.acc);
    if (this.vel.mag > this.topSpeed) {
      this.vel.setMag(this.topSpeed);
    }
    this.pos.add(this.vel);

    this.acc.set(0, 0);
  }

  show() {
    stroke(20);
    strokeWeight(this.r / 10);
    fill(225,125);
    ellipseMode(RADIUS);
    circle(this.pos.x, this.pos.y, this.r);
  }
}
