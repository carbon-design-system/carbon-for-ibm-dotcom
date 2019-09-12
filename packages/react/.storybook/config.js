import React from 'react';
import requireContext from 'require-context.macro';
import { configure, addParameters, addDecorator } from '@storybook/react';
import { addReadme } from 'storybook-readme';
import Container from './Container';

addParameters({
  options: {
    name: `IBM.com Library React Components`,
    url: 'https://github.com/carbon-design-system/ibm-dotcom-library',
  },
});

addDecorator(addReadme);

addDecorator(story => <Container story={story} />);

function loadStories() {
  const req = requireContext('../src/components', true, /\.stories\.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
