import React from 'react';
import { storiesOf } from '@storybook/react';
import { Footer } from '../';

import '../../../../../styles/scss/components/footer/index.scss';

storiesOf('Footer', module)
  .add('Default / Tall', () => <Footer />)
  .add('Short', () => <Footer type="short" />);
