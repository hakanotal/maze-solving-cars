class Matrix {
  constructor(rows, cols){
    this.rows = rows;
    this.cols = cols;
    this.data = [];
    for (let i = 0; i < this.rows; i++) {
      this.data[i] = [];
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = 0;
      }
    }
  }
  print(){
    console.table(this.data);
  }
  random(){
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = random()*2 - 1;
      }
    }
  }
  add(n){
    if (n instanceof Matrix) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] += n.data[i][j];
        }
      }
    } else {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] += n;
        }
      }
    }
  }
  multiply(n){
    if (n instanceof Matrix) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] *= n.data[i][j];
        }
      }
    } else {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          this.data[i][j] *= n;
        }
      }
    }
  }
  map(func){
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let x = this.data[i][j];
        this.data[i][j] = func(x);
      }
    }
  }
  copy(){
    let result = new Matrix(this.rows, this.cols);
    for (let i = 0; i < result.rows; i++) {
      for (let j = 0; j < result.cols; j++) {
        result.data[i][j] = this.data[i][j];
      }
    }
    return result;
  }

  static add(m1, m2){
    if((m1.rows !== m2.rows) || (m1.cols !== m2.cols)) return undefined;

    let result = new Matrix(m1.rows, m1.cols);
    for (let i = 0; i < m1.rows; i++) {
      for (let j = 0; j < m1.cols; j++) {
        result.data[i][j] = m1.data[i][j] + m2.data[i][j];
      }
    }
    return result;
  }
  static subtract(m1, m2){
    if((m1.rows !== m2.rows) || (m1.cols !== m2.cols)) return undefined;

    let result = new Matrix(m1.rows, m1.cols);
    for (let i = 0; i < m1.rows; i++) {
      for (let j = 0; j < m1.cols; j++) {
        result.data[i][j] = m1.data[i][j] - m2.data[i][j];
      }
    }
    return result;
  }
  static multiply(m1, m2){
    if(m1.cols !== m2.rows) return undefined;

    let result = new Matrix(m1.rows, m2.cols);
    for (let i = 0; i < result.rows; i++) {
      for (let j = 0; j < result.cols; j++) {
        let sum=0;
        for (let k = 0; k < m1.cols; k++) {
          sum += m1.data[i][k] * m2.data[k][j];
        }
        result.data[i][j] = sum;
      }
    }
    return result;
  }
  static transpose(m){
    let tr = new Matrix(m.cols, m.rows);
    for (let i = 0; i < m.rows; i++) {
      for (let j = 0; j < m.cols; j++) {
        tr.data[j][i] = m.data[i][j];
      }
    }
    return tr;
  }
  static map(matrix, func){
    let result = new Matrix(matrix.rows, matrix.cols);
    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.cols; j++) {
        let x = matrix.data[i][j];
        result.data[i][j] = func(x);
      }
    }
    return result;
  }
  static fromArray(arr){
    let result = new Matrix(arr.length, 1);
    for (let i = 0; i < arr.length; i++) {
      result.data[i][0] = arr[i];
    }
    return result;
  }
  static toArray(matrix){
    let result = [];
    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.cols; j++) {
        result.push(matrix.data[i][j]);
      }
    }
    return result;
  }
}