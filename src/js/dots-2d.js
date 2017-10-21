import '../css/dots-2d.css';

const regl = require('regl')({
  canvas: document.getElementById('regl-canvas'),
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
});
