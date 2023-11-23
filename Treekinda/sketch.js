let posarr = [];
let weightarr = [];
let cols = 27;
let rows = 27;
let gridsize;
let w;
let h;

let walker;
let num_steps = 27;
let num_walks = 27;

function setup() {
  createCanvas(500, 500);
  background(225);
  noLoop();

  gridsize = width / cols;
  w = gridsize * 0.8;
  h = w;

  // Creating a positions array corresponding to a square grid
  for (i = 0; i < cols; i++) {
    posarr[i] = [];
    weightarr[i] = [];
    for (j = 0; j < rows; j++) {
      x = i * gridsize + gridsize / 2;
      y = j * gridsize + gridsize / 2;

      posarr[i][j] = createVector(x, y);
      weightarr[i][j] = 0;

      //stroke(30, 30);
      //strokeWeight(2);
      //rectMode(CENTER);
      //rect(x, y, w, h);
    }
  }

  for (w = 0; w < num_walks; w++) {
    let i = floor(cols / 2);
    let j = rows - 1;

    px = posarr[i][j].x;
    py = posarr[i][j].y;
    for (s = 0; s < num_steps; s++) {
      if (i >= cols) break;
      if (i <= 0) break;
      if (j >= rows) break;
      if (j <= 0) break;
      px = posarr[i][j].x;
      py = posarr[i][j].y;

      weightarr[i][j] += 1;

      i += round(random(-1, 1));
      j += -1;

      x = posarr[i][j].x;
      y = posarr[i][j].y;

      // stroke(0, 0, 225);
      // strokeWeight(2);
      // line(px, py, x, y);
    }
  }

  for (i = 0; i < cols; i++) {
    for (j = 0; j < rows; j++) {
      if (weightarr[i][j] > 0) {
        //textAlign(CENTER, CENTER);
        //text(weightarr[i][j], posarr[i][j].x, posarr[i][j].y);
        //check through three upper neighbours. The giant if statement are to keep the indices in bounds.
        for (n = 0; n < 3; n++) {
          let arr = []
          if (
            i - 1 + n >= 0 &&
            i - 1 + n < cols &&
            j - 1 >= 0 &&
            j - 1 < rows &&
            weightarr[i - 1 - n][j - 1] > 0
          ) {
            arr[n] = weightarr[i - 1 - n][j - 1]
          }
          
            //fill(225, 0, 0, 50);
            //rect(x, y, w, h);

            stroke(0, 0, 225);
            strokeWeight(weightarr[i - 1 - n][j - 1]/10);
              line(posarr[i][j].x, posarr[i][j].y, x, y);
        }
      }
    }
  }
}

function draw() {}
