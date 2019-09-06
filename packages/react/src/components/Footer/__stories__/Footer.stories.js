import React from 'react';
import { storiesOf } from '@storybook/react';
import { Footer } from '../';
import readme from '../README.md';

import '../../../../../styles/scss/components/footer/index.scss';

storiesOf('Footer', module)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default / Tall', () => <Footer />)
  .add('Short', () => <Footer type="short" />);
