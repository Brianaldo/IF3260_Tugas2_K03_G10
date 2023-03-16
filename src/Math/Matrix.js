class Matrix {
  constructor(matrix) {
    this.matrix = matrix;
    this.rows = matrix.length;
    this.cols = matrix[0].length;
  }

  getFlattenMatrix() {
    return flatten(this.matrix);
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

  static translate(matrix, transX, transY, transZ){
    for(let i = 0; i<4; i++) matrix[3][i] += (matrix[0][i]*transX + matrix[1][i]*transY + matrix[2][i]*transZ);
    return new Matrix(matrix);
  }

  static transpose(matrix){
    let newMatrix = [
      [matrix[0][0], matrix[1][0], matrix[2][0], matrix[3][0]],
      [matrix[0][1], matrix[1][1], matrix[2][1], matrix[3][1]],
      [matrix[0][2], matrix[1][2], matrix[2][2], matrix[3][2]],
      [matrix[0][3], matrix[1][3], matrix[2][3], matrix[3][3]],
    ];
    return new Matrix(newMatrix);
  }

  static rotate(matrix, rad, axis) {
    let c = Math.cos(rad);
    let s = Math.sin(rad);
    let t = 1 - c;
    let x = axis.x;
    let y = axis.y;
    let z = axis.z;

    let rotation_matrix = [
      [t * x * x + c, t * x * y - s * z, t * x * z + s * y, 0],
      [t * x * y + s * z, t * y * y + c, t * y * z - s * x, 0],
      [t * x * z - s * y, t * y * z + s * x, t * z * z + c, 0],
      [0, 0, 0, 1],
    ];

    return Matrix.multiply(matrix, new Matrix(rotation_matrix));
  }

  static lookAt(eye, target, up) {
    let z = Vector3.normalize(Vector3.subtract(eye, target));
    let x = Vector3.normalize(Vector3.cross(up, z));
    let y = Vector3.cross(z, x);

    let matrix = [
      [x.x, x.y, x.z, -Vector3.dot(x, eye)],
      [y.x, y.y, y.z, -Vector3.dot(y, eye)],
      [z.x, z.y, z.z, -Vector3.dot(z, eye)],
      [0, 0, 0, 1],
    ];
    return new Matrix(matrix);
  }

  static scale(matrix, scaleX, scaleY, scaleZ){
    for(let i = 0; i<4; i++) matrix[0][i] *= scaleX;
    for(let i = 0; i<4; i++) matrix[1][i] *= scaleY;
    for(let i = 0; i<4; i++) matrix[2][i] *= scaleZ;
    return new Matrix(matrix);
  }

  static perspective(fov, aspect, near, far) {
    let f = 1.0 / Math.tan(fov / 2);
    let matrix = [
      [f / aspect, 0, 0, 0],
      [0, f, 0, 0],
      [0, 0, (far + near) / (near - far), (2 * far * near) / (near - far)],
      [0, 0, -1, 0],
    ];
    if(far==null || far==Infinity){
      matrix[2][2] = -1;
      matrix[2][3] = -2*near;
    }
    return new Matrix(matrix);
  }

  static oblique(out, theta, phi){
    var cotT = -1/Math.tan(toRadian(theta));
    var cotP = -1/Math.tan(toRadian(phi));
    let matrix = [
      [1,0,cotT,0],
      [0,1,cotP,0],
      [0,0,1,0],
      [0,0,0,1],
    ];
    matrix = this.transpose(matrix);
    return new Matrix(matrix);
  }
}
