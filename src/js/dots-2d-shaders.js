import '../css/dots-2d.css';

const vertexShader = require('../glsl/vertex/simple.glsl');
const fragmentShader = require('../glsl/fragment/simple.glsl');

const canvasElement = document.getElementById('regl-canvas');
const regl = require('regl')({
  canvas: canvasElement,
});

const maxWidth = canvasElement.width;
const halfWidth = maxWidth / 2;
const maxHeight = canvasElement.height;
const halfHeight = maxHeight / 2;

// regl render command
const drawDots = regl({

  frag: fragmentShader,
  vert: vertexShader,

  // the values of uniforms and attributes in regl can be specified using
  // functions! And these functions get access to the context and props of the
  // regl render command.

  attributes: {
    xyPixelPosition: (context, props) => {
      // context.time is the elapsed number of seconds since the start of the app
      // context.tick is the elapsed number of frames since the start of the app
      const x1 = halfWidth + (halfWidth * props.sineWaveFunction({ t: context.time }));
      const x2 = halfWidth + (halfWidth * props.sineWaveFunction({ t: context.time, amplitude: 0.5 }));
      const x3 = halfWidth + (halfWidth * props.sineWaveFunction({ t: context.time, tau: 2 }));
      const y4 = halfHeight + (halfHeight * props.sineWaveFunction({ t: context.time, tau: 5 }));
      const pos = props.sineWaveFunction({ t: context.time, tau: 2 });
      const x5 = halfWidth + (halfWidth * pos);
      const y5 = halfHeight + (halfHeight * pos);

      // this is a 2D visualization, so each vertex has 2 coordinates
      const vertices = [
        [x1, 50],
        [x2, 200],
        [x3, 170],
        [40, y4],
        [x5, y5],
      ];
      return vertices;
    },
  },

  uniforms: {
    // stageWidth and stageHeight are used in the vertex shader to convert the
    // x / y coordinates from the pixel space into the WebGL clip space.
    stageWidth: (context, props) => context.drawingBufferWidth,
    // we can also access context and props with a shorthand
    stageHeight: regl.context('drawingBufferHeight'),
    elapsedSeconds: regl.context('time'),
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
    color: [0.0, 0.0, 0.0, 1.0], // [R, G, B, alpha]
    depth: 1,
  });
  // call a regl command and pass some props to the regl context
  drawDots({
    /**
     * Sinusoidal function.
     * @param {Number} t         Time (in seconds).
     * @param {Number} tau       Period of the sine wave (in seconds).
     * @param {Number} amplitude Amplitude of the sine wave.
     * @param {Number} phi       Phase of the sine wave (in radians).
     * @return {Number} coord    Coordinate
     */
    sineWaveFunction: ({ t, tau = 1, amplitude = 1, phi = 0 }) => {
      // angular frequency (in radians per second)
      const omega = (2 * Math.PI) / tau;
      const coord = amplitude * Math.sin((omega * t) + phi);
      return coord;
    },
  });
});
