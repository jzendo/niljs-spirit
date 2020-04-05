const { src, dest } = require('gulp')
const through = require('through2');
const PluginError = require('plugin-error');
const replaceExtension = require('replace-ext');
const { parse } = require('sass-variable-parser');
const path = require('path');
const fs = require('fs')

const localVarFileName = 'vars.scss'

const options = {
  // defaults to true
  camelCase: false,
  // optional, only if there are @imports with relative paths
  cwd: path.resolve(__dirname, 'node_modules/bulma/sass/utilities'),
  // true means indented sass syntax, defaults to false ('scss' syntax)
  indented: true,
};

const getJson = filePath => {
  const variables = parse(
    fs.readSync(filePath),
    options
  );

  return JSON.stringify(variables, null, 2)
}

const stripVarsToJson = (options = {}) =>
  through.obj((file, enc, cb) => { // eslint-disable-line consistent-return
    if (file.isNull()) {
      return cb(null, file);
    }

    if (file.isStream()) {
      return cb(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
    }

    if (!file.contents.length) {
      file.contents = Buffer.from("{}")
      file.path = replaceExtension(file.path, '.json'); // eslint-disable-line no-param-reassign
      return cb(null, file);
    }

    const json = getJson(file.path)
    file.contents = Buffer.from(json)
    file.path = replaceExtension(file.path, '.json');

    return cb(null, file);
  })

/*
  const colors = scssToJson(filePath, {
    dependencies: [{path: customVarPath}]
  });
*/

const watchScssVariables = (destDir = 'src') => () =>
  src(['src/**/' + localVarFileName])
    .pipe(stripVarsToJson())
    .pipe(dest(destDir))


exports.watch = watchScssVariables
