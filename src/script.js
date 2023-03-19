var state;

let objects_shaded = [];
let objects_unshaded = [];

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
gl.frontFace(gl.CCW);
gl.cullFace(gl.BACK);

const shaderProgram = initShaders(gl, VERTEX_SHADER, FRAGMENT_SHADER);
const programInfo = {
  program: shaderProgram,
  attribLocations: {
    vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
    vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
  },
  uniformLocations: {
    projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
    modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
  }
};

function defaultview(){
  state = {
    animation: false,
    timeout: 10
  }
  document.getElementById("idle").checked = false;
}

function animationidle(e){
  state.animation = document.getElementById("idle").checked;
  resetDefault = 0;
}

document.getElementById("idle").addEventListener("change", animationidle);
defaultview();
var angleAnimation = 0;
var incAngle = 0.5;
var numRender = 0;
var resetDefault = 1;

const renderObject = (object)=>{
  const buffers = initBuffer(gl, object);
  function render() {
    drawObject(gl, programInfo, buffers, object.vertexCount);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

const renderAllObjects = (objects)=>{
  gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
  // render semua object
  objects.forEach((object) => {
    renderObject(object);
  });
  numRender++;
}

const unshadeData = (data) => {
  for (let i = 0; i < data.faceColors.length; i++) {
      for (let j = 0; j < 3; j++) {
        data.faceColors[i][j] = 0.0;
      }
  }
  return data;
}

const changeToLoadFile=(file)=>{
  resetDefault = 1;
  objects_shaded.push(JSON.parse(file));
  objects_unshaded.push(unshadeData(JSON.parse(file)));
  renderAllObjects(objects_shaded);
}

const loadFile = () =>{
    let selectedFile = document.getElementById("load-file").files;
    if (selectedFile.length == 0) return;

    const file = selectedFile[0]; 
  
    let reader = new FileReader();
    
    reader.onload = (e) => changeToLoadFile(e.target.result);
    reader.onerror = (e) => alert(e.target.error.name);
  
    reader.readAsText(file);
}

const clearCanvas = () => {
  objects_shaded = [];
  objects_unshaded = [];
  renderAllObjects(objects_shaded);
  resetDefault = 0;
};

const saveFile = (object = objects_shaded) => {
  const fileName = document.getElementById(
    Array.isArray(object) ? "filename" : "model-filename"
  ).value;

  if (fileName == "") {
    alert("Please input the output file name!");
    return;
  }

  const content = JSON.stringify(object);

  const file = new Blob([content], {
    type: "json/javascript",
  });

  const link = document.createElement("a");

  link.href = URL.createObjectURL(file);
  link.download = `${fileName}.json`;
  link.click();
  URL.revokeObjectURL(link.href);
};

function updateOutput() {
  document.getElementById("output-rot-x").value = 0;
  document.getElementById("output-rot-y").value = 0;
  document.getElementById("output-rot-z").value = 0;
  document.getElementById("output-trans-x").value = 0;
  document.getElementById("output-trans-y").value = 0;
  document.getElementById("output-trans-z").value = 0;
  document.getElementById("output-scale-x").value = 1;
  document.getElementById("output-scale-y").value = 1;
  document.getElementById("output-scale-z").value = 1;
  document.getElementById("output-cam-rad").value = 0;
  document.getElementById("output-range").value = 60;
}

const resetToDefaultView = () => {
  defaultview();
  document.getElementById('perspectiveOption').value = 'perspective';
  document.getElementById("translasiX").value = 0;
  document.getElementById("translasiY").value = 0;
  document.getElementById("translasiZ").value = 0;
  document.getElementById("rotasiX").value = 0;
  document.getElementById("rotasiY").value = 0;
  document.querySelector("output").value = 0;
  document.getElementById("rotasiZ").value = 0;
  document.getElementById("scalingX").value = 1;
  document.getElementById("scalingY").value = 1;
  document.getElementById("scalingZ").value = 1;
  document.getElementById('cam-rotation').value = 60;
  document.getElementById('cam-radius').value = 0;
  document.getElementById('shading').checked = true;
  updateOutput();
  resetDefault = 1;
  angleAnimation = 0;
  renderAllObjects(objects_shaded);
}

const handleClickShading = () => {
  let checkBox = document.getElementById('shading');
  if (checkBox.checked) {
      renderAllObjects(objects_shaded);
  } else {
      renderAllObjects(objects_unshaded);
  }
  resetDefault = 0;
}

// window.onload = function main() {
//   const canvas = document.getElementById(`gl-canvas`);
//   const gl = WebGLUtils.setupWebGL(canvas, {
//     preserveDrawingBuffer: true,
//   });
//   if (!gl) {
//     console.error("WebGL isn't available");
//     alert("WebGL isn't available");
//   }

//   canvas.width = innerHeight;
//   canvas.height = innerHeight;

//   gl.viewport(0, 0, canvas.width, canvas.height);
//   gl.clearColor(0.75, 0.85, 0.8, 1.0);
//   gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
//   gl.enable(gl.DEPTH_TEST);
//   gl.enable(gl.CULL_FACE);
//   gl.frontFace(gl.CCW);
//   gl.cullFace(gl.BACK);

//   const program = initShaders(gl, VERTEX_SHADER, FRAGMENT_SHADER);

//   var boxVertices = [
//     // X, Y, Z           R, G, B
//     // Top
//     -1.0, 1.0, -1.0, 0.5, 0.5, 0.5, 
//     -1.0, 1.0, 1.0, 0.5, 0.5, 0.5, 
//     1.0, 1.0, 1.0, 0.5, 0.5, 0.5, 
//     1.0, 1.0, -1.0, 0.5, 0.5, 0.5,

//     // Left
//     -1.0, 1.0, 1.0, 0.75, 0.25, 0.5,
//     -1.0, -1.0, 1.0, 0.75, 0.25, 0.5,
//     -1.0, -1.0, -1.0, 0.75, 0.25, 0.5,
//     -1.0, 1.0, -1.0, 0.75, 0.25, 0.5,

//     // Right
//     1.0, 1.0, 1.0, 0.25, 0.25, 0.75,
//     1.0, -1.0, 1.0, 0.25, 0.25, 0.75,
//     1.0, -1.0, -1.0, 0.25, 0.25, 0.75,
//     1.0, 1.0, -1.0, 0.25, 0.25, 0.75,

//     // Front
//     1.0, 1.0, 1.0, 1.0, 0.0, 0.15,
//     1.0, -1.0, 1.0, 1.0, 0.0, 0.15,
//     -1.0, -1.0, 1.0, 1.0, 0.0, 0.15,
//     -1.0, 1.0, 1.0, 1.0, 0.0, 0.15,

//     // Back
//     1.0, 1.0, -1.0, 0.0, 1.0, 0.15, 
//     1.0, -1.0, -1.0, 0.0, 1.0, 0.15,
//     -1.0, -1.0, -1.0, 0.0, 1.0, 0.15,
//     -1.0, 1.0, -1.0, 0.0, 1.0, 0.15,

//     // Bottom
//     -1.0, -1.0, -1.0, 0.5, 0.5, 1.0,
//     -1.0, -1.0, 1.0, 0.5, 0.5, 1.0,
//     1.0, -1.0, 1.0, 0.5, 0.5, 1.0, 
//     1.0, -1.0, -1.0, 0.5, 0.5, 1.0,
//   ];

//   var boxIndices = [
//     // Top
//     0, 1, 2, 0, 2, 3,

//     // Left
//     5, 4, 6, 6, 4, 7,

//     // Right
//     8, 9, 10, 8, 10, 11,

//     // Front
//     13, 12, 14, 15, 14, 12,

//     // Back
//     16, 17, 18, 16, 18, 19,

//     // Bottom
//     21, 20, 22, 22, 20, 23,
//   ];

//   var boxVertexBufferObject = gl.createBuffer();
//   gl.bindBuffer(gl.ARRAY_BUFFER, boxVertexBufferObject);
//   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(boxVertices), gl.STATIC_DRAW);

//   var boxIndexBufferObject = gl.createBuffer();
//   gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, boxIndexBufferObject);
//   gl.bufferData(
//     gl.ELEMENT_ARRAY_BUFFER,
//     new Uint16Array(boxIndices),
//     gl.STATIC_DRAW
//   );

//   var positionAttribLocation = gl.getAttribLocation(program, "vertPosition");
//   var colorAttribLocation = gl.getAttribLocation(program, "vertColor");
//   gl.vertexAttribPointer(
//     positionAttribLocation, // Attribute location
//     3, // Number of elements per attribute
//     gl.FLOAT, // Type of elements
//     gl.FALSE,
//     6 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
//     0 // Offset from the beginning of a single vertex to this attribute
//   );
//   gl.vertexAttribPointer(
//     colorAttribLocation, // Attribute location
//     3, // Number of elements per attribute
//     gl.FLOAT, // Type of elements
//     gl.FALSE,
//     6 * Float32Array.BYTES_PER_ELEMENT, // Size of an individual vertex
//     3 * Float32Array.BYTES_PER_ELEMENT // Offset from the beginning of a single vertex to this attribute
//   );

//   gl.enableVertexAttribArray(positionAttribLocation);
//   gl.enableVertexAttribArray(colorAttribLocation);

//   gl.useProgram(program);

//   var matWorldUniformLocation = gl.getUniformLocation(program, "mWorld");
//   var matViewUniformLocation = gl.getUniformLocation(program, "mView");
//   var matProjUniformLocation = gl.getUniformLocation(program, "mProj");

//   var worldMatrix = Matrix.identity(4).getFlattenMatrix();
//   var viewMatrix = Matrix.lookAt(
//     new Vector3(0, 0, -8),
//     new Vector3(0, 0, 0),
//     new Vector3(0, 1, 0)
//   ).getFlattenMatrix();
//   var projMatrix = Matrix.perspective(
//     toRadian(45),
//     canvas.width / canvas.height,
//     0.1,
//     1000.0
//   ).getFlattenMatrix();

//   gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
//   gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
//   gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);

//   var identityMatrix = Matrix.identity(4);
//   var angle = 0;

//   defaultview();
//   var loop = function () {
//     if(state.animation){
//       state.timeout++;
//       angle = (state.timeout)/300 * Math.PI;
//     }
//     const yRotationMatrix = Matrix.rotate(
//       identityMatrix,
//       angle,
//       new Vector3(0, 1, 0)
//     );
//     const xRotationMatrix = Matrix.rotate(
//       identityMatrix,
//       angle / 4,
//       new Vector3(1, 0, 0)
//     );

//     worldMatrix = Matrix.multiply(
//       yRotationMatrix,
//       xRotationMatrix
//     ).getFlattenMatrix();
//     gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);

//     gl.clearColor(0.75, 0.85, 0.8, 1.0);
//     gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
//     gl.drawElements(gl.TRIANGLES, boxIndices.length, gl.UNSIGNED_SHORT, 0);
//     requestAnimationFrame(loop);
//   };
//   requestAnimationFrame(loop);
// };