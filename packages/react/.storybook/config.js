import React from 'react';
import requireContext from 'require-context.macro';
import { configure, addParameters, addDecorator } from '@storybook/react';
import { addReadme } from 'storybook-readme';
import Container from './Container';

addParameters({
  options: {
    name: `IBM.com Library React`,
    url: 'https://github.com/carbon-design-system/ibm-dotcom-library',
  },
});

addDecorator(addReadme);

addDecorator(story => <Container story={story} />);

function loadStories() {
  require('../src/overview');

  const components = requireContext(
    '../src/components',
    true,
    /\.stories\.js$/
  );
  components.keys().forEach(filename => components(filename));

  const sections = requireContext(
    '../src/patterns/sections',
    true,
    /\.stories\.js$/
  );
  sections.keys().forEach(filename => sections(filename));

  const blocks = requireContext(
    '../src/patterns/blocks',
    true,
    /\.stories\.js$/
  );
  blocks.keys().forEach(filename => blocks(filename));

  const subpatterns = requireContext(
    '../src/patterns/sub-patterns',
    true,
    /\.stories\.js$/
  );
  subpatterns.keys().forEach(filename => subpatterns(filename));
}

configure(loadStories, module);
