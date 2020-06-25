/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { default: annotateAsPure } = require('@babel/helper-annotate-as-pure');
const {
  default: isStatelessComponent,
} = require('babel-plugin-transform-react-remove-prop-types/lib/isStatelessComponent');

module.exports = function resourceJSPaths(babel) {
  const t = babel.types;

  /**
   * Wraps the given expression into a IIFE marked as no side effect.
   *
   * @param {NodePath} path The node path to wrap.
   */
  function wrapExpressionAsPure(path) {
    const callExpression = t.callExpression(
      t.functionExpression(
        null,
        [],
        t.blockStatement([
          path.isExpressionStatement()
            ? t.cloneNode(path.node)
            : t.returnStatement(t.cloneNode(path.node)),
        ]),
        false,
        false
      ),
      []
    );
    annotateAsPure(callExpression);
    path.replaceWith(callExpression);
    path.skip();
  }

  return {
    visitor: {
      AssignmentExpression(path) {
        const left = path.get('left');
        if (left.isMemberExpression()) {
          const { name } = left.get('object').node;
          const { path: component } = path.scope.getBinding(name) || {};
          if (component && isStatelessComponent(component)) {
            wrapExpressionAsPure(path);
            path.skip();
          }
        }
      },
    },
  };
};
