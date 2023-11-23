let dim = 100;
let W;
let w;
let m = 0.8;
let arr = [];
let colors = [];

function setup() {
  createCanvas(800, 800);
  background(0);
  frameRate(60);

  colors = [color(100), color(150), color(200), color(250), color(225, 40, 40)];
  w = min(width, height);

  // SET UP ARRAY OF SAND
  for (let i = 0; i < dim; i++) {
    arr[i] = [];
    for (let j = 0; j < dim; j++) {
      arr[i][j] = round(random(0, 0));
      let d = sq(i - dim / 2) + sq(j - dim / 2);
    }
  }

  // INITIATE SAND
  arr[dim / 4][dim / 4] = 4000;
  arr[(dim * 3) / 4][dim / 4] = 4000;
  arr[(dim * 3) / 4][(dim * 3) / 4] = 4000;
  arr[dim / 4][(dim * 3) / 4] = 4000;
}

function draw() {
  translate(width / 2, height / 2);

  // GENERATE SAND
  if (false) {
    let i = dim / 2 - 1;
    let j = dim / 2 - 1;

    /*
    let i = round(random(0, dim - 1));
    let j = round(random(0, dim - 1));
    */

    arr[i][j] += 1;
  }

  // RENDERING AND TOPPLING SAND
  for (let i = 0; i < dim; i++) {
    for (let j = 0; j < dim; j++) {
      //if (arr[i][j] > 4) arr[i][j] = 4;

      // rendering
      let x = lerp(-w / 2, w / 2, (i + 1) / dim);
      let y = lerp(-w / 2, w / 2, (j + 1) / dim);
      if (arr[i][j] < 4) {c = colors[arr[i][j]]; print(arr[i][j])}
      else c = colors[4];
      fill(c);
      noStroke();
      rectMode(RADIUS);
      rect(x, y, w / dim);

      // toppling
      if (arr[i][j] > 4) {
        arr[i][j] -= 4;
        if (j > 0) arr[i][j - 1] += 1;
        if (j < dim - 1) arr[i][j + 1] += 1;
        if (i > 0) arr[i - 1][j] += 1;
        if (i < dim - 1) arr[i + 1][j] += 1;
      }
    }
  }
  //noLoop();
}

function mouseClicked() {
  let i = round((mouseX / w) * dim - 0.5);
  let j = round((mouseY / w) * dim - 0.5);

  arr[i][j] += 1;
}
