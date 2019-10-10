/**
 * Knobs for Masthead. Also used by DotcomShell.stories.js
 *
 * type {{}}
 */
import mastheadLinks from './MastheadLinks.js';

const platformName = {
  none: null,
  platform: {
    name: 'IBM Cloud',
    url: 'https://www.ibm.com/cloud',
  },
};

const mastheadKnobs = {
  platformName: {
    none: null,
    platform: {
      name: 'IBM Cloud',
      url: 'https://www.ibm.com/cloud',
    },
  },
  navigation: {
    default: 'string',
    custom: mastheadLinks,
    none: null,
  },
  platform: {
    none: null,
    hasName: platformName.platform,
  },
};

module.exports = mastheadKnobs;
