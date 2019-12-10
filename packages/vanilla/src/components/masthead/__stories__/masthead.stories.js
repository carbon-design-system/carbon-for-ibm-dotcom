import { storiesOf } from '@storybook/html';
import { withKnobs } from '@storybook/addon-knobs';
import Masthead from '../masthead';
import '../../../../../styles/scss/components/masthead/index.scss';
import readme from '../README.md';

storiesOf('Masthead', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    const element = document.createElement('div');
    Masthead.create(element);
    Masthead.init();
    return element;
  });
