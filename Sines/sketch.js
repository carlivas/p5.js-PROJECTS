function setup() {
  createCanvas(4100, 5800);
}


let t = 0;
function draw() {
  translate(0, height)
  scale(1, -1)
  background(252, 186, 3);
  noFill();

  // c0 = 800
  // strokeWeight(c0)
  // point(width/2, 3*height/4)
  // let num_circles = 6;
  // for(let i = 0; i < num_circles; i++){
  //   L = i/(num_circles - 1)
  //   C1 = color(250, 65, 22)
  //   C2 = color(252, 186, 3)
  //   s = lerpColor(C1, C2, L + 0.2)
  //   w = lerp(100, 10, L)
  //   strokeWeight(w)
  //   stroke(s)
  //   noFill()
  //   c = lerp(c0 + 400, c0 + 300*num_circles, L)
  //   ellipse(width/2, 3*height/4, c, c)
  // }

  let r0 = 150
  let num_sines = 13;
  y_offset = -r0
  for (let n = 0; n < num_sines; n++) {
    L = n / (num_sines - 1);
    r = lerp(r0, 130, L);
    amplitude = lerp(0, 75, L);
    frequency = lerp(18, 20, L);
    phase = t * n + n * PI

    y_offset += 2 * amplitude + r + 10;

    numOfPoints = lerp(200, 500, L);
    beginShape();
    for (let i = 0; i < numOfPoints; i++) {
      x = i * (width) / numOfPoints;
      y = y_offset + amplitude * sin(i * frequency / numOfPoints + phase)
      // s = lerp(225, 195/num_sines + 30, L**2)
      s = color(250, 65, 22)
      stroke(s)
      strokeWeight(r);
      vertex(x, y)
    }
    endShape();
  }
  t += 0.005
}