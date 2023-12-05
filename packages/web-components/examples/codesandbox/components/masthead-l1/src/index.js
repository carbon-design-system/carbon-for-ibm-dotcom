/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * the `lit-element` package is not required in `package.json`, but is included
 * in this example for CodeSandbox compatibility
 *
 * https://github.com/codesandbox/codesandbox-client/issues/4456
 */

import '@carbon/ibmdotcom-web-components/es/components/masthead';
import './index.scss';

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

document.querySelector('c4d-masthead-container').l1Data = l1Data;
