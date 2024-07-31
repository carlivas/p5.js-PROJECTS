let r_min;
let r_max;
let num_circles = 150;
let t;
function setup() {
  size = min(windowWidth, windowHeight)
  createCanvas(size, size);

  r_min = 0.5;
  r_max = size * 0.9;
  t = 0;
}

function draw() {
  translate(width / 2, height / 2);
  background(30);

  noFill();
  strokeWeight(2);
  for (let i = 0; i < num_circles; i++) {
    r = lerp(r_max, r_min, pow(i / num_circles, 1 / 2));
    dr = (r_max - r_min) / num_circles;
    c = createVector(
      cos(noise((i / num_circles + t)) * TWO_PI),
      sin(-noise((i / num_circles + t)) * TWO_PI)
    );
    c.mult((-(i + 1) * dr) / 10);
    a = lerp(0, 255, i / num_circles);
    stroke(255, a);
    fill(30, a)
    circle(c.x, c.y, r);
    if (i == num_circles - 1) {
      fill(255)
      circle(c.x, c.y, r);
      fill(30)
      ellipse(c.x, c.y, r/2, 5*r/6);
    }
    t += 0.00004;
  }
}
