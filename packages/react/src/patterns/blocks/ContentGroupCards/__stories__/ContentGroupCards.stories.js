import './index.scss';
import ContentGroupCards from '../ContentGroupCards';
import ContentGroupCardsKnobs from '../data/ContentGroupCards.knobs';
import React from 'react';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

storiesOf('Patterns (Blocks)|ContentGroupCards', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    return (
      <ContentGroupCards
        heading={ContentGroupCardsKnobs.heading}
        items={ContentGroupCardsKnobs.items}
      />
    );
  });
