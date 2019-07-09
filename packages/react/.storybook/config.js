import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withOptions } from '@storybook/addon-options';
import { configureActions } from '@storybook/addon-actions';
// import { checkA11y } from 'storybook-addon-a11y';
import Container from './Container';

addDecorator(
  withInfo({
    maxPropStringLength: 200, // Displays the first 200 characters in the default prop string
  })
);

addDecorator(
  withOptions({
    name: `IBM.com Library React Components`,
    url: 'https://github.com/carbon-design-system/ibm-dotcom-library',
  })
);

configureActions({
  depth: 100,
  limit: 20,
});

addDecorator(story => <Container story={story} />);
// addDecorator(checkA11y);

function loadStories() {
  const req = require.context('../src/components', true, /\.stories\.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
