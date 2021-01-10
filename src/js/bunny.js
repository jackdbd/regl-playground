import "../css/bunny.css";

const canvas = document.getElementById("regl-canvas");
const mat4 = require("gl-mat4");
const bunny = require("bunny");
const regl = require("regl")({
  canvas,
});

// Set the size of the drawingbuffer (i.e. how many pixels are in the canvas)
// This has NOTHING to do with the size the canvas is displayed (which is set in
// the CSS)
// https://webglfundamentals.org/webgl/lessons/webgl-resizing-the-canvas.html
canvas.width = 600;
canvas.height = 600;

const drawBunny = regl({
  vert: `
  precision mediump float;
  uniform mat4 model, view, projection;
  attribute vec3 position;
  void main() {
    gl_Position = projection * view * model * vec4(position, 1.0);
  }`,

  frag: `
  precision mediump float;
  void main() {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
  }`,

  // convert the vertices of the mesh into the position attribute
  attributes: {
    position: bunny.positions,
  },

  // convert the faces of the mesh into elements
  elements: bunny.cells,

  uniforms: {
    model: mat4.identity([]),
    view: ({ tick }) => {
      const t = 0.01 * tick;
      const eye = [30 * Math.cos(t), 2.5, 30 * Math.sin(t)];
      const center = [0, 2.5, 0];
      const up = [0, 1, 0];
      return mat4.lookAt([], eye, center, up);
    },
    projection: () => {
      const fovy = Math.PI / 4;
      const aspect = canvas.clientWidth / canvas.clientHeight;
      return mat4.perspective([], fovy, aspect, 0.01, 1000);
    },
  },
});

regl.frame(() => {
  // clear depth and color buffers
  regl.clear({
    depth: 1,
    color: [0.0, 0.0, 0.0, 1.0], // r, g, b, a
  });
  // call regl render command
  drawBunny();
});
