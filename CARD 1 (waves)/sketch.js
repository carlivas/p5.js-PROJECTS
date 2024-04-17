function setup() {
  createCanvas(windowWidth, windowHeight);
  scale(1, 1);
  margin = 0.25;

  detail = 50;
  numOfLines = 25;
  scaling = 0.8;
  strokeW = 5

  t = 0;
  speed = 0.0003;
}

function draw() {
  translate(width / 2, height / 2);
  scale(1, -1);
  background(30);

  fill(30);
  stroke(225);
  strokeWeight(strokeW);

  t += speed;
  for (var j = 0; j < numOfLines; j++) {
    yVal = lerp(-0.4, 0.4, 1 - j / numOfLines);

    beginShape();
    for (var i = 0; i < detail; i++) {
      xVal = lerp(-0.4, 0.4, i / detail);
      //curveVertex(xVal, yVal + scaling*noise(xVal/500))

      scalingNoise = noise(t * 5 + 1000) * pow(exp(-t * 3 + 3) + 1, -1);
      scalingNoise = noise(t * 5 + 1000);

      //horizontalOffset = 10*pow(noise(t + 2000)*noise(t + 3000), 2)
      horizontalOffset = sin(t * 10);

      functionNoise = pow(
        noise((xVal / 5 + yVal * horizontalOffset + t) * 5),
        2
      );

      xNormalDist = exp(-pow(xVal / 0.275, 4));

      func = scaling * scalingNoise * functionNoise * xNormalDist;
      func *= exp(-pow((yVal - 0.02) / 0.25, 4));

      posX = xVal * width;
      posY = (yVal + func) * height;
      curveVertex(posX, posY);
    }
    endShape();
  }
}
