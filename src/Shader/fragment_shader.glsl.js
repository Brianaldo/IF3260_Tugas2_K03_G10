const FRAGMENT_SHADER_LIGHT = `
precision mediump float;
varying lowp vec3 vColor;

varying float colorFactor;
void main(void) {
  gl_FragColor = vec4(vColor * colorFactor, 1.0);
}
`;

const FRAGMENT_SHADER_FLAT = `
precision mediump float;
varying lowp vec3 vColor;

varying float colorFactor;
void main(void) {
  gl_FragColor = vec4(vColor, 1.0);
}
`;
