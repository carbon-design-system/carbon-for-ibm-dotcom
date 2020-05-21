/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const replaceTable = {
  '@carbon/icons/es': '@carbon/icons/lib',
  '@carbon/icons-react/es': '@carbon/icons-react/lib',
  'carbon-components/es': 'carbon-components/umd',
  'carbon-components-react/es': 'carbon-components-react/lib',
};

module.exports = function resourceJSPaths(babel) {
  const t = babel.types;

  return {
    visitor: {
      ImportDeclaration(path) {
        const { node } = path;
        const { value: originalSource } = node.source;
        let source = originalSource;
        for (const key of Object.keys(replaceTable)) {
          if (source.indexOf(key) >= 0) {
            source = source.replace(key, replaceTable[key]);
          }
        }
        if (source !== originalSource) {
          const declaration = t.cloneNode(node);
          declaration.source.value = source;
          path.replaceWith(declaration);
        }
      },
    },
  };
};
