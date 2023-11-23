function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  translate(width / 2, height / 2);
  background(30);

  for (i = 0; i < TWO_PI; i += PI / 50) {
    c1 = color(30);
    c2 = color(225);
    c = lerpColor(c2, c1, i / TWO_PI);

    noFill();
    stroke(c);

    let A = 200;
    circle(A * cos(i), A * sin(i), 300);
  }
}
