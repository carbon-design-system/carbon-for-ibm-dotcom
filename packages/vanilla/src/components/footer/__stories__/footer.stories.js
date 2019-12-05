import { storiesOf } from '@storybook/html';
import { withKnobs, select } from '@storybook/addon-knobs';
import Footer from '../footer';
import '../../../../../styles/scss/components/footer/index.scss';
import readme from '../README.md';

storiesOf('footer', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    const footerTypeOptions = {
      tall: '',
      short: 'short',
    };
    /**
     * renders either short or the tall footer
     * @returns {string} string
     */
    async function _getFooter() {
      const template = await Footer.getFooterWithData(
        select('type', footerTypeOptions, footerTypeOptions.tall)
      );

      return template;
    }

    const element = document.createElement('div');
    element.textContent = 'Loading...';
    _getFooter().then(html => {
      element.innerHTML = html;
      Footer.init(element);
    });
    return element;
  });
