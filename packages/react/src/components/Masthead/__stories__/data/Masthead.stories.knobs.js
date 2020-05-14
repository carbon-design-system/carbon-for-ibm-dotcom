/**
 * Knobs for Masthead. Also used by DotcomShell.stories.js
 *
 * type {{}}
 */
import mastheadLinks from './MastheadLinks.js';

const mastheadKnobs = {
  navigation: {
    default: 'default',
    custom: mastheadLinks,
    none: null,
  },
  platform: {
    none: null,
    platform: {
      name: 'IBM Cloud',
      url: 'https://www.ibm.com/cloud',
    },
  },
};

export default mastheadKnobs;
