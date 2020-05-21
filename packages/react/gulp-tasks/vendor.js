/**
 * Copyright IBM Corp. 2020
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
const { Parser } = require('acorn');
const acornJsx = require('acorn-jsx');
const { base, simple } = require('acorn-walk');
const { extend } = require('acorn-jsx-walk');
const MagicString = require('magic-string');
const {
  carbonComponetsReactESSrcDir,
  carbonComponetsReactCJSSrcDir,
  carbonComponetsReactVendorSrcDir,
  carbonComponetsReactVendorESDstDir,
  carbonComponetsReactVendorCJSDstDir,
} = require('./config');

const promisifyStream = promisify(asyncDone);

const parser = Parser.extend(acornJsx());
extend(base);

const parserOptions = {
  ecmaVersion: 10,
  preserveParens: true,
  sourceType: 'module',
  allowAwaitOutsideFunction: true,
  allowReturnOutsideFunction: true,
  allowHashBang: true,
};

/**
 * Creates the table of:
 *
 * ```javascript
 * {
 *   '@carbon/icons-react': {
 *     Add16: 'es/add/16',
 *     Add20: 'es/add/20',
 *     ...
 *   }
 * }
 * ````
 *
 * @param {object} options The options.
 * @param {object<string, object<string, string>>} options.table
 *   The table pointing to import paths, keyed by the package name and the import name.
 * @returns {TransformFunction} The Gulp transform function to create the table.
 */
function scan({ table }) {
  return through2.obj((file, _, done) => {
    const source = String(file.contents);
    simple(parser.parse(source, parserOptions), {
      ExportDefaultDeclaration(node) {
        const { name } = node.declaration;
        table[name] = `es/${path.dirname(file.relative)}/${path.basename(
          file.basename,
          file.extname
        )}`;
      },
    });
    done(null, file);
  });
}

/**
 * Converts:
 *
 * ```javascript
 * import { Add16 } from '@carbon/icons-react';
 * import { settings } from 'carbon-components';
 * ````
 *
 * To:
 *
 * ```javascript
 * import Add16 from '@carbon/icons-react/es/add/16';
 * import settings from 'carbon-components/es/globals/js/settings';
 * ````
 *
 * @param {object} options The options.
 * @param {object<string, object<string, string>>} options.table
 *   The table pointing to import paths, keyed by the package name and the import name.
 * @returns {TransformFunction} The Gulp transform function to optimize imports.
 */
function convert({ table }) {
  return through2.obj((file, _, done) => {
    if (file.extname === '.js') {
      const source = String(file.contents);
      const magicString = new MagicString(source);
      simple(
        parser.parse(source, {
          ...parserOptions,
          sourceFile: file.path,
        }),
        {
          ImportDeclaration(node) {
            const { start, end, source, specifiers } = node;
            const { value: moduleName } = source;
            const tableForModule = table[moduleName];

            if (tableForModule) {
              const names = specifiers.map(
                specifier => specifier.imported.name
              );
              const unknownImportNames = names.filter(
                name => !tableForModule[name]
              );

              names.forEach((name, i) => {
                const importPath = tableForModule[name];
                if (importPath) {
                  const {
                    start: specifierStart,
                    end: specifierEnd,
                    local,
                  } = specifiers[i];
                  const { start: nextSpecifierStart = specifierEnd } =
                    specifiers[i + 1] || {};
                  magicString.remove(specifierStart, nextSpecifierStart);
                  magicString.appendRight(
                    end,
                    `import ${local.name} from '${moduleName}/${importPath}';`
                  );
                }
              });

              if (unknownImportNames.length > 0) {
                console.warn(
                  [
                    `There are unknown imports ${unknownImportNames} in: ${moduleName}.`,
                    'It indicates possible needs for performance optimizations.',
                  ].join(' ')
                );
              } else {
                magicString.remove(start, end);
              }
            }
          },
        }
      );
      file.contents = Buffer.from(magicString.toString());
    }
    done(null, file);
  });
}

/**
 * @returns {object<string, object<string, string>>}
 *   The table pointing to import paths, keyed by the package name and the import name.
 */
const generateTable = (() => {
  let promiseTable;
  return async () => {
    if (!promiseTable) {
      const table = {
        '@carbon/icons-react': {},
        'carbon-components': {
          settings: 'es/globals/js/settings',
        },
      };
      promiseTable = promisifyStream(() =>
        gulp
          .src(
            path.resolve(
              path.dirname(require.resolve('@carbon/icons-react/package.json')),
              'es/**/*.js'
            )
          )
          .pipe(scan({ table: table['@carbon/icons-react'] }))
      ).then(() => table);
    }
    return await promiseTable;
  };
})();
/**
 * Generates `src/internal/vendor` contents.
 */
const carbonComponetsReactVendorSrc = async () => {
  const table = await generateTable();
  await promisifyStream(() =>
    gulp
      .src([
        `${carbonComponetsReactESSrcDir}/**/*`,
        '!**/*-{test,story}.js',
        '!**/stories/*',
      ])
      .pipe(convert({ table }))
      .pipe(gulp.dest(carbonComponetsReactVendorSrcDir))
  );
};

/**
 * Generate `es/internal/vendor` contents.
 */
const carbonComponetsReactVendorESDst = async () => {
  const table = await generateTable();
  await promisifyStream(() =>
    gulp
      .src([
        `${carbonComponetsReactESSrcDir}/**/*`,
        '!**/*-{test,story}.js',
        '!**/stories/*',
      ])
      .pipe(convert({ table }))
      .pipe(gulp.dest(carbonComponetsReactVendorESDstDir))
  );
};

/**
 * @returns {NodeJS.ReadWriteStream} The Gulp stream to generate `lib/internal/vendor` contents.
 */
const carbonComponetsReactVendorCJSDst = () =>
  gulp
    .src([
      `${carbonComponetsReactCJSSrcDir}/**/*`,
      '!**/*-{test,story}.js',
      '!**/stories/*',
    ])
    .pipe(gulp.dest(carbonComponetsReactVendorCJSDstDir));

module.exports = {
  carbonComponentsReact: gulp.parallel(
    carbonComponetsReactVendorSrc,
    carbonComponetsReactVendorESDst,
    carbonComponetsReactVendorCJSDst
  ),
};
