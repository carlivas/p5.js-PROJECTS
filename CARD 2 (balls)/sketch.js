function setup() {
  size = min(windowWidth, windowHeight)
  createCanvas(size, size);
  margin = 0.15;
  numOfColumns = 25;
  numOfLines = numOfColumns * height / width;

  xOffset = 0;
  yOffset = 0;
  scaling = size / numOfColumns;
  radius = scaling
  speed = 1 / 200000;
}

function draw() {
  backgroundColor = color(30)
  background(backgroundColor);

  a = noise(frameCount / 500) * 2 * PI


  for (let i = 0; i <= numOfColumns; i++) {
    for (let j = 0; j <= numOfLines; j++) {


      posX = lerp(width * margin, width * (1 - margin), i / numOfColumns);
      posY = lerp(height * margin, height * (1 - margin), j / numOfLines);
      if (i == numOfColumns - 1) {
        console.log(posX, width * (1 - margin))
      }

      xOffset += speed * cos(a)
      yOffset += speed * sin(a)

      n = noise(i / 4 + xOffset, j / 4 + yOffset)
      radius = scaling * pow(n, 1.5);
      stroke(backgroundColor);
      strokeWeight(3)
      fill(225)
      circle(posX, posY, radius)
    }
  }
}