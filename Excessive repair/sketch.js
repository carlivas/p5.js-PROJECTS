let r_min;
let r_max;
let num_circles = 50;
let t;
function setup() {
  createCanvas(windowWidth, windowHeight);

  r_min = min(width, height) * 0.01;
  r_max = min(width, height);
  t = 0;
}

function draw() {
  translate(width / 2, height / 2);
  background(30);

  noFill();
  strokeWeight(2);
  for (let i = 0; i < num_circles; i++) {
    r = lerp(r_max, r_min, i / num_circles);
    dr = (r_max - r_min) / num_circles;
    c = createVector(
      cos(noise((i/num_circles * t)) * TWO_PI),
      sin(-noise((i/num_circles * t)) * TWO_PI)
    );
    c.mult((-i * dr) / 20);
    a = lerp(0, 255, i / num_circles);
    stroke(255, a);
    //if (i + 1 == num_circles)
      fill(30,a)
    circle(c.x, c.y, r);
    t += 0.00003;
  }
}
