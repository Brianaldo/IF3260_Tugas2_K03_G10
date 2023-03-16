window.onload = function main() {
  const canvas = document.getElementById(`gl-canvas`);
  const gl = WebGLUtils.setupWebGL(canvas, {
    preserveDrawingBuffer: true,
  });
  if (!gl) {
    console.error("WebGL isn't available");
    alert("WebGL isn't available");
  }

  canvas.width = innerHeight;
  canvas.height = innerHeight;

  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(0.75, 0.85, 0.8, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.CULL_FACE);
  gl.frontFace(gl.CCW);
  gl.cullFace(gl.BACK);

  const program = initShaders(gl, VERTEX_SHADER, FRAGMENT_SHADER);

  var boxVertices = [
    // X, Y, Z           R, G, B
    // Top
    -1.0, 1.0, -1.0, 0.5, 0.5, 0.5, -1.0, 1.0, 1.0, 0.5, 0.5, 0.5, 1.0, 1.0,
    1.0, 0.5, 0.5, 0.5, 1.0, 1.0, -1.0, 0.5, 0.5, 0.5,

    // Left
    -1.0, 1.0, 1.0, 0.75, 0.25, 0.5, -1.0, -1.0, 1.0, 0.75, 0.25, 0.5, -1.0,
    -1.0, -1.0, 0.75, 0.25, 0.5, -1.0, 1.0, -1.0, 0.75, 0.25, 0.5,

    // Right
    1.0, 1.0, 1.0, 0.25, 0.25, 0.75, 1.0, -1.0, 1.0, 0.25, 0.25, 0.75, 1.0,
    -1.0, -1.0, 0.25, 0.25, 0.75, 1.0, 1.0, -1.0, 0.25, 0.25, 0.75,

    // Front
    1.0, 1.0, 1.0, 1.0, 0.0, 0.15, 1.0, -1.0, 1.0, 1.0, 0.0, 0.15, -1.0, -1.0,
    1.0, 1.0, 0.0, 0.15, -1.0, 1.0, 1.0, 1.0, 0.0, 0.15,

    // Back
    1.0, 1.0, -1.0, 0.0, 1.0, 0.15, 1.0, -1.0, -1.0, 0.0, 1.0, 0.15, -1.0, -1.0,
    -1.0, 0.0, 1.0, 0.15, -1.0, 1.0, -1.0, 0.0, 1.0, 0.15,

    // Bottom
    -1.0, -1.0, -1.0, 0.5, 0.5, 1.0, -1.0, -1.0, 1.0, 0.5, 0.5, 1.0, 1.0, -1.0,
    1.0, 0.5, 0.5, 1.0, 1.0, -1.0, -1.0, 0.5, 0.5, 1.0,
  ];

  var boxIndices = [
    // Top
    0, 1, 2, 0, 2, 3,

    // Left
    5, 4, 6, 6, 4, 7,

    // Right
    8, 9, 10, 8, 10, 11,

    // Front
    13, 12, 14, 15, 14, 12,

    // Back
    16, 17, 18, 16, 18, 19,

    // Bottom
    21, 20, 22, 22, 20, 23,
  ];

  var boxVertexBufferObject = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, boxVertexBufferObject);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(boxVertices), gl.STATIC_DRAW);

  var boxIndexBufferObject = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, boxIndexBufferObject);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(boxIndices),
    gl.STATIC_DRAW
  );

  var positionAttribLocation = gl.getAttribLocation(program, "vertPosition");
  var colorAttribLocation = gl.getAttribLocation(program, "vertColor");
  gl.vertexAttribPointer(
    positionAttribLocation, // Attribute location
    3, // Number of elements per attribute
    gl.FLOAT, // Type of elements
    gl.FALSE,
    6 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
    0 // Offset from the beginning of a single vertex to this attribute
  );
  gl.vertexAttribPointer(
    colorAttribLocation, // Attribute location
    3, // Number of elements per attribute
    gl.FLOAT, // Type of elements
    gl.FALSE,
    6 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
    3 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
  );

  gl.enableVertexAttribArray(positionAttribLocation);
  gl.enableVertexAttribArray(colorAttribLocation);

  // Tell OpenGL state machine which program should be active.
  gl.useProgram(program);

  var matWorldUniformLocation = gl.getUniformLocation(program, "mWorld");
  var matViewUniformLocation = gl.getUniformLocation(program, "mView");
  var matProjUniformLocation = gl.getUniformLocation(program, "mProj");

  var worldMatrix = Matrix.identity(4).getFlattenMatrix();
  var viewMatrix = Matrix.lookAt(
    new Vector3(0, 0, -8),
    new Vector3(0, 0, 0),
    new Vector3(0, 1, 0)
  ).getFlattenMatrix();
  var projMatrix = Matrix.perspective(
    toRadian(45),
    canvas.width / canvas.height,
    0.1,
    1000.0
  ).getFlattenMatrix();

  gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
  gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
  gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);

  var yRotationMatrix = new Float32Array(16);

  //
  // Main render loop
  //
  var identityMatrix = Matrix.identity(4);
  var angle = 0;
  var loop = function () {
    angle = (performance.now() / 1000 / 6) * 2 * Math.PI;
    const yRotationMatrix = Matrix.rotate(
      identityMatrix,
      angle,
      new Vector3(0, 1, 0)
    );
    const xRotationMatrix = Matrix.rotate(
      identityMatrix,
      angle / 4,
      new Vector3(1, 0, 0)
    );

    worldMatrix = Matrix.multiply(
      yRotationMatrix,
      xRotationMatrix
    ).getFlattenMatrix();
    gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);

    gl.clearColor(0.75, 0.85, 0.8, 1.0);
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
    gl.drawElements(gl.TRIANGLES, boxIndices.length, gl.UNSIGNED_SHORT, 0);

    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
};

