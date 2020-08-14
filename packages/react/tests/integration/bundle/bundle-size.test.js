/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * @jest-environment node
 */

// eslint-disable-next-line strict,lines-around-directive
'use strict';

const path = require('path');
const { Minimatch } = require('minimatch');
const glob = require('glob');
const { rollup } = require('rollup');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const builtins = require('rollup-plugin-node-builtins');
const json = require('rollup-plugin-json');
const resolve = require('rollup-plugin-node-resolve');
const replace = require('rollup-plugin-replace');
const scss = require('rollup-plugin-scss');
const terser = require('rollup-plugin-terser');
const virtual = require('rollup-plugin-virtual');

const ignore = [
  // Ignore index files
  '**/index.js',
  // Ignore deprecated files
  'internal/hooks/**',
  'internal/keyboard/**',
  'prop-types/**',
  // Ignore stories
  '**/*.stories.js',
  '**/__stories__/**',
  // Ignore tests
  '**/test-helpers.js',
  '**/test-utils/**',
  '**/__tests__/**',
  '**/__mocks__/**',
];

const cwd = path.resolve(__dirname, '../../../es');
const files = glob.sync('**/*.js', {
  cwd,
  ignore,
});

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

/**
 * @param {string[]} [names=[]] The named exports.
 * @returns {string} A module content with the given named exports as functions.
 */
function exportsWithFunctions(names = []) {
  return `
    export default function() {}
    ${names.map(name => `export function ${name}() {}`).join('\n')}
  `;
}

/**
 * @param {string} name The module name.
 * @returns {string} The module entry point for ESM.
 */
function moduleEntrypoint(name) {
  const packageJsonPath = `${name}/package.json`;
  const modulePath = require(packageJsonPath).module;
  return !modulePath
    ? require.resolve(name)
    : path.resolve(path.dirname(require.resolve(packageJsonPath)), modulePath);
}

/**
 * Module content with side effects.
 *
 * @type {string}
 */
const moduleContentWithSideEffects = `
  setTimeout('', 0);
  export default {};
`;

/**
 * A set of stubs of modules.
 * Some are for boosting Rollup build time, others are for marking the entry point as with side effects.
 *
 * @type {object}
 */
const pseudoExports = {
  [moduleEntrypoint('axios')]: exportsWithFunctions(),
  [moduleEntrypoint('flatpickr')]: exportsWithFunctions(),
  [moduleEntrypoint('react')]: exportsWithFunctions([
    'Children',
    'Component',
    'PureComponent',
    'Fragment',
    'createContext',
    'cloneElement',
    'createElement',
    'forwardRef',
    'useCallback',
    'useContext',
    'useEffect',
    'useLayoutEffect',
    'useMemo',
    'useReducer',
    'useRef',
    'useState',
  ]),
  [moduleEntrypoint('react-dom')]: exportsWithFunctions(['render']),
  [moduleEntrypoint('react-is')]: exportsWithFunctions(['isForwardRef']),
  [moduleEntrypoint('@carbon/icons-react')]: moduleContentWithSideEffects,
  [moduleEntrypoint('carbon-components')]: moduleContentWithSideEffects,
  [moduleEntrypoint('carbon-components-react')]: moduleContentWithSideEffects,
  [moduleEntrypoint(
    '@carbon/ibmdotcom-services'
  )]: moduleContentWithSideEffects,
  [moduleEntrypoint(
    '@carbon/ibmdotcom-utilities'
  )]: moduleContentWithSideEffects,
};

/**
 * The matcher of the modules to tell Rollup that they have no side effects.
 *
 * @type {Minimatch}
 */
const matcherModuleNoSideEffectsInclude = new Minimatch('**/node_modules/**');

/**
 * The matcher of the modules to tell Rollup that they have potential side effects.
 *
 * @type {Minimatch}
 */
const matcherModuleNoSideEffectsExclude = new Minimatch(
  '**/node_modules/carbon-components/**'
);

