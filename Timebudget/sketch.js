let w;
let h = 100;
let yOffset = 100;

let timerUni;
let timerMD;
let timerWolt;
let timerSøvn;
let timerFritid;
let timerTotal;

let farveUni;
let farveMD;
let farveWolt;
let farveFritid;
let farveSøvn;
let farveTotal;

let timer;
let farver;
let navne;
let lønninger;

function setup() {
  createCanvas(windowWidth, windowHeight);

  timerUni = round(16 * 4.3);
  timerMD = round(8 * 4.3);
  timerWolt = round(10 * 4.3);
  timerSøvn = 8 * 30;
  timerTotal = 24 * 30;
  timerFritid = timerTotal - timerUni - timerMD - timerWolt - timerSøvn;

  farveUni = color(225);
  farveMD = color(180);
  farveWolt = color(130);
  farveFritid = color(80);
  farveSøvn = color(30);
  farveTotal = color(30);
  
  w = width * 0.7;

  timer = [timerUni, timerMD, timerWolt, timerFritid, timerSøvn];
  farver = [farveUni, farveMD, farveWolt, farveFritid, farveSøvn];
  navne = ["Uni", "MD", "Wolt", "Fritid", "Søvn"];
  lønninger = [
    SU(timerUni),
    LønMD(timerMD),
    LønWolt(timerWolt),
    LønFritid(timerFritid),
    LønSøvn(timerSøvn),
  ];
}

function draw() {
  translate(width / 2, height / 2);
  background(30);

  stroke(225);
  strokeWeight(2);
  /*  fill(farveTotal);
  rect(-w / 2, h + yOffset, w, h / 5);
  */
  strokeWeight(4);
  rect(-w / 2, -h / 2 + yOffset, w, h);
  
  // TEGN BUDGETUDREGNING
  textSize(24);
  textAlign(LEFT, CENTER);
  strokeWeight(0);

  let akkum = 0;
  for (let i = 0; i < timer.length; i++) {
    let løn = lønninger[i];
    akkum += løn;
    let str;

    y = lerp(-2 * h, -50, i / timer.length) - 30;
    fill(225);
    str1 = navne[i];
    str2 = "(" + timer[i] + " t)";
    str3 = " = " + løn + ",-";
    text(str1, -w / 2, y);
    text(str2, -w / 2 + 60, y);
    text(str3, -w / 2 + 130, y);
  }
  fill(225);
  text("Total", -w / 2, -65);
  text("(" + timerTotal + " t)", -w/2 + 60, 0 - 65)
  text(" = " + akkum + ",-", -w / 2 + 130, 0 - 65);

  // TEGN BOXDIAGRAMMET
  akkum = 0;
  for (let i = 0; i < timer.length; i++) {
    strokeWeight(1);
    fill(farver[i]);
    rect(
      -w / 2 + (akkum / timerTotal) * w,
      -h / 2 + yOffset,
      (timer[i] / timerTotal) * w,
      h
    );
    strokeWeight(0);
    textSize(16);
    textAlign(CENTER, CENTER);
    fill(225)
    text(
      navne[i],
      -w / 2 + ((akkum + timer[i] / 2) / timerTotal) * w,
      0.7 * h * pow(-1, i) + yOffset
    );
    akkum += timer[i];
  }
  //////////////////////
}

function SU(timer) {
  return 5300;
}

function LønMD(timer) {
  let løn = 0;
  for (i = 0; i < timer; i++) {
    if (i < 4) løn += 130;
    else if (i < 8) løn += 140;
    else if (i < 12) løn += 150;
    else if (i < 16) løn += 160;
    else løn += 170;
  }
  løn = round(løn *0.92 * 0.63)
  return løn;
}

function LønWolt(timer) {
  let løn = 0;
  // 175 er gennemsnitslønnen ifølge wolt selv efter en hurtig google søgning
  løn = 175 * timer;
  løn = round(løn *0.92 * 0.63)
  return løn;
}

function LønFritid(timer) {
  return 0;
}

function LønSøvn(timer) {
  return 0;
}
