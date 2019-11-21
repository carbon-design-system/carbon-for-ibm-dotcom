import { storiesOf } from '@storybook/html';
import { withKnobs, select } from '@storybook/addon-knobs';
import { settings } from 'carbon-components';
import footerTemplate from '../footer.template';
import Footer from '../footer';
import '../../../../../styles/scss/components/footer/index.scss';

const { prefix } = settings;

storiesOf('footer', module)
  .addDecorator(withKnobs)
  // .addParameters({
  //   readme: {
  //     sidebar: readme
  //   },
  // })
  .add('Default', () => {
    const footerTypeOptions = {
      tall: '',
      short: 'short',
    };
    setTimeout(() => {
      const footerElement = document.querySelector(`.${prefix}--footer`);
      Footer.init(footerElement);
    }, 3000);
    return footerTemplate({
      type: select('type', footerTypeOptions, footerTypeOptions.tall),
    });
  });
