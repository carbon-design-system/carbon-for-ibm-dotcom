/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render } from 'lit-html';
import ifNonNull from '@carbon/carbon-web-components/es/globals/directives/if-non-null.js';
import EventManager from '../../../../tests/utils/event-manager';
import { MastheadLink } from '../../../internal/vendor/@carbon/ibmdotcom-services-store/types/translateAPI.d';
import DDSMastheadComposite from '../masthead-composite';
import {
  authenticatedProfileItems,
  unauthenticatedProfileItems,
} from '../__stories__/profile-items';

const template = (props?) => {
  const { language, userStatus, navLinks } = props ?? {};
  return html`
    <dds-masthead-composite
      language="${ifNonNull(language)}"
      user-status="${ifNonNull(userStatus)}"
      .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
      .navLinks="${navLinks}"
      .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
    >
    </dds-masthead-composite>
  `;
};

const navLinksFoo: MastheadLink[] = [
  {
    title: 'item-title-foo',
    url: 'https://carbon-design-system.github.io/carbon-for-ibm-dotcom/canary/web-components/foo',
  },
  {
    title: 'menu-title-foo',
    menuSections: [
      {
        menuItems: [
          {
            title: 'menu-item-title-bar',
            url: 'https://carbon-design-system.github.io/carbon-for-ibm-dotcom/canary/web-components/bar',
          },
        ],
      },
    ],
  },
];

const navLinksMegaMenu: MastheadLink[] = [
  {
    hasMegapanel: true,
    title: 'menu-title',
    menuSections: [
      {
        menuItems: [
          {
            highlighted: true,
            title: 'menu-section-1-title',
            url: 'https://www.ibm.com',
            megapanelContent: {
              feature: {},
              quickLinks: {
                title: '',
                links: [
                  { title: 'category-link-1', url: 'https://www.ibm.com' },
                ],
              },
            },
          },
          {
            title: 'menu-section-2-title',
            url: 'https://www.ibm.com',
            megapanelContent: {
              feature: {},
              quickLinks: {
                title: '',
                links: [
                  { title: 'category-link-2', url: 'https://www.ibm.com' },
                ],
              },
            },
          },
        ],
      },
    ],
  },
];

describe('dds-masthead-composite', function () {
  const events = new EventManager();

  describe('Rendering global bar', function () {
    it('should render unauthenticated state', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const mastheadComposite = document.body.querySelector(
        'dds-masthead-composite'
      );
      expect(
        mastheadComposite!.querySelector('dds-masthead-global-bar')
      ).toMatchSnapshot();
    });

    it('should render authenticated state', async function () {
      render(template({ userStatus: 'test.user@ibm.com' }), document.body);
      await Promise.resolve();
      const mastheadComposite = document.body.querySelector(
        'dds-masthead-composite'
      );
      expect(
        mastheadComposite!.querySelector('dds-masthead-global-bar')
      ).toMatchSnapshot();
    });
  });

  describe('Rendering nav items', function () {
    it('should render nothing if there is no given/default nav items', async function () {
      render(template(), document.body);
      await Promise.resolve();
      const mastheadComposite = document.body.querySelector(
        'dds-masthead-composite'
      );
      expect(mastheadComposite!.querySelector('dds-top-nav')).toBeNull();
      expect(
        mastheadComposite!.querySelector('dds-left-nav')!.children.length
      ).toBe(0);
    });

    it('should render the given nav items to the top', async function () {
      render(template({ navLinks: navLinksFoo }), document.body);
      await Promise.resolve();
      expect(
        document.body
          .querySelector('dds-masthead-composite')!
          .querySelector('dds-top-nav')
      ).toMatchSnapshot();
    });

    it('should render the given nav items to the left', async function () {
      render(template({ navLinks: navLinksFoo }), document.body);
      await Promise.resolve();
      expect(
        document.body
          .querySelector('dds-masthead-composite')!
          .querySelector('dds-left-nav')
      ).toMatchSnapshot();
    });

    it('should render the megamenu', async function () {
      render(template({ navLinks: navLinksMegaMenu }), document.body);
      await Promise.resolve();
      expect(
        document.body
          .querySelector('dds-masthead-composite')!
          .querySelector('dds-megamenu')
      ).toMatchSnapshot();
    });
  });

  describe('Determining the nav/search language', function () {
    it('should use the given language', async function () {
      DDSMastheadComposite.prototype._setLanguage = jasmine.createSpy();
      render(template({ language: 'ko-KR' }), document.body);
      await Promise.resolve();
      expect(DDSMastheadComposite.prototype._setLanguage).toHaveBeenCalled();
    });

    afterEach(function () {
      DDSMastheadComposite.prototype._setLanguage = undefined;
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
    events.reset();
  });
});
