import { storiesOf } from '@storybook/html';
import { withKnobs } from '@storybook/addon-knobs';
import masthead from '../masthead.template';
import '../../../../../styles/scss/components/masthead/index.scss';

import mastheadLinks from './data/mastheadLinks.js';
import readme from '../README.md';

storiesOf('Masthead', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      sidebar: readme,
    },
  })
  .add('Default', () => {
    return masthead({
      navigation: {
        default: 'string',
        custom: mastheadLinks,
        none: null,
      },
      platform: {
        none: null,
        platform: {
          name: 'IBM Cloud',
          url: 'https://www.ibm.com/cloud',
        },
        hasProfile: true,
        hasSearch: true,
      },
    });
  });
