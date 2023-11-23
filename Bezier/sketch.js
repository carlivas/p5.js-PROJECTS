let p0, p1, p2, p3;
let B1, B2, B;
let m;

let t;
let delta;

function setup() {
  createCanvas(700, 700);

  m = 1.2;
  p0 = createVector(100, 350);
  p1 = createVector(600, 350);
  p2 = createVector(600, 350);
  p3 = createVector(500, 125);

  B1 = createVector(0, 0);
  B2 = createVector(0, 0);
  B = createVector(0, 0);

}

function draw() {
  background(30);
  stroke(225);
  strokeWeight(2);
  noFill();

  p1.x = mouseX;
  p1.y = mouseY;

  delta = 0.1;
  
  beginShape();
  for (var t = -0.1; t < 1.1; t+=delta) {
    B1 = Bezier(p0, p1, p2, t);
    B2 = Bezier(p1, p2, p3, t);
    
    B.x = lerp(B1.x, B2.x, t);
    B.y = lerp(B1.y, B2.y, t);
    

    curveVertex(B.x, B.y);
  }
  endShape();
  
  stroke('red');
  strokeWeight(10);
  point(p0.x, p0.y);
  point(p1.x, p1.y);
  point(p2.x, p2.y);
  point(p3.x, p3.y);
}

function Bezier(p0, p1, p2, t) {
    let x1 = p0.x + (p1.x - p0.x) * t;
    let y1 = p0.y + (p1.y - p0.y) * t;

    let x2 = p1.x + (p2.x - p1.x) * t;
    let y2 = p1.y + (p2.y - p1.y) * t;

    Bx = x1 + (x2 - x1) * t;
    By = y1 + (y2 - y1) * t;

  return createVector(Bx, By);
}
