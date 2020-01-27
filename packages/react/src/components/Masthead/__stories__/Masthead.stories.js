import './index.scss';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { DDS_MASTHEAD_L1 } from '../../../internal/FeatureFlags';
import Masthead from '../Masthead';
import React from 'react';
import mastheadKnobs from './data/Masthead.stories.knobs.js';
import readme from '../README.md';
import { storiesOf } from '@storybook/react';

storiesOf('Components|Masthead', module)
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
    const mastheadL1Props = DDS_MASTHEAD_L1 && {
      title: text('Title', 'Stock Charts'),
      eyebrowText: text('Eyebrow text', 'Eyebrow'),
      eyebrowLink: text('Eyebrow link', '#'),
    };
    return (
      <Masthead
        {...standardProps}
        {...mastheadL1Props}
        placeHolderText={text('Search placeholder', 'Search all of IBM')}
      />
    );
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
    const mastheadL1Props = DDS_MASTHEAD_L1 && {
      title: text('Title', 'Stock Charts'),
      eyebrowText: text('Eyebrow text', 'Eyebrow'),
      eyebrowLink: text('Eyebrow link', '#'),
    };
    return (
      <Masthead
        {...standardProps}
        {...mastheadL1Props}
        searchOpenOnload={true}
        placeHolderText={text('Search placeholder', 'Search all of IBM')}
      />
    );
  });
