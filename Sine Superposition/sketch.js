let detail = 2000;
let arr1 = [];
let arr2 = [];
let arr3 = [];
let arrS = [];

var wave1;
var wave2;
var wave3;
var waves = [];

let button;
let playing = false;

function setup() {
  createCanvas(700, 700);
  frameRate(120)
  step = 0;
  speed = 0.001;

  button = createButton('mute/unmute');
  button.mousePressed(toggle)

  waves = [wave1, wave2, wave3]
  for (var i = 0; i < waves.length; i++) {
    waves[i] = new p5.Oscillator();
    waves[i].setType('sine'); // Set the type of the oscillator
  }
}

function draw() {
  background(30);

  step += speed
  φ1 = lerp(10, 37, sin(step / 11))
  φ2 = lerp(-7, -27, sin(step / 13))
  φ3 = lerp(9, 51, sin(step / 17))
  // φ1 = lerp(0, 10,  sin(step*3));
  // φ2 = lerp(0, 100,  sin(step*2));
  // φ3 = lerp(0, 400, sin(step*1));

  phass = [φ1, φ2, φ3]

  f1 = 150
  f2 = 100
  f3 = 50

  freqs = [f1, f2, f3]


  drawWaves();
}

function toggle() {
  if (!playing) {
    playing = true;
    for (var i = 0; i < waves.length; i++) {
      waves[i].start();
      waves[i].amp(0.1, 0.1);
      waves[i].freq(freqs[i]);
      waves[i].phase(phass[i]);
    }
  } else {
    playing = false;
    for (var i = 0; i < waves.length; i++) {
      waves[i].amp(0, 0.1);
      waves[i].stop(1.1);
    }
  }
}


function drawShape(arr, xOffset = 0, yOffset = 0) {
  beginShape();
  for (var i in arr) {
    curveVertex(arr[i].x + xOffset, arr[i].y + yOffset)
  }
  endShape();
}


function drawWaves() {
  translate(width / 2, height / 2);
  scale(1, -1);
  for (var i = 0; i < detail; i++) {

    xVal = lerp(-0.6, 0.6, i / (detail - 1));

    normalDist = exp(- pow(xVal / 0.2, 2));

    func1 = cos((xVal + 0.5) * 2 * PI * φ1 + step * f1) * normalDist;
    func2 = cos((xVal + 0.5) * 2 * PI * φ2 + step * f2) * normalDist;
    func3 = cos((xVal + 0.5) * 2 * PI * φ3 + step * f3) * normalDist;
    funcS = 1.5 * (func1 + func2 + func3);

    yVal1 = func1;
    yVal2 = func2;
    yVal3 = func3;
    yValS = funcS

    posX = xVal * width;
    posY1 = yVal1 * height * 0.05;
    posY2 = yVal2 * height * 0.05;
    posY3 = yVal3 * height * 0.05;
    posYS = yValS * height * 0.05;

    arr1[i] = createVector(posX, posY1);
    arr2[i] = createVector(posX, posY2);
    arr3[i] = createVector(posX, posY3);
    arrS[i] = createVector(posX, posYS);

  }
  noFill();

  stroke(0, 225, 0);
  strokeWeight(2);
  drawShape(arr3, 0, 300);

  stroke(0, 0, 225)
  strokeWeight(2);
  drawShape(arr2, 0, 175);

  stroke(225, 0, 0);
  strokeWeight(2);
  drawShape(arr1, 0, 50);

  strokeWeight(2);
  stroke(225)
  drawShape(arrS, 0, -150);
}