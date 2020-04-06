const { src, dest } = require('gulp')
const through = require('through2')
const PluginError = require('plugin-error')
const replaceExtension = require('replace-ext')
const { parse } = require('sass-variable-parser')
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')

// const dirs = require('./dirs')

const localVarFileName = 'vars.scss'

const getJson = filePath => {
  const options = {
    camelCase: false,
    // NOTE: change cwd !!!
    cwd: path.dirname(filePath),
    indented: true,
  }

  let variables = {}

  // Save prev cwd firstly
  const prev = process.cwd()
  try {
    // Will change cwd
    variables = parse(
      fs.readFileSync(filePath).toString('utf-8'),
      options
    )
  } catch (e) {
    console.log(chalk.red(e.message))
  } finally {
    // Restore prev cwd
    process.chdir(prev)

  }

  return JSON.stringify(variables, null, 2)
}

const stripVarsToJson = (options = {}) =>
  through.obj((file, enc, cb) => { // eslint-disable-line consistent-return
    if (file.isNull()) {
      return cb(null, file)
    }

    if (file.isStream()) {
      return cb(new PluginError(PLUGIN_NAME, 'Streaming not supported'))
    }

    if (!file.contents.length) {
      file.contents = Buffer.from("{}")
      file.path = replaceExtension(file.path, '.json') // eslint-disable-line no-param-reassign
      return cb(null, file)
    }

    const json = getJson(file.path) || '{}'

    file.contents = Buffer.from(json)
    file.path = replaceExtension(file.path, '.json')

    return cb(null, file)
  })

const watchScssVariables = (destDir = 'src') => () =>
  src('src/**/' + localVarFileName)
    .pipe(stripVarsToJson())
    .pipe(dest(destDir))

exports.watch = watchScssVariables
