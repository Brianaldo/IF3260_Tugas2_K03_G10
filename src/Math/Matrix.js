class Matrix {
  constructor(matrix) {
    this.matrix = matrix;
    this.rows = matrix.length;
    this.cols = matrix[0].length;
  }

  getFlattenMatrix() {
    return new Float32Array(flatten(this.matrix));
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

  static translate(matrix, transX, transY, transZ) {
    for (let i = 0; i < 4; i++)
      matrix[3][i] +=
        matrix[0][i] * transX + matrix[1][i] * transY + matrix[2][i] * transZ;
    return new Matrix(matrix);
  }

  static transpose(matrix) {
    let newMatrix = [
      [matrix[0][0], matrix[1][0], matrix[2][0], matrix[3][0]],
      [matrix[0][1], matrix[1][1], matrix[2][1], matrix[3][1]],
      [matrix[0][2], matrix[1][2], matrix[2][2], matrix[3][2]],
      [matrix[0][3], matrix[1][3], matrix[2][3], matrix[3][3]],
    ];
    return new Matrix(newMatrix);
  }

  static rotate(a, rad, axis) {
    const s = Math.sin(rad);
    const c = Math.cos(rad);
    const t = 1 - c;

    const rotation_matrix = new Matrix([
      [
        t * axis.x * axis.x + c,
        t * axis.x * axis.y + s * axis.z,
        t * axis.x * axis.z - s * axis.y,
        0,
      ],
      [
        t * axis.x * axis.y - s * axis.z,
        t * axis.y * axis.y + c,
        t * axis.y * axis.z + s * axis.x,
        0,
      ],
      [
        t * axis.x * axis.z + s * axis.y,
        t * axis.y * axis.z - s * axis.x,
        t * axis.z * axis.z + c,
        0,
      ],
      [0, 0, 0, 1],
    ]);

    return Matrix.multiply(a, rotation_matrix);
  }

  static lookAt(eye, center, up) {
    if (
      Math.abs(eye.x - center.x) < EPSILON &&
      Math.abs(eye.y - center.y) < EPSILON &&
      Math.abs(eye.z - center.z) < EPSILON
    ) {
      return Matrix.identity(4);
    }

    let z = Vector3.normalize(Vector3.subtract(eye, center));
    let x = Vector3.normalize(Vector3.cross(up, z));
    let y = Vector3.normalize(Vector3.cross(z, x));

    return new Matrix([
      [x.x, y.x, z.x, 0],
      [x.y, y.y, z.y, 0],
      [x.z, y.z, z.z, 0],
      [
        -(x.x * eye.x + x.y * eye.y + x.z * eye.z),
        -(y.x * eye.x + y.y * eye.y + y.z * eye.z),
        -(z.x * eye.x + z.y * eye.y + z.z * eye.z),
        1,
      ],
    ]);
  }

  static scale(matrix, scaleX, scaleY, scaleZ) {
    for (let i = 0; i < 4; i++) matrix[0][i] *= scaleX;
    for (let i = 0; i < 4; i++) matrix[1][i] *= scaleY;
    for (let i = 0; i < 4; i++) matrix[2][i] *= scaleZ;
    return new Matrix(matrix);
  }

  static perspective(fovy, aspect, near, far) {
    const f = 1.0 / Math.tan(fovy / 2);
    const nf = 1 / (near - far);

    return new Matrix([
      [f / aspect, 0, 0, 0],
      [0, f, 0, 0],
      [0, 0, (far + near) * nf, -1],
      [0, 0, 2 * far * near * nf, 0],
    ]);
  }

  static oblique(out, theta, phi) {
    var cotT = -1 / Math.tan(toRadian(theta));
    var cotP = -1 / Math.tan(toRadian(phi));
    let matrix = [
      [1, 0, cotT, 0],
      [0, 1, cotP, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ];
    matrix = this.transpose(matrix);
    return new Matrix(matrix);
  }
}
