const path = require('path')
const glob = require('glob')
const autoprefixer = require('autoprefixer')
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'))
const config = require('../src/config')
const open = require('open')
const HappyPack = require('happypack')
const fs = require('fs')

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(file => {
    return fs.statSync(path.join(srcpath, file)).isDirectory()
  })
}

const sections = []
const folders = getDirectories(path.resolve(__dirname, '../src/main/components/'))

folders.map(folder => {
  sections.push({
    name: capitalizeFirstLetter(folder),
    components: () => {
      return glob.sync(path.resolve(__dirname, '../src/main/components/' + folder + '/**/*.js'))
      .filter(module => {
        return /\/[A-Z]\w*\.js$/.test(module)
      })
    }
  })
})

module.exports = {
  title: config.app.title,
  serverPort: 3020,
  highlightTheme: 'base16-light',
  styleguideDir: '../static/dist/ui',
  sections,
  getComponentPathLine: componentPath => {
    const name = path.basename(componentPath, '.js')
    const dir = path.dirname(componentPath)
    const library = dir.substr(0, dir.lastIndexOf('/')).slice(7)

    return 'import { ' + name + ' } from \'' + library + '\''
  },
  updateWebpackConfig: webpackConfig => {
    const dir = path.resolve(__dirname, '../src/main/')

    webpackConfig.postcss = () => {
      return [autoprefixer({ browsers: ['last 2 versions'] })]
    }

    webpackConfig.entry.push(path.join(__dirname, '../src/main/assets/css/main.styl'))
    webpackConfig.entry.push(path.join(__dirname, '../src/main/assets/css/ui.styl'))
    webpackConfig.plugins.push(new HappyPack({ id: 'ui', threads: 5, loaders: ['babel'] }))
    webpackConfig.resolve.moduleDirectories.push('src')
    webpackConfig.module.loaders.push(
      {
        test: /\.js?$/,
        include: dir,
        loader: 'happypack/loaders',
      },
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        include: dir,
        loader: 'style-loader!css-loader!postcss!stylus-loader'
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        exclude: /node_modules/,
        include: dir,
        loader: 'url-loader?limit=8192&name=fonts/[name].[ext]'
      }, {
        test: /\.(ttf|eot|woff|woff2)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=8192&name=fonts/[name].[ext]'
      }, {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        include: dir,
        loader: 'url-loader?limit=10240'
      }, {
        test: webpackIsomorphicToolsPlugin.regular_expression('svg'),
        include: dir,
        loader: 'url-loader?limit=10240'
      }
    )
    // open('http://localhost:3020')
    return webpackConfig
  }
}
