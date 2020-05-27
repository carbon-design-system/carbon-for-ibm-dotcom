/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import requireContext from 'require-context.macro';
import { configure, addParameters, addDecorator } from '@storybook/react';
import { addReadme } from 'storybook-readme';
import Container from './Container';

const SORT_ORDER_GROUP = [
  'Overview',
  'Components',
  'Patterns (Sections)',
  'Patterns (Blocks)',
];

addParameters({
  options: {
    name: `IBM.com Library React`,
    url: 'https://github.com/carbon-design-system/ibm-dotcom-library',
    storySort(lhs, rhs) {
      const { kind: lhsKind } = lhs[1];
      const { kind: rhsKind } = rhs[1];
      const lhsGroup = lhsKind.split('|')[0];
      const rhsGroup = rhsKind.split('|')[0];
      const lhsSortOrder = SORT_ORDER_GROUP.indexOf(lhsGroup);
      const rhsSortOrder = SORT_ORDER_GROUP.indexOf(rhsGroup);
      if (lhsSortOrder >= 0 && rhsSortOrder >= 0) {
        return lhsSortOrder - rhsSortOrder;
      }
      return 0;
    },
  },
});

addDecorator(addReadme);

addDecorator(story => <Container story={story} />);

const components = requireContext('../src', true, /(overview|\.stories)\.js$/);
configure(components, module);
