const { src, dest } = require('gulp')
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');

const watchScss = (destDir = 'src') => () =>
  src(['src/**/*.scss', '!src/**/vars.scss', '!src/common/**/*.scss'])
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(dest(destDir))

const buildScss = (destDir = 'src') => () =>
  src(['src/**/*.scss', '!src/**/vars.scss', '!src/common/**/*.scss', '!src/**/demo/**'])
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(dest(destDir))

exports.watch = watchScss
exports.build = buildScss
