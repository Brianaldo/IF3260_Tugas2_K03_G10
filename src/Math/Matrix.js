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
class Matrix {
  constructor(matrix){
    this.matrix = matrix;
  }
  static createIdentityMatrix(){
    return [1,0,0,0,
            0,1,0,0,
            0,0,1,0,
            0,0,0,1];
  }
  
  static transpose(matrix){
    return [matrix[0],matrix[4],matrix[8],matrix[12],
            matrix[1],matrix[5],matrix[9],matrix[13],
            matrix[2],matrix[6],matrix[10],matrix[14],
            matrix[3],matrix[7],matrix[11],matrix[15]];
  }
  
  static translate(matrix,transVal){
    var moved12 = matrix[12]+(matrix[0]*transVal[0] + matrix[4]*transVal[1] + matrix[8]*transVal[2]);
    var moved13 = matrix[13]+(matrix[1]*transVal[0] + matrix[5]*transVal[1] + matrix[9]*transVal[2]);
    var moved14 = matrix[14]+(matrix[2]*transVal[0] + matrix[6]*transVal[1] + matrix[10]*transVal[2]);
    var moved15 = matrix[15]+(matrix[3]*transVal[0] + matrix[7]*transVal[1] + matrix[11]*transVal[2]);
    return [matrix[0],matrix[1],matrix[2],matrix[3],
            matrix[4],matrix[5],matrix[6],matrix[7],
            matrix[8],matrix[9],matrix[10],matrix[11],
            moved12,moved13,moved14,moved15];
  }
  
  static rotate(matrix, rad, axis){
    let length = Math.hypot(axis[0],axis[1],axis[2]);
    if(length<0.000001) return null;
    let coorX = axis[0]/length,coorY=axis[1]/length,coorZ=axis[2]/length;
    let s = Math.sin(rad);
    let c = Math.cos(rad);
    let t = 1-c;
    let b00 = coorX * coorX * t + c;
    let b01 = coorY * coorX * t + coorZ * s;
    let b02 = coorZ * coorX * t - coorY * s;
    let b10 = coorX * coorY * t - coorZ * s;
    let b11 = coorY * coorY * t + c;
    let b12 = coorZ * coorY * t + coorX * s;
    let b20 = coorX * coorZ * t + coorY * s;
    let b21 = coorY * coorZ * t - coorX * s;
    let b22 = coorZ * coorZ * t + c;
    return [ matrix[0] * b00 + matrix[4] * b01 + matrix[8] * b02, 
             matrix[1] * b00 + matrix[5] * b01 + matrix[9] * b02,
             matrix[2] * b00 + matrix[6] * b01 + matrix[10] * b02,
             matrix[3] * b00 + matrix[7] * b01 + matrix[11] * b02,
             matrix[0] * b10 + matrix[4] * b11 + matrix[8] * b12, 
             matrix[1] * b10 + matrix[5] * b11 + matrix[9] * b12,
             matrix[2] * b10 + matrix[6] * b11 + matrix[10] * b12,
             matrix[3] * b10 + matrix[7] * b11 + matrix[11] * b12,
             matrix[0] * b20 + matrix[4] * b21 + matrix[8] * b22, 
             matrix[1] * b20 + matrix[5] * b21 + matrix[9] * b22,
             matrix[2] * b20 + matrix[6] * b21 + matrix[10] * b22,
             matrix[3] * b20 + matrix[7] * b21 + matrix[11] * b22,
             matrix[12],matrix[13],matrix[14],matrix[15]];
  }
  
  static scale(matrix, scale){
    return [ matrix[0]*scale[0],matrix[1]*scale[0],matrix[2]*scale[0],matrix[3]*scale[0],
             matrix[4]*scale[1],matrix[5]*scale[1],matrix[6]*scale[1],matrix[7]*scale[1],
             matrix[8]*scale[2],matrix[9]*scale[2],matrix[10]*scale[2],matrix[11]*scale[2],
             matrix[12],matrix[13],matrix[14],matrix[15]];
  }
  
  static perspective(fovy, aspect, near, far){
    let f = 1.0 / Math.tan(fovy / 2), nf = 1 / (near - far);
    let matrix = [f / aspect, 0, 0, 0,
                  0, f, 0, 0,
                  0, 0, (far + near) * nf, -1,
                  0, 0, 2 * far * near * nf, 0];
    if (far==null||far==Infinity){
        matrix[10] = -1;
        matrix[14] = -2 * near;
    }
    return matrix;
  }
  
  static oblique(theta, phi){
    var cotT = -1 / Math.tan(toRadian(theta));
    var cotP = -1 / Math.tan(toRadian(phi));
    let matrix = [1, 0, cotT, 0,
                  0, 1, cotP, 0,
                  0, 0, 1, 0,
                  0, 0, 0, 1];
    matrix = Matrix.transpose(matrix);
    return matrix;
  }
}