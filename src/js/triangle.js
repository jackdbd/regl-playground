const makeDrawTriangle = (reglContext) => {
  const reglDrawCommand = reglContext({
    // define a vertex shader program. This program tells the GPU where to draw the vertices.
    vert: `
      precision mediump float;
  
      uniform float scale;
      attribute vec2 position;
      attribute vec3 color;
      varying vec3 frag_color;  // varying to pass to the fragment shader
  
      float z = 0.0;
      float w = 1.0;
  
      void main () {
        frag_color = color;
        gl_Position = vec4(position * scale, z, w);
      }
    `,
    // define a fragment shader program. This program tells the GPU what color to draw.
    frag: `
      precision mediump float;
  
      varying vec3 frag_color;  // received from the vertex shader
  
      void main () {
        gl_FragColor = vec4(sqrt(frag_color), 1.0);
      }
    `,

    // now that the shaders are defined, we pass the vertices to the GPU
    attributes: {
      position: [
        [1.0, -0.75],
        [0.0, 0.0],
        [-1.0, -1.0],
      ],
      color: reglContext.prop('rgbColors'),
    },
    uniforms: {
      scale: reglContext.prop('scale'),
    },

    // and we tell the GPU how many vertices to draw
    count: 3,
  });
  return reglDrawCommand;
};

// export the regl render command for testing
module.exports = {
  makeDrawTriangle,
};
