function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
}

function draw() {
  translate(width / 2, height / 2);
  background(30);
  noStroke();
  fill(225);

  branch(100);
}

function branch(r) {
  if (r > 1) {
    circle(0, 0, r);
    translate(0, -r);
    rotate(PI/8);
    branch(r * 0.97);
  }
}
