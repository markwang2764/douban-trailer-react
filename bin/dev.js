const webpack = require('webpack')
const webpackOptions = require('../build/webpack.base')
const opn = require('opn'); 
const path = require('path')

const compiler = webpack(webpackOptions)

const express = require('express')

const app =express()



const devMiddlerware = require('webpack-dev-middleware')
const hotMiddlerware = require('webpack-hot-middleware')
const proxyMiddleware = require('http-proxy-middleware')
const histroyApiFallback = require('connect-history-api-fallback')
app.use(devMiddlerware(compiler, {
  publicPath: '',
  // stats: 'errors-only',
  logLevel: 'silent', // 隐藏log日志
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
}))
app.use(hotMiddlerware(compiler, {
  log: false
}));

app.use(express.static('.'));


const chalk = require('chalk');
let browserUrl = `http://localhost:3000`
app.listen(3000, () => {
  console.log(chalk.green('server run at port 3000'));
  opn(browserUrl);
})

