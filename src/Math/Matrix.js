// class Matrix {
//   constructor(matrix) {
//     this.matrix = matrix;
//     this.rows = matrix.length;
//     this.cols = matrix[0].length;
//   }

//   getFlattenMatrix() {
//     return new Float32Array(flatten(this.matrix));
//   }

//   static identity(size) {
//     let matrix = [];
//     for (let i = 0; i < size; i++) {
//       matrix.push([]);
//       for (let j = 0; j < size; j++) {
//         matrix[i].push(i === j ? 1 : 0);
//       }
//     }
//     return new Matrix(matrix);
//   }

//   static add(matrix_l, matrix_r) {
//     if (matrix_l.rows !== matrix_r.rows || matrix_l.cols !== matrix_r.cols) {
//       throw new Error("Matrix dimensions don't match");
//     }

//     let result_matrix = [];
//     for (let i = 0; i < matrix_l.rows; i++) {
//       result_matrix.push([]);
//       for (let j = 0; j < matrix_l.cols; j++) {
//         result_matrix[i].push(matrix_l.matrix[i][j] + matrix_r.matrix[i][j]);
//       }
//     }
//     return new Matrix(result_matrix);
//   }

//   static multiply(matrix_l, matrix_r) {
//     if (matrix_l.cols !== matrix_r.rows) {
//       throw new Error("Matrix dimensions don't match");
//     }

//     let result_matrix = [];
//     for (let i = 0; i < matrix_l.rows; i++) {
//       result_matrix.push([]);
//       for (let j = 0; j < matrix_r.cols; j++) {
//         let sum = 0;
//         for (let k = 0; k < matrix_l.cols; k++) {
//           sum += matrix_l.matrix[i][k] * matrix_r.matrix[k][j];
//         }
//         result_matrix[i].push(sum);
//       }
//     }
//     return new Matrix(result_matrix);
//   }

//   static translate(matrix, transX, transY, transZ) {
//     for (let i = 0; i < 4; i++) matrix[3][i] += (matrix[0][i] * transX + matrix[1][i] * transY + matrix[2][i] * transZ);
//     return new Matrix(matrix);
//   }

//   static transpose(matrix) {
//     let newMatrix = [
//       [matrix[0][0], matrix[1][0], matrix[2][0], matrix[3][0]],
//       [matrix[0][1], matrix[1][1], matrix[2][1], matrix[3][1]],
//       [matrix[0][2], matrix[1][2], matrix[2][2], matrix[3][2]],
//       [matrix[0][3], matrix[1][3], matrix[2][3], matrix[3][3]],
//     ];
//     return new Matrix(newMatrix);
//   }

//   static rotate(a, rad, axis) {
//     const s = Math.sin(rad);
//     const c = Math.cos(rad);
//     const t = 1 - c;

//     const rotation_matrix = new Matrix([
//       [
//         t * axis[0] * axis[0] + c,
//         t * axis[0] * axis[1] + s * axis[2],
//         t * axis[0] * axis[2] - s * axis[1],
//         0,
//       ],
//       [
//         t * axis[0] * axis[1] - s * axis[2],
//         t * axis[1] * axis[1] + c,
//         t * axis[1] * axis[2] + s * axis[0],
//         0,
//       ],
//       [
//         t * axis[0] * axis[2] + s * axis[1],
//         t * axis[1] * axis[2] - s * axis[0],
//         t * axis[2] * axis[2] + c,
//         0,
//       ],
//       [0, 0, 0, 1],
//     ]);

//     return Matrix.multiply(a, rotation_matrix);
//   }

//   static lookAt(eye, center, up) {
//     if (
//       Math.abs(eye.x - center.x) < EPSILON &&
//       Math.abs(eye.y - center.y) < EPSILON &&
//       Math.abs(eye.z - center.z) < EPSILON
//     ) {
//       return Matrix.identity(4);
//     }

//     let z = Vector3.normalize(Vector3.subtract(eye, center));
//     let x = Vector3.normalize(Vector3.cross(up, z));
//     let y = Vector3.normalize(Vector3.cross(z, x));

//     return new Matrix([
//       [x.x, y.x, z.x, 0],
//       [x.y, y.y, z.y, 0],
//       [x.z, y.z, z.z, 0],
//       [
//         -(x.x * eye.x + x.y * eye.y + x.z * eye.z),
//         -(y.x * eye.x + y.y * eye.y + y.z * eye.z),
//         -(z.x * eye.x + z.y * eye.y + z.z * eye.z),
//         1,
//       ],
//     ]);
//   }

//   static scale(matrix, scaleX, scaleY, scaleZ) {
//     for (let i = 0; i < 4; i++) matrix[0][i] *= scaleX;
//     for (let i = 0; i < 4; i++) matrix[1][i] *= scaleY;
//     for (let i = 0; i < 4; i++) matrix[2][i] *= scaleZ;
//     return new Matrix(matrix);
//   }

//   static perspective(fovy, aspect, near, far) {
//     const f = 1.0 / Math.tan(fovy / 2);
//     const nf = 1 / (near - far);
//     let matrix = [
//       [f / aspect, 0, 0, 0],
//       [0, f, 0, 0],
//       [0, 0, (far + near) * nf, -1],
//       [0, 0, 2 * far * near * nf, 0],
//     ];
//     if(far==null || far==Infinity){
//       matrix[2][2] = -1;
//       matrix[3][2] = -2*near;
//     }
//     return new Matrix(matrix);
//   }

