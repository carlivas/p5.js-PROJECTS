numOsc = 4;
var waves = [];
var amps = [0.1, 0.1, 0.1];
var freqs = [256, 512, 320, 384];
var phass = [0, 1, 0];
var pans = [-1, 1, 0];

let reverb;
var playing = false;

var c0 = 16.352
var cmajor = []
var fracs = [1, 9 / 8, 81 / 64, 4 / 3, 3 / 2, 27 / 16, 243 / 128]
var maxFreq;

function setup() {
  createCanvas(500, 500);

  for (var octave = 3; octave < 7; octave++) {
    for (var i = 0; i < fracs.length; i++) {
      cmajor.push(round(c0 * fracs[i] * pow(2, octave), 3))
    }
  }
  minFreq = cmajor[0]
  maxFreq = cmajor[cmajor.length - 1]

  button = createButton('Play/Pause');
  button.mousePressed(toggle)

  reverb = new p5.Reverb();
  for (var i = 0; i < numOsc; i++) {
    waves[i] = new p5.Oscillator();
    waves[i].setType('sine'); // Set the type of the oscillator
    freqs[i] = random(minFreq, maxFreq);
    phass[i] = random(0, 1);
    pans[i] = random(0, 0);

    reverb.process(waves[i], 5, 5);
  }
}

function draw() {
  background(225, 35, 35)
  if (playing) {
    background(freqs[0] / maxFreq * 255, freqs[1] / maxFreq * 255, freqs[2] / maxFreq * 255)
  } else {
    background(35);
  }

  for (let i = 0; i < numOsc; i++) {
    n = noise(frameCount * 0.01 + 10000 * i)
    if (playing) {
      // A = modulateAmplitude(i, n)
      f = modulateFrequency(i, n);
      // φ = modulatePhase(i);
      φ = 0
      // p = modulatePans(i, n)

      r = width / numOsc / 4
      x = lerp(2 * r, width - 2 * r, i / numOsc)
      y = lerp(2 * r, height - 2 * r, 1 - f / maxFreq)

      stroke(0, 50)
      strokeWeight(2)
      line(x, 2 * r, x, height - 2 * r)

      strokeWeight(0)
      fill(n * 255)
      circle(x, y, 2 * r)

      // stroke(0)
      // strokeWeight(2)
      // line(x, y, x + 0.9 * r * cos(φ * 2 * PI - PI/2), y + 0.9 * r * sin(φ * 2 * PI - PI/2))
    }
  }
}

function modulateAmplitude(i, n = 0) {
  amps[i] = lerp(0.1, 1, freqs[i] / maxFreq - 1) * 0.1
  waves[i].amp(amps[i], 0.1);
  return amps[i]
}

function modulateFrequency(i, n = 0) {
  freqs[i] = constrain(freqs[i] + (2 * n - 1) * 5, minFreq, maxFreq)
  let snap_freq = cmajor[closest(freqs[i], cmajor)]
  waves[i].freq(snap_freq, 0);
  return waves[i].getFreq()
}

function modulatePhase(i) {
  // phass[i] = frameCount * 0.001 * i
  waves[i].phase(phass[i]);
  return phass[i]
}

function modulatePans(i, n = 0) {
  // pans[i] = ???
  waves[i].pan(pans[i]);
  return pans[i]
}

function toggle() {
  if (!playing) {
    playing = true;
    for (var i = 0; i < numOsc; i++) {
      waves[i].start();
      waves[i].amp(0); // Set the amplitude of the oscillator
      waves[i].amp(amps[i], 0.1);
    }
  } else {
    playing = false;
    for (var i = 0; i < numOsc; i++) {
      waves[i].amp(amps[i]);
      waves[i].amp(0, 0.1);
      waves[i].stop(1.1);
    }
  }
}

function closest(num, arr) {
  var curr = arr[0],
    diff = Math.abs(num - curr),
    index = 0;

  for (var val = 0; val < arr.length; val++) {
    let newdiff = Math.abs(num - arr[val]);
    if (newdiff < diff) {
      diff = newdiff;
      curr = arr[val];
      index = val;
    }
  }
  return index;
}