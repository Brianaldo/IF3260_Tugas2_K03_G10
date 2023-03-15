const vertexShaderSource = `
    precision mediump float;

    attribute vec2 aVertexPosition;
    attribute vec4 aVertexColor;

    varying vec4 vColor;

    void main(){
        gl_Position = vec4(aVertexPosition, 0.0, 1.0);
        vColor = aVertexColor;
    }
`;

const fragmentShaderSource = `
    precision mediump float;

    varying vec4 vColor;

    void main(){
        gl_FragColor = vColor;
    }
`;

let objects = [];
let selectedObjectTemp = [];

// get canvas dari html
const gl_canvas = document.getElementById("gl-canvas");
const gl = gl_canvas.getContext("webgl");

gl.canvas.width = innerHeight;
gl.canvas.height = innerHeight;

if (!!!gl) {
  alert("Unable to start program; is WebGL supported in your browser?");
}

const shaderProgram = initShaders(gl, vertexShaderSource, fragmentShaderSource);

const programInfo = {
  program: shaderProgram,
  attribLocations: {
    vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
    vertexColor: gl.getAttribLocation(shaderProgram, "aVertexColor"),
  },
};


const renderObject = (obj) => {
  //load 1 object
  const method = obj.vertexCount == 2 ? gl.LINES : gl.TRIANGLE_FAN;

  drawObject(gl, programInfo, obj.vertices, method, obj.vertexCount);

  obj.vertices.forEach((vertex) => {
    const point = getPoint(vertex.position[0], vertex.position[1]);
    drawObject(gl, programInfo, point, gl.TRIANGLE_FAN, 4);
  });
};

const renderAllObjects = () => {
  gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
  // render semua object
  objects.forEach((object) => {
    renderObject(object);
  });
};

const clearCanvas = () => {
  objects = [];
  gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
  enableAllButtons();
};

const saveFile = (object = objects, union = false) => {
  const fileName = document.getElementById(
    Array.isArray(object) && !union ? "filename" : "model-filename"
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

const loadFile = () => {
  const selectedFile = document.getElementById("load-file").files[0];

  const reader = new FileReader();

  reader.readAsText(selectedFile, "UTF-8");

  reader.onload = (evt) => {
    let temp = JSON.parse(evt.target.result);
    temp = Array.isArray(temp) ? temp : [temp];

    let tempObjects = [];

    temp.forEach((item) => {
      let obj = new Model(
        item.type,
        item.vertices,
        item.vertexCount,
        item.indices,
        item.faceColor
      );
      tempObjects.push(obj);
    });

    objects = tempObjects;
    console.log(objects);
    renderAllObjects();

    alert("Successfully loaded file!");
    document.getElementById("load-file").value = '';
  };
};
