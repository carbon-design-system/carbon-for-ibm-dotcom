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
const rename = require('gulp-rename');
const prettier = require('gulp-prettier');
const header = require('gulp-header');
const through2 = require('through2');
const descriptorFromSVG = require('../../../tools/descriptor-from-svg');
const createSVGResultFromIconDescriptor = require('../../../tools/svg-result-from-icon-descriptor');

const config = require('../../config');

const readFileAsync = promisify(fs.readFile);
const promisifyStream = promisify(asyncDone);

/**
 * Builds the icons module
 *
 * @returns {Promise<void>} Gulp stream
 */
async function icons() {
  const banner = await readFileAsync(path.resolve(__dirname, '../../../../../tasks/license.js'), 'utf8');
  await promisifyStream(() =>
    gulp
      .src([`${config.iconsDir}/**/*.svg`])
      .pipe(
        through2.obj(async (file, enc, done) => {
          const descriptor = await descriptorFromSVG(String(file.contents));
          file.contents = Buffer.from(`
                import { svg } from 'lit-html';
                import spread from '@carbon/carbon-web-components/es/globals/directives/spread.js';
                const svgResultIBMdotcomIcon = ${createSVGResultFromIconDescriptor(descriptor)};
                export default svgResultIBMdotcomIcon;
              `);
          done(null, file);
        })
      )
      .pipe(
        rename(filePath => {
          filePath.extname = '.js';
        })
      )
      .pipe(prettier())
      .pipe(header(banner))
      .pipe(gulp.dest(path.resolve(config.jsDestDir, 'icons')))
  );
}

gulp.task('build:modules:icons', icons);
