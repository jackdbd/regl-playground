precision mediump float;

uniform float pointSize;

attribute vec2 xyPosition;

void main () {
  gl_PointSize = pointSize;
  gl_Position = vec4(xyPosition, 0.0, 1.0);
}
