/**
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { Minimatch } = require('minimatch');
const { default: annotateAsPure } = require('@babel/helper-annotate-as-pure');

// This Babel plugin is for testing purpose ONLY. SHOULD NOT BE USED FOR ANY OTHER PURPOSE.
/**
 * A Babel plugin that temporarily removes code that de-optimizes bundle size.
 * This Babel plugin is for testing purpose ONLY.
 * SHOULD NOT BE USED FOR ANY OTHER PURPOSE.
 *
 * @param {Babel} babel The Babel module.
 * @param {object} options The options.
 * @param {string[]} options.excludes The glob of the module names to skip running the transformation.
 * @param {string[]} options.callExpressionDefaultExports The module names to make its default export as no side effect.
 * @param {string[]} options.symbols The symbols to mark as no side effect.
 */
module.exports = function temporarilyRemoveDefaultProps(
  babel,
  { excludes = [], callExpressionDefaultExports = [], symbols = [] } = {}
) {
  const t = babel.types;
  const excludesMatchers = excludes.map((item) => new Minimatch(item));

  /**
   * @param {NodePath} path The node path.
   * @returns {string} The symbol name the given node path represents.
   */
  function getName(path) {
    if (path.isIdentifier()) {
      return path.node.name;
    } else if (path.isStringLiteral()) {
      return path.node.value;
    }
    return undefined;
  }

  /**
   * @param {NodePath} path The node path.
   * @returns {string[]} The list of the identifiers the given path represents.
   */
  function getPatternTokens(path) {
    const isDefinePropertyCall =
      path.isCallExpression() &&
      path.get('callee').isIdentifier({ name: '_defineProperty' });
    const possibleObjectExpression = !isDefinePropertyCall
      ? path
      : path.get('arguments.1');

    const acc = [];
    let traverse = possibleObjectExpression;
    for (; traverse.isMemberExpression(); traverse = traverse.get('object')) {
      acc.unshift(traverse.get('property'));
    }

    acc.unshift(traverse);

    const prepend = !isDefinePropertyCall
      ? []
      : getPatternTokens(path.get('arguments.0'));
    return prepend.concat(acc.map((item) => getName(item)).filter(Boolean));
  }

  /**
   * @param {NodePath} path The node path.
   * @returns {boolean} `true` if the given node path is of a l-value.
   */
  function isLValue(path) {
    return (
      path.parentPath.isAssignmentExpression() &&
      path.parentPath.get('left') === path
    );
  }

  /**
   * @param {NodePath} path The node path.
   * @param {string[]} patterns The patterns.
   * @returns {boolean}
   *   `true` if one of the object paths or one of the identifiers the given `pattern` represent matches to the given node path.
   *   Partial match is allowed.
   */
  function matchesPatternOrIdentifier(path, patterns) {
    const tokensInPath = getPatternTokens(path);

    return patterns.some((pattern) => {
      if (!pattern) {
        return false;
      }
      const tokensInPattern = pattern.split('.');
      const startIndex = tokensInPath.indexOf(tokensInPattern[0]);
      if (startIndex < 0) {
        return false;
      }
      return tokensInPattern.every(
        (token, i) => token && token === tokensInPath[i + startIndex]
      );
    });
  }

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

  const visitor = {
    CallExpression(path, { file }) {
      const callee = path.get('callee');
      const isDefineProperty = callee.isIdentifier({ name: '_defineProperty' });

      if (
        matchesPatternOrIdentifier(isDefineProperty ? path : callee, symbols) ||
        (path.parentPath.isExportDefaultDeclaration() &&
          callExpressionDefaultExports.indexOf(file.opts.filename) >= 0)
      ) {
        annotateAsPure(path);
        if (isDefineProperty) {
          wrapExpressionAsPure(path.get('arguments.2'));
        }
      }
    },

    ExpressionStatement(path) {
      if (
        path.get('expression').isAssignmentExpression() &&
        path.get('expression.left').isMemberExpression() &&
        matchesPatternOrIdentifier(path.get('expression.left'), symbols)
      ) {
        wrapExpressionAsPure(path.get('expression.right'));
        wrapExpressionAsPure(path);
        return;
      }
    },

    MemberExpression(path) {
      if (matchesPatternOrIdentifier(path, symbols) && !isLValue(path)) {
        wrapExpressionAsPure(path);
      }
    },

    NewExpression(path) {
      const callee = path.get('callee');
      if (
        symbols.some(
          (property) =>
            (callee.isMemberExpression() && callee.matchesPattern(property)) ||
            callee.isIdentifier({ name: property })
        )
      ) {
        annotateAsPure(path);
      }
    },
  };

  return {
    visitor: {
      Program(path, state) {
        const { file } = state;
        if (
          excludesMatchers.every(
            (matcher) => !matcher.match(file.opts.filename)
          )
        ) {
          path.traverse(visitor, state);
        }
      },
    },
  };
};
