class Matrix {
  constructor(matrix) {
    this.matrix = matrix;
    this.rows = matrix.length;
    this.cols = matrix[0].length;
  }

  static identity(size) {
    let matrix = [];
    for (let i = 0; i < size; i++) {
      matrix.push([]);
      for (let j = 0; j < size; j++) {
        matrix[i].push(i === j ? 1 : 0);
      }
    }
    return new Matrix(matrix);
  }

  static add(matrix_l, matrix_r) {
    if (matrix_l.rows !== matrix_r.rows || matrix_l.cols !== matrix_r.cols) {
      throw new Error("Matrix dimensions don't match");
    }

    let result_matrix = [];
    for (let i = 0; i < matrix_l.rows; i++) {
      result_matrix.push([]);
      for (let j = 0; j < matrix_l.cols; j++) {
        result_matrix[i].push(matrix_l.matrix[i][j] + matrix_r.matrix[i][j]);
      }
    }
    return new Matrix(result_matrix);
  }

  static multiply(matrix_l, matrix_r) {
    if (matrix_l.cols !== matrix_r.rows) {
      throw new Error("Matrix dimensions don't match");
    }

    let result_matrix = [];
    for (let i = 0; i < matrix_l.rows; i++) {
      result_matrix.push([]);
      for (let j = 0; j < matrix_r.cols; j++) {
        let sum = 0;
        for (let k = 0; k < matrix_l.cols; k++) {
          sum += matrix_l.matrix[i][k] * matrix_r.matrix[k][j];
        }
        result_matrix[i].push(sum);
      }
    }
    return new Matrix(result_matrix);
  }
}
