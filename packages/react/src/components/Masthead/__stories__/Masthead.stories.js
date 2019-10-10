import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, boolean } from '@storybook/addon-knobs';
import Masthead from '../Masthead';
import mastheadKnobs from './data/Masthead.stories.knobs.js';
import readme from '../README.md';
import '../../../../../styles/scss/components/masthead/index.scss';

storiesOf('Masthead', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    return (
      <Masthead
        navigation={select(
          'Navigation',
          mastheadKnobs.navigation,
          mastheadKnobs.navigation.default
        )}
        platform={select(
          'Platform name',
          mastheadKnobs.platform,
          mastheadKnobs.platform.none
        )}
        hasProfile={boolean('Show profile', true)}
        hasSearch={boolean('Show search', true)}
      />
    );
  });
