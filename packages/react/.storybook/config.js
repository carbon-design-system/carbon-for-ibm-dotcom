/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import requireContext from 'require-context.macro';
import { configure, addParameters, addDecorator } from '@storybook/react';
import Container from './Container';

const SORT_ORDER_GROUP = [
  'Overview',
  'Components',
  'Patterns (Sections)',
  'Patterns (Blocks)',
  'Patterns (Sub-Patterns)',
];

const SORT_ORDER = [
  'overview-getting-started--page',
  'overview-environment-variables--page',
  'overview-feature-flags--page',
];

addParameters({
  options: {
    name: `IBM.com Library React`,
    url: 'https://github.com/carbon-design-system/ibm-dotcom-library',
    storySort(lhs, rhs) {
      const [lhsId, lhsMeta] = lhs;
      const [rhsId, rhsMeta] = rhs;
      const lhsSortOrder = SORT_ORDER.indexOf(lhsId);
      const rhsSortOrder = SORT_ORDER.indexOf(rhsId);
      if (lhsSortOrder >= 0 && rhsSortOrder >= 0) {
        return lhsSortOrder - rhsSortOrder;
      }
      const { kind: lhsKind } = lhsMeta;
      const { kind: rhsKind } = rhsMeta;
      const lhsGroup = lhsKind.split('|')[0];
      const rhsGroup = rhsKind.split('|')[0];
      const lhsGroupSortOrder = SORT_ORDER_GROUP.indexOf(lhsGroup);
      const rhsGroupSortOrder = SORT_ORDER_GROUP.indexOf(rhsGroup);
      if (lhsGroupSortOrder >= 0 && rhsGroupSortOrder >= 0) {
        return lhsGroupSortOrder - rhsGroupSortOrder;
      }
      return 0;
    },
  },
});

addDecorator(story => <Container story={story} />);

const reqDocs = requireContext('../docs', true, /\.stories\.mdx$/);
configure(reqDocs, module);

const reqComponents = requireContext('../src', true, /\.stories\.js$/);
configure(reqComponents, module);
