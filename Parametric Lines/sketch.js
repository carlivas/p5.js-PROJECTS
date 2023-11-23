let t = 0;
let numOfLines = 20;

function setup() {
  createCanvas(700, 700);
  background(30);
}

function draw() {
  background(30);
  translate(width / 2, height / 2);

  for (i = 0; i < numOfLines; i++) {
    strokeWeight(5);

    a = t + i * 1.5;
    stroke(lerp(40, 255, pow(i / numOfLines, 0.7)));
    line(x1(a), y1(a), x2(a), y2(a));

    strokeWeight(8);
    point(x1(a), y1(a));
    point(x2(a), y2(a));
  }
  t += 0.2;
}

function x1(t) {
  return sin(t / 16) * 200 + cos(t / 12) * 50;
}

function y1(t) {
  return sin(t / 14 + 2) * 200;
}

function x2(t) {
  return sq(cos(t / 14)) * 200;
}

function y2(t) {
  return sin(t / 16 + 1) * 200;
}
