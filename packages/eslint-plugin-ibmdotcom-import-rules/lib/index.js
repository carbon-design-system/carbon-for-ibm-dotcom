/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { default: resolve } = require('eslint-module-utils/resolve');
const { default: moduleVisitor } = require('eslint-module-utils/moduleVisitor');

module.exports = {
  rules: {
    'no-shorthand-index': context => moduleVisitor(node => {
      const { value: sourcePath } = node;
      const resolvedPath = resolve(sourcePath, context)
      const resolvedPackagePath = resolve(`${sourcePath}/package.json`, context)
      const resolvedPathWithIndex = resolve(`${sourcePath}/index`, context)
      if (!resolvedPackagePath && resolvedPathWithIndex && resolvedPath === resolvedPathWithIndex) {
        context.report(node, 'Must specify index file explicitly, instead of specifying a directory to load index file in it.');
      }
    }, {}),
  },
};
