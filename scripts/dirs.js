const path = require('path')

const currentDir = __dirname

const root = path.resolve(currentDir, '..')
const distDir = path.resolve(currentDir, '../dist')
const srcDir = path.resolve(currentDir, '../src')

module.exports = {
  root: root,
  src: srcDir,
  dist: distDir
}