// const renderObject = (obj) => {
//   //load 1 object
//   const method = obj.vertexCount == 2 ? gl.LINES : gl.TRIANGLE_FAN;

//   drawObject(gl, programInfo, obj.vertices, method, obj.vertexCount);

//   obj.vertices.forEach((vertex) => {
//     const point = getPoint(vertex.position[0], vertex.position[1]);
//     drawObject(gl, programInfo, point, gl.TRIANGLE_FAN, 4);
//   });
// };

// const renderAllObjects = () => {
//   gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
//   // render semua object
//   objects.forEach((object) => {
//     renderObject(object);
//   });
// };

// const clearCanvas = () => {
//   objects = [];
//   gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
//   enableAllButtons();
// };

// const saveFile = (object = objects, union = false) => {
//   const fileName = document.getElementById(
//     Array.isArray(object) && !union ? "filename" : "model-filename"
//   ).value;

//   if (fileName == "") {
//     alert("Please input the output file name!");
//     return;
//   }

//   const content = JSON.stringify(object);

//   const file = new Blob([content], {
//     type: "json/javascript",
//   });

//   const link = document.createElement("a");

//   link.href = URL.createObjectURL(file);
//   link.download = `${fileName}.json`;
//   link.click();
//   URL.revokeObjectURL(link.href);
// };

// const loadFile = () => {
//   const selectedFile = document.getElementById("load-file").files[0];

//   const reader = new FileReader();

//   reader.readAsText(selectedFile, "UTF-8");

//   reader.onload = (evt) => {
//     let temp = JSON.parse(evt.target.result);
//     temp = Array.isArray(temp) ? temp : [temp];

//     let tempObjects = [];

//     temp.forEach((item) => {
//       let obj = new Model(
//         item.type,
//         item.vertices,
//         item.vertexCount,
//         item.indices,
//         item.faceColor
//       );
//       tempObjects.push(obj);
//     });

//     objects = tempObjects;
//     console.log(objects);
//     renderAllObjects();

//     alert("Successfully loaded file!");
//     document.getElementById("load-file").value = "";
//   };
// };
