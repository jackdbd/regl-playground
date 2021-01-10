import "../css/one-shot-rendering.css";
import { makeDrawTriangle } from "./triangle";

// -------------------------------------------------------------------------- //
const container = document.getElementById("regl-canvas-container");
const regl = require("regl")({
  container,
});

// create a regl draw command by passing a regl context
const drawTriangle = makeDrawTriangle(regl);
// In one shot rendering the command is executed once and immediately.
drawTriangle({
  scale: 1.0,
  rgbColors: [
    [1.0, 0.0, 0.0],
    [0.0, 1.0, 0.0],
    [0.0, 0.0, 1.0],
  ],
});

// -------------------------------------------------------------------------- //
// // this is what we are testing in one-shot-rendering.spec.js
// const canvas = document.getElementById('regl-canvas');
// const regl = require('regl')({
//   canvas,
// });
// canvas.width = 32;
// canvas.height = 32;
// const drawTriangle = makeDrawTriangle(regl);

// drawTriangle(
//   {
//     scale: 1.0,
//     // a blue triangle
//     rgbColors: [
//       [0.0, 0.0, 1.0],
//       [0.0, 0.0, 1.0],
//       [0.0, 0.0, 1.0],
//     ],
//   },
// );
