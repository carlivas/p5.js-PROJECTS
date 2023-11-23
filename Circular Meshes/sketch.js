let t = 0;
function setup() {
  createCanvas(700, 700);
}

function draw() {
  background(30);
  translate(width / 2, height / 2);
  scale(1, -1);
  stroke(225);
  strokeWeight(1);

  GenerateCircularMesh(275, PI / 100);
  rotate(t);
  GenerateCircularMesh(300, PI / 100);

  t += 0.01;
}

function GenerateCircularMesh(r, gridsize) {
  for (i = 0; i < 2 * PI; i += gridsize) {
    x_val = r * cos(i);
    y_val = r * sin(i);

    //ROWS
    line(-x_val, y_val, x_val, y_val);
    //COlS
    line(x_val, -y_val, x_val, y_val);
  }
}

function GenerateMesh(x, y, w, h, cols, rows) {
  for (let i = 1; i < cols; i++) {
    line(
      lerp(x - w / 2, x + w / 2, i / cols),
      y - h / 2,
      lerp(x - w / 2, x + w / 2, i / cols),
      y + h / 2
    );
  }
  for (let j = 1; j < rows; j++) {
    line(
      x - w / 2,
      lerp(y - h / 2, y + h / 2, j / rows),
      x + w / 2,
      lerp(y - h / 2, y + h / 2, j / rows)
    );
  }
}
