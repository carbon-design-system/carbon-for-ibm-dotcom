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
    const standardProps = {
      navigation: select(
        'Navigation',
        mastheadKnobs.navigation,
        mastheadKnobs.navigation.default
      ),
      platform: select(
        'Platform name',
        mastheadKnobs.platform,
        mastheadKnobs.platform.none
      ),
      hasProfile: boolean('Has profile', true),
      hasSearch: boolean('Has search', true),
    };
    return <Masthead {...standardProps} />;
  })
  .add('Search open by default', () => {
    const standardProps = {
      navigation: select(
        'Navigation',
        mastheadKnobs.navigation,
        mastheadKnobs.navigation.default
      ),
      platform: select(
        'Platform name',
        mastheadKnobs.platform,
        mastheadKnobs.platform.none
      ),
      hasProfile: boolean('Has profile', true),
      hasSearch: boolean('Has search', true),
    };
    return <Masthead {...standardProps} searchOpenOnload={true} />;
  });
