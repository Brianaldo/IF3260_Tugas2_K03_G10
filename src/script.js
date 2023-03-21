var state;

let object = null;

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
gl.clearColor(0.0, 0.0, 0.0, 0.66);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
gl.enable(gl.DEPTH_TEST);
gl.frontFace(gl.CCW);
gl.cullFace(gl.BACK);

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
var shadingFragment = FRAGMENT_SHADER_LIGHT;
var isInit = true;
var tempColorVal = [0.0, 0.0, 0.0];

const renderObject = (object)=>{
  const shaderProgram = initShaders(gl, VERTEX_SHADER);
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
      normalLoc: gl.getAttribLocation(shaderProgram, 'normal'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      normalMatrixLoc: gl.getUniformLocation(shaderProgram, "normalMat"),
      lightPosLoc: gl.getUniformLocation(shaderProgram, "lightPos"),
      ambientColorLoc: gl.getUniformLocation(shaderProgram, "ambientColor"),
      diffuseColorLoc: gl.getUniformLocation(shaderProgram, "diffuseColor"),
      specularColorLoc: gl.getUniformLocation(shaderProgram, "specularColor"),
      shininessLoc: gl.getUniformLocation(shaderProgram, "shininessVal"),
      kaLoc: gl.getUniformLocation(shaderProgram, "coefKa"),
      kdLoc: gl.getUniformLocation(shaderProgram, "coefKd"),
      ksLoc: gl.getUniformLocation(shaderProgram, "coefKs"),
    }
  };
  document.getElementById("ambient-color").value = document.getElementById("color-picker").value;
  document.getElementById("diffuse-color").value = document.getElementById("color-picker").value;
  var buffers;
  if(isInit){
    buffers = initBuffer(gl, object);
    isInit = false;
  }
  else{
    buffers = updateBuffer(gl, object);
  }
  function render() {
    drawObject(gl, programInfo, buffers, object.vertexCount);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
  numRender++;
}

const changeToLoadFile=(file)=>{
  resetDefault = 1;
  object = JSON.parse(file);
  tempColorVal = object["faceColors"][0];
  resetConf();
  renderObject(object);
}

const loadFile = () =>{
  let selectedFile = document.getElementById("load-file").files;
  console.log("Ini di load file");
  if (selectedFile.length == 0) return;

  const file = selectedFile[0]; 

  let reader = new FileReader();
  
  reader.onload = (e) => changeToLoadFile(e.target.result);
  reader.onerror = (e) => alert(e.target.error.name);
  
  reader.readAsText(file);
}

const resetConf = () =>{
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
  document.getElementById("color-picker").value = arrayToRGB(tempColorVal);
  document.getElementById("ka").value = 0.1;
  document.getElementById("kd").value = 0.8;
  document.getElementById("ks").value = 1.0;
  document.getElementById("shininess").value = 10.0;
  document.getElementById("specular-color").value = arrayToRGB([1.0,1.0,1.0]);
  document.getElementById("output-ka").value = 0.1;
  document.getElementById("output-kd").value = 0.8;
  document.getElementById("output-ks").value = 1;
  document.getElementById("output-Shininess").value = 10.0;
  shadingFragment = FRAGMENT_SHADER_LIGHT;
  resetDefault = 1;
  angleAnimation = 0;
  incAngle = 0.5;
}

const resetToDefaultView = () => {
  resetConf();
  renderObject(object);
}

const handleClickShading = () => {
  let checkBox = document.getElementById('shading');
  if (checkBox.checked) {
      shadingFragment = FRAGMENT_SHADER_LIGHT;
  } else {
      shadingFragment = FRAGMENT_SHADER_FLAT;
  }
  renderObject(object);
  resetDefault = 0;
}

const handleClickColor = () => {
  renderObject(object);
}