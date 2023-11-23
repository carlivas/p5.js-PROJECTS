let numOfLines = 100;
let colors = [];
function setup() {
  createCanvas(windowWidth, windowHeight);

  colors = [color(175, 0, 0), color(0, 175, 0), color(115)];
  //noLoop();
}

function draw() {
  translate(0, height / 2);
  scale(1, -1);
  background(205);
  let animSpeed = 1 / 500;

  let i = 0;
  let w = width * 0.9;
  let h = height * 0.8;
  let n = noise(frameCount * animSpeed);
  let fmin = lerp(1 / 20, 1 / 10000, n + 2 * sin(n));
  let fmax = lerp(1 / 10000, 1 / 20, n - sin(n));
  for (var y = -h / 2; y < h / 2; y += 10) {
    let numOfLines = h / 10;
    let a = lerp(25, 55, y/h + 1/2);
    let f = lerp(fmin, fmax, (y + h/2)/h);
    let ø = PI + 2;
    colorMode(HSL, 100);
    let hues = [0, 40, 20, 76];
    let H = hues[i % 4];
    let S = lerp(50, 100, (i % 3)/2);
    let L = 30;
    let c = color(H, S, L);
    c.setAlpha(50);
    let x = (i % 10)
    drawSine(x, -y, a,f,ø, c);
    let inc = 0.1;
    i += 1;
  }
}

function bellCurve(x){
  let sigma = 100;
  let mu = 1;
  return 1/(sqrt(2 * PI) * sigma) * exp(-sq((x - mu)/sigma))
}

function drawSine(x0, y0, a, f, ø, color) {
  stroke(color);
  strokeWeight(2);
  strokeCap(SQUARE);
  let w = width * 0.9;
  let detail = 120;
  for (var x = width - w; x < w; x += w / detail) {
    let y = lerp(a * sin(x * f + ø), 0, sq(x / w));
    line(x + x0, y0, x + x0, y + y0);
  }
}

function drawFunc(x0, y0, func, color) {
  color.setAlpha(50);
  stroke(color);
  strokeWeight(2);
  strokeCap(SQUARE);
  let w = width * 0.9;
  let detail = 120;
  for (var x = width - w; x < w; x += w / detail) {
    let y = func(x);
    line(x + x0, y0, x + x0, y + y0);
  }
}
