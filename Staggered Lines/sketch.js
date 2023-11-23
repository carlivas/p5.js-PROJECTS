pallette = [
  "#eb371c",
  "#df5d0f",
  "#d58e1a",
  "#6b9154",
  "#539f92",
  "#f55d50",
  "#00b1b0",
  "#fec84d",
  "#e42256",
  "#5b5b5b",
];
function setup() {
  createCanvas(windowHeight, windowHeight);
}

function draw() {
  noStroke();
  fill(35, 30, 35);
  rect(0, 0, width / 2, height);

  fill(250, 240, 225);
  rect(width / 2, 0, width, height);

  let num_lines = 80;
  let l = 300;
  let h = height / num_lines;
  let phi = random(10);

  for (let i = 0; i < num_lines; i++) {
    s1 = sin(i) * 50;
    s2 = sin(i / 17 + phi) * 83;

    x = width / 2 + s1 + s2;
    y = lerp(0, height, i / num_lines);

    s = floor(random(0, pallette.length));
    t = floor(random(0, pallette.length));
    c = color(pallette[s]);
    noStroke();
    fill(c);
    stroke(35, 30, 35);
    strokeWeight(0.1);
    rect(x - l / 2, y, l / 2, h);
    c = color(pallette[t]);
    fill(c);
    rect(x, y, l / 2, h);
  }
  noLoop();
}
