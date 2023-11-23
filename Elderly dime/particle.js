class Particle {
  constructor(pos, field, dt) {
    this.pos = pos;
    this.field = field;
    this.dt = dt;
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

    let pos_new = createVector(
      pos.x + (k1.x + 2 * k2.x + 2 * k3.x + k4.x) / 6,
      pos.y + (k1.y + 2 * k2.y + 2 * k3.y + k4.y) / 6
    );

    this.pos = pos_new;
  }

  show() {
    stroke(225);
    strokeWeight(2);
    let zoom = 0.05;
    point(this.pos.x / zoom, this.pos.y / zoom);
  }
}
