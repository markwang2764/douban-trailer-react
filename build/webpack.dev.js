const { smart } = require('webpack-merge')
const webpack = require('webpack')
const baseConfig = require('./webpack.base')
const path = require('path')

Object.keys(baseConfig.entry).forEach(function (name) {

  if (name !== 'vendors') {
    baseConfig.entry[name] = baseConfig.entry[name].concat('webpack-hot-middleware/client?reload=true');
  }

});


module.exports = smart(baseConfig, {

  mode: 'development',

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    chunkFilename: 'chunks/[name].[chunkhash].min.js'
  },

  devtool: 'cheap-module-eval-source-map',

  performance: {
    hints: false
  },

  devtool: 'source-map',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
})


 
