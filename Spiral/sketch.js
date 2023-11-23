function setup() {
  width = 700;
  height = 700;
  createCanvas(width, height);
}

function draw() {  
  translate(width/2, height/2);
  backgroundColor = color('#36753c');
  backgroundColor = color(30)
  background(backgroundColor);
  
  c = color('#fac519')
  c = color(225)  
  
  steps = 200;
  speed = 0.005;
  for(var i = 0; i < steps; i++){
    lineHeight = lerp(0, height/2, 1-i/(steps-1))*1.5
    //c.setAlpha((height - lineHeight)/height*255)
    stroke(c)
    strokeWeight(8)
    point(0, lineHeight/2)
    point( 0, -lineHeight/2)
    //rotate(lerp(0, PI/(steps-1), i/(steps-1)))
    rotate(lerp(0, PI/(steps-1), i/(steps-1) + frameCount*speed))
  }
}