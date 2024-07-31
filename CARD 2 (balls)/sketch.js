function setup() {
  size = min(windowWidth, windowHeight)
  aspect = 48 / 38
  createCanvas(size, size * aspect);
  margin = 0.15;
  numOfColumns = 50;
  numOfLines = numOfColumns * height / width;

  xOffset = 0;
  yOffset = 0;
  scaling = (size - 4*margin) / numOfColumns;
  // scaling = 50;
  nscale = 0.01;
  nscale_x = nscale;
  nscale_y = nscale;
}

function draw() {
  colorMode(HSB, 1, 1, 1);
  let green = color(0.29, 1, 0.4)
  let red = color(0.98, 1, 0.8);
  let blue = color(0.7, 1, 0.55);
  col1 = red
  col2 = green
  col3 = blue
  background(col1);

  a = noise(frameCount / 500) * 2 * PI

  speed = 1 / 20000;

  for (let i = 0; i <= numOfColumns; i++) {
    for (let j = 0; j <= numOfLines; j++) {
      posX = lerp(width * margin, width * (1 - margin), i / numOfColumns);
      posY = lerp(height * margin, height * (1 - margin), j / numOfLines);

      if (i == numOfColumns - 1) {
        console.log(posX, width * (1 - margin))
      }

      nosiePos = move(xOffset, yOffset, speed);
      xOffset = pos.x;
      yOffset = pos.y;

      n = noise(i * nscale_x + xOffset, j * nscale_y + yOffset)

      radius = scaling * pow(n + 0.1, 3);
      stroke(col2);
      strokeWeight(3)
      fill(col2)
      circle(posX, posY, radius)
    }
  }

  function move(x, y, moveSpeed) {
    if (keyIsDown(87)) { // W key
      y -= moveSpeed;
    }
    if (keyIsDown(83)) { // S key
      y += moveSpeed;
    }
    if (keyIsDown(65)) { // A key
      x -= moveSpeed;
    }
    if (keyIsDown(68)) { // D key
      x += moveSpeed;
    }
    pos = createVector(x, y)
    return pos
  }
}