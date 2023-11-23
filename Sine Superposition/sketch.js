let detail = 2000;
let arr1 = [];
let arr2 = [];
let arr3 = [];
let arrS = [];



function setup() {
  createCanvas(700, 700);
  frameRate(24)
  step = 0;
  speed = 0.001;
}

function draw() {
  translate(width/2, height/2);
  scale(1, -1)
  background(30);
  
  step += speed
  // f1 = lerp(10, 37, sin(step/11))
  // f2 = lerp(-7, -27, sin(step/13))
  // f3 = lerp(9, 51, sin(step/17))
  
  f1 = lerp(0, 10,  sin(step*3));
  f2 = lerp(0, 100,  sin(step*2));
  f3 = lerp(0, 400, sin(step*1));
  
  for (var i = 0; i < detail; i ++){
    
    xVal = lerp(-0.6, 0.6, i/(detail-1));
    
    normalDist = exp(- pow(xVal/0.2, 2));

    func1 = cos((xVal + 0.5)*2*PI * f1 + step*150) * normalDist;
    func2 = cos((xVal + 0.5)*2*PI * f2 + step*100) * normalDist;
    func3 = cos((xVal + 0.5)*2*PI * f3 + step*50) * normalDist;
    funcS = 1.5*(func1 + func2 + func3);
    
    yVal1 = func1;
    yVal2 = func2;
    yVal3 = func3;
    yValS = funcS

    posX = xVal * width;
    posY1 = yVal1 * height*0.05;
    posY2 = yVal2 * height*0.05;
    posY3 = yVal3 * height*0.05;
    posYS = yValS * height*0.05;
    
    arr1[i] = createVector(posX, posY1);
    arr2[i] = createVector(posX, posY2);
    arr3[i] = createVector(posX, posY3);
    arrS[i] = createVector(posX, posYS);
    
  }
  noFill();

  stroke(0,225,0);
  strokeWeight(2);
  drawShape(arr3, 0, 300);
  
  stroke(0,0,225)
  strokeWeight(2);
  drawShape(arr2, 0, 175);
  
  stroke(225,0,0);
  strokeWeight(2);
  drawShape(arr1, 0, 50);
  
  strokeWeight(2);
  stroke(225)
  drawShape(arrS, 0, -150);
}

function drawShape(arr, xOffset = 0, yOffset = 0) {
    beginShape();
  for(var i in arr){
    curveVertex(arr[i].x + xOffset, arr[i].y + yOffset)
  }
  endShape();
}