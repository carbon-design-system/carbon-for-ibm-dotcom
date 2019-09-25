import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';
import Masthead from '../Masthead';
import mastheadLinks from './data/MastheadLinks.js';
import readme from '../README.md';
import '../../../../../styles/scss/components/masthead/index.scss';

const platformName = {
  none: 'undefined',
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

storiesOf('Masthead', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    return <Masthead {...props.navigation()} {...props.platform()} />;
  });
