import { storiesOf } from '@storybook/html';
import { withKnobs, select, text } from '@storybook/addon-knobs';
import wrapper from './templates/wrapper.template';
import horizontalrule from '../horizontalrule.template';
import '../../../../../styles/scss/components/horizontalrule/_horizontalrule.scss';
import 'carbon-components/scss/globals/grid/_grid.scss';

storiesOf('HorizontalRule', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const styles = {
      solid: '',
      dashed: 'dashed',
    };

    const sizes = {
      small: 'small',
      medium: 'medium',
      large: 'large',
      fluid: '',
    };

    const contrasts = {
      'low-contrast': 'low',
      'medium-contrast': '',
      'high-contrast': 'high',
    };

    const weights = {
      thin: '',
      thick: 'thick',
    };

    const words = text(
      'text',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    );

    return wrapper({
      words,
      hr: horizontalrule({
        style: select('style', styles, styles.solid),
        size: select('size', sizes, sizes.fluid),
        contrast: select('contrast', contrasts, contrasts.medium),
        weight: select('weight', weights, weights.thin),
      }),
    });
  });
