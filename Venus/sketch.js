var img;

function preload() {
  img = loadImage("venus.png");
  // img = loadImage("galaxy.jpg");
}

let pixels = [];

let margin = 0.1
let scaleImage = 0.5;
let brightnessThreshold = 0;
let d = 6;

function setup() {
  let size = min(windowWidth, windowHeight);
  let aspectCanvas = 16 / 15;
  createCanvas(size/aspectCanvas, size);

  // let green = color(0.29, 1, 0.4)
  // let red = color(0.98, 1, 0.8);
  // let blue = color(0.7, 1, 0.55);
  // let col1 = red
  // let col2 = green
  // let col3 = blue


  for (var x = d + width * margin; x < width * (1 - margin); x += d) {
    for (var y = d + width * margin; y < height * (1 - margin); y += d) {
      let xmin = (width - img.width * scaleImage) / 2;
      let xmax = (width + img.width * scaleImage) / 2
      let ymin = (height - img.height * scaleImage) / 2
      let ymax = (height + img.height * scaleImage) / 2 

      if (x > xmin && x < xmax && y > ymin && y < ymax) {
        let imgx = int(map(x, xmin, xmax, 0, img.width));
        let imgy = int(map(y, ymin, ymax, 0, img.height));
        let pixColor = img.get(imgx, imgy);
        let imgMask = brightness(pixColor) > brightnessThreshold;
        if (imgMask) {
          pixels.push({ x: x, y: y, pixColor: pixColor });
        }
      }
    }
  }
}
let time = 0;
function draw() {
  background(0);
  for (var x = d + width * margin; x < width * (1 - margin); x += d) {
    for (var y = d + width * margin; y < height * (1 - margin); y += d) {
      let n = noise(x * 0.005, y * 0.005 + time, time);
      let r = n**4 * d;
      noStroke();
      let c = color(n * 200);
      fill(c);
      circle(x, y, r);
    }
  }

  for (let i = 0; i < pixels.length; i++) {
    let x = pixels[i].x;
    let y = pixels[i].y;
    let r = map(brightness(pixels[i].pixColor), 0, 255, 0, 13);
    noStroke();
    fill(pixels[i].pixColor);
    circle(x, y, r)
  }

  time += 0.01
}
