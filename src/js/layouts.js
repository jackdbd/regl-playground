// You can mix require and export, but you can't mix import and module.export
// https://github.com/webpack/webpack/issues/4039
import * as d3 from 'd3';

const width = window.innerWidth;
const height = window.innerHeight;

export function greenCircleLayout(oldPoints) {
  const xCenter = width / 2;
  const yCenter = height / 2;
  const xRng = d3.randomUniform(-xCenter, xCenter);
  const yRng = d3.randomUniform(-yCenter, yCenter);
  const points = oldPoints.map((p) => {
    const point = {
      xStart: p.xEnd,
      xEnd: xCenter + xRng(),
      yStart: p.yEnd,
      yEnd: yCenter + yRng(),
      colorStart: p.colorEnd,
      colorEnd: [0, Math.random(), 0],
    };
    return point;
  });
  return points;
}

export function blueNormalLayout(oldPoints) {
  const rng = d3.randomNormal(0, 0.25); // mu, sigma
  const points = oldPoints.map((p) => {
    const xCenter = width / 2;
    const yCenter = height / 2;
    const point = {
      xStart: p.xEnd,
      xEnd: xCenter + (xCenter * rng()),
      yStart: p.yEnd,
      yEnd: yCenter + (yCenter * rng()),
      colorStart: p.colorEnd,
      colorEnd: [0, p.colorStart[1] * 0.5, 0.9],
    };
    return point;
  });
  return points;
}

export function resetLayout(numPoints) {
  const points = d3.range(numPoints).map(() => {
    const { x, y, color } = { x: width / 2, y: height / 2, color: [0, 0, 0] };
    const point = {
      xStart: x,
      xEnd: x,
      yStart: y,
      yEnd: y,
      colorStart: color,
      colorEnd: color,
    };
    return point;
  });
  return points;
}

// If you want to define the functions with const, and export them with
// module.export, you can't use import. Use require instead.
// module.exports = {
//   greenCircleLayout,
//   blueNormalLayout,
//   resetLayout,
// };
