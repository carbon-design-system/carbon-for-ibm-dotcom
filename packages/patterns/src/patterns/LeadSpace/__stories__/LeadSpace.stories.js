import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import readme from '../README.md';

import LeadSpace from '../LeadSpace';

storiesOf('LeadSpace', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    return <LeadSpace />;
  });
