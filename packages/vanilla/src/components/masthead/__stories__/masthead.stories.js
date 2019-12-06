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
    element.textContent = 'Loading...';

    Masthead.create(element).then(mastheadElement => {
      console.log('Masthead create successfully:', mastheadElement);
    });
    Masthead.init();

    return element;
  });
