import React from 'react';
import requireContext from 'require-context.macro';
import { configure, addParameters, addDecorator } from '@storybook/react';
import { addReadme } from 'storybook-readme';
import Container from './Container';

addParameters({
  options: {
    name: `IBM.com Library React Patterns`,
    url: 'https://github.com/carbon-design-system/ibm-dotcom-library',
  },
});

addDecorator(addReadme);

addDecorator(story => <Container story={story} />);

function loadStories() {
  require('../src/patterns/overview');
  const req = requireContext('../src/patterns', true, /\.stories\.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
