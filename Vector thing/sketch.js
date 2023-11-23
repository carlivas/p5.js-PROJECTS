function setup() {
  createCanvas(windowWidth, windowHeight);
}
let t = 0;
function draw() {
  background(30);
  let numRows = round(width / 25);
  let numCols = round(height / 25);
  let nscale = 0.004
  let r = 8
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      x = lerp(width * 0.1, width * 0.9, i / (numRows - 1))
      y = lerp(height * 0.1, height * 0.9, j / (numCols - 1))

      n = noise(x * nscale + t, y * nscale + t)
      c = lerp(30, 225, n)
      w = lerp(1, 4, n)
      a = lerp(0, TWO_PI, n)
      stroke(c)
      strokeWeight(w)
      // point(x, y)
      x_1 = x - cos(a)*r
      y_1 = y - sin(a)*r
      x_2 = x + cos(a)*r
      y_2 = y + sin(a)*r
      line(x_1, y_1, x_2, y_2)
    }
  }
  t+= 0.001
}

