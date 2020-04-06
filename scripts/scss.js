const { src, dest } = require('gulp')
const sass = require('gulp-sass')
const sassGlob = require('gulp-sass-glob')
const cssnano = require('gulp-cssnano')

const notAllowedDirs = [
  '!src/**/mixin.scss',
  '!src/**/*.mixin.scss',
  '!src/**/vars.scss',
  '!src/common/**/*.scss'
]

const streamWithPathsAndDestDir = (paths, destDir, pipes = []) => {
  let result = src(paths)
  .pipe(sassGlob())
  .pipe(sass())

  if (pipes && pipes.length) {
    result = pipes.reduce((r, fn) => r.pipe(fn), result)
  }

  return result.pipe(dest(destDir))
}

const watchScss = (destDir = 'src') => () =>
  streamWithPathsAndDestDir([
    'src/**/*.scss',
    ...notAllowedDirs
  ], destDir)

const buildScss = (destDir = 'src') => function buildScss() {
  return streamWithPathsAndDestDir([
    'src/**/*.scss',
    '!src/**/demo/**',
    ...notAllowedDirs
  ], destDir, [
    cssnano()
  ])
}

exports.watch = watchScss
exports.build = buildScss
