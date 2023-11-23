class PhasePlanePlot {
  constructor(showGrid = true, showVectors = true) {
    this.xfunc = 1;
    this.yfunc = 1;
    this.xmin = -1;
    this.xmax = 1;
    this.ymin = -1;
    this.ymax = 1;
    this.arrowlength = 20;
    this.num_arrows = 20;
    this.variable_arrow_length = false;
    this.showGrid = showGrid;
    this.showVectors = showVectors;
  }

  show() {
    let Xfactor = width / (this.xmax - this.xmin);
    let Yfactor = height / (this.ymax - this.ymin);
    let xstep = (this.xmax - this.xmin) / this.num_arrows;
    let ystep = (this.ymax - this.ymin) / this.num_arrows;
    for (var x = this.xmin; x < this.xmax; x += xstep) {
      for (var y = this.ymin; y < this.ymax; y += ystep) {
        let X = x * Xfactor;
        let Y = y * Yfactor;
        let Xstep = xstep * Xfactor;
        let Ystep = xstep * Yfactor;
        let cen_x = x + xstep / 2;
        let cen_y = y + ystep / 2;
        let cen_X = cen_x * Xfactor;
        let cen_Y = cen_y * Yfactor;

        if (this.drawGrid == true) {
          this.drawGridCell(X, Y, Xstep, Ystep);
        }
        //this.drawCenterPoint(cen_X, cen_Y);
        if (this.drawVectors == true) {
          this.drawVector(
            cen_x,
            cen_y,
            cen_X,
            cen_Y,
            Xfactor,
            Yfactor,
            this.arrowlength
          );
        }
      }
    }
  }

  drawGridCell(X, Y, Xstep, Ystep) {
    stroke(50);
    strokeWeight(0.5);
    //upper edge
    line(X, Y, X + Xstep, Y);
    //right edge
    line(X + Xstep, Y, X + Xstep, Y + Ystep);
    //lower edge
    line(X + Xstep, Y + Ystep, X, Y + Ystep);
    //left edge
    line(X, Y + Ystep, X, Y);
  }

  drawCenterPoint(cen_X, cen_Y) {
    stroke(225);
    strokeWeight(4);
    point(cen_X, cen_Y);
  }
  drawVector(x, y, X, Y, Xfactor, Yfactor, arrowlength) {
    let v = createVector(
      this.xfunc(x, y) * Xfactor,
      this.yfunc(x, y) * Yfactor
    );
    let h = v.copy();
    v.setMag(arrowlength);
    h.setMag(arrowlength / 2);

    let a = createVector(X, Y);
    let base = p5.Vector.sub(a, h);
    stroke(225);
    strokeWeight(1);
    this.drawArrow(base, v);
  }

  drawArrow(base, vec) {
    push();
    translate(base.x, base.y);
    line(0, 0, vec.x, vec.y);
    rotate(vec.heading());
    let arrowSize = vec.mag() / 5;
    translate(vec.mag() - arrowSize, 0);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    pop();
  }

  set_xlim(xmin, xmax) {
    this.xmin = xmin;
    this.xmax = xmax;
  }
  set_ylim(ymin, ymax) {
    this.ymin = ymin;
    this.ymax = ymax;
  }

  set_xfunc(xfunc) {
    this.xfunc = xfunc;
  }
  set_yfunc(yfunc) {
    this.yfunc = yfunc;
  }

  set_arrowlength(arrowlength) {
    this.arrowlength = arrowlength;
  }

  set_num_arrows(num_arrows) {
    this.num_arrows = num_arrows;
  }

  solve(x0, y0, dt = 0.01, num_steps = 1000, mode = "RK") {
    let c = color(255, 75, 75);
    stroke(c);
    strokeWeight(2);

    let Xfactor = width / (this.xmax - this.xmin);
    let Yfactor = height / (this.ymax - this.ymin);

    let arr = this.integrate(x0, y0, dt, num_steps, mode);

    noFill();
    beginShape();
    for (var i = 0; i < arr.length; i++) {
      let x = arr[i].x;
      let y = arr[i].y;
      curveVertex(x * Xfactor, y * Yfactor);
    }
    endShape();
  }

  integrate(x0, y0, dt, num_steps, mode = "RK") {
    let arr = [];

    let x = x0;
    let y = y0;

    if (mode == "EULER") {
      for (let i = 0; i < num_steps; i++) {
        let v = createVector(x, y);
        arr[i] = v;
        x += this.xfunc(x, y) * dt;
        y += this.yfunc(x, y) * dt;
      }
      return arr;
    } else if (mode == "RK") {
      for (let i = 0; i < num_steps; i++) {
        arr[i] = createVector(x, y);
        let k1x = this.xfunc(x, y) * dt;
        let k1y = this.yfunc(x, y) * dt;
        let k2x = this.xfunc(x + k1x / 2, y + k1y / 2) * dt;
        let k2y = this.yfunc(x + k1x / 2, y + k1y / 2) * dt;
        let k3x = this.xfunc(x + k2x / 2, y + k2y / 2) * dt;
        let k3y = this.yfunc(x + k2x / 2, y + k2y / 2) * dt;
        let k4x = this.xfunc(x + k3x, y + k3y) * dt;
        let k4y = this.yfunc(x + k3x, y + k3y) * dt;
        x += (k1x + 2 * k2x + 2 * k3x + k4x) / 6;
        y += (k1y + 2 * k2y + 2 * k3y + k4y) / 6;
      }
      return arr;
    } else print("Error: Integration mode not chosen");
  }
}
