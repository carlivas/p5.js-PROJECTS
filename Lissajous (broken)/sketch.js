function setup() {
  createCanvas(600, 700);
  
  
  A = 200;
  a = 1;
  d = 0.5;
  
  B = 200;
  b = 1;
  
  posX = 0;
  posY = 0;
  posX1 = 0;
  posY1 = 0;
}

function draw() {
  translate(width/2, height/2)
  background(30);
  
  
  speed = 0.002;
  d += speed
  b += speed/10
  a += speed/9
  A = 200*sin(d)
  
  detail = 500;
  for (var i = 0; i < detail; i++ ){
    t = i
    posX, posY = Lissajous(A, a, d, B, b, t/detail*4*PI);
    posX1, posY1 = Lissajous(A, a, d, B, b, (t +1)/detail*4*PI);
    stroke(225)
    strokeWeight(1);
    point(posX, posY)
    line(posX, posY, posX1, posY1)
  }
  stroke(225)
  strokeWeight(6)
  //line(0, -height/2, 0, height/2)

}

function Lissajous(A, a, d, B, b, t){
    posX = A*sin(a*t + d);
    posY = B*sin(b*t);
  return posX, posY
  }