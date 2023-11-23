class FlowSquare{
    constructor(x, y, size){
        this.x = x;
        this.y = y;
        this.size = size;
    }
    draw(){
        fill(225)
        rect(this.x, this.y, this.size, this.size)
    }
    update(){
        // update the square
    }
}