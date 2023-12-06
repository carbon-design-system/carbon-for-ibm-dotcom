/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

module.exports = function resourceCJSPaths(babel) {
  const t = babel.types;

  return {
    visitor: {
      ExportNamedDeclaration(path) {
        const { node } = path;
        const { value: source } = node.source || {};
        const lodashTokens = /^lodash-es\/(.*?)(\.js)?$/i.exec(source);
        if (lodashTokens) {
          const declaration = t.cloneNode(node);
          declaration.source.value = `lodash.${lodashTokens[1].toLowerCase()}`;
          path.replaceWith(declaration);
        } else if (/^carbon-components\/es/i.test(source)) {
          const declaration = t.cloneNode(node);
          declaration.source.value = source.replace(
            /^carbon-components\/es/i,
            'carbon-components/umd'
          );
          path.replaceWith(declaration);
        } else if (
          /^@carbon\/carbon-web-components\/es\/components-react/i.test(
            source
          ) ||
          (/^@carbon\/carbon-web-components\/es\/components/i.test(source) &&
            !/\/defs$/i.test(source))
        ) {
          const declaration = t.cloneNode(node);
          declaration.source.value = source
            .replace(
              /^@carbon\/carbon-web-components\/es\/components-react/i,
              '@carbon/web-components/lib/components-react-node'
            )
            .replace(
              /^@carbon\/carbon-web-components\/es\/components/i,
              '@carbon/web-components/lib/components-react-node'
            );
          path.replaceWith(declaration);
        } else if (
          /^(@carbon\/carbon-web-components|@carbon\/ibmdotcom-utilities)\/es/i.test(
            source
          )
        ) {
          const declaration = t.cloneNode(node);
          declaration.source.value = source.replace(
            /^(@carbon\/carbon-web-components|@carbon\/ibmdotcom-utilities)\/es/i,
            '$1/lib'
          );
          path.replaceWith(declaration);
        }
      },

      ImportDeclaration(path) {
        const { node } = path;
        const { value: source } = node.source || {};
        const lodashTokens = /^lodash-es\/(.*?)(\.js)?$/i.exec(source);
        if (lodashTokens) {
          const declaration = t.cloneNode(node);
          declaration.source.value = `lodash.${lodashTokens[1].toLowerCase()}`;
          path.replaceWith(declaration);
        } else if (/^carbon-components\/es/i.test(source)) {
          const declaration = t.cloneNode(node);
          declaration.source.value = source.replace(
            /^carbon-components\/es/i,
            'carbon-components/umd'
          );
          path.replaceWith(declaration);
        } else if (
          /^@carbon\/carbon-web-components\/es\/components-react/i.test(
            source
          ) ||
          (/^@carbon\/carbon-web-components\/es\/components/i.test(source) &&
            !/\/defs$/i.test(source))
        ) {
          const declaration = t.cloneNode(node);
          declaration.source.value = source
            .replace(
              /^@carbon\/carbon-web-components\/es\/components-react/i,
              '@carbon/web-components/lib/components-react-node'
            )
            .replace(
              /^@carbon\/carbon-web-components\/es\/components/i,
              '@carbon/web-components/lib/components-react-node'
            );
          path.replaceWith(declaration);
        } else if (
          /^(@carbon\/carbon-web-components|@carbon\/ibmdotcom-utilities)\/es/i.test(
            source
          )
        ) {
          const declaration = t.cloneNode(node);
          declaration.source.value = source.replace(
            /^(@carbon\/carbon-web-components|@carbon\/ibmdotcom-utilities)\/es/i,
            '$1/lib'
          );
          path.replaceWith(declaration);
        }
      },
    },
  };
};
