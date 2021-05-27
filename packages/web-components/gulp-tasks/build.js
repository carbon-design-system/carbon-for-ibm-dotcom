/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
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
const prettier = require('gulp-prettier');
const typescript = require('gulp-typescript');
const header = require('gulp-header');
const through2 = require('through2');
const stripComments = require('strip-comments');
const autoprefixer = require('autoprefixer');
const rtlcss = require('rtlcss');
const cssnano = require('cssnano');
const replaceExtension = require('replace-ext');
const { rollup } = require('rollup');
// eslint-disable-next-line max-len
const babelPluginScanCreateReactCustomElementTypeCandidates = require('../tools/babel-plugin-scan-create-react-custom-element-type-candidates');
const babelPluginCreateReactCustomElementType = require('../tools/babel-plugin-create-react-custom-element-type');
const babelPluginCreateReactCustomElementTypeDef = require('../tools/babel-plugin-create-react-custom-element-type-def');
const babelPluginResourceJSPaths = require('../tools/babel-plugin-resource-js-paths');
const babelPluginResourceCJSPaths = require('../tools/babel-plugin-resource-cjs-paths');
const fixHostPseudo = require('../tools/postcss-fix-host-pseudo');
const descriptorFromSVG = require('../tools/descriptor-from-svg');
const createSVGResultFromIconDescriptor = require('../tools/svg-result-from-icon-descriptor');
const getRollupConfig = require('../tools/get-rollup-config');

const config = require('./config');

const readFileAsync = promisify(readFile);
const promisifyStream = promisify(asyncDone);

const cssStream = ({ banner, dir }) =>
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
        includePaths: ['node_modules', path.resolve(__dirname, '../../../node_modules')],
      })
    )
    .pipe(
      postcss([
        fixHostPseudo(),
        autoprefixer({
          overrideBrowsersList: [
            'last 1 version',
            'Firefox ESR',
            'not opera > 0',
            'not op_mini > 0',
            'not op_mob > 0',
            'not android > 0',
            'not edge > 0',
            'not ie > 0',
            'not ie_mob > 0',
          ],
        }),
        ...(dir === 'rtl' ? [rtlcss] : []),
        cssnano(),
      ])
    )
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

const modeSuffixes = {
  development: '',
  production: '.min',
};

const dirSuffixes = {
  ltr: '',
  rtl: '.rtl',
};

/**
 * Builds a Rollup bundle.
 *
 * @param {object} [options] The build options.
 * @param {string} [options.mode=development] The build mode.
 * @param {string} [options.dir=development] The UI direction.
 */
async function buildBundle({ mode = 'development', dir = 'ltr' } = {}) {
  const bundle = await rollup(getRollupConfig({ mode, dir }));
  await bundle.write({
    format: 'es',
    name: 'IBMDotcomWebComponentsDotcomShell',
    file: `${config.bundleDestDir}/ibmdotcom-web-components-dotcom-shell${dirSuffixes[dir]}${modeSuffixes[mode]}.js`,
    // FIXME: Figure out how to handle `process.env` without build toolstack
    banner: 'let process = { env: {} };',
  });
}

/**
 * @returns {object} Target files for building React wrappers.
 */
async function harvestReactCustomElementTypeCandidates() {
  const candidates = new Set();
  const dependencies = new Set();
  await promisifyStream(() =>
    gulp.src([`${config.srcDir}/components/**/*.ts`]).pipe(
      babel({
        babelrc: false,
        plugins: [
          ['@babel/plugin-syntax-decorators', { decoratorsBeforeExport: true }],
          '@babel/plugin-syntax-typescript',
          [babelPluginScanCreateReactCustomElementTypeCandidates, { candidates, dependencies }],
        ],
      })
    )
  );
  return {
    candidates: Array.from(candidates).map(candidate => (path.extname(candidate) ? candidate : `${candidate}.ts`)),
    dependencies: Array.from(dependencies).map(dependency => (path.extname(dependency) ? dependency : `${dependency}.ts`)),
  };
}

/**
 * Builds React modules.
 *
 * @param {object} options The build options.
 * @param {string} options.banner The banner content.
 * @param {string} [options.targetEnv=browser] The target environment.
 */
