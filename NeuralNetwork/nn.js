function sigmoid(x){
    return 1 / (1 + Math.exp(-x));
}
function derSigmoid(x){
    //return sigmoid(x) * (1 - sigmoid(x));
    return x * (1 - x);
}

class NeuralNetwork{
    constructor(inputs, hidden1, hidden2, outputs){
        if(inputs instanceof NeuralNetwork){
            this.input = inputs.input;
            this.hidden1 = inputs.hidden1;
            this.hidden2 = inputs.hidden2;
            this.output = inputs.output;

            this.weights_I = inputs.weights_I.copy();
            this.weights_H1 = inputs.weights_H1.copy();
            this.weights_H2 = inputs.weights_H2.copy();

            this.bias_I = inputs.bias_I.copy();
            this.bias_H1 = inputs.bias_H1.copy();
            this.bias_H2 = inputs.bias_H2.copy();
        } else {
            this.input = inputs;
            this.hidden1 = hidden1;
            this.hidden2 = hidden2;
            this.output = outputs;

            this.weights_I = new Matrix(this.hidden1, this.input);
            this.weights_I.random();
            this.weights_H1 = new Matrix(this.hidden2, this.hidden1);
            this.weights_H1.random();
            this.weights_H2 = new Matrix(this.output, this.hidden2);
            this.weights_H2.random();

            this.bias_I = new Matrix(this.hidden1, 1);
            this.bias_I.random();
            this.bias_H1 = new Matrix(this.hidden2, 1);
            this.bias_H1.random();
            this.bias_H2 = new Matrix(this.output, 1);
            this.bias_H2.random();

            this.learningRate = 0.1;
        }
    }

    feedForward(input_array){
        //Input
        let input = Matrix.fromArray(input_array);
        //Hidden
        let hidden1 = Matrix.multiply(this.weights_I, input);
        hidden1.add(this.bias_I);
        hidden1.map(sigmoid);

        let hidden2 = Matrix.multiply(this.weights_H1, hidden1);
        hidden2.add(this.bias_H1);
        hidden2.map(sigmoid);
        //Output
        let output = Matrix.multiply(this.weights_H2, hidden2);
        output.add(this.bias_H2);
        output.map(sigmoid);

        return Matrix.toArray(output);
    }

    copy(){
        return new NeuralNetwork(this);
    }

    mutation(rate){
        function mutate(value){
            if(random() < rate) return random()*2 - 1;
            else return value;
        }
        this.weights_I.map(mutate);
        this.weights_H1.map(mutate);
        this.weights_H2.map(mutate);
        this.bias_I.map(mutate);
        this.bias_H1.map(mutate);
        this.bias_H2.map(mutate);
    }
}