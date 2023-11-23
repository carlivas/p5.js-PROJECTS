class Particle {
  constructor(pos, field, dt) {
    this.pos = pos;
    this.field = field;
    this.dt = dt;
    this.max_speed = 0.01;
    this.variableColor = false;
  }

  update() {
    this.moveAlongField(this.pos, this.field, this.dt);
  }

  moveAlongField(pos, field, dt) {
    let k1 = createVector(field.x(pos.x, pos.y), field.y(pos.x, pos.y));
    k1.mult(dt);

    let k2 = createVector(
      field.x(pos.x + k1.x / 2, pos.y + k1.y / 2),
      field.y(pos.x + k1.x / 2, pos.y + k1.y / 2)
    );
    k2.mult(dt);

    let k3 = createVector(
      field.x(pos.x + k2.x / 2, pos.y + k2.y / 2),
      field.y(pos.x + k2.x / 2, pos.y + k2.y / 2)
    );
    k3.mult(dt);

    let k4 = createVector(
      field.x(pos.x + k3.x, pos.y + k3.y),
      field.y(pos.x + k3.x, pos.y + k3.y)
    );
    k4.mult(dt);

    let d_pos = createVector(
      (k1.x + 2 * k2.x + 2 * k3.x + k4.x) / 6,
      (k1.y + 2 * k2.y + 2 * k3.y + k4.y) / 6
    );

    if (d_pos.mag() > this.max_speed) d_pos.setMag(this.max_speed);

    let pos_new = createVector(pos.x + d_pos.x, pos.y + d_pos.y);

    this.pos = pos_new;
  }

  edges(Xfactor, Yfactor) {
    if (
      this.pos.x > width / (2 * Xfactor) ||
      this.pos.x < -width / (2 * Xfactor) ||
      this.pos.y > height / (2 * Yfactor) ||
      this.pos.y < -height / (2 * Yfactor)
    ) {
      let x = random(-width/2, width/2) / Xfactor;
      let y = random(-height/2, height/2) / Yfactor;
      this.pos.x = x;
      this.pos.y = y;
    }
  }

  show(Xfactor, Yfactor) {
    let v = createVector(
      this.field.x(this.pos.x, this.pos.y),
      this.field.y(this.pos.x, this.pos.y)
    );
    colorMode(RGB, 255);
    let c = color(225);
    let a = v.heading();

    if (this.variableColor == true) {
      colorMode(HSL, 100);
      let hue = map(a, -PI, PI, 0, 100);
      c = color(hue, 50, 50);
    }
    c.setAlpha(50);
    stroke(c);
    strokeWeight(1);
    point(this.pos.x * Xfactor, this.pos.y * Yfactor);
  }
}
