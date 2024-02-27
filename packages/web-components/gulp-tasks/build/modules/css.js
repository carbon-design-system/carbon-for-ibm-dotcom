/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const asyncDone = require('async-done');
const gulp = require('gulp');
// This can be changed to `dart-sass` once Carbon V11 is used require('sass')
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const prettier = require('gulp-prettier');
const header = require('gulp-header');
const through2 = require('through2');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const replaceExtension = require('replace-ext');
const fixHostPseudo = require('../../../tools/postcss-fix-host-pseudo');

const config = require('../../config');

const readFileAsync = promisify(fs.readFile);
const promisifyStream = promisify(asyncDone);

/**
 * Builds the CSS module file
 *
 * @param {object} [options] The build options.
 * @param {string} [options.banner] License banner
 * @returns {*} Gulp stream
 * @private
 */
const _cssStream = ({ banner }) =>
  gulp
    .src([`${config.srcDir}/**/*.scss`, `!${config.srcDir}/**/ibmdotcom-web-components-*.scss`])
    .pipe(
      header(`
        $feature-flags: (
          enable-css-custom-properties: true
        );
      `)
    )
    .pipe(
      sass({
        includePaths: [
          path.resolve(__dirname, '../../../node_modules'),
          path.resolve(__dirname, '../../../../../node_modules'),
          path.resolve(__dirname, '../../../../../node_modules/@carbon/styles/node_modules'),
        ],
      })
    )
    .pipe(
      postcss([
        fixHostPseudo(),
        autoprefixer({
          overrideBrowsersList: [
            '> 0.5%', 'last 2 versions', 'Firefox ESR', 'not dead',
          ],
        }),
        cssnano(),
      ])
    )
    .pipe(
      through2.obj((file, enc, done) => {
        file.contents = Buffer.from(`
        import { css } from 'lit';
        export default css([${JSON.stringify(String(file.contents))}]);
      `);
        file.path = replaceExtension(file.path, '.css.js');
        done(null, file);
      })
    )
    .pipe(prettier())
    .pipe(header(banner))
    .pipe(gulp.dest(path.resolve(config.jsDestDir)));

/**
 * Builds the CSS
 *
 * @returns {Promise<void>} Stream
 */
async function css() {
  const banner = await readFileAsync(path.resolve(__dirname, '../../../../../tasks/license.js'), 'utf8');
  await Promise.all([promisifyStream(() => _cssStream({ banner }))]);
}

gulp.task('build:modules:css', css);
