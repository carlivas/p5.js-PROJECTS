function setup() {
  createCanvas(480, 480);
  step = 0;
}

function draw() {
  step+=0.0;
  background(220);
  

  for(let i = 0; i < 16; i++){
    for(let j = 0; j < 16; j++){
      posX = i*width/18 + 40;
      posY = j*height/18 + 40;
      radius = 12.5;
      if(mouseX > 0 &&
         mouseX < width &&
         mouseY > 0 &&
         mouseY < height){
        turnDegree = atan2(-(mouseY - height/2), -(mouseX - width/2)) - Math.PI;

      } else {
      turnDegree = (i + j)/30 * 2*Math.PI + step;
      }
      iterations = 100;
      SemiFilledCircle(posX, posY, radius, turnDegree, iterations);
    }
  }
}

function SemiFilledCircle(x, y, radius, turnDegree, iterations){
  for(let i = 0; i < iterations; i++){
    pointOnCircleX = x + radius * cos(i * turnDegree/iterations)
    pointOnCircleY = y + radius * sin(i * turnDegree/iterations)
    
    if (turnDegree != 0){
    line(x, y, pointOnCircleX, pointOnCircleY)
    }
  }
}