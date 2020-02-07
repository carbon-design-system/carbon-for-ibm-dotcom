import './_container.scss';
import { configure, addParameters, addDecorator } from '@storybook/html';
import requireContext from 'require-context.macro';
import { addReadme } from 'storybook-readme/html';

addParameters({
  options: {
    name: `IBM.com Library Vanilla Components`,
    url: 'https://github.com/carbon-design-system/ibm-dotcom-library',
  },
});

addDecorator(addReadme);

function loadStories() {
  require('../src/components/overview');

  const components = requireContext(
    '../src/components',
    true,
    /\.stories\.js$/
  );
  components.keys().forEach(filename => components(filename));
}

configure(loadStories, module);
