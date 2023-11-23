let colors = ["#6BD425", "#BA274A", "#1C0118"];
let density = 30;
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  translate(width / 2, height / 2);
  scale(1, -1);
  background(colors[2]);
  noStroke();
  for (var i = 0; i < width / density; i++) {
    for (var j = 0; j < height / density; j++) {
      x = lerp(-width / 3, width / 3, (i * density) / width);
      y = lerp(-height / 3, height / 3, (j * density) / height);

      field2 = f2(x, y);
      field2.normalize();
      field2.mult(13);

      colorMode(HSB);
      let ang = atan2(field2.x, field2.y);
      let c = colors[i % 2];
      stroke(c);
      strokeWeight(4);
      line(x, y, x + field2.x, y + field2.y);
    }
  }
}

function f1(x, y) {
  x1 = 0;
  y1 = 0;
  a1 = createVector(x1 - x, y1 - y, 0);
  b1 = createVector(0, 0, 1);
  c1 = crossProduct(a1, b1);
  return c1;
}

function f2(x, y) {
  let p = createVector(x, y);
  
  let r_1_vec = createVector(sin(frameCount/100)*100, cos(frameCount/100)*100)
  let r_1_hat = p5.Vector.sub(r_1_vec, p);
  let r_1 = p5.Vector.dist(p, r_1_vec);

  let r_2_vec = createVector(-cos(frameCount/100)*80, sin(frameCount/100)*100)
  let r_2_hat = p5.Vector.sub(r_2_vec, p);
  let r_2 = p5.Vector.dist(p, r_2_vec);
  
  let k = 1;
  let q_1 = -1;
  let q_2 = -1;
  let E = createVector(0, 0);
  if (r_1 > 0.1 && r_2 > 0.1) {
    E_1 = p5.Vector.mult(r_1_hat, (k * q_1) / sq(r_1));
    E_2 = p5.Vector.mult(r_2_hat, (k * q_2) / sq(r_2));
  }

  E = p5.Vector.add(E_1, E_2)
  
  return E;
}

function crossProduct(a, b) {
  return createVector(
    a.y * b.z - a.x * b.y,
    a.z * b.x - a.x * b.z,
    a.x * b.y - a.y * b.x
  );
}
