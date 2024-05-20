function setup() {
  createCanvas(700, 700);
  step = 0;
  margin = 0.2
  
  backgroundColor = color(30)
  stroke(backgroundColor);
  strokeWeight(3);
  strokeJoin('round')
  fill('white')
  fill(225)
}

function draw() {  
  step+=0.002;
  background(backgroundColor);
  
  sideLength = 40;
  division = 10;
  
  numOfColumns = 10;
  numOfLines = 10;
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
      

      SquishyQuad(posX, posY, sideLength, cos(angle + i/(4*Math.PI)), sin(angle + j/(4*Math.PI)));
      

      
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