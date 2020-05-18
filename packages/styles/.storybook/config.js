import React from 'react';
import requireContext from 'require-context.macro';
import { configure, addParameters, addDecorator } from '@storybook/react';
// import { addReadme } from 'storybook-readme';
import { configureActions } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import Container from './Container';

const SORT_ORDER_STORY = [
  'overview--get-started',
  'component-icons-kitchen-sink--default',
];

addParameters({
  options: {
    name: `Carbon Design System with Expressive`,
    url: 'https://github.com/carbon-design-system/ibm-dotcom-library',
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

addDecorator(story => <Container story={story} />);

const components = requireContext('../src', true, /(overview|-story)\.js$/);
configure(components, module);
