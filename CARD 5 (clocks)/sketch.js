function setup() {
  size = min(windowWidth, windowHeight)
  createCanvas(size, size);
  step = 0;
  margin = 0.15

  numOfColumns = 20;
  numOfLines = numOfColumns * height / width;

  scaling = size * (1 - margin) / numOfColumns;

  noiseDetail(2, 1)
}

function draw() {
  step += 0.002;
  background(30);
  translate(width/2, height/2)
  rotate(PI)
  translate(-width/2, -height/2)


  for (let i = 0; i < numOfColumns; i++) {
    for (let j = 0; j < numOfLines; j++) {
      posX = lerp(width * margin, width * (1 - margin), i / (numOfColumns - 1))
      posY = lerp(height * margin, height * (1 - margin), j / (numOfLines - 1))

      px = lerp(1.5, 2.5, noise(step))
      py = constrain(px + sin(step/20), 1.5, 2.5)
      // n = noise(step - (i + j) / ((numOfColumns - 1) + (numOfLines - 1)) )
      n = noise(step - (i**px + j**py) / ((numOfColumns - 1)**px + (numOfLines - 1)**py) )
      turnDegree = lerp(0.1, 2* PI, n)
      radius = scaling * lerp(3 / 4, 1, turnDegree / (2 * PI))

      fill(225)
      stroke(30)
      strokeWeight(3 / 40 * scaling)
      strokeJoin(ROUND)
      fac = (width - posX)/width*(height - posY)/height
      arc(posX, posY, radius, radius, turnDegree/3 + 2*PI*n**2, turnDegree + 2*PI*n**2, PIE);
    }
  }
}
