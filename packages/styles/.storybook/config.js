/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import requireContext from 'require-context.macro';
import { configure, addParameters, addDecorator } from '@storybook/react';
import { configureActions } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import { withInfo } from '@storybook/addon-info';
import Container from './Container';

const SORT_ORDER_STORY = [
  'overview--get-started',
  'component-icons-kitchen-sink--default',
];

addParameters({
  options: {
    name: `Carbon Design System with Expressive`,
    url: 'https://github.com/carbon-design-system/carbon-for-ibm-dotcom',
    storySort(lhs, rhs) {
      const [lhsId] = lhs;
      const [rhsId] = rhs;
      const lhsSortOrder = SORT_ORDER_STORY.concat([lhsId]).indexOf(lhsId);
      const rhsSortOrder = SORT_ORDER_STORY.concat([rhsId]).indexOf(rhsId);
      return lhsSortOrder - rhsSortOrder;
    },
  },
});

// addDecorator(addReadme);

configureActions({
  depth: 3,
  limit: 10,
});

addDecorator(
  withInfo({
    styles: {
      children: {
        width: '100%',
      },
    },
    maxPropStringLength: 200, // Displays the first 200 characters in the default prop string
  })
);

addDecorator(withA11y);
addDecorator(story => <Container story={story} />);

const components = requireContext('../src', true, /(overview|-story)\.js$/);
configure(components, module);
