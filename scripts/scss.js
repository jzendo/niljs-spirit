const { src, dest } = require('gulp')
const sass = require('gulp-sass')
const sassGlob = require('gulp-sass-glob')

const notAllowedDirs = [
  '!src/**/mixin.scss',
  '!src/**/*.mixin.scss',
  '!src/**/vars.scss',
  '!src/common/**/*.scss'
]

const streamWithPathsAndDestDir = (paths, destDir) =>
  src(paths)
  .pipe(sassGlob())
  .pipe(sass())
  .pipe(dest(destDir))

const watchScss = (destDir = 'src') => () =>
  streamWithPathsAndDestDir([
    'src/**/*.scss',
    ...notAllowedDirs
  ], destDir)

const buildScss = (destDir = 'src') => () =>
  streamWithPathsAndDestDir([
    'src/**/*.scss',
    '!src/**/demo/**',
    ...notAllowedDirs
  ], destDir)

exports.watch = watchScss
exports.build = buildScss