async function buildModulesReact({ banner, targetEnv = 'browser' }) {
  const { candidates } = await harvestReactCustomElementTypeCandidates();
  let stream = gulp.src(candidates, { base: `${config.srcDir}/components` }).pipe(
    babel({
      babelrc: false,
      plugins: [
        ['@babel/plugin-syntax-decorators', { decoratorsBeforeExport: true }],
        '@babel/plugin-syntax-typescript',
        '@babel/plugin-proposal-nullish-coalescing-operator',
        '@babel/plugin-proposal-optional-chaining',
        [babelPluginCreateReactCustomElementType, { nonUpgradable: targetEnv === 'node' }],
      ],
    })
  );

  if (targetEnv === 'node') {
    stream = stream.pipe(
      babel({
        babelrc: false,
        // Ensures `babel-plugin-resource-cjs-paths` runs before `@babel/plugin-transform-modules-commonjs`
        plugins: [babelPluginResourceCJSPaths, '@babel/plugin-transform-modules-commonjs'],
      })
    );
  }

  const destDir = {
    browser: `${config.jsDestDir}/components-react`,
    node: `${config.cjsDestDir}/components-react-node`,
  }[targetEnv];

  return stream
    .pipe(prettier())
    .pipe(header(banner))
    .pipe(gulp.dest(destDir));
}

/**
 * Builds composite/container components that is implemented natively with React (instead of as wrappers).
 *
 * @param {object} [options] The build options.
 * @param {string} [options.targetEnv=browser] The target environment.
 */
function buildModulesReactComposite({ targetEnv = 'browser' } = {}) {
  const destDir = {
    browser: `${config.jsDestDir}/components-react`,
    node: `${config.cjsDestDir}/components-react-node`,
  }[targetEnv];

  const plugins = [
    ['@babel/plugin-transform-typescript', { isTSX: true }],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    ['@babel/plugin-proposal-object-rest-spread', { useBuiltIns: true }],
    '@babel/plugin-proposal-optional-chaining',
    // `version` field ensures `@babel/plugin-transform-runtime` is applied to newer helpers like decorator
    ['@babel/plugin-transform-runtime', { useESModules: targetEnv === 'browser', version: '7.3.0' }],
  ];

  plugins.push(
    ...{
      browser: [babelPluginResourceJSPaths],
      // Ensures `babel-plugin-resource-cjs-paths` runs before `@babel/plugin-transform-modules-commonjs`
      node: [babelPluginResourceCJSPaths, '@babel/plugin-transform-modules-commonjs'],
    }[targetEnv]
  );

  return gulp
    .src([`${config.srcDir}/components-react/**/*.ts*`])
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        babelrc: false,
        presets: ['@babel/preset-react', '@babel/preset-modules'],
        plugins,
      })
    )
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(destDir));
}

/**
 * Builds enums for React.
 *
 * @param {object} options The build options.
 * @param {string} options.banner The banner content.
 * @param {string} [options.targetEnv=browser] The target environment.
 */
async function buildModulesReactDefs({ banner, targetEnv = 'browser' }) {
  const { dependencies } = await harvestReactCustomElementTypeCandidates();

  const destDir = {
    browser: `${config.jsDestDir}/components-react`,
    node: `${config.cjsDestDir}/components-react-node`,
  }[targetEnv];

  const componentDestDir = {
    browser: `${config.jsDestDir}/components`,
    node: `${config.cjsDestDir}/components`,
  }[targetEnv];

  let stream = gulp
    .src(
      [
        ...dependencies,
        `${config.srcDir}/components/**/*-connect.ts`,
        `!${config.srcDir}/globals/*.ts`,
        `!${config.srcDir}/globals/**/*.ts`,
        `!${config.srcDir}/**/*.scss`,
      ],
      { allowEmpty: true, base: `${config.srcDir}/components` }
    )
    .pipe(filter(file => /\/defs\.ts$/i.test(file.path) || /\/.*-connect\.ts$/i.test(file.path)))
    .pipe(
      through2.obj((file, enc, done) => {
        const importSource = replaceExtension(
          path.relative(
            path.dirname(path.resolve(__dirname, '..', destDir, file.relative)),
            path.resolve(__dirname, '..', componentDestDir, file.relative)
          ),
          '.js'
        );
        file.contents = Buffer.from(`export * from ${JSON.stringify(importSource)}`);
        file.path = replaceExtension(file.path, '.js');
        done(null, file);
      })
    );

  if (targetEnv === 'node') {
    stream = stream.pipe(
      babel({
        babelrc: false,
        plugins: ['@babel/plugin-transform-modules-commonjs'],
      })
    );
  }

  return stream
    .pipe(prettier())
    .pipe(header(banner))
    .pipe(gulp.dest(destDir));
}

