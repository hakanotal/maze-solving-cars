function index(maze, r, c){
    if(r<0 || r>maze.rows-1 || c<0 || c>maze.cols-1) return undefined;
    else return maze.array[r + c*maze.cols];
}

class Cell{
    constructor(r, c){
        this.r = r;
        this.c = c;
        this.visited = 0;

        this.walls = [true, true, true, true];
        this.left = new Boundary(c*size, r*size, c*size, (r+1)*size);
        this.right = new Boundary((c+1)*size, r*size, (c+1)*size, (r+1)*size);
        this.up = new Boundary(c*size, r*size, (c+1)*size, r*size);
        this.down = new Boundary(c*size, (r+1)*size, (c+1)*size, (r+1)*size);  
    }
    checkNext(maze){
        let neighbors = [];

        let up = index(maze, this.r-1, this.c);
        let down = index(maze, this.r+1, this.c);
        let left = index(maze, this.r, this.c-1);
        let right = index(maze, this.r, this.c+1);

        if(up && !up.visited) neighbors.push(up);
        if(down && !down.visited) neighbors.push(down);
        if(left && !left.visited) neighbors.push(left);
        if(right && !right.visited) neighbors.push(right);

        if(neighbors.length > 0){
            let n = floor(random(0, neighbors.length));
            return neighbors[n];
        }
        else return undefined; 
    }
    show(){
        if(this.walls[0] == true) this.left.show();
        if(this.walls[1] == true) this.right.show();
        if(this.walls[2] == true) this.up.show();
        if(this.walls[3] == true) this.down.show();
    }
}