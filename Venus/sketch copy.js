var img;

function preload() {
  img = loadImage("venus.png");
  // img = loadImage("galaxy.jpg");
}

function setup() {
  noLoop();
  let size = min(windowWidth, windowHeight);
  let aspectCanvas = 16 / 15;
  createCanvas(size, size * aspectCanvas);
  colorMode(HSB, 1);
  let green = color(0.29, 1, 0.4)
  let red = color(0.98, 1, 0.8);
  let blue = color(0.7, 1, 0.55);
  let col1 = red
  let col2 = green
  let col3 = blue

  let margin = 0.1
  let aspectImage = img.height / img.width;
  let scaleImage = 0.8;
  let brightnessThreshold = 30;
  background(col3);

  let nscale = 0.005;
  let d = 7;
  for (var x = 5 + width*margin; x < width * (1 - margin); x += d) {
    for (var y = 5 + width*margin; y < height * (1 - margin); y += d) {

      let n = noise(x * nscale, y * nscale);

      let pixColor = color(hue(col1), saturation(col1), n);

      let xmin = (width - img.width * scaleImage) / 2;
      let xmax = (width + img.width * scaleImage) / 2
      let ymin = (height - img.height * scaleImage) / 2
      let ymax = (height + img.height * scaleImage) / 2
      
      if (x > xmin && x < xmax && y > ymin && y < ymax) {
        let imgx = int(map(x, xmin, xmax, 0, img.width));
        let imgy = int(map(y, ymin, ymax, 0, img.height));
        let imgColor = img.get(imgx, imgy); 
        let b = brightness(imgColor);
        pixColor = col2 * imgColor;
      }
      let r = map(brightness(pixColor)**2, 0, 1, 2, 15);
      noStroke();
      fill(pixColor);
      circle(x, y, r)
    }
  }
}
