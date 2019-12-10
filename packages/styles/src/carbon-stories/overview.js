import React from 'react';
import { storiesOf } from '@storybook/react';
import { withDocs } from 'storybook-readme';
import README from '../../scss/themes/expressive/README.md';

storiesOf('Overview', module)
  .addParameters({
    info: {
      disable: true,
    },
  })
  .add(
    'Get Started',
    withDocs(README, () => <div/>),
  );
