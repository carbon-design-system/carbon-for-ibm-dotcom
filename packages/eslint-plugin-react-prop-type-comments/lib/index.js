/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

module.exports = {
  rules: {
    'require-proptype-comment': context => ({
      Property(node) {
        const maybePropTypesNode = node.parent.parent;
        if ((maybePropTypesNode.type === 'ClassProperty' && maybePropTypesNode.key.name === 'propTypes') ||
          (maybePropTypesNode.type === 'AssignmentExpression' && maybePropTypesNode.left.type === 'MemberExpression' && maybePropTypesNode.left.property.name === 'propTypes')) {
          if (!node.leadingComments || !node.leadingComments.every(item => item.type === 'Block')) {
            context.report(node, 'Prop type must have block comments');
          }
        }
      },
    }),
  },
};
