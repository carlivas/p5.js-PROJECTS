let sliderK;
let sliderTurnLength;

function setup() {
  createCanvas(900, 700);
  radius = 300;

  sliderK = createSlider(0, 2, 1, 0.05);
  sliderK.size(200);
  
  sliderTurnLength = createSlider(0, 5*PI, PI/4);
  sliderTurnLength.size(200);

  turnLength = 10 * PI;
  numOfPoints = 1000;
}

function draw() {
  translate(width / 2, height / 2);
  scale(1, -1);
  background(30);
  noFill();

  let k = sliderK.value();
  let turnLength = sliderTurnLength.value();

  let arr = GenerateFlower(k, turnLength, numOfPoints);

  stroke(225);
  strokeWeight(2);
  drawShape(arr);
}

function GenerateFlower(k, turnLength, numOfPoints = 100) {
  let arr = [];
  for (var i = 0; i < numOfPoints; i++) {
    theta = (i / numOfPoints) * turnLength;
    r = sin(k * theta);

    posX = radius * r * cos(theta);
    posY = radius * r * sin(theta);

    arr[i] = createVector(posX, posY);
  }
  return arr;
}

function drawShape(arr, xOffset = 0, yOffset = 0) {
  beginShape();
  curveVertex(0, 0);
  for (var i in arr) {
    curveVertex(arr[i].x + xOffset, arr[i].y + yOffset);
  }
  endShape();
}
