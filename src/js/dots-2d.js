import '../css/dots-2d.css';

const regl = require('regl')({
  canvas: document.getElementById('regl-canvas'),
});

// regl render command
const drawDots = regl({

  frag: `
  precision mediump float;
  uniform vec4 color;

  void main () {
    gl_FragColor = color;
  }`,

  vert: `
  precision mediump float;
  uniform float pointWidth;
  attribute vec2 xyPosition;

    void main () {
    gl_PointSize = pointWidth;
    gl_Position = vec4(xyPosition, 0, 1);
  }`,

  // the values of uniforms and attributes in regl can be specified using
  // functions! And these functions get access to the context and props of the
  // regl render command.

  attributes: {
    xyPosition: (context, props) => {
      // this is a 2D visualization, so each vertex has 2 coordinates
      const vertices = [
        [0.9, 0.9],
        [0.0, 0.0],
        [-0.7, -0.7],
      ];
      return vertices;
    },
  },

  uniforms: {
    // access the props passed when calling this render command
    color: (context, props) => props.color,
    // we can also access the props with a shorthand
    pointWidth: regl.prop('pointWidth'),
  },

  primitive: 'points',
  count: 3,
});

// https://github.com/regl-project/regl/blob/gh-pages/API.md#context
// Context variables in regl are computed before any other parameters
// and can also be passed from a scoped command to any sub-commands.
regl.frame((context) => {
  // clear the draw buffer with a black background
  // https://github.com/regl-project/regl/blob/gh-pages/API.md#clear-the-draw-buffer
  regl.clear({
    color: [0, 0, 0, 1.0], // [R, G, B, alpha]
    depth: 1,
  });
  // call a regl command and pass some props to the regl context
  drawDots({
    color: [0.208, 0.304, 1.000, 1.000],
    pointWidth: 15.0,
  });
});