module.exports = {
  bundles: {
    scripts: {
      ltr: {
        dev() {
          return buildBundle();
        },
        prod() {
          return buildBundle({ mode: 'production' });
        },
      },
      rtl: {
        dev() {
          return buildBundle({ dir: 'rtl' });
        },
        prod() {
          return buildBundle({ mode: 'production', dir: 'rtl' });
        },
      },
    },
  },

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
                import spread from 'carbon-web-components/es/globals/directives/spread';
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

    async react() {
      const banner = await readFileAsync(path.resolve(__dirname, '../../../tasks/license.js'), 'utf8');
      await Promise.all([
        promisifyStream(() => buildModulesReact({ banner })),
        promisifyStream(() => buildModulesReact({ banner, targetEnv: 'node' })),
      ]);
    },

    async reactComposite() {
      await Promise.all([
        promisifyStream(() => buildModulesReactComposite()),
        promisifyStream(() => buildModulesReactComposite({ targetEnv: 'node' })),
      ]);
    },

    async reactDefs() {
      const banner = await readFileAsync(path.resolve(__dirname, '../../../tasks/license.js'), 'utf8');
      await Promise.all([
        promisifyStream(() => buildModulesReactDefs({ banner })),
        promisifyStream(() => buildModulesReactDefs({ banner, targetEnv: 'node' })),
      ]);
    },

    async reactTypes() {
      const [banner, harvested] = await Promise.all([
        readFileAsync(path.resolve(__dirname, '../../../tasks/license.js'), 'utf8'),
        harvestReactCustomElementTypeCandidates(),
      ]);
      const { candidates } = harvested;
      await promisifyStream(() =>
        gulp
          .src(candidates, { base: `${config.srcDir}/components` })
          .pipe(
            babel({
              babelrc: false,
              plugins: [
                ['@babel/plugin-syntax-decorators', { decoratorsBeforeExport: true }],
                '@babel/plugin-syntax-typescript',
                '@babel/plugin-proposal-nullish-coalescing-operator',
                '@babel/plugin-proposal-optional-chaining',
                babelPluginCreateReactCustomElementTypeDef,
              ],
            })
          )
          .pipe(prettier())
          .pipe(header(banner))
          .pipe(
            rename(pathObj => {
              pathObj.extname = '.d.ts';
            })
          )
          .pipe(gulp.dest(`${config.jsDestDir}/components-react`))
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
            `!${config.srcDir}/**/ibmdotcom-web-components-*.ts`,
          ])
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

    async scriptsNode() {
      const { dependencies } = await harvestReactCustomElementTypeCandidates();
      return (
        gulp
          .src(
            [
              ...dependencies,
              `${config.srcDir}/components/**/*-connect.ts`,
              `!${config.srcDir}/globals/internal/**/*.ts`,
              `!${config.srcDir}/globals/mixins/**/*.ts`,
              `!${config.srcDir}/globals/ibmdotcom-web-components-dotcom-shell.ts`,
              `!${config.srcDir}/**/*.scss`,
            ],
            { allowEmpty: true, base: config.srcDir }
          )
          .pipe(filter(file => /\/defs\.ts$/i.test(file.path) || /\/.*-connect\.ts$/i.test(file.path)))
          .pipe(sourcemaps.init())
          .pipe(
            babel({
              presets: ['@babel/preset-modules'],
              // Ensures `babel-plugin-resource-cjs-paths` runs before `@babel/plugin-transform-modules-commonjs`
              plugins: [
                // `version` field ensures `@babel/plugin-transform-runtime` is applied to newer helpers like decorator
                ['@babel/plugin-transform-runtime', { useESModules: false, version: '7.8.0' }],
                babelPluginResourceCJSPaths,
                '@babel/plugin-transform-modules-commonjs',
              ],
            })
          )
          // Avoids generating `.js` from interface-only `.ts` files
          .pipe(filter(file => stripComments(file.contents.toString()).replace(/\s/g, '')))
          .pipe(sourcemaps.write('.'))
          .pipe(gulp.dest(config.cjsDestDir))
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