//   static oblique(theta, phi) {
//     var cotT = -1 / Math.tan(toRadian(theta));
//     var cotP = -1 / Math.tan(toRadian(phi));
//     let matrix = [
//       [1, 0, cotT, 0],
//       [0, 1, cotP, 0],
//       [0, 0, 1, 0],
//       [0, 0, 0, 1],
//     ];
//     matrix = this.transpose(matrix);
//     return new Matrix(matrix);
//   }
// }

const create = () => {
  let out = new Float32Array(16);
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[11] = 0;
  out[12] = 0;
  out[13] = 0;
  out[14] = 0;
  out[0] = 1;
  out[5] = 1;
  out[10] = 1;
  out[15] = 1;
  return out;
}

const translate = (out, a, v) => {
  let x = v[0],
      y = v[1],
      z = v[2];
  let a00, a01, a02, a03;
  let a10, a11, a12, a13;
  let a20, a21, a22, a23;
  if (a === out) {
      out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
      out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
      out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
      out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
  } else {
      a00 = a[0];
      a01 = a[1];
      a02 = a[2];
      a03 = a[3];
      a10 = a[4];
      a11 = a[5];
      a12 = a[6];
      a13 = a[7];
      a20 = a[8];
      a21 = a[9];
      a22 = a[10];
      a23 = a[11];
      out[0] = a00;
      out[1] = a01;
      out[2] = a02;
      out[3] = a03;
      out[4] = a10;
      out[5] = a11;
      out[6] = a12;
      out[7] = a13;
      out[8] = a20;
      out[9] = a21;
      out[10] = a22;
      out[11] = a23;
      out[12] = a00 * x + a10 * y + a20 * z + a[12];
      out[13] = a01 * x + a11 * y + a21 * z + a[13];
      out[14] = a02 * x + a12 * y + a22 * z + a[14];
      out[15] = a03 * x + a13 * y + a23 * z + a[15];
  }
  return out;
}

const rotate = (out, a, rad, axis) => {
  let x = axis[0],
      y = axis[1],
      z = axis[2];
  let len = Math.hypot(x, y, z);
  let s, c, t;
  let a00, a01, a02, a03;
  let a10, a11, a12, a13;
  let a20, a21, a22, a23;
  let b00, b01, b02;
  let b10, b11, b12;
  let b20, b21, b22;
  if (len < 0.000001) {
      return null;
  }
  len = 1 / len;
  x *= len;
  y *= len;
  z *= len;
  s = Math.sin(rad);
  c = Math.cos(rad);
  t = 1 - c;
  a00 = a[0];
  a01 = a[1];
  a02 = a[2];
  a03 = a[3];
  a10 = a[4];
  a11 = a[5];
  a12 = a[6];
  a13 = a[7];
  a20 = a[8];
  a21 = a[9];
  a22 = a[10];
  a23 = a[11];
  // Construct the elements of the rotation matrix
  b00 = x * x * t + c;
  b01 = y * x * t + z * s;
  b02 = z * x * t - y * s;
  b10 = x * y * t - z * s;
  b11 = y * y * t + c;
  b12 = z * y * t + x * s;
  b20 = x * z * t + y * s;
  b21 = y * z * t - x * s;
  b22 = z * z * t + c;
  // Perform rotation-specific matrix multiplication
  out[0] = a00 * b00 + a10 * b01 + a20 * b02;
  out[1] = a01 * b00 + a11 * b01 + a21 * b02;
  out[2] = a02 * b00 + a12 * b01 + a22 * b02;
  out[3] = a03 * b00 + a13 * b01 + a23 * b02;
  out[4] = a00 * b10 + a10 * b11 + a20 * b12;
  out[5] = a01 * b10 + a11 * b11 + a21 * b12;
  out[6] = a02 * b10 + a12 * b11 + a22 * b12;
  out[7] = a03 * b10 + a13 * b11 + a23 * b12;
  out[8] = a00 * b20 + a10 * b21 + a20 * b22;
  out[9] = a01 * b20 + a11 * b21 + a21 * b22;
  out[10] = a02 * b20 + a12 * b21 + a22 * b22;
  out[11] = a03 * b20 + a13 * b21 + a23 * b22;
  if (a !== out) {
      // If the source and destination differ, copy the unchanged last row
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
  }
  return out;
}

const perspective = (out, fovy, aspect, near, far) => {
  let f = 1.0 / Math.tan(fovy / 2),
      nf;
  out[0] = f / aspect;
  out[1] = 0;
  out[2] = 0;
  out[3] = 0;
  out[4] = 0;
  out[5] = f;
  out[6] = 0;
  out[7] = 0;
  out[8] = 0;
  out[9] = 0;
  out[11] = -1;
  out[12] = 0;
  out[13] = 0;
  out[15] = 0;
  if (far != null && far !== Infinity) {
      nf = 1 / (near - far);
      out[10] = (far + near) * nf;
      out[14] = 2 * far * near * nf;
  } else {
      out[10] = -1;
      out[14] = -2 * near;
  }
  return out;
}