/**
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const path = require('path');
const { promisify } = require('util');
const asyncDone = require('async-done');
const gulp = require('gulp');
const through2 = require('through2');
const globby = require('globby');
const gitignoreToGlob = require('gitignore-to-glob');

const reLicenseText = require('../tasks/license-text');

const promisifyStream = promisify(asyncDone);

/**
 * @returns {NodeJS.ReadWriteStream} A Gulp plugin that checks if the Vinyl file content has a license header.
 */
const gulpCheckLicense = () => {
  const filesWithError = [];
  return through2.obj(
    (file, enc, done) => {
      if (
        file.contents &&
        file.contents.length > 0 &&
        !reLicenseText.test(file.contents)
      ) {
        filesWithError.push(file.path);
      }
      done(null, file);
    },
    done => {
      if (filesWithError.length > 0) {
        done(
          new Error(
            `Could not find license text in:\n${filesWithError.join('\n')}`
          )
        );
      } else {
        done();
      }
    }
  );
};

module.exports = {
  license: {
    async src() {
      const paths = await globby(path.resolve(__dirname, '../**/.gitignore'), {
        cwd: path.resolve(__dirname, '..'),
        gitignore: true,
      });
      const glob = paths.reduce(
        (acc, item) => acc.concat(gitignoreToGlob(item)),
        [
          '**/*.{js,ts,tsx,scss,html}',
          '!**/examples/**',
          '!**/examples-scaffold/**',
        ]
      );
      await promisifyStream(() =>
        gulp.src(glob, { allowEmpty: true }).pipe(gulpCheckLicense())
      );
    },
  },
};
