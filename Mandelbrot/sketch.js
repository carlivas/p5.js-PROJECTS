zoom_point_x = -0.5
zoom_point_y = 0

zoom_range = 2

function setup() {
  createCanvas(700, 700);
  pixelDensity(1);
  
    var maxIterations = 1000;

  loadPixels();
  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      var a = map(x, 0, width, zoom_point_x - zoom_range, zoom_point_x + zoom_range);
      var b = map(y, 0, height, zoom_point_y - zoom_range, zoom_point_y + zoom_range);

      var ca = a;
      var cb = b;

      var n = 0;
      var z = 0;

      while (n < maxIterations) {
        var aa = a * a - b * b;
        var bb = 2 * a * b;
        a = aa + ca;
        b = bb + cb;
        if (abs(aa + bb) > 16) break;

        n++;
      }

      var brightness = map(n, 0, maxIterations, 0, 1);
      brightness = map(pow(brightness, 1/Math.log10(maxIterations/10)), 0, 1, 0, 255);

      if (n == maxIterations) {
        brightness = 0;
      }

      var pix = (x + y * width) * 4;
      pixels[pix + 0] = brightness;
      pixels[pix + 1] = brightness;
      pixels[pix + 2] = brightness;
      pixels[pix + 3] = 255;
    }
  }
  updatePixels();
  
  // noprotect
}

function draw() {
}