describe('ES modules', () => {
  const entry = '__entry_module__';

  it.each(files)(
    '%s does not bring in extra code',
    async relativeFilePath => {
      const filepath = path.join(cwd, relativeFilePath);
      const bundle = await rollup({
        input: entry,
        plugins: [
          virtual({
            [entry]: `import ${JSON.stringify(filepath)}`,
          }),
          {
            // eslint-disable-next-line consistent-return
            load(id) {
              const { [id]: pseudoExport } = pseudoExports;
              // Replaces module content with one in `pseudoExports`
              if (pseudoExport) {
                return pseudoExport;
              }
            },
          },
          commonjs({
            include: [/node_modules/],
            namedExports: {
              'downshift/node_modules/react-is/index.js': ['isForwardRef'],
            },
          }),
          resolve({ browser: true }),
          replace({
            'process.env.NODE_ENV': JSON.stringify('production'),
          }),
          builtins(),
          scss(),
          json(),
          // We try to eliminate code patterns that causes side effects.
          // They cause `import { SomeComponent } from '@carbon/ibmdotcom-react'` unoptimized bundle,
          // but still yeilds to a good bundle with
          // `import SomeComponent from '@carbon/ibmdotcom-react/es/path/to/SomeComponent'`.
          babel({
            configFile: false,
            plugins: [
              [
                require.resolve(
                  '../../../../../tasks/babel-plugin-temporarily-eliminate-react-redundant-code'
                ),
                {
                  excludes: ['**/node_modules/**'],
                  callExpressionDefaultExports: [
                    require.resolve(
                      '../../../es/internal/vendor/carbon-components-react/components/DatePicker/plugins/appendToPlugin'
                    ),
                    require.resolve(
                      '../../../es/internal/vendor/carbon-components-react/components/DatePicker/plugins/fixEventsPlugin'
                    ),
                    require.resolve(
                      '../../../es/internal/vendor/carbon-components-react/components/DatePicker/plugins/rangePlugin'
                    ),
                    require.resolve(
                      '../../../es/internal/vendor/carbon-components-react/components/InlineCheckbox/InlineCheckbox'
                    ),
                    require.resolve(
                      '../../../es/internal/vendor/carbon-components-react/components/NumberInput/NumberInput'
                    ),
                    require.resolve(
                      '../../../es/internal/vendor/carbon-components-react/components/OverflowMenu/OverflowMenu'
                    ),
                    require.resolve(
                      '../../../es/internal/vendor/carbon-components-react/components/RadioButton/RadioButton'
                    ),
                    require.resolve(
                      '../../../es/internal/vendor/carbon-components-react/components/Tooltip/Tooltip'
                    ),
                  ],
                  symbols: [
                    'React.Children',
                    'React.Component',
                    'React.PureComponent',
                    'React.Fragment',
                    'React.createContext',
                    'React.cloneElement',
                    'React.createElement',
                    'React.forwardRef',
                    'React.useCallback',
                    'React.useContext',
                    'React.useEffect',
                    'React.useLayoutEffect',
                    'React.useReducer',
                    'React.useRef',
                    'React.useState',
                    'contextType',
                    'createPropAdapter',
                    'defaultProps',
                    'displayName',
                    'getDerivedStateFromProps',
                    'isRequiredOneOf', // In Carbon `es/prop-types/AriaPropTypes.js`
                    'l10n.en.weekdays.shorthand.forEach', // In Carbon `es/components/DatePicker/DatePicker.js`
                    'ListBox', // In several Carbon components
                    'PropTypes', // Direct calls of `PropTypes.*` in named exports, etc.
                    'propTypes',
                    'rem', // In `@carbon/layout`
                    'Set',
                    'setupGetInstanceId',
                    'sortStates', // In Carbon `es/components/DataTable/TableHeader.js`
                    'TextInput.PasswordInput', // In Carbon `es/components/TextInput/TextInput.js`
                    'TextInput.ControlledPasswordInput', // In Carbon `es/components/TextInput/TextInput.js`
                    'translationKeys', // In Carbon `es/components/DataTable/DataTable.js`
                    'uniqueId',
                    'wrapComponent',
                    '_defaultTranslations', // In several Carbon components
                    '_iconTypes', // In Carbon `es/components/Notifications/Notifications.js`
                    '_triggerButtonPositio', // In Carbon `es/components/OverflowMenu/OverflowMenu.js`
                    '_triggerButtonPositio2', // In Carbon `es/components/OverflowMenu/OverflowMenu.js`
                  ],
                },
              ],
            ],
          }),
          terser.terser(),
        ],
        onwarn: (warning, handle) => {
          const { code } = warning;
          if (code !== 'CIRCULAR_DEPENDENCY' && code !== 'EMPTY_BUNDLE') {
            handle(warning);
          }
        },
        treeshake: {
          annotations: true,
          propertyReadSideEffects: false,
          moduleSideEffects(id) {
            return (
              !matcherModuleNoSideEffectsInclude.match(id) ||
              matcherModuleNoSideEffectsExclude.match(id)
            );
          },
          tryCatchDeoptimization: false,
          unknownGlobalSideEffects: false,
        },
      });
      const { output } = await bundle.generate({ format: 'iife' });
      expect(
        output
          .map(item => item.code)
          .join('')
          .trim()
          .replace(/['"]use strict['"];?/g, '')
          .replace(/!function\(\){}\(\);/g, '')
      ).toBe('');
    },
    60000
  );
});
