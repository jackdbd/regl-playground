import { makeDrawTriangle } from '../src/js/triangle'

// Create a headless 32x32 regl instance for testing.
// Note: we need to create a webgl context with preserveDrawingBuffer: true in
// order to read pixels from the drawing buffer.
const width = 32;
const height = 32;
const gl = require('gl')(width, height, { preserveDrawingBuffer: true });
const regl = require('regl')(gl);

// Create a headless draw command and we are ready for some testing
const drawTriangle = makeDrawTriangle(regl);


describe('drawTriangle', () => {

  test('before regl draw command, all pixels are black', () => {
    const pixels = regl.read();
    // create array of all zeros
    const expected = Array.from(new Array(pixels.length), () => 0);
    // pixels is an Object (a Uint8Array), not a JS Array
    expect(Array.from(pixels)).toEqual(expect.arrayContaining(expected));
  });

  test('a blue triangle has neither red nor green pixels', () => {
    drawTriangle({
      scale: 1.0,
      rgbColors: [
        [0.0, 0.0, 1.0], // RGB for the first vertex
        [0.0, 0.0, 1.0], // RGB for the second vertex
        [0.0, 0.0, 1.0], // RGB for the third vertex
      ],
    });

    const rgbaChannels = Array.from(regl.read());
    // channels are arranged in this order: [r, g, b, a, r, g, b, a,...]
    const reds = rgbaChannels.filter((ch, i) => i % 4 === 0);
    const greens = rgbaChannels.filter((ch, i) => i % 4 === 1);
    expect(reds.every(v => v === 0)).toBeTruthy();
    expect(greens.every(v => v === 0)).toBeTruthy();
  });

  test('a blue triangle has some blue pixels', () => {
    drawTriangle({
      scale: 1.0,
      rgbColors: [
        [0.0, 0.0, 1.0],
        [0.0, 0.0, 1.0],
        [0.0, 0.0, 1.0],
      ],
    });

    const rgbaChannels = Array.from(regl.read());
    const blues = rgbaChannels.filter((ch, i) => i % 4 === 2);
    const alphas = rgbaChannels.filter((ch, i) => i % 4 === 3);
    expect(blues).toContain(0);
    expect(blues).toContain(255);
    // we can also use a single assertion:
    const expectedSubsetForAlpha = [0, 255];
    expect(alphas).toEqual(expect.arrayContaining(expectedSubsetForAlpha));
  });

});
