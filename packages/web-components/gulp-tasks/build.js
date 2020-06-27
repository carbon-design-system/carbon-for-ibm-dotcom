/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { readFile } = require('fs');
const path = require('path');
const { promisify } = require('util');
const asyncDone = require('async-done');
const gulp = require('gulp');
const filter = require('gulp-filter');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cleanCSS = require('gulp-clean-css');
const prettier = require('gulp-prettier');
const typescript = require('gulp-typescript');
const header = require('gulp-header');
const through2 = require('through2');
const stripComments = require('strip-comments');
const autoprefixer = require('autoprefixer');
const rtlcss = require('rtlcss');
const replaceExtension = require('replace-ext');
const babelPluginResourceJSPaths = require('../tools/babel-plugin-resource-js-paths');
const fixHostPseudo = require('../tools/postcss-fix-host-pseudo');
const descriptorFromSVG = require('../tools/descriptor-from-svg');
const createSVGResultFromIconDescriptor = require('../tools/svg-result-from-icon-descriptor');

const config = require('./config');

const readFileAsync = promisify(readFile);
const promisifyStream = promisify(asyncDone);

const cssStream = ({ banner, dir }) =>
  gulp
    .src(`${config.srcDir}/**/*.scss`)
    .pipe(
      header(`
        $feature-flags: (
          enable-css-custom-properties: true
        );
      `)
    )
    .pipe(
      sass({
        includePaths: ['node_modules', path.resolve(__dirname, '../../../node_modules')],
      })
    )
    .pipe(
      postcss([
        fixHostPseudo(),
        autoprefixer({
          // TODO: Optimize for modern browsers here
          browsers: ['last 1 version', 'Firefox ESR', 'ie >= 11'],
        }),
        ...(dir === 'rtl' ? [rtlcss] : []),
      ])
    )
    .pipe(cleanCSS())
    .pipe(
      through2.obj((file, enc, done) => {
        file.contents = Buffer.from(`
        import { css } from 'lit-element';
        export default css([${JSON.stringify(String(file.contents))}]);
      `);
        file.path = replaceExtension(file.path, dir === 'rtl' ? '.rtl.css.js' : '.css.js');
        done(null, file);
      })
    )
    .pipe(prettier())
    .pipe(header(banner))
    .pipe(gulp.dest(path.resolve(config.jsDestDir)));

module.exports = {
  modules: {
    async css() {
      const banner = await readFileAsync(path.resolve(__dirname, '../../../tasks/license.js'), 'utf8');
      await Promise.all([promisifyStream(() => cssStream({ banner })), promisifyStream(() => cssStream({ banner, dir: 'rtl' }))]);
    },

    async icons() {
      const banner = await readFileAsync(path.resolve(__dirname, '../../../tasks/license.js'), 'utf8');
      await promisifyStream(() =>
        gulp
          .src([`${config.iconsDir}/**/*.svg`])
          .pipe(
            through2.obj(async (file, enc, done) => {
              const descriptor = await descriptorFromSVG(String(file.contents));
              file.contents = Buffer.from(`
                import { svg } from 'lit-html';
                import spread from 'carbon-custom-elements/es/globals/directives/spread';
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
    },

    scripts() {
      return (
        gulp
          .src([
            `${config.srcDir}/**/*.ts`,
            `!${config.srcDir}/**/__stories__/*.ts`,
            `!${config.srcDir}/**/__tests__/*.ts`,
            `!${config.srcDir}/**/*.d.ts`,
          ])
          .pipe(sourcemaps.init())
          .pipe(
            babel({
              presets: ['@babel/preset-modules'],
              // `version: '7.3.0'` ensures `@babel/plugin-transform-runtime` is applied to decorator helper
              plugins: [babelPluginResourceJSPaths],
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

  sass() {
    return gulp.src([`${config.srcDir}/**/*.scss`, `!${config.srcDir}/**/*-story.scss`]).pipe(gulp.dest(config.sassDestDir));
  },
};
