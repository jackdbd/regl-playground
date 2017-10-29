precision highp float;

// interpolation progress (from 0.0 to 1.0)
uniform float progress;
// max radius to draw (n.b. point is square of 2*r x 2*r)
uniform float maxRadius;

// position at which to draw
attribute vec2 point;
attribute float scaleA;
attribute float scaleB;
attribute vec3 colorA;
attribute vec3 colorB;

// interpolated color
varying vec3 rgb;
// interpolated scale
varying float scale;

void main () {
  rgb = mix(colorA, colorB, progress);
  scale = mix(scaleA, scaleB, progress);
  gl_PointSize = maxRadius * 2. * scale;
  gl_Position = vec4(point, 0, 1);
}
