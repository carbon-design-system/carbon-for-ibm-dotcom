/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { extname } = require('path');

module.exports = function resourceJSPaths(babel) {
  const t = babel.types;

  return {
    visitor: {
      ImportDeclaration(path) {
        const { node } = path;
        const { value: source } = node.source || {};
        if (/^\./.test(source) && !extname(source)) {
          const declaration = t.cloneNode(node);
          declaration.source.value = `${source}.js`;
          path.replaceWith(declaration);
        } else if (/^@carbon\/ibmdotcom-services\/es/i.test(source)) {
          const declaration = t.cloneNode(node);
          declaration.source.value = source.replace(
            /^(@carbon\/ibmdotcom-services)\/es/i,
            '$1/lib'
          );
          path.replaceWith(declaration);
        }
      },

      ExportNamedDeclaration(path) {
        const { node } = path;
        const { value: source } = node.source || {};
        if (/^\./.test(source) && !extname(source)) {
          const declaration = t.cloneNode(node);
          declaration.source.value = `${source}.js`;
          path.replaceWith(declaration);
        } else if (/^@carbon\/ibmdotcom-services\/es/i.test(source)) {
          const declaration = t.cloneNode(node);
          declaration.source.value = source.replace(
            /^(@carbon\/ibmdotcom-services)\/es/i,
            '$1/lib'
          );
          path.replaceWith(declaration);
        }
      },
    },
  };
};
