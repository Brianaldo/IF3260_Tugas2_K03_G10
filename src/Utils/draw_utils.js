// Draw the scene.
function drawObject(gl, programInfo, buffers, vertexCount) {  
  gl.enable(gl.DEPTH_TEST);          
  gl.depthFunc(gl.LEQUAL);           
  gl.viewport(0.0, 0.0, gl.canvas.clientWidth, gl.canvas.clientHeight);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  const lightPos = [document.getElementById("lightX").value, document.getElementById("lightY").value, document.getElementById("lightZ").value];
  const tempambientColor = rgbToArray(document.getElementById("ambient-color").value);
  const tempdiffuseColor = rgbToArray(document.getElementById("diffuse-color").value);
  const tempspecularColor = rgbToArray(document.getElementById("specular-color").value);
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
  
  if(resetDefault==0){
    if(state.animation && state.timeout && angleAnimation<180){
      modelViewMatrix = Matrix.rotate(modelViewMatrix,angleAnimation/100,[1,0,0]);
      modelViewMatrix = Matrix.rotate(modelViewMatrix,angleAnimation/100,[0,1,0]);
      if(angleAnimation + incAngle/numRender >=180){
        incAngle = -0.5;
        angleAnimation += (incAngle/numRender);
      }else if(angleAnimation + incAngle/numRender <=-180){
        incAngle = 0.5;
        angleAnimation += (incAngle/numRender);
      }else{
        angleAnimation += (incAngle/numRender);
      }
    }
    else{
      modelViewMatrix = Matrix.rotate(modelViewMatrix,angleAnimation/100,[1,0,0]);
      modelViewMatrix = Matrix.rotate(modelViewMatrix,angleAnimation/100,[0,1,0]);
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

  var normalMatrix = Matrix.createIdentityMatrix();
  normalMatrix = Matrix.normalizeMatrix(modelViewMatrix);
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

  {
    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertices);
    gl.vertexAttribPointer(
        programInfo.attribLocations.normalLoc,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(programInfo.attribLocations.normalLoc);
  }

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
  gl.useProgram(programInfo.program);
  gl.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix,false,projectionMatrix);
  gl.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix,false,modelViewMatrix);
  gl.uniformMatrix4fv(programInfo.uniformLocations.normalMatrixLoc,false,normalMatrix);
  gl.uniform1f(programInfo.uniformLocations.kaLoc,document.getElementById("ka").value);
  gl.uniform1f(programInfo.uniformLocations.kdLoc,document.getElementById("kd").value);
  gl.uniform1f(programInfo.uniformLocations.ksLoc,document.getElementById("ks").value);
  gl.uniform1f(programInfo.uniformLocations.shininessLoc,document.getElementById("shininess").value);
  gl.uniform3fv(programInfo.uniformLocations.lightPosLoc,lightPos);
  gl.uniform3fv(programInfo.uniformLocations.ambientColorLoc,[tempambientColor[0],tempambientColor[1],tempambientColor[2]]);
  gl.uniform3fv(programInfo.uniformLocations.diffuseColorLoc,[tempdiffuseColor[0],tempdiffuseColor[1],tempdiffuseColor[2]]);
  gl.uniform3fv(programInfo.uniformLocations.specularColorLoc,[tempspecularColor[0],tempspecularColor[1],tempspecularColor[2]]);
  
  {
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }
}