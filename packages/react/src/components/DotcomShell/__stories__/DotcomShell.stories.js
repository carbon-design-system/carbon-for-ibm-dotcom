import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';
import DotcomShell from '../DotcomShell';
import mastheadLinks from '../../Masthead/__stories__/data/MastheadLinks.js';
import '../../../../../styles/scss/components/dotcom-shell/_dotcom-shell.scss';
import content from './data/content';

const platformName = {
  platform: {
    name: 'IBM Cloud',
    url: 'https://www.ibm.com/cloud',
  },
};

const props = {
  navigation: () => {
    return {
      navigation: select('Navigation', {
        default: 'string',
        custom: mastheadLinks,
        none: false,
      }),
    };
  },
  platform: () => {
    return {
      platform: select('Platform', {
        none: 'undefined',
        hasName: platformName.platform,
      }),
    };
  },
};

storiesOf('Dotcom Shell', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    return (
      <DotcomShell {...props.navigation()} {...props.platform()}>
        {content}
      </DotcomShell>
    );
  });
