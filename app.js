const WIDTH = 640;
const HEIGHT = 640;
const size = 80;
const maxDistance = Math.sqrt(HEIGHT*HEIGHT + WIDTH*WIDTH);
const carCount = 200;
let maxScore = 0;
let mutationCount = 0;

let maze;
let cars = [];
let deads = [];
let bounds = [];
let cnv;

function setup() {
  cnv = createCanvas(WIDTH, HEIGHT);
  cnv.center("horizontal");
  maze = new Maze(WIDTH, HEIGHT, size);
  maze.getBounds(bounds);
  /*
  bounds.push(new Boundary(0, 0, 0, HEIGHT));
  bounds.push(new Boundary(0, 0, WIDTH, 0));
  bounds.push(new Boundary(WIDTH, 0, WIDTH, HEIGHT));
  bounds.push(new Boundary(0, HEIGHT, WIDTH, HEIGHT));
  */
  for(let i=0; i<carCount; i++) cars.push(new Car());
}
 
function draw() {
  background(0);
  //Maze
  maze.show();
  //for(bound of bounds) bound.show();

  //Cars
  for(let i=0; i<cars.length; i++){
    let distances = [];
    distances = cars[i].look(bounds);
    cars[i].show();
    cars[i].think(distances, maxDistance);
    
    for(let j=0; j<distances.length; j++){
      if(distances[j] <= 7){
        deads.push(cars.splice(i, 1)[0]);
        j = distances.length;
      }
    } 
  }
  if(keyIsPressed){
    for(car of cars)
      deads.push(car);
    cars = [];
  }
  if(cars.length === 0) nextGen();

  //Menu
  strokeWeight(2);
  textSize(24);
  fill('red');
  circle(10,10,20);
  fill('green');
  circle(WIDTH-10,HEIGHT-10,20);
  fill('hotpink');
  text('Generation :', WIDTH-200, 30);
  text(mutationCount, WIDTH-50, 30);
  text('Max Score :', WIDTH-200, 60);
  text(maxScore, WIDTH-50, 60);
}

function pickOne() {
  //Pick from the best cars and mutate
  let bestFitness = 0;
  let bestBrain;
  for(car of deads){
    if(car.fitness > bestFitness){
      bestFitness = car.fitness;
      bestBrain = car.brain;
      maxScore = Math.max(maxScore, 100*car.score);
    }
  }
  let child = new Car(bestBrain.copy());
  child.brain.mutation(0.05);
  return child;
}

function nextGen() {
  //Calculate Scores
  let scoreSum = 0;
  for(car of deads){
    let range = p5.Vector.dist(car.pos, car.target);
    if(range <= 20) car.score = 10000/(car.step*car.step);
    else car.score = 10000/(range*range);
    scoreSum += car.score;
  }

  //Calculate Fitnesses
  for(car of deads) car.fitness = car.score/scoreSum;

  //Reset
  for (let i = 0; i < carCount; i++) cars[i] = pickOne();
  deads = [];
  mutationCount++;
}