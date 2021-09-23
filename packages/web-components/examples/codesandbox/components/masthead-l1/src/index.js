/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/ibmdotcom-web-components/es/components/masthead/masthead-composite.js';
import './index.scss';

window.digitalData = {
  page: {
    pageInfo: {
      language: 'en-US',
      ibm: {
        country: 'US',
        siteID: 'IBMTESTWWW',
      },
    },
    isDataLayerReady: true,
  },
};

const l1Data = {
  title: 'Stock Charts',
  url: 'https://example.com',
  menuItems: [
    {
      title: 'Lorem ipsum dolor sit amet',
      titleEnglish: 'Lorem ipsum dolor sit amet',
      url: '',
      hasMenu: true,
      hasMegapanel: false,
      menuSections: [
        {
          heading: 'Explore',
          menuItems: [
            {
              title: 'Link 1',
              url: 'https://www.example.com',
            },
            {
              title: 'Menu dropdown item with extra long text',
              url: 'https://www.example.com',
            },
          ],
        },
      ],
    },
    {
      title: 'Link 2',
      titleEnglish: 'Link 2',
      url: 'https://example.com',
    },
    {
      title: 'Link 3',
      titleEnglish: 'Link 3',
      url: 'https://example.com',
    },
  ],
};

document.querySelector('dds-masthead-composite').l1Data = l1Data;
