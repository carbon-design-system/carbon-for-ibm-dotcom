import React from 'react';
import { addDecorator, storiesOf } from '@storybook/react';
import { withDocs } from 'storybook-readme';
import README from '../../scss/themes/expressive/README.md';
import { withInfo } from '@storybook/addon-info';

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
