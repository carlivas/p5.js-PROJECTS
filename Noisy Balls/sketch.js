function setup() {
  createCanvas(600, 700);
  margin = 0.15;
  numOfColumns = 17;
  numOfLines = 14;

  xOffset = 0;
  yOffset = 0;
  scaling = 30;
  radius = scaling;
  speed = 2 / 100000;
}

function draw() {
  backgroundColor = color(30);
  background(backgroundColor);

  a = noise(frameCount / 500) * 2 * PI;
  strokeWeight(2);
  stroke(225);
  noFill();
  circle(
    width / 2,
    (height * margin) / 2,
    scaling * lerp(0, 1, a / (2 * PI))
  );

  stroke(30);
  strokeWeight(10);
  line(
    width / 2,
    (height * margin) / 2,
    width / 2 + (scaling / 2) * cos(a),
    (height * margin) / 2 + (scaling / 2) * sin(a)
  );

  stroke(225);
  strokeWeight(3);
  line(
    width / 2,
    (height * margin) / 2,
    width / 2 + (scaling / 2) * cos(a),
    (height * margin) / 2 + (scaling / 2) * sin(a)
  );

  for (let i = 0; i < numOfColumns; i++) {
    for (let j = 0; j < numOfLines; j++) {
      posX =
        lerp(width * margin, width * (1 - margin), i / numOfColumns) +
        width / numOfColumns / 2;
      posY =
        lerp(height * margin, height * (1 - margin), j / numOfLines) +
        height / numOfLines / 2;

      xOffset += speed * cos(a);
      yOffset += speed * sin(a);
      //strokeWeight(scaling*noise(i*xOffset, j*yOffset));
      //stroke(225);
      //point(posX, posY)

      radius = scaling * noise(i / 8 + xOffset, j / 8 + yOffset);
      stroke(backgroundColor);
      strokeWeight(3);
      fill(225);
      circle(posX, posY, radius);
    }
  }
}
