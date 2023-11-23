let detail = 2000;
let arr1 = [];
let arr2 = [];
let arrS = [];

let sliderFreq1;
let sliderFreq2;
let sliderPhase1;
let sliderPhase2;
let step;
let stepSize;

function setup() {
  createCanvas(900, 700);

  sliderFreq1 = createSlider(0, 120, 91*0.5, 0.01);
  sliderFreq1.size(300);
  sliderFreq2 = createSlider(0, 120, 120*0.5, 0.01);
  sliderFreq2.size(300);
  sliderPhase1 = createSlider(0, 20, 10, 0.1);
  sliderPhase1.size(300);

  step = 0;
  stepSize = 0.01;
}

function draw() {
  translate(width / 2, height / 2);
  scale(1, -1);
  background(30);

  freq1 = lerp(
    sliderFreq1.value(),
    sliderFreq1.value() - 10,
    cos(frameCount / 500)
  );
  freq2 = sliderFreq2.value();
  phase1 = sliderPhase1.value();

  for (var i = 0; i < detail; i++) {
    xVal = lerp(-0.6, 0.6, i / (detail - 1));
   
    func1 = 0.5 * cos((xVal + 0.5) * 2 * PI * freq1 + phase1);
    func2 = 0.5 * cos((xVal + 0.5) * 2 * PI * freq2);
    funcS = 4 * (func1 + func2);

    let normalDist = exp(-pow(xVal*3.5, 4));
    yVal1 = func1 * normalDist;
    yVal2 = func2 * normalDist;
    yValS = funcS * normalDist;

    posX = xVal * width;
    posY1 = yVal1 * height * 0.05;
    posY2 = yVal2 * height * 0.05;
    posYS = yValS * height * 0.05;

    arr1[i] = createVector(posX, posY1);
    arr2[i] = createVector(posX, posY2);
    arrS[i] = createVector(posX, posYS);
  }
  noFill();

  stroke(225);

  strokeWeight(2);
  drawShape(arr1, 0, -325);
  drawShape(arr2, 0, -275);

  strokeWeight(4);
  drawShape(arrS, 0, 50);

  step += stepSize;
}

function drawShape(arr, xOffset = 0, yOffset = 0) {
  
  beginShape();
  for (var i in arr) {
      let x = arr[i].x
      let y = arr[i].y
    curveVertex(x + xOffset, y + yOffset);
  }
  endShape();
}
