const FOV = 90;
class Car{
    constructor(brain){
        this.pos = createVector(20, 20);
        this.dir = 45;
        this.target = createVector(WIDTH-10, HEIGHT-10);

        this.rays = [];
        this.rays.push(new Ray(this.pos, radians(-FOV)));
        this.rays.push(new Ray(this.pos, radians(-FOV/2)));
        this.rays.push(new Ray(this.pos, radians(0)));
        this.rays.push(new Ray(this.pos, radians(FOV/2)));
        this.rays.push(new Ray(this.pos, radians(FOV)));

        this.score = 0;
        this.step = 0;
        this.fitness = 0;

        if(brain) this.brain = brain.copy();
        else this.brain = new NeuralNetwork(9, 7, 4, 2);   
    }
    look(bounds){
        let scene = [];
        for(let ray of this.rays){
            let closest = null;
            let record = Infinity;
            for(let bound of bounds){
                let pt = ray.cast(bound);
                if(pt){
                    let distance = p5.Vector.dist(this.pos, pt);
                    if(distance < record){
                        record = distance;
                        closest = pt;
                    }
                } 
            }
            stroke(255,75);
            if(closest) line(this.pos.x, this.pos.y, closest.x, closest.y);
            scene.push(record);
        }
        return scene;
    }
    think(distances, maxDistance){
        this.step++;

        let inputs = [];
        inputs[0] = distances[0]/maxDistance;
        inputs[1] = distances[1]/maxDistance;
        inputs[2] = distances[2]/maxDistance;
        inputs[3] = distances[3]/maxDistance;
        inputs[4] = distances[4]/maxDistance;
        inputs[5] = this.pos.x/WIDTH;
        inputs[6] = this.pos.y/HEIGHT;
        inputs[7] = this.target.x/WIDTH;
        inputs[8] = this.target.y/HEIGHT;

        let outputs = this.brain.feedForward(inputs);

        if(outputs[0] > outputs[1]) this.move(1);
        else if(outputs[1] > outputs[0]) this.move(2);
    }
    move(input){
        if(input == 1) this.dir -= 0.1;
        else if(input == 2) this.dir += 0.1;
        
        let velocity = p5.Vector.fromAngle(this.dir);
        velocity.setMag(4);
        this.pos.add(velocity);

        for(let i=0; i<this.rays.length; i++)
            this.rays[i].setAngle(radians((i*FOV/2)-FOV) + this.dir);
    }
    show(){
        fill("blue");
        circle(this.pos.x, this.pos.y, 14);
    }
}