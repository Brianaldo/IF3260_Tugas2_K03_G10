const VERTEX_SHADER = `
attribute vec3 aVertexPosition;
attribute vec3 aVertexColor;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
varying lowp vec3 vColor;
varying float colorFactor;
void main(void) {
  vec4 transformedPos = uModelViewMatrix * vec4(aVertexPosition.xy, aVertexPosition.z * -1.0, 1.0);
  gl_Position = uProjectionMatrix * transformedPos;
  vColor = aVertexColor;
  colorFactor = min(max((1.0 - transformedPos.x) / 2.0, 0.0), 1.0);
}
`;