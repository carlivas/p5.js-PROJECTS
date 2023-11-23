function make2Darray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

let angle = 0;
let w;
let cols;
let rows;
let curves;

let scaling = 0.8;

function setup() {
  createCanvas(700, 700);
  w = width / 8;
  cols = floor(width / w) - 1;
  rows = floor(height / w) - 1;
  curves = make2Darray(cols, rows);

  for (let i; i < cols; i++) {
    for (let j; j < rows; j++) {
      curves[i][j] = new Curve();
    }
  }
}

let stepSize = 0.005;

function draw() {
  let d = w * scaling;
  let r = d / 2;

  angle += stepSize;
  background(30);

  stroke(225);
  noFill();

  for (let i = 0; i < cols; i++) {
    let cx = i * w + (w * 3) / 2;
    let cy = w / 2;

    strokeWeight(2);
    ellipse(cx, cy, d, d);

    let frequency = i + 1;
    let x = r * cos(frequency * angle - HALF_PI);
    let y = r * sin(frequency * angle - HALF_PI);

    stroke(225, 50);
    line(cx + x, 0, cx + x, height);

    stroke(225);
    strokeWeight(10);
    point(x + cx, y + cy);

    for (let j = 0; j < rows; j++) {
      //curves[i][j].setX(cx + x);
    }
  }

  for (let j = 0; j < rows; j++) {
    let cx = w / 2;
    let cy = j * w + (w * 3) / 2;

    strokeWeight(2);
    ellipse(cx, cy, d, d);

    let frequency = j + 1;
    let x = r * cos(frequency * angle);
    let y = r * sin(frequency * angle);

    stroke(225, 50);
    line(0, cy + y, width, cy + y);

    stroke(225);
    strokeWeight(10);
    point(x + cx, y + cy);

    for (let i = 0; i < cols; i++) {
      //curves[i][j].setY(cy + y);
      //print(curves[i][j])
    }
  }
}

