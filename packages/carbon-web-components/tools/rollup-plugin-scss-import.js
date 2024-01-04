/**
 * @license
 *
 * Copyright IBM Corp. 2023, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');
const replace = require('replace-in-file');
const { createFilter } = require('@rollup/pluginutils');

/**
 * When running storybook, default and named imports from CSS files
 * are deprecated with Vite - the `?lit` query is required
 * (e.g import styles from './foo.scss?lit)
 *
 * This plugin swaps the `.scss?lit` ext for `.scss` at Rollup's buildStart
 * so it can bundle properly and then swaps back to `.scss?lit` at build end
 *
 * @param {object} [options] The options.
 * @param {RegExp} [options.include=/\.ts/] The files to include.
 * @param {RegExp} [options.exclude=/\.scss/] The files to exclude.
 * @returns {object} The rollup plugin to transform an `.scss` file to a `lit-html` template.
 */
function rollupPluginSCSSImport({
  include = /\.ts$/i,
  exclude = /\.scss$/i,
} = {}) {
  const filter = createFilter(include, exclude);
  return {
    name: 'scss-path',

    async buildStart() {
      const replaceOptions = {
        files: 'src/components/**/*.ts',
        from: /\.scss\?lit/g,
        to: '.scss',
      };

      await replace(replaceOptions);
    },

    async buildEnd() {
      const replaceOptions = {
        files: 'src/components/**/*.ts',
        from: /\.scss/g,
        to: '.scss?lit',
      };

      await replace(replaceOptions);
    },

    /**
     * Enqueues the module contents for loading.
     *
     * @param {string} id The module ID.
     */
    load(id) {
      if (filter(id)) {
        this.addWatchFile(path.resolve(id));
      }
      return null;
    },
  };
}

module.exports = rollupPluginSCSSImport;
