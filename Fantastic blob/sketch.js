pallette1 = ["#FFF4E0", "#FFBF9B", "#898121", "#4D4D4D"];
pallette2 = ["#2C3333", "#2E4F4F", "#0E8388", "#CBE4DE"];
pallette3 = ["#F7F1E5", "#E7B10A", "#898121", "#4C4B16"];

num_lines = 75;

function setup() {
  w = min(windowWidth, windowHeight);
  m = 0.2;
  createCanvas(w, w);

  pallette = pallette1;
  t = 0;
}

function draw() {
  background(pallette[1]);
  for (i = 0; i < num_lines; i++) {
    for (j = 0; j < num_lines; j++) {
      x = lerp(w * m, w * (1 - m), i / (num_lines - 1));
      y = lerp(w * m, w * (1 - m), j / (num_lines - 1));

      nsX = 1/30;
      nsY = 1/60

      s = noise(i * nsX, j * nsY, t);
      u = noise(i * nsX, j * nsY, t);

      c = pallette[3];
      r = 2;

      ang = s * TWO_PI;
      l = u;
      l = 100

      dx = l * sin(ang);
      dy = l * cos(ang);

      stroke(c);
      strokeWeight(r);
      point(x + dx, y + dy);
    }
  }

  t += 0.001;
}
