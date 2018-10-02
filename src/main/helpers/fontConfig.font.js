const glob = require('glob').sync

const loadDir = glob('./src/main/assets/iconfont/**/*.svg')
const loadDirArr = Array.prototype.slice.apply(loadDir)
const iconsInDir = loadDirArr.map(elem => {
  return `../${elem.replace('./src/main/', '')}`
})

const fontConfig = {
  fontName: 'iconfont',
  files: iconsInDir,
  baseClass: 'ico',
  classPrefix: 'ico--',
  fixedWidth: true,
}

module.exports = fontConfig
