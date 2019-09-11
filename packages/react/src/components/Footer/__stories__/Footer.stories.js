import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import { Footer } from '../';
import readme from '../README.md';

import '../../../../../styles/scss/components/footer/index.scss';

storiesOf('Footer', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    window.localeButton = boolean('Feature Flag localeButton', false);
    return <Footer type={select('type', { tall: '', short: 'short' }, '')} />;
  });
