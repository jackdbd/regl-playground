precision mediump float;

uniform float pointWidth;

attribute vec2 xyPosition;

void main () {
  gl_PointSize = pointWidth;
  gl_Position = vec4(xyPosition, 0.0, 1.0);
}
