/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const path = require('path');
const { promisify } = require('util');
const asyncDone = require('async-done');
const gulp = require('gulp');
const filter = require('gulp-filter');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const typescript = require('gulp-typescript');
const through2 = require('through2');
const stripComments = require('strip-comments');
const babelPluginResourceCJSPaths = require('../tools/babel-plugin-resource-cjs-paths');
const babelPluginResourceJSPaths = require('../tools/babel-plugin-resource-js-paths');

const config = require('./config');

const promisifyStream = promisify(asyncDone);

function buildScripts({ sourceType = 'module' } = {}) {
  const destDir = {
    module: config.jsDestDir,
    script: config.cjsDestDir,
  }[sourceType];

  const plugins = {
    module: [['@babel/plugin-transform-runtime', { useESModules: true, version: '7.3.0' }], babelPluginResourceJSPaths],
    // Ensures `babel-plugin-resource-cjs-paths` runs before `@babel/plugin-transform-modules-commonjs`
    script: [
      ['@babel/plugin-transform-runtime', { useESModules: false, version: '7.3.0' }],
      babelPluginResourceCJSPaths,
      '@babel/plugin-transform-modules-commonjs',
    ],
  }[sourceType];

  return (
    gulp
      .src([`${config.srcDir}/**/*.ts`, `!${config.srcDir}/**/__tests__/*.ts`, `!${config.srcDir}/**/*.d.ts`])
      .pipe(sourcemaps.init())
      .pipe(
        babel({
          presets: ['@babel/preset-modules'],
          // `version: '7.3.0'` ensures `@babel/plugin-transform-runtime` is applied to decorator helper
          plugins,
        })
      )
      // Avoids generating `.js` from interface-only `.ts` files
      .pipe(filter((file) => stripComments(file.contents.toString(), { sourceType: 'module' }).replace(/\s/g, '')))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(destDir))
  );
}

module.exports = {
  modules: {
    async scripts() {
      await Promise.all([promisifyStream(() => buildScripts()), promisifyStream(() => buildScripts({ sourceType: 'script' }))]);
    },

    types() {
      const tsProject = typescript.createProject(path.resolve(__dirname, '../tsconfig.json'));
      const { dts } = gulp
        .src([`${config.srcDir}/**/*.ts`, `!${config.srcDir}/**/__stories__/*.ts`, `!${config.srcDir}/**/__tests__/*.ts`])
        .pipe(sourcemaps.init())
        .pipe(tsProject());
      return dts
        .pipe(
          through2.obj((file, enc, done) => {
            file.contents = Buffer.from(`${file.contents.toString()}\n//# sourceMappingURL=${path.basename(file.path)}.map\n`);
            done(null, file);
          })
        )
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.jsDestDir));
    },
  },
};
