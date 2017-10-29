import * as grid from 'pixel-grid';

const data = [
  [0, 1, 1, 0],
  [1, 0, 0, 1],
  [0, 1, 0, 0],
];

const pixels = grid(data, {
  root: document.body,
  size: 50, // size of each pixel
});
pixels.frame(() => {
  // Update pixel grid with new data. Allows you to sync updates with monitor refreshes.
  pixels.update(
    [
      [Math.random(), Math.random(), Math.random(), Math.random()],
      [Math.random(), Math.random(), Math.random(), Math.random()],
      [Math.random(), Math.random(), Math.random(), Math.random()],
    ]);
});
