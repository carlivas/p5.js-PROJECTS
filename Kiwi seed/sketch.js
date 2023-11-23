let numOfLines = 38;
let detail = 100;
let margin = 0.1;
let w;
let h;
let t = 0;

function setup() {
  createCanvas(650, 500);
  background(30);
  w = 200;
  h = 200;

  let noise1;
}

function draw() {
  background(30);
  translate(width / 2, height / 2);

  noise1 = noise(t / 10);
  noise2 = noise1 * 2 - 1;
  rotate((sq(noise2) * PI) / 10);

  stroke(225);
  strokeWeight(4);
  noFill();
  for (let i = 0; i <= numOfLines; i++) {
    let yOffset = lerp(-h, +h, (i + 1) / numOfLines);
    if (i == 0) {
      point(0, -h);
    }
    if (numOfLines - i == 0) {
      point(0, h);
    } else {
      beginShape();
      for (let u = 0; u < detail; u++) {
        let xNormalDist = exp(-pow(x(u) / 200, 2));
        let yNormalDist = exp(-pow(yOffset / 100, 2));
        let a = 50 * noise2;
        let f = 5 * noise1;
        let p = t + (sin(t) * i) * noise1;

        //curveVertex(x(u), y(u, a, f, p) + yOffset);
        curveVertex(
          xDiamond(u, i + 1, numOfLines),
          y(u, a, f, p) * xNormalDist * yNormalDist + yOffset
        );
      }
      endShape();
    }
  }
  t += 0.01;
}

function x(u) {
  return lerp(-w, w, u / detail);
}

function y(u, a, f, p = 0) {
  return a * sin(u / f + p) + noise1;
}

function xDiamond(u, i, numOfLines) {
  s = diamond(i, numOfLines);
  return lerp(-w * s, w * s, u/detail);
}

function diamond(i, numOfLines) {
  let s;
  if (i <= numOfLines / 2) s = i;
  if (i > numOfLines / 2) s = numOfLines - i;
  s *= 2 / numOfLines;
  return s;
}
