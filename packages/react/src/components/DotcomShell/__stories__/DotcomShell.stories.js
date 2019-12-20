import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, boolean, text } from '@storybook/addon-knobs';
import DotcomShell from '../DotcomShell';
import mastheadKnobs from '../../Masthead/__stories__/data/Masthead.stories.knobs.js';
import readme from '../README.md';
import content from './data/content';
import { DDS_MASTHEAD_L1 } from '../../../internal/FeatureFlags';

import './index.scss';

const footer = {
  default: 'default',
  short: 'short',
};

storiesOf('Dotcom Shell', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    const mastheadL1Props = DDS_MASTHEAD_L1 && {
      title: text('Title', 'Stock Charts'),
      eyebrowText: text('Eyebrow text', 'Eyebrow'),
      eyebrowLink: text('Eyebrow link', '#'),
    };
    return (
      <DotcomShell
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
        footerType={select('Footer', footer, footer.default)}
        hasProfile={boolean('Has profile', true)}
        hasSearch={boolean('Has search', true)}
        {...mastheadL1Props}>
        {content}
      </DotcomShell>
    );
  });
