import './index.scss';

import { text, withKnobs } from '@storybook/addon-knobs';
import ContentGroup from '../ContentGroup';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

storiesOf('Patterns (Sub-Patterns)|ContentGroup', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    const copy = text(
      'Component title(required):',
      'Lorem ipsum dolor sit amet.'
    );

    return <ContentGroup heading={copy} />;
  });
