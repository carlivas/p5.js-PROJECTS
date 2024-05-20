function setup() {
  createCanvas(3950/2, 4950/2);
  
  t = 0;
}

function draw() {
  t++
  background(30);
  
  numOfPoints0 = 200;
  amplitude0 = height/50;
  speed0 = -0.03;
  // speed0 = 0;
  phase0 = Math.PI + t*speed0;
  pointSize0 = 100;
  frequency0 = 5 * Math.PI;
  
  numOfPoints = numOfPoints0;
  amplitude = amplitude0;
  speed = speed0;
  phase = phase0
  pointSize = pointSize0;
  frequency = frequency0;
  
  translate(0, height - amplitude0 - pointSize0/2 - 10);
  stroke(225)
  numOfLines = 10
  for(let i = 0; i < 15; i++){
    amt = i/(numOfLines - 1);    
    numOfPoints = numOfPoints0;
    amplitude = amplitude0 * lerp (1, 0, 1 - amt);
    speed = speed0 * lerp(1, 2, amt)
    // phase = Math.PI * (i%2 + 1) + t*speed;
    phase = Math.PI * (i%2 + 1) + t*speed;
    pointSize = pointSize0 * lerp(1,2, 1 - amt);
    frequency = frequency0;
    
    strokeWeight(pointSize);
    WavySine(numOfPoints, amplitude, phase, frequency);
    translate(0, -(amplitude*2 + pointSize*1.2));
  }
}

function WavySine(numOfPoints, amplitude, phase, frequency){
    for(let i = 0; i < numOfPoints ; i++){
    x = i*(width)/numOfPoints;
    y = amplitude * sin(i*frequency/numOfPoints + phase)
    point(x, y)
  }
}