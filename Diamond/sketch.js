let numOfLines = 38;
let detail = 2;
let w = 200;
let h = 200;
let t = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  translate(width/2, height/2)
  background(30);

  noise1 = noise(t / 10);
  noise2 = noise1 * 2 - 1;
  rotate(PI/4 + (sq(noise2) * PI) / 10);
  
  stroke(225);
  strokeWeight(4);
  noFill();
  for (let i = 0; i <= numOfLines; i++) {
    let yOffset = lerp(-h, +h, i / numOfLines);
    if (i == 0) {
      point(0, -h);
    }
    if (numOfLines - i == 0) {
      point(0, h);
    } else {
      let xRange = diamond(i,numOfLines)
      beginShape();
      for (let x = -xRange; x <= xRange; x += detail) {
        let xNormalDist = exp(-pow(x / 120, 2));
        let yNormalDist = exp(-pow(yOffset / 100, 2));
        let a = 200 * noise2;
        let f = 0.0001*(-x) / noise1;
        let p = t + (sin(t) * i) * noise1;

        curveVertex(x, y(x, a, f, p) * xNormalDist * yNormalDist + yOffset);
      }
      endShape();
    }
  }
  t += 0.01;
}

function diamond(i, numOfLines) {
  let s;
  if (i <= numOfLines / 2) {
    s = lerp(0, w*0.8, i/(numOfLines/2))
  } else if (i > numOfLines/2){
    s = lerp(w*0.8, 0, (i*2 - numOfLines)/numOfLines)
  }
  return s;
}

function y(u, a, f, p = 0) {
  return a * sin(u * f + p) + noise1;
}