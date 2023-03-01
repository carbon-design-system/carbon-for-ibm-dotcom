/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/**
 * A Babel plugin that prevents `customElements.define()` in `carbon-web-components` modules from running.
 */
module.exports = function undefCustomElements() {
  /**
   * @param {string} path The Babel path what a `@customElement()` decorator call refers to.
   * @returns {boolean} `true` if such decorator is imported from `lit-element`.
   */
  const customElementIsFromLit = (path) => {
    if (!path.isCallExpression() || !path.get('callee').isIdentifier) {
      return false;
    }
    const binding = path.scope.getBinding(path.get('callee.name').node);
    if (!binding) {
      return false;
    }
    const { path: bindingPath } = binding;
    const { parentPath: bindingParentPath } = bindingPath;
    return (
      bindingPath.isImportSpecifier() &&
      bindingPath.get('imported').isIdentifier({ name: 'customElement' }) &&
      bindingParentPath.isImportDeclaration &&
      bindingParentPath.get('source').isStringLiteral({ value: 'lit-element' })
    );
  };

  return {
    visitor: {
      CallExpression(path) {
        if (customElementIsFromLit(path)) {
          const possiblyDecoratorCall = path.parentPath.parentPath;
          if (
            possiblyDecoratorCall.isCallExpression() &&
            possiblyDecoratorCall
              .get('callee')
              .isIdentifier({ name: '_decorate' })
          ) {
            path.remove();
          }
        }
      },
    },
  };
};
