precision highp float;

// this value is populated by the vertex shader
varying vec3 fragColor;

void main() {
  // gl_FragColor is a special variable that holds the color of a pixel
  gl_FragColor = vec4(fragColor, 1);
}
