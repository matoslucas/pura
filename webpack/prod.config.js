require('babel-polyfill')

var path = require('path')
var webpack = require('webpack')
var CleanPlugin = require('clean-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var strip = require('strip-loader')
var autoprefixer = require('autoprefixer')

var projectRootPath = path.resolve(__dirname, '../')
var assetsPath = path.resolve(projectRootPath, './static/dist')

var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(
  require('./webpack-isomorphic-tools')
)

module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    main: [
      './src/main/helpers/fontConfig.font',
      './src/main/assets/css/main.styl',
      './src/main/client.js',
    ],
  },
  output: {
    path: assetsPath,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/dist/',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [strip.loader('debug', 'console.log'), 'babel'],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader!postcss!stylus-loader'
        ),
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=8192&name=fonts/[name].[ext]',
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        include: path.resolve(__dirname, '../src/main/assets/img/home-lifestyle-slider'),
        loader: 'file-loader',
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        include: path.resolve(__dirname, '../src/'),
        exclude: path.resolve(__dirname, '../src/main/assets/img/home-lifestyle-slider'),
        loader: 'url-loader?limit=10240',
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('svg'),
        loader: 'url-loader?limit=10240',
      },
      {
        test: /\.font.js$/,
        exclude: /node_modules/,
        loader:
          'style-loader?css-loader!url-loader!file-loader!file?name=iconfont.css!fontgen?formats=woff,eot,ttf&fileName=iconfont/iconfont[ext]',
      },
    ],
  },
  postcss: function() {
    return [autoprefixer({ browsers: ['last 2 versions'] })]
  },
  progress: true,
  resolve: {
    modulesDirectories: ['src', 'node_modules'],
    extensions: ['', '.json', '.js'],
  },
  plugins: [
    new CleanPlugin([assetsPath], { root: projectRootPath }),

    // css files from the extract-text-plugin loader
    new ExtractTextPlugin('[name]-[chunkhash].css', { allChunks: true }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },

      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false,
      __INTERCOM_APP_ID__: JSON.stringify(process.env.INTERCOM_APP_ID || null),
    }),

    // ignore dev config
    new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),

    // optimizations
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),

    webpackIsomorphicToolsPlugin,
  ],
}
