import "../css/main.css";

const canvas = document.getElementById("regl-canvas");
const regl = require("regl")({
  // Alternative: use this canvas to create a new WebGLRenderingContext that it
  // renders into.
  canvas,
});

// Set the size of the drawingbuffer (i.e. how many pixels are in the canvas)
// This has NOTHING to do with the size the canvas is displayed (which is set in
// the CSS)
// https://webglfundamentals.org/webgl/lessons/webgl-resizing-the-canvas.html
canvas.width = 400;
canvas.height = 400;

// https://github.com/regl-project/regl-camera/blob/master/README.md
const camera = require("regl-camera")(regl, {
  center: [0, 0, 0],
  distance: 1.2, // distance from the camera eye to the center
  fovy: 2, // field of view angle in y direction (defaults to Math.PI / 4)
});

// define a regl command to use in the frame loop
const drawSprite = regl({
  vert: `
    precision mediump float;

    // per vertex attributes
    attribute vec3 xyz;
    attribute vec2 offset;
    attribute vec3 color;

    // variables to send to the fragment shader
    varying vec2 uv;
    varying vec3 col;

    // values that are the same for all vertices
    uniform float size;
    uniform mat4 projection, view;

    void main () {
      uv = offset;
      col = color;
      gl_Position = projection * (view * vec4(xyz, 1) + vec4(size * offset, 0, 0));
    }
  `,
  frag: `
    precision mediump float;

    // variables received from the vertex shader
    varying vec2 uv;
    varying vec3 col;

    void main () {
      if (length(uv) > 1.0) discard;
      // gl_FragColor is a special variable that holds the color of a pixel
      gl_FragColor = vec4(col, 1);
    }
  `,
  attributes: {
    xyz: (context) => {
      // elapsed seconds since the start of the application
      const t = context.time;
      // amplitude of the sine wave
      const amplitude = 1;
      // period of the sine wave (in seconds)
      const tau = 1;
      // angular frequency (in radians per second)
      const omega = (2 * Math.PI) / tau;
      // phase of the sine wave (in radians)
      const fi = 0;

      const c1 = amplitude * Math.cos(omega * t + fi);
      const s1 = amplitude * Math.sin(omega * t + fi);
      const c2 = amplitude * Math.cos(omega * t + fi);
      const s2 = amplitude * Math.sin(omega * t + fi);
      const c3 = Math.cos(t + (4 * Math.PI) / 3);
      const s3 = Math.sin(t + (4 * Math.PI) / 3);

      const vertices = [
        // vertices of the 1st sprite
        [c1, 0, s1],
        [c1, 0, s1],
        [c1, 0, s1],
        [c1, 0, s1],
        [c1, 0, s1],
        [c1, 0, s1],
        // vertices of the 2nd sprite
        // [0, s2, c2], [0, s2, c2], [0, s2, c2], [0, s2, c2], [0, s2, c2], [0, s2, c2],
        [0, s2, 0],
        [0, s2, 0],
        [0, s2, 0],
        [0, s2, 0],
        [0, s2, 0],
        [0, s2, 0],
        // vertices of the 3rd sprite
        [0, c3, s3],
        [0, c3, s3],
        [0, c3, s3],
        [0, c3, s3],
        [0, c3, s3],
        [0, c3, s3],
      ];
      return vertices;
    },

    // Offset of the primitives to draw
    offset: [
      // offsets of the 1st sprite
      [-1, -1],
      [1, -1],
      [-1, 1],
      [-1, 1],
      [1, -1],
      [1, 1],
      // offsets of the 2nd sprite
      [-1, -1],
      [1, -1],
      [-1, 1],
      [-1, 1],
      [1, -1],
      [1, 1],
      // offsets of the 3rd sprite
      [-1, -1],
      [1, -1],
      [-1, 1],
      [-1, 1],
      [1, -1],
      [1, 1],
    ],

    color: [
      [1, 0, 0],
      [1, 0, 0],
      [1, 0, 0],
      [1, 0, 0],
      [1, 0, 0],
      [1, 0, 0],
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
      [0, 0, 1],
      [0, 0, 1],
      [0, 0, 1],
      [0, 0, 1],
      [0, 0, 1],
      [0, 0, 1],
    ],
  },
  uniforms: { size: 0.1 },
  primitive: "triangles",
  count: 18, // vertices.length
});

// from the 2nd iteration of the frame loop, camera will be attached to context
regl.frame((context) => {
  // https://github.com/regl-project/regl/blob/gh-pages/API.md#clear-the-draw-buffer
  regl.clear({
    color: [0.0, 0.0, 0.0, 1.0],
    depth: 1,
  });
  camera((state) => {
    // state is the state of the camera
    // console.log(state);
    // if (!state.dirty) return;
    drawSprite();
  });
});
