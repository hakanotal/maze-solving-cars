class Maze{
    constructor(w, h, size){
        this.array = [];
        this.rows = h/size;
        this.cols = w/size;
        this.size = size;
        for(let i=0; i<this.rows; i++){
            for(let j=0; j<this.cols; j++){
                this.array[i + j*this.cols] = new Cell(i, j);
            }
        }
        this.createMaze(this.array[0]);
    }

    createMaze(current){
        current.visited = 1;
        let next = current.checkNext(this);
      
        while(next){
          if(next.c - current.c == 1){
            current.walls[1] = false;
            next.walls[0] = false;
          }
          else if(next.c - current.c == -1){
            current.walls[0] = false;
            next.walls[1] = false;
          }
          if(next.r - current.r == 1){
            current.walls[3] = false;
            next.walls[2] = false;
          }
          else if(next.r - current.r == -1){
            current.walls[2] = false;
            next.walls[3] = false;
          }
      
          next.visited = 1;
          current = next;
          this.createMaze(current);
          next = current.checkNext(this);
        }
    }
    show(){
        for(let i=0; i<this.rows; i++){
            for(let j=0; j<this.cols; j++){
                this.array[i + j*this.cols].show();
            }
        }
    }
    getBounds(bounds){
      for(let i=0; i<this.rows; i++){
        for(let j=0; j<this.cols; j++){
          if(this.array[i + j*this.cols].walls[0]) bounds.push(this.array[i + j*this.cols].left);
          if(this.array[i + j*this.cols].walls[1]) bounds.push(this.array[i + j*this.cols].right);
          if(this.array[i + j*this.cols].walls[2]) bounds.push(this.array[i + j*this.cols].up);
          if(this.array[i + j*this.cols].walls[3]) bounds.push(this.array[i + j*this.cols].down);
        }
      }
    }
}