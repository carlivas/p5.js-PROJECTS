let pallette1 = ["#FFF4E0", "#FFBF9B", "#898121", "#4D4D4D"];
let pallette2 = ["#2C3333", "#2E4F4F", "#0E8388", "#CBE4DE"];
let pallette3 = ["#F7F1E5", "#E7B10A", "#898121", "#4C4B16"];

let num_hex = 10;
let u0 = 0;
let r0 = 350;
function setup() {
  createCanvas(windowWidth, windowHeight);

  //pallette = pallette2;

  u = u0;
  //u = random((PI / 3) * 0.1, (PI / 3) * 0.9);
  r = r0;
}

function draw() {
  translate(width / 2, height / 2);
  background(30);

  phi = PI / 6 - u;
  for (i = 0; i < num_hex; i++) {
    f = pow(cos(PI / 6) / cos(phi), i);
    r = r0 * f;
    
    t = i/(num_hex - 1)
    ind = t;
    // stroke(lerp(225, 30, ind));
    // fill(lerp(225, 30, ind));
    // strokeWeight(3 * sqrt(f));

    fill(30)
    stroke(225)
    strokeWeight(5)
    hexagon(0, 0, r);
    rotate(u);
  }

  speed = 0.0005;
  u += speed;
  if (u > PI / 3) u = 0;
}

function hexagon(transX, transY, r) {
  push();
  translate(transX, transY);
  beginShape();
  vertex((-1 / 2) * r, (-13 / 15) * r);
  vertex((1 / 2) * r, (-13 / 15) * r);
  vertex(1 * r, 0 * r);
  vertex((1 / 2) * r, (13 / 15) * r);
  vertex((-1 / 2) * r, (13 / 15) * r);
  vertex(-1 * r, 0 * r);
  endShape(CLOSE);
  pop();
}
