// Draw the scene.
function drawObject(gl, programInfo, buffers, vertexCount) {
  gl.clearColor(0.23, 0.23, 0.23, 1.0);
  gl.clearDepth(1.0);            
  gl.enable(gl.DEPTH_TEST);          
  gl.depthFunc(gl.LEQUAL);           
  gl.viewport(0.0, 0.0, gl.canvas.clientWidth, gl.canvas.clientHeight);

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  const fieldOfView = 45 * Math.PI / 180;
  const left = 0;
  const top = 0;
  const right = gl.canvas.clientWidth;
  const bottom = gl.canvas.clientHeight;
  const aspect = (right - left) / (bottom - top);
  const zNear = 0.1;
  const zFar = 1000.0;
  var projectionMatrix = Matrix.createIdentityMatrix();
  const cameraAngleRadian = ((document.getElementById('cam-rotation').value  - 50.0) * Math.PI) / 25.0;
  const projectionType = document.getElementById('perspectiveOption').value;
  let radius = -((document.getElementById('cam-radius').value - 50.0) / 25.0) + 5.5;

  if (projectionType === "perspective") {
    projectionMatrix = Matrix.perspective(fieldOfView,aspect,zNear,zFar);
  }else if(projectionType === "oblique"){
    // Implement here
  }else if(projectionType === "orthographic"){
    // Implement here
  }

  var modelViewMatrix = Matrix.createIdentityMatrix();
  modelViewMatrix = Matrix.translate(modelViewMatrix,[0.0, 0.0, -radius]);  
  modelViewMatrix = Matrix.rotate(modelViewMatrix,cameraAngleRadian,[0, 1, 0]);           
  console.log(numRender);
  if(state.animation && state.timeout && angleAnimation<180){
    modelViewMatrix = Matrix.rotate(modelViewMatrix,angleAnimation/100,[1,0,0]);
    modelViewMatrix = Matrix.rotate(modelViewMatrix,angleAnimation/100,[0,1,0]);
    if(angleAnimation + incAngle/numRender >=180){
      incAngle = -0.5;
      angleAnimation += (2*incAngle/numRender);
    }else if(angleAnimation + incAngle/numRender <=-180){
      incAngle = 0.5;
      angleAnimation += (2*incAngle/numRender);
    }else{
      angleAnimation += (incAngle/numRender);
    }
  }

  const angleX = document.getElementById("rotasiX").value / 100;
  const angleY = document.getElementById("rotasiY").value / 100;
  const angleZ = document.getElementById("rotasiZ").value / 100;
  const x = document.getElementById("translasiX").value / 100;
  const y = document.getElementById("translasiY").value / 100;
  const z = document.getElementById("translasiZ").value / 100;
  const scalesX = document.getElementById("scalingX").value;
  const scalesY = document.getElementById("scalingY").value;
  const scalesZ = document.getElementById("scalingZ").value;

  modelViewMatrix = Matrix.translate(modelViewMatrix,[z,y,x]);
  modelViewMatrix = Matrix.rotate(modelViewMatrix,angleX,[1,0,0]);
  modelViewMatrix = Matrix.rotate(modelViewMatrix,angleY,[0,1,0]);
  modelViewMatrix = Matrix.rotate(modelViewMatrix,angleZ,[0,0,1]);
  modelViewMatrix = Matrix.scale(modelViewMatrix,[scalesZ, scalesY, scalesX]); 
  {
    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertices);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexPosition);
  }

  {
    const numComponents = 4;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.colors);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexColor,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexColor);
  }

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
  gl.useProgram(programInfo.program);
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix);
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix);

  {
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }
}