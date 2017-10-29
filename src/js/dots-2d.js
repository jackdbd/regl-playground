import '../css/dots-2d.css';

const vertexShader = require('../glsl/vertex/basic.glsl');
const fragmentShader = require('../glsl/fragment/basic.glsl');
const regl = require('regl')({
  canvas: document.getElementById('regl-canvas'),
});

// regl render command
const drawDots = regl({

  frag: fragmentShader,
  vert: vertexShader,

  // the values of uniforms and attributes in regl can be specified using
  // functions! And these functions get access to the context and props of the
  // regl render command.

  attributes: {
    xyPosition: (context, props) => {
      // context.time is the elapsed seconds since the start of the app
      // context.tick is the elapsed number of frames since the start of the app
      const x1 = props.sineWaveFunction({ t: context.time });
      const x2 = props.sineWaveFunction({ t: context.time, amplitude: 0.5 });
      const x3 = props.sineWaveFunction({ t: context.time, tau: 2 });
      const y4 = props.sineWaveFunction({ t: context.time, tau: 5 });
      const pos = props.sineWaveFunction({ t: context.time, tau: 2 });

      // this is a 2D visualization, so each vertex has 2 coordinates
      const vertices = [
        [x1, 0.9],
        [x2, 0],
        [x3, -0.7],
        [0.8, y4],
        [pos, pos],
      ];
      return vertices;
    },
  },

  uniforms: {
    // access the props passed when calling this render command
    color: (context, props) => props.color,
    // we can also access the props with a shorthand
    pointSize: regl.prop('pointSize'),
  },

  primitive: 'points',
  count: 5,
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
    pointSize: 15.0,
    /**
     * Sinusoidal function.
     * @param {Number} t         Time (in seconds).
     * @param {Number} tau       Period of the sine wave (in seconds).
     * @param {Number} amplitude Amplitude of the sine wave.
     * @param {Number} fi        Phase of the sine wave (in radians).
     * @return {Number} pos      Position
     */
    sineWaveFunction: ({
      t, tau = 1, amplitude = 1, fi = 0,
    }) => {
      // angular frequency (in radians per second)
      const omega = (2 * Math.PI) / tau;
      const pos = amplitude * Math.sin((omega * t) + fi);
      return pos;
    },
  });
});
