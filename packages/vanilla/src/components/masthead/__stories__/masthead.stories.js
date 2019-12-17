import { storiesOf } from '@storybook/html';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import Masthead from '../masthead';
import '../../../../../styles/scss/components/masthead/index.scss';
import readme from '../README.md';

storiesOf('masthead', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    const standardProps = {
      hasProfile: boolean('Has profile', true),
      hasSearch: boolean('Has search', false),
    };

    /**
     * renders the masthead
     *
     * @returns {string} string
     */
    async function _getMasthead() {
      const template = await Masthead.getMastheadWithData(standardProps);

      return template;
    }

    const element = document.createElement('div');
    element.textContent = 'Loading...';
    _getMasthead().then(html => {
      element.innerHTML = html;
      Masthead.init(element);
    });
    return element;
  });
