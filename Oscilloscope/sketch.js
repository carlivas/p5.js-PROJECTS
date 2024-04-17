numOsc = 2;
waves = [];

playing = false;

let button
function setup() {
  createCanvas(windowWidth, windowHeight);

  button = createButton('play/pause');
  button.position(19, 19);
  button.mousePressed(toggle);

  for (let i = 0; i < numOsc; i++) {
    waves[i] = new p5.Oscillator();
    waves[i].setType('sine');
    waves[i].amp(0.0);
    waves[i].freq(440);
    waves[i].start();
  }
  waves[0].pan(1);
  waves[1].pan(-1);
}

function draw() {
  background(220);
  if (playing) {
    for (let i = 0; i < numOsc; i++) {
      waves[i].amp(0.1, 0.1);
    }
  } else {
    for (let i = 0; i < numOsc; i++) {
      waves[i].amp(0, 0.1);
    }
  }

  waves[0].freq(map(mouseX, 0, width, 100, 1000), 0.1);
  waves[1].freq(map(mouseY, 0, height, 100, 1000), 0.1);
}

function toggle() {
  if (!playing) {
    playing = true
  } else {
    playing = false
  }
}
