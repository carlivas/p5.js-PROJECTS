let movers = [];
let numOfMovers = 10;

let mu = 0.05;
let c = 0.01

function setup() {
  createCanvas(525, 525);
    
  for (i = 0; i < numOfMovers; i++)
    movers[i] = new Mover(random(width), 100, random(1,20));
}

function draw() {
  background(30);

  let gravity = createVector(0, 0.1);
  let wind = createVector(0.1, 0);
  
  for (i = 0; i <numOfMovers; i++ ){
    let g = p5.Vector.mult(gravity, movers[i].m)
    movers[i].applyForce(g);
 
    if (mouseIsPressed) {
      movers[i].applyForce(wind);
    }
    
    //movers[i].friction();
    
    if (movers[i].pos.y > height/2){
      movers[i].drag();
    }
  
    movers[i].edges();
    movers[i].update();
    movers[i].show();
  }
  
  stroke(50,50,255, 50);
  strokeWeight(5);
  fill(0,0,255,50)
  rect(0 - 10, height/2, width*1.1 , height/2*1.1)
}
