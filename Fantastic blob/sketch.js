pallette1 = ["#FFF4E0", "#FFBF9B", "#898121", "#4D4D4D"];
pallette2 = ["#2C3333", "#2E4F4F", "#0E8388", "#CBE4DE"];
pallette3 = ["#F7F1E5", "#E7B10A", "#898121", "#4C4B16"];

num_lines = 75;

function setup() {
  h = windowHeight;
  w = windowWidth;
  m = 0.2;
  createCanvas(w, h);

  pallette = pallette1;
  t = 0;
}

function draw() {
  background(pallette[1]);
  for (i = 0; i <= num_lines; i++) {
    for (j = 0; j <= num_lines; j++) {
      x = lerp(w * m, w * (1 - m), i / (num_lines));
      y = lerp(h * m, h * (1 - m), j / (num_lines));

      nsX = 1 / 80 ;
      nsY = 1 / 80 

      s = noise(i * nsX, j * nsY, t);
      u = noise(i * nsX, j * nsY, t);

      c = pallette[3];
      r = 0.2 * min(w, h) / num_lines;

      ang = s * TWO_PI;
      l = windowWidth/width * 500
      lx = l * exp(- pow(x - w/2, 2) / w / 300);
      ly = l * exp( - pow(y - h/2, 2) / h / 300);

      dx = lx * sin(ang);
      dy = ly * cos(ang);

      stroke(c);
      strokeWeight(r);
      point(x + dx, y + dy);
    }
  }

  t += 0.001;
}

function keyPressed() {
  if (key === 's') {
    img.save('fantastic_blob.png');
  }
}
