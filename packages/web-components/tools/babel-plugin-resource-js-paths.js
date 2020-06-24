/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const replaceExtension = require('replace-ext');

module.exports = function resourceJSPaths(babel) {
  const t = babel.types;

  return {
    visitor: {
      ImportDeclaration(path) {
        const { node } = path;
        const { value: source } = node.source;
        if (/^\..*\.scss$/i.test(source)) {
          const declaration = t.cloneNode(node);
          declaration.source.value = `./${replaceExtension(source, '.css.js')}`;
          path.replaceWith(declaration);
        }
      },
    },
  };
};
