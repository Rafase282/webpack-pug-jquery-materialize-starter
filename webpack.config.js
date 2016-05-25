'use strict'

const webpack = require('webpack')
const path = require('path')

const PATHS = {
  app: path.resolve(__dirname, 'src/client'),
  index: path.resolve(__dirname, 'src'),
  build: path.resolve(__dirname, 'dist'),
  styles: path.resolve(__dirname, 'src/styles'),
  materialize: {
    fonts: path.resolve(__dirname, 'node_modules/materialize-css/fonts')
  }
}

module.exports = {
  resolve: {
    extensions: ['', '.js', '.pug', '.scss']
  },
  entry: {
    main: PATHS.app,
    index: PATHS.index
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.pug/,
        include: PATHS.index,
        loaders: [
          'file?name=[name].html',
          'extract',
          'pug-html'
        ]
      },

      {
        test: /\.scss/,
        include: PATHS.styles,
        loaders: [
          'style',
          'css',
          'sass'
        ]
      },

      {
        test: /\.((woff2?|svg)(\?v=\d+\.\d+\.\d+))?$|(woff2?|svg|jpe?g|png|gif|ico)$/,
        include: [PATHS.styles, PATHS.materialize.fonts],
        loader: 'url?name=fonts/[name].[ext]&limit=10000'
      },

      {
        test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot)$/,
        include: [PATHS.styles, PATHS.materialize.fonts],
        loader: 'file?name=fonts/[name].[ext]'
      }
    ]
  }
}
