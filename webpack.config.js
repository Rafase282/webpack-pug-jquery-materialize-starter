'use strict'

const webpack = require('webpack')
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

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
    main: PATHS.app
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    contentBase: PATHS.build,
    inline: true,
    hot: true,
    stats: 'errors-only',
    historyApiFallback: true,
    port: process.env.PORT,
    host: process.env.HOST
  },
  module: {
    loaders: [
      {
        test: /\.pug/,
        include: PATHS.index,
        loaders: [
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
  },
  plugins: [
    new htmlWebpackPlugin({
      template: PATHS.index
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
