precision mediump float;

uniform float stageWidth;
uniform float stageHeight;

attribute vec2 xyPixelPosition;

// Helper function to transform from pixel space coordinates to clip space
// coordinates (aka normalized device coordinates (NDC)).
// In NDC (0,0) is the middle, (-1, 1) is the top left and (1, -1) is the bottom
// right.
// Stolen from Peter Beshai's great blog post:
// http://peterbeshai.com/beautifully-animate-points-with-webgl-and-regl.html
vec2 normalizeCoords(vec2 position) {
  // position contains the x / y position in the pixel space
  float x = position[0];
  float y = position[1];
  return vec2(
    2.0 * ((x / stageWidth) - 0.5),
    // invert y to treat [0,0] as bottom left in pixel space
    -(2.0 * ((y / stageHeight) - 0.5))
  );
}


void main () {
  vec2 clipSpaceCoords = normalizeCoords(xyPixelPosition);
  if (clipSpaceCoords[0] > 0.0) {
    gl_PointSize = 35.0;
  } else {
    gl_PointSize = 15.0;
  }
  gl_Position = vec4(clipSpaceCoords, 0.0, 1.0);
}
