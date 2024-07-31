let margin = 0.15;
let nOffset
function setup() {
  size = min(windowWidth, windowHeight)
  aspect = 58/48
  createCanvas(size, size*aspect);

  nOffset = random(0, 1000000)
}

let time = 0;
function draw() {
  colorMode(HSB, 1, 1, 1);
  let green = color(0.29, 1, 0.4)
  let red = color(0.98, 1, 0.8);
  let blue = color(0.7, 1, 0.55);

  background(blue)

  let numRows = 17;
  let numCols = numRows*aspect;
  let nscale = 0.002;
  
  let r = width / numCols / 3 * (1 - 2 * margin)
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      x = lerp(width * margin, width * (1 - margin), i / (numRows - 1))
      y = lerp(height * margin, height * (1 - margin), j / (numCols - 1))

      // n = noise(x * nscale + time, y * nscale + time)
      n = noise(x * nscale + nOffset, y * nscale + nOffset)
      col = lerpColor(blue, red, n**(4*n))
      w = lerp(0.2, 1, n ** 2) * r
      a = lerp(0, TWO_PI, n**2)
      stroke(col)
      strokeWeight(w)
      // point(x, y)
      scale = 1.5
      x_1 = x - cos(a) * r * scale
      y_1 = y - sin(a) * r * scale
      x_2 = x + cos(a) * r * scale
      y_2 = y + sin(a) * r * scale
      line(x_1, y_1, x_2, y_2)
    }
  }
  time += 0.002
}

