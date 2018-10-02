require('babel-polyfill')

var fs = require('fs')
var path = require('path')
var webpack = require('webpack')
var assetsPath = path.resolve(__dirname, '../static/dist')
var config = require('../src/config')
var host = config.host
var port = +process.env.PORT + 1 || 3001
var autoprefixer = require('autoprefixer')
var HappyPack = require('happypack')
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(
  require('./webpack-isomorphic-tools')
)

var babelrc = fs.readFileSync('./.babelrc')
var babelrcObject = {}

try {
  babelrcObject = JSON.parse(babelrc)
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.')
  console.error(err)
}

var babelrcObjectDevelopment =
  (babelrcObject.env && babelrcObject.env.development) || {}

var combinedPlugins = babelrcObject.plugins || []
combinedPlugins = combinedPlugins.concat(babelrcObjectDevelopment.plugins)

var babelLoaderQuery = Object.assign(
  {},
  babelrcObjectDevelopment,
  babelrcObject,
  { plugins: combinedPlugins }
)
delete babelLoaderQuery.env

babelLoaderQuery.plugins = babelLoaderQuery.plugins || []
var reactTransform = null
for (var i = 0; i < babelLoaderQuery.plugins.length; ++i) {
  var plugin = babelLoaderQuery.plugins[i]
  if (Array.isArray(plugin) && plugin[0] === 'react-transform') {
    reactTransform = plugin
  }
}

if (!reactTransform) {
  reactTransform = ['react-transform', { transforms: [] }]
  babelLoaderQuery.plugins.push(reactTransform)
}

if (!reactTransform[1] || !reactTransform[1].transforms) {
  reactTransform[1] = Object.assign({}, reactTransform[1], { transforms: [] })
}

reactTransform[1].transforms.push({
  transform: 'react-transform-hmr',
  imports: ['react'],
  locals: ['module'],
})

module.exports = {
  devtool: 'cheap-module-source-map',
  context: path.resolve(__dirname, '..'),
  entry: {
    main: [
      'webpack-hot-middleware/client?path=http://' +
        host +
        ':' +
        port +
        '/__webpack_hmr',
      './src/main/helpers/fontConfig.font',
      './src/main/assets/css/main.styl',
      './src/main/client.js',
    ],
  },
  output: {
    path: assetsPath,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: 'http://' + host + ':' + port + '/dist/',
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)\/|fontConfig.font.js$/,
        loaders: ['happypack/loader'],
      },
      {
        test: /\.json$/,
        include: path.resolve(__dirname, '../src/'),
        loader: 'json-loader',
      },
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, '../src/'),
        loader: 'style-loader!css-loader!postcss!stylus-loader',
      },
      {
        test: /\.font.js$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, '../src/main/helpers'),
        loader:
          'style-loader!url-loader!file-loader!file?name=iconfont.css!fontgen?formats=woff,eot,ttf&fileName=iconfont/iconfont[ext]',
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, '../src/'),
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
        include: path.resolve(__dirname, '../src/'),
        loader: 'url-loader?limit=10240',
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true,
      __INTERCOM_APP_ID__: JSON.stringify(process.env.INTERCOM_APP_ID || null),
    }),
    new HappyPack({
      threads: 5,
      loaders: ['babel?' + JSON.stringify(babelLoaderQuery)],
    }),
    webpackIsomorphicToolsPlugin.development(),
  ],
}
