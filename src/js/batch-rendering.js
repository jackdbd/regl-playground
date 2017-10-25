import '../css/batch-rendering.css';

const canvas = document.getElementById('regl-canvas');
const regl = require('regl')({
  canvas,
});

// Set the size of the drawingbuffer (i.e. how many pixels are in the canvas)
// This has NOTHING to do with the size the canvas is displayed (which is set in
// the CSS)
// https://webglfundamentals.org/webgl/lessons/webgl-resizing-the-canvas.html
canvas.width = 400;
canvas.height = 400;

// regl render command to draw a SINGLE triangle
const drawTriangle = regl({
  frag: `
    precision mediump float;

    uniform vec4 color;

    void main() {
      gl_FragColor = color;
    }`,

  vert: `
    precision mediump float;

    uniform float angle;
    uniform vec2 offset;
    attribute vec2 position;

    float x, y, z, w;

    void main() {
      x = cos(angle) * position.x + sin(angle) * position.y + offset.x;
      y = -sin(angle) * position.x + cos(angle) * position.y + offset.y;
      z = 0.0;
      w = 1.0;
      gl_Position = vec4(x, y, z, w);
    }`,

  attributes: {
    // [x,y] positions of the 3 vertices (without the offset)
    position: [
      -0.25, 0.0,
      0.5, 0.0,
      -0.1, -0.5,
    ],
  },

  uniforms: {
    // Destructure context and pass only tick. Pass props just because we need
    // to pass a third argument: batchId, which gives the index of the regl
    // 'drawTriangle' render command.
    color: ({ tick }, props, batchId) => {
      const r = Math.sin(0.02 * ((0.1 + Math.sin(batchId)) * (tick + (3.0 * batchId))));
      const g = Math.cos(0.02 * ((0.02 * tick) + (0.1 * batchId)));
      const b = Math.sin(0.02 * (((0.3 + Math.cos(2.0 * batchId)) * tick) + (0.8 * batchId)));
      const alpha = 1.0;
      return [r, g, b, alpha];
    },
    angle: ({ tick }) => 0.01 * tick,
    // gotcha: this will work
    // angle: regl.context('tick'),
    // but this will not work
    // angle: 0.01 * regl.context('tick'),
    offset: regl.prop('offset'),
  },

  // disable the depth buffer
  // http://learningwebgl.com/blog/?p=859
  depth: {
    enable: false,
  },

  count: 3,
});

// Here we register a per-frame callback to draw the whole scene
regl.frame(() => {
  regl.clear({
    color: [0.0, 0.0, 0.0, 1.0], // r, g, b, a
  });

  /* In batch rendering a regl rendering command can be executed multiple times
  by passing a non-negative integer or an array as the first argument.
  The batchId is initially 0 and incremented each time the render command is
  executed.
  Note: this command draws a SINGLE triangle, but since we are passing an
  array of 5 elements it is executed 5 times. */
  drawTriangle([
    { offset: [0.0, 0.0] }, // props0
    { offset: [-0.15, -0.15] }, // props1...
    { offset: [0.15, 0.15] },
    { offset: [-0.5, 0.5] },
    { offset: [0.5, -0.5] },
  ]);
});
