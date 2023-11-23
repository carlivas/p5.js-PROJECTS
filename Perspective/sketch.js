num_lines = 50;
let slidx;
let slidy;
function setup() {
  createCanvas(windowWidth, windowHeight * 0.95);

  slidx = createSlider(0, width, width / 2);
  slidy = createSlider(0, height, (2 * height) / 3);
}

function draw() {
  background(50);

  w = width;
  h = height;
  m = 0.1;

  endPoint = createVector(slidx.value(), height - slidy.value());
  drawPerspectiveGrid(endPoint);

  stroke("red");
  strokeWeight(2);
  point(endPoint);
}

function drawPerspectiveGrid(endPoint) {
  for (i = 0; i < num_lines; i++) {
    for (j = 0; j < num_lines; j++) {
      ind = i / (num_lines - 1);
      jnd = j / (num_lines - 1);

      xmin = lerp(w * m, endPoint.x, jnd);
      xmax = lerp(w*(1-m), endPoint.x, jnd);

      ymin = h * (1 - m);
      ymax = endPoint.y;

      x = lerp(xmin, xmax, ind);
      y = lerp(ymin, ymax, jnd);

      a = lerp(255, 20, jnd)
      stroke(225, a);
      size = lerp(10, 3, jnd);
      strokeWeight(size);
      point(x, y);
    }
  }
}
