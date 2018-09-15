const { smart } = require('webpack-merge')
const webpack = require('webpack')
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");

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

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://${host}:${port}`],
        notes: ['Some additionnal notes to be displayed unpon successful compilation']
      },
      // should the console be cleared between each compilation?
      // default is true
      clearConsole: true
    }),
    new webpack.DefinePlugin({
      DEBUG: true,
      VERSION: '1'
    })
  ]
})


 
