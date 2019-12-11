import React from 'react';
import requireContext from 'require-context.macro';
import { configure, addParameters, addDecorator } from '@storybook/react';
// import { addReadme } from 'storybook-readme';
import { configureActions } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import Container from './Container';

addParameters({
  options: {
    name: `Carbon Design System with Expressive`,
    url: 'https://github.com/carbon-design-system/ibm-dotcom-library',
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

function loadStories() {
  require('../src/carbon-stories/overview');
  const req = requireContext('../src/carbon-stories', true, /-story\.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
