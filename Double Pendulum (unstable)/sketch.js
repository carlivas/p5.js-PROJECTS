function setup() {
  createCanvas(700, 700);

  a1 = random(0, TWO_PI);
  da1 = 0;

  a2 = random(0, TWO_PI);
  da2 = 0;
  g = 1;
}

function draw() {
  background(30);

  dt = 0.4;

  p1 = createVector(width / 2, 200);

  l1 = 150;
  l2 = 150;

  acc1 = dda1(a1, a2, da1, da2);

  da1 += acc1 * dt;
  a1 += da1 * dt;
  x1 = createVector(p1.x + l1 * sin(a1), p1.y + l1 * cos(a1));

  p2 = x1.copy();

  acc2 = dda2(a1, a2, da1, da2);

  da2 += acc2 * dt;
  a2 += da2 * dt;
  x2 = createVector(p2.x + l2 * sin(a2), p2.y + l2 * cos(a2));

  stroke(215);
  strokeWeight(10);
  line(p1.x, p1.y, x1.x, x1.y);
  line(p2.x, p2.y, x2.x, x2.y);

  stroke(30);
  strokeWeight(4);
  point(p1.x, p1.y);
  point(p2.x, p2.y);

  strokeWeight(5);
  fill(225);
  r = 50;
  circle(x1.x, x1.y, r);
  circle(x2.x, x2.y, r);

  stroke(30);
  circle(x1.x, x1.y, r * 0.1);
  circle(x2.x, x2.y, r * 0.1);
}

function dda1(a1, a2, da1, da2) {
  acc =
    (-3 * g * sin(a1) -
      g * sin(a1 - 2 * a2) -
      2 * sin(a1 - a2) * (sq(da2) * l2 + sq(da1) * l1 * cos(a1 - a2))) /
    (l1 * (3 - cos(2 * a1 - 2 * a2)));
  return acc;
}

function dda2(a1, a2, da1, da2) {
  acc =
    (2 *
      sin(a1 - a2) *
      (sq(da1) * l1 * 2 + 2 * g * cos(a1) + sq(da2) * l2 * cos(a1 - a2))) /
    (l2 * (3 - cos(2 * a1 - 2 * a2)));
  return acc;
}

function integrate(a0, dda, dt) {
  let a = a0;

  let k1 = dda(a) * dt;
  let k2 = dda(a + k1 / 2) * dt;
  let k3 = dda(a + k2 / 2) * dt;
  let k4 = dda(a + k3) * dt;
  da = (k1 + 2 * k2 + 2 * k3 + k4) / 6;

  return da;
}
