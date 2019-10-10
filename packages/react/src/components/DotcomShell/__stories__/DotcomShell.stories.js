import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, boolean } from '@storybook/addon-knobs';
import DotcomShell from '../DotcomShell';
import mastheadKnobs from '../../Masthead/__stories__/data/Masthead.stories.knobs.js';
import readme from '../README.md';
import '../../../../../styles/scss/components/dotcom-shell/_dotcom-shell.scss';
import content from './data/content';

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
        hasProfile={boolean('Show profile', true)}
        hasSearch={boolean('Show search', true)}>
        {content}
      </DotcomShell>
    );
  });
