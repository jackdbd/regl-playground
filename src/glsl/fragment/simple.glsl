precision mediump float;

#define PI 3.14159265359

// attributes are not available in fragment shaders, only uniforms and varyings
uniform float elapsedSeconds;

float r, g, b, alpha, xPosInDot;
vec3 color;

// tau: Period of the sine wave (in seconds).
// phi: Phase of the sine wave (in radians).
float timeToColor(float t, float tau, float phi) {
  // angular frequency (in radians per second)
  float omega = (2.0 * PI) / tau;
  // amplitude is 1.0 because the max value for a color channel is 1.0
  float amplitude = 1.0;
  // sine wave function https://en.wikipedia.org/wiki/Sine_wave
  float col = amplitude * sin((omega * t) + phi);
  return col;
}

void main () {
  r = timeToColor(elapsedSeconds, 1.0, 0.0);
  xPosInDot = gl_PointCoord[0];
  if (xPosInDot > 0.5) {
    g = 1.0;
  } else {
    g = 0.0;
  }
  // instead of if-else we can also use the ?: operator
  // g = (xPosInDot > 0.5) ? 1.0 : 0.0;
  b = 0.0;
  color = vec3(r, g, b);
  alpha = 1.0;
  // gl_FragColor is a built-in variable for fragment shaders
  gl_FragColor = vec4(color, alpha);
}
