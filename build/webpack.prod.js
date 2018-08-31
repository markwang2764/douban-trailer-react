const { smart } = require('webpack-merge')
const webpack = require('webpack')
const baseConfig = require('./webpack.base')

module.exports = smart(baseConfig, {
  mode: 'production',
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /react|loadsh/,
          chunks: 'initial',
          name: 'vendor',
          enforce: true
        }
      }
    }
  }
})