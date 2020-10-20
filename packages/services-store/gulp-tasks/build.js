/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const path = require('path');
const gulp = require('gulp');
const filter = require('gulp-filter');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const typescript = require('gulp-typescript');
const through2 = require('through2');
const stripComments = require('strip-comments');
const babelPluginResourceJSPaths = require('../tools/babel-plugin-resource-js-paths');

const config = require('./config');

module.exports = {
  modules: {
    scripts() {
      return (
        gulp
          .src([`${config.srcDir}/**/*.ts`, `!${config.srcDir}/**/__tests__/*.ts`, `!${config.srcDir}/**/*.d.ts`])
          .pipe(sourcemaps.init())
          .pipe(
            babel({
              presets: ['@babel/preset-modules'],
              // `version: '7.3.0'` ensures `@babel/plugin-transform-runtime` is applied to decorator helper
              plugins: [
                ['@babel/plugin-transform-runtime', { useESModules: true, version: '7.3.0' }],
                babelPluginResourceJSPaths,
              ],
            })
          )
          // Avoids generating `.js` from interface-only `.ts` files
          .pipe(filter(file => stripComments(file.contents.toString(), { sourceType: 'module' }).replace(/\s/g, '')))
          .pipe(sourcemaps.write('.'))
          .pipe(gulp.dest(config.jsDestDir))
      );
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
