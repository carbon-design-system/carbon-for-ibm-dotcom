/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const path = require('path');
const { createFilter } = require('@rollup/pluginutils');
const descriptorFromSVG = require('./descriptor-from-svg');
const createSVGResultFromIconDescriptor = require('./svg-result-from-icon-descriptor');

/**
 * @param {object} [options] The options.
 * @param {RegExp} [options.include=/\.scss/] The files to include.
 * @param {RegExp} [options.exclude] The files to exclude.
 * @returns {object} The rollup plugin to transform an `.svg` file to a `lit-html` template.
 */
function rollupPluginIBMdotcomIcon({ include = /\.svg$/i, exclude } = {}) {
  const filter = createFilter(include, exclude);
  return {
    name: 'lit-scss',

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

    /**
     * Transforms the module contents.
     *
     * @param {string} contents The module contents.
     * @param {string} id The module ID.
     * @returns {object} The transformed module contents.
     */
    async transform(contents, id) {
      if (!filter(id)) {
        return null;
      }

      const code = [
        `import { svg } from 'lit'`,
        `import spread from '@carbon/web-components/es/globals/directives/spread'`,
        `export default ${createSVGResultFromIconDescriptor(
          await descriptorFromSVG(contents)
        )}`,
      ].join(';');

      return {
        code,
        map: {
          mappings: '',
        },
      };
    },
  };
}

module.exports = rollupPluginIBMdotcomIcon;
