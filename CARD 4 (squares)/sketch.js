function setup() {
  size = min(windowWidth, windowHeight)
  aspect = 495/395  
  createCanvas(size, size*aspect);

  nOffset = random(0, 1000000)
  step = 0;
  margin = 0.2
}

function draw() {  
  step+=0.002;

  colorMode(HSB, 1, 1, 1);
  let green = color(0.29, 1, 0.4)
  let red = color(0.98, 1, 0.8);
  let blue = color(0.7, 1, 0.55);
  col1 = red
  col2 = blue
  background(col1);
  stroke(col1);
  strokeWeight(3);
  strokeJoin('round')
  fill(col2)

  
  sideLength = 40;
  division = 10;
  
  numOfColumns = 10;
  numOfLines = numOfColumns*aspect;
  angle = step;
  for(let i = 0; i < numOfColumns; i++){
    for(let j = 0; j < numOfLines; j++){
      // posX = i * 40 + sideLength + 50;
      // posY = j * 40 + sideLength + 50;
      
      // posX = i * (width/(division-1);
      // posY = j * (height/(division-1));
      
      posX = lerp(width*margin, width*(1 - margin), i/(numOfColumns - 1) );
      posY = lerp(height*margin, height*(1 - margin), j/(numOfLines - 1) );
      a = atan2(mouseY - height/2,mouseX - width/2);
      

      SquishyQuad(posX, posY, sideLength, cos(a + i/(4*Math.PI)), sin(a + j/(4*Math.PI)));
      

      
    }
  }
  
}

function SquishyQuad(x, y, sideLength, a, b){
  centerX = x;
  centerY = y;

  
  quad(centerX - sideLength*a, centerY - sideLength*a,
       centerX + sideLength*b, centerY - sideLength*b,
       centerX + sideLength*a, centerY + sideLength*a,
       centerX - sideLength*b, centerY + sideLength*b)
}