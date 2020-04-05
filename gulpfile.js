const gulp = require('gulp')
const scss = require('./scripts/scss')
const stripVarToJson = require('./scripts/scss-vars-to-json')

const { watch, series } = require('gulp');

exports.watch = () => {
  watch(['src/common/custom/vars.scss', 'src/**/vars.scss'], stripVarToJson.watch())
  watch('src/**/*.scss', scss.watch())
}

exports.build = series(scss.build('dist'))

exports.default = cb => {
  console.log('hello')

  cb()
}
