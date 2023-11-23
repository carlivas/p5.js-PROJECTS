// Setup the canvas
function setup() {
  createCanvas(300, 500);
  background(255);
}

function draw() {

  rectWidth = 60;
  rectHeight = 60;
  numOfHorizontal = floor(width/rectWidth - 1);
  numOfVertical = floor(height/rectHeight - 1);
  for(let i = 0; i < numOfHorizontal; i++){
    for(let j = 0; j < numOfVertical; j++){
      posX = (rectWidth/2 + 20) + (width - 2*(rectWidth/2 + 20))/(numOfHorizontal - 1) * i - rectWidth/2;
      posY = (rectHeight/2 + 20) + (height - 2*(rectHeight/2 + 20))/(numOfVertical - 1) * j - rectHeight/2;
      
      /*
      strokeWeight(5);
      stroke(220);
      point(width/2, height/2);
      strokeWeight(1);
      */
      /*
      strokeWeight(1);
      stroke('red');
      point(posX, posY);
      */
      
      relX = posX + rectWidth/2 - width/2;
      relY = posY + rectHeight/2 - height/2;
      cosOfStartAngle = relX/mag(relX, relY);
      sinOfStartAngle = relY/mag(relX, relY);
      gradStartAngle = atan2(sinOfStartAngle, cosOfStartAngle);
      
      GradientRect(posX, posY, rectWidth, rectHeight, gradStartAngle);
      /*
      strokeWeight(1);
      stroke('black')
      line(posX, posY, posX + 10*cos(gradStartAngle), posY + 10*sin(gradStartAngle));
      */
    }
  }
  noLoop();
}

function GradientRect(x, y, rectWidth, rectHeight, gradStartAngle){
  
  centerX = x + rectWidth/2;
  centerY = y + rectHeight/2;
  
  // draw the gradient lines
  iterations = 495;
  for(let i = 0; i < iterations; i++){
    angle = -2 * Math.PI/iterations * i + gradStartAngle;
    
    // Determine the length the given line in the gradient as a function of the angle at which it's drawn.
    abs_cos_angle = Math.abs(cos(angle));
    abs_sin_angle = Math.abs(sin(angle));
    if (rectWidth/2*abs_sin_angle <= rectHeight/2*abs_cos_angle){
        magnitude = rectWidth/2/abs_cos_angle;
    } else {
        magnitude = rectHeight/2/abs_sin_angle;
    }
    
    // draw each line constituting the gradient
    gradientCap = 255*1.345;
    if(255 - floor(i * gradientCap/iterations) > 0){
      strokeShade = floor(i * gradientCap/iterations)
    } else {
      strokeShade = 255;
    }
    stroke(strokeShade);
    line(centerX, centerY, centerX + magnitude * Math.cos(angle), centerY + magnitude * Math.sin(angle))
  }
}

function FixCoordinates(){
  translate(0, height);
  scale(1,-1);
}