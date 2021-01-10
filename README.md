# regl-playground

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) [![Build Status](https://travis-ci.org/jackdbd/regl-playground.svg?branch=master)](https://travis-ci.org/jackdbd/regl-playground) [![Code Health](https://landscape.io/github/jackdbd/regl-playground/master/landscape.svg?style=flat)](https://landscape.io/github/jackdbd/regl-playground/master)

Repository to play around with regl.

## Installation

This project was tested on the latest Node.js LTS, version `14.15.4` (it includes a `.nvmrc` file). Switch to the Node.js version specified in `.nvmrc` and install all dependencies with:

```sh
nvm use
yarn
```

Launch the dev server with:

```sh
yarn dev
```

In `webpack.config.js` you can uncomment [BundleAnalyzerPlugin](https://github.com/webpack-contrib/webpack-bundle-analyzer) to debug the webpack bundles for all the webpack [entry points](https://webpack.js.org/concepts/entry-points/).