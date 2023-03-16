class Vector3 {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  static add(vector_l, vector_r) {
    return new Vector3(
      vector_l.x + vector_r.x,
      vector_l.y + vector_r.y,
      vector_l.z + vector_r.z
    );
  }

  static subtract(vector_l, vector_r) {
    return new Vector3(
      vector_l.x - vector_r.x,
      vector_l.y - vector_r.y,
      vector_l.z - vector_r.z
    );
  }

  static multiply(vector, scalar) {
    return new Vector3(vector.x * scalar, vector.y * scalar, vector.z * scalar);
  }

  static divide(vector, scalar) {
    return new Vector3(vector.x / scalar, vector.y / scalar, vector.z / scalar);
  }

  static dot(vector_l, vector_r) {
    return (
      vector_l.x * vector_r.x +
      vector_l.y * vector_r.y +
      vector_l.z * vector_r.z
    );
  }

  static cross(vector_l, vector_r) {
    return new Vector3(
      vector_l.y * vector_r.z - vector_l.z * vector_r.y,
      vector_l.z * vector_r.x - vector_l.x * vector_r.z,
      vector_l.x * vector_r.y - vector_l.y * vector_r.x
    );
  }

  static normalize(vector) {
    let length = Math.sqrt(
      vector.x * vector.x + vector.y * vector.y + vector.z * vector.z
    );

    if (!length) {
      return new Vector3(0, 0, 0);
    }

    return new Vector3(vector.x / length, vector.y / length, vector.z / length);
  }

  static distance(vector_l, vector_r) {
    let x = vector_l.x - vector_r.x;
    let y = vector_l.y - vector_r.y;
    let z = vector_l.z - vector_r.z;
    return Math.sqrt(x * x + y * y + z * z);
  }

  static angle(vector_l, vector_r) {
    let dot = Vector3.dot(vector_l, vector_r);
    let length = Math.sqrt(
      vector_l.x * vector_l.x +
        vector_l.y * vector_l.y +
        vector_l.z * vector_l.z
    );
    return Math.acos(dot / length);
  }
}
