/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { DDS_MASTHEAD_L1 } from '../../../internal/FeatureFlags';
import inPercy from '@percy-io/in-percy';
import Masthead from '../Masthead';
import mastheadKnobs from './data/Masthead.stories.knobs.js';
import React from 'react';
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
        'navigation data (navigation)',
        mastheadKnobs.navigation,
        inPercy()
          ? mastheadKnobs.navigation.custom
          : mastheadKnobs.navigation.default
      ),
      platform: select(
        'platform name (platform)',
        mastheadKnobs.platform,
        mastheadKnobs.platform.none
      ),
      hasProfile: boolean('show the profile functionality (hasProfile)', true),
      hasSearch: boolean('show the search functionality (hasSearch)', true),
      placeHolderText: text(
        'search placeholder (placeHolderText)',
        'Search all of IBM'
      ),
    };
    const mastheadL1Props = DDS_MASTHEAD_L1 && {
      title: text('L1 title (title) (experimental)', 'Stock Charts'),
      eyebrowText: text(
        'L1 eyebrow text (eyebrowText) (experimental)',
        'Eyebrow'
      ),
      eyebrowLink: text('L1 eyebrow link (eyebrowLink) (experimental)', '#'),
    };
    return <Masthead {...standardProps} {...mastheadL1Props} />;
  })
  .add('Search open by default', () => {
    const standardProps = {
      navigation: select(
        'navigation data (navigation)',
        mastheadKnobs.navigation,
        inPercy()
          ? mastheadKnobs.navigation.custom
          : mastheadKnobs.navigation.default
      ),
      platform: select(
        'platform name (platform)',
        mastheadKnobs.platform,
        mastheadKnobs.platform.none
      ),
      hasProfile: boolean('show the profile functionality (hasProfile)', true),
      hasSearch: boolean('show the search functionality (hasSearch)', true),
      placeHolderText: text(
        'search placeholder (placeHolderText)',
        'Search all of IBM'
      ),
    };
    const mastheadL1Props = DDS_MASTHEAD_L1 && {
      title: text('L1 title (title) (experimental)', 'Stock Charts'),
      eyebrowText: text(
        'L1 eyebrow text (eyebrowText) (experimental)',
        'Eyebrow'
      ),
      eyebrowLink: text('L1 eyebrow link (eyebrowLink) (experimental)', '#'),
    };
    return (
      <Masthead
        {...standardProps}
        {...mastheadL1Props}
        searchOpenOnload={true}
      />
    );
  });
