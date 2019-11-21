import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { Footer } from '../';
import readme from '../README.md';

import './index.scss';

storiesOf('Footer', module)
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

    return (
      <Footer
        type={select('type', footerTypeOptions, footerTypeOptions.tall)}
      />
    );
  });
