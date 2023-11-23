class Body {
    constructor(pos0, vel0, m) {
        this.pos = pos0;
        this.vel = vel0;
        this.acc = createVector(0, 0);
        this.m = m;
    }

    applyForce(force) {
        // Update acceleration
        this.acc.x += force.x / this.m
        this.acc.y += force.y / this.m
    }

    move(dt) {
        // Update velocity
        this.vel.x += this.acc.x * dt
        this.vel.y += this.acc.y * dt

        // Model dissipation of energy
        let dissCoef = 1 - this.vel.magSq()/1000000;
        this.vel.mult(dissCoef)

        // Update position
        this.pos.x += this.vel.x * dt
        this.pos.y += this.vel.y * dt

        // Reset acceleration
        this.acc = createVector(0, 0)
    }

    show() {
        point(this.pos)
    }
}