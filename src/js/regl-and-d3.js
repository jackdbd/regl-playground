// import * as d3 from 'd3';
import { greenCircleLayout, blueNormalLayout, resetLayout } from './layouts';
import '../css/main.css';

const vertexShader = require('../glsl/vertex/d3-layouts.glsl');
const fragmenteShader = require('../glsl/fragment/d3-layouts.glsl');

const width = window.innerWidth;
const height = window.innerHeight;

// use a generator to cycle through all layout functions
const layouts = [greenCircleLayout, blueNormalLayout];
function* layoutGeneratorFunc() {
  let index = 0;
  while (true) {
    yield layouts[index];
    index = (index + 1) % layouts.length;
  }
}
const layoutCycler = layoutGeneratorFunc();

// function to compile and return a drawPoints regl func
const makeDrawPoints = (regl, points) => {
  const drawPoints = regl({
    frag: fragmenteShader,
    vert: vertexShader,

    attributes: {
      // each of these gets mapped to a single entry for each of the points.
      // this means the vertex shader will receive just the relevant value for a given point.
      positionStart: points.map(d => [d.xStart, d.yStart]),
      positionEnd: points.map(d => [d.xEnd, d.yEnd]),
      colorStart: points.map(d => d.colorStart),
      colorEnd: points.map(d => d.colorEnd),
    },

    uniforms: {
      // by using `regl.prop` to pass these in, we can specify them as arguments
      // to our drawPoints function
      pointWidth: regl.prop('pointWidth'),
      // regl actually provides these as viewportWidth and viewportHeight but I
      // am using these outside and I want to ensure they are the same numbers,
      // so I am explicitly passing them in.
      stageWidth: regl.prop('stageWidth'),
      stageHeight: regl.prop('stageHeight'),
      duration: regl.prop('duration'),
      // time in milliseconds since the prop startTime (i.e. time elapsed)
      // note that `time` is passed by regl whereas `startTime` is a prop passed
      // to the drawPoints function.
      elapsed: ({ time }, { startTime = 0 }) => (time - startTime) * 1000,
    },

    count: points.length,
    primitive: 'points',
  });
  return drawPoints;
};

const animate = (reglContext, oldPoints, layoutFunc, duration = 2000, pointWidth = 2) => {
  // Call layout function on old points to get new points
  const points = layoutFunc(oldPoints);
  const drawPoints = makeDrawPoints(reglContext, points);

  let startTime = null; // in seconds
  // Update the callback in regl.frame so that it gets the duration and start
  // time of the animation, and knows when it can switch to the next animation.
  const frameLoop = reglContext.frame(({ time }) => {
    // keep track of start time so we can get time elapsed
    // this is important since time doesn't reset when starting new animations
    if (startTime === null) {
      startTime = time;
    }

    // clear the buffer
    reglContext.clear({
      // background color (black)
      color: [0, 0, 0, 1],
      depth: 1,
    });

    // the parameters passed here will be available in drawPoints via `regl.prop`
    drawPoints({
      pointWidth,
      stageWidth: width,
      stageHeight: height,
      duration, // milliseconds
      startTime,
    });

    if (time - startTime > (duration / 1000)) {
      // console.log('done animating, moving to next layout');
      // We are done with this layout, so cancel the loop and call animate with
      // the next layout
      frameLoop.cancel();
      animate(reglContext, points, layoutCycler.next().value);
    }
  });
};

const main = (err, reglContext) => {
  const numPoints = 1000;
  const points = resetLayout(numPoints);
  animate(reglContext, points, layoutCycler.next().value);
};

// create full screen canvas and WebGLRenderingContext
const container = document.getElementById('regl-canvas-container');
const regl = require('regl')({
  // container element which regl inserts a canvas into (default: document.body)
  container,
  // profile: true,
  // callback to call after the application loads
  onDone: main,
});
