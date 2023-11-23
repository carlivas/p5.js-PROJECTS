let bodies = [];
let numBodies = 300;

function setup() {
  createCanvas(windowWidth, windowHeight);
  translate(width/2, height/2)
  background(30);

  for (let i = 0; i < numBodies; i++){
    pos0 = p5.Vector.random2D();
    pos0.setMag(random(0,height/2))
    vel0 = p5.Vector.random2D();
    vel0.setMag(random(0,10))
    m = random(1,10)
    bodies[i] = new Body(pos0, vel0, m);
    bodies[i].show();
  }
}

function draw() {
  translate(width/2, height/2)
  background(30, 70);

  for (let i = 0; i < numBodies; i++){
    for(let j = 0; j < numBodies; j++){
      if(j != i){
        let force = newton(bodies[i], bodies[j])
        bodies[i].applyForce(force)
      }
    }
    dt = 0.1
    bodies[i].move(dt);

    stroke(225)
    strokeWeight(max(2, bodies[i].m))
    bodies[i].show();
  }

  // for (let i = 0; i < numBodies; i++){
  //   dt = 1
  //   bodies[i].move(dt);

  //   stroke(225)
  //   strokeWeight(max(2, bodies[i].m))
  //   bodies[i].show();
  // }
}

function newton(body1, body2){
  m1 = body1.m
  m2 = body2.m
  dx = body2.pos.x - body1.pos.x;
  dy = body2.pos.y - body1.pos.y;
  r_vec = createVector(dx, dy);
  r_sqr = r_vec.magSq()
  force = r_vec.mult((m1 * m2)/r_sqr)
  return force
}
