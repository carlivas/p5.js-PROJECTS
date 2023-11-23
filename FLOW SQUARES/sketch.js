let nrows = 1
let ncols = 1

L = 150
let marg = 200
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(30);
  rectMode(CENTER)
  flowsquares = []
  for(let i = 0; i < nrows; i++){
    for(let j = 0; j < ncols; j++){
      // let x = lerp(marg, width - marg, j/(ncols - 1))
      // let y = lerp(marg, height - marg, i/(nrows - 1))
      let x = width/2
      let y = height/2
      
      let fs = new FlowSquare(x, y, L)
      fs.draw()
    }
  }
}
