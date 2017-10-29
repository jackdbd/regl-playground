precision highp float;

varying vec3 rgb;
varying float scale;

void main () {
  // determine normalized distance from center of point
  float point_dist = length(gl_PointCoord * 2.0 - 1.0);

  // calc scale at which to start fading out the circle
  float min_dist = 0.95; //scale * 0.90;

  // calc scale at which we find the edge of the circle
  float max_dist = 1.00; //scale;

  // https://thebookofshaders.com/glossary/?search=smoothstep
  float alpha = 1.0 - smoothstep(min_dist, max_dist, point_dist);

  gl_FragColor = vec4(rgb, alpha * 0.85);
}
