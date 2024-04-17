let margin = 0.15;
function setup() {
  size = min(windowWidth, windowHeight)
  createCanvas(size, size);
}

let t = 0;
function draw() {
  background(30);
  let numRows = 30;
  let numCols = 30;
  let nscale = 0.01
  let r = width / numCols / 3 * (1 - 2 * margin)
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      x = lerp(width * margin, width * (1 - margin), i / (numRows - 1))
      y = lerp(height * margin, height * (1 - margin), j / (numCols - 1))

      n = noise(x * nscale + t, y * nscale + t)
      c = lerp(30, 255, n)
      w = lerp(1 / 2, 1, n ** 2) * r * 0.8
      a = lerp(0, TWO_PI, n)
      stroke(c)
      strokeWeight(w)
      // point(x, y)
      x_1 = x - cos(a) * r
      y_1 = y - sin(a) * r
      x_2 = x + cos(a) * r
      y_2 = y + sin(a) * r
      line(x_1, y_1, x_2, y_2)
    }
  }
  t += 0.002
}

