import { storiesOf } from '@storybook/html';
import { withKnobs, select } from '@storybook/addon-knobs';
import footer from '../footer.template';
import '../../../../../styles/scss/components/footer/index.scss';
// import readme from '../README.md';

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
      const footerElement = document.querySelector('.bx--footer');
      // eslint-disable-next-line
      const footerInstance = footer.create(footerElement);
    }, 5000);
    return footer.template({
      type: select('type', footerTypeOptions, footerTypeOptions.tall),
    });
  });
