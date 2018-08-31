const { smart } = require('webpack-merge')
const webpack = require('webpack')
const baseConfig = require('./webpack.base')

module.exports = smart(baseConfig, {
  mode: 'development',
 
})