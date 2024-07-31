let cells = [];
let cellNumber = 708;
let cellWidth;

function setup() {
  ratio = 1 / sqrt(2)
  createCanvas(windowHeight * ratio, windowHeight);
  background(0);
  cellWidth = width / cellNumber / ratio;
  for (let i = 0; i < cellNumber; i++) {
    cells[i] = floor(random(2));
  }
}



let frameSpeed = 1;
let t = 0;
function draw() {
  translate(0, height);
  scale(1, -1);
  for (let i = 0; i < cells.length; i++) {
    let x = i * cellWidth;
    let y = t * cellWidth;

    if (cells[i] == 1) {
      color = [230]
      fill(color);
      stroke(color);
    } else if (cells[i] == 2) {
      color = [230, 0, 0]
      fill(color);
      stroke(color);
    }
    else {
      color = [45, 15, 242]
      fill(color);
      stroke(color);
    }
    rect(x, y, cellWidth, cellWidth);
  }

  nextCells = cells.slice();
  if (frameCount % frameSpeed == 0) {

    for (let i = 1; i < cells.length - 1; i++) {
      neighbourhood = [cells[i - 1], cells[i], cells[i + 1]];
      nextCells[i] = rules(neighbourhood);
    }

    nextCells[0] = nextCells[nextCells.length - 1];
    nextCells[nextCells.length - 1] = nextCells[0];

    cells = nextCells.slice();
    t += 1
  }
  if (t > cellNumber / ratio) {
    noLoop();
    console.log("done");
  }
}



function rules(neighbourhood) {
  let self = neighbourhood[1];
  let val = self;

  let sum = neighbourhood[0] + neighbourhood[1] + neighbourhood[2];
  if (sum == 0) { val = 1; }
  else if (sum == 1) { val = 1; }
  else if (sum == 2) { val = 1; }
  if (sum == 3) { val = 0; }
 

  return val;
}
