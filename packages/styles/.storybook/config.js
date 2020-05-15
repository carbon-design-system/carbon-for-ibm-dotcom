import React from 'react';
import { configure, addParameters, addDecorator } from '@storybook/react';
// import { addReadme } from 'storybook-readme';
import { configureActions } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import Container from './Container';

addParameters({
  options: {
    name: `Carbon Design System with Expressive`,
    url: 'https://github.com/carbon-design-system/ibm-dotcom-library',
    storySort(lhs, rhs) {
      const [lhsId] = lhs;
      const [rhsId] = rhs;
      if (lhsId === 'overview--get-started') {
        return -1;
      } else if (rhsId === 'overview--get-started') {
        return 1;
      }
      return 0;
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

const components = require.context('../src', true, /(overview|-story)\.js$/);
configure(components, module);
