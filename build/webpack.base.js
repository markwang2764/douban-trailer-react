const path = require('path')
const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtracTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
module.exports = {

  mode: 'development',

  entry: {
    index: [
      'webpack-hot-middleware/client?reload=true',
      path.resolve(__dirname, '../src/app.js'),
    ],
    vendors: ['react', 'react-dom']
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[hash].[name].js',
    chunkFilename: 'chunks/[name].[chunkhash].min.js'
  },
  optimization: {
    // minimizer: [
    //   new UglifyJsPlugin({
    //     uglifyOptions: config.build.uglifyConfig
    //   })
    // ],
    // 分割代码块
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        // default: {
        //   name: 'default',
        //   minChunks: 2,
        //   priority: -20,
        //   // chunks: 'initial',
        //   reuseExistingChunk: true,
        // },
        // // commons: {
        // //   name: 'commons',
        // //   chunks: 'initial',
        // //   minChunks: 2
        // // },
        // vendors: {
        //   name: 'vendors',
        //   test: /[\\/]node_modules[\\/]/,
        //   priority: -10
        // }
      }
    }
    // runtimeChunk: true
  },
  resolve: {
    alias: {
      '@routes': path.resolve(__dirname, '../src/routes'),
      '@util': path.resolve(__dirname, '../src/util'),
    },
    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx', '.ts', '.css', '.less'],
    modules: [
      path.resolve(__dirname, 'node_modules'), // 指定当前目录下的 node_modules 优先查找
      'node_modules', // 如果有一些类库是放在一些奇怪的地方的，你可以添加自定义的路径或者目录
    ]
  },

  module: {
    rules: [{
        test: /\.(jsx|js)$/,
        use: {
          loader: 'babel-loader'
        },
        include: [
          path.resolve(__dirname, '../src')
        ],
      },
      {
        test: /\.(ts)$/,
        use: {
          loader: "ts-loader"
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ExtracTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.less$/,
        use: ExtracTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        use: {
          loader: 'file-loader',
          options: {
            limit: 2048,
            name: '[path][name].[ext]',
            publicPath: 'assets/',
            outputPath: 'images/'
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 2048,
            name: '[path][name].[ext]',
            publicPath: 'assets/',
            outputPath: 'images/'
          }
        }
      },
    ]
  },

  plugins: [
    new ManifestPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html')
    }),
    new webpack.HotModuleReplacementPlugin()
    // new ExtracTextPlugin({
    //   filename: 'stylesheets/[name].css'
    // }),

  ]
}
