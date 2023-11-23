function setup() {
  createCanvas(windowWidth, windowHeight);
  step = 0;
  margin = 0.15
  
  numOfColumns = 30
  numOfLines = 30
  
  scaling = 40
  
  noiseDetail(2, 1)
}

function draw() {
  step+=0.001;
  background(30);
  

  for(let i = 0; i < numOfColumns; i++){
    for(let j = 0; j < numOfLines; j++){
      posX = lerp(width *margin, width *(1 - margin), i/(numOfColumns - 1))
      posY = lerp(height*margin, height*(1 - margin), j/(numOfLines - 1))
      // turnDegree = lerp(0.25, 2*PI - 0.01, sq(sin(step - 1.5*(i+j)/( (numOfColumns - 1) + (numOfLines - 1) ) ) ) );
      turnDegree = lerp(0.25, 2*PI - 0.01, noise(step - (i+j)/( (numOfColumns - 1) + (numOfLines - 1) ) ) )
      radius = scaling*lerp(3/4, 1, turnDegree/(2*PI)) 
      
      fill(225)
      stroke(30)
      strokeWeight(3/40*scaling)
      strokeJoin(ROUND)
      fac = (width - posX)/width*(height - posY)/height
      arc(posX, posY, radius, radius, turnDegree/3 + 2*PI*noise(-step*fac), turnDegree + 2*PI*noise(step*fac), PIE);
    }
  }
}
