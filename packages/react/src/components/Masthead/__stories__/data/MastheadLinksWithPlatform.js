/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * URLs for Masthead with Platform name L0
 *
 * type {{}}
 */

const mastheadLinksWithPlatform = {
  platform: {
    name: 'Platform Name',
    path: '#',
  },
  links: [
    {
      path: '#',
      name: 'Link 1',
    },
    {
      path: '#',
      name: 'Link 2',
    },
    {
      path: '#',
      name: 'Link 3',
    },
    {
      path: '#',
      name: 'Link 4',
      subnav: [
        {
          path: '#',
          name: 'Sublink 1',
        },
        {
          path: '#',
          name: 'Sublink 2',
        },
        {
          path: '#',
          name: 'Sublink 3',
        },
        {
          path: '#',
          name: 'Sublink 4',
        },
      ],
    },
  ],
};

module.exports = mastheadLinksWithPlatform;
