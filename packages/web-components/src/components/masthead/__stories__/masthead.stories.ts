/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { select, boolean } from '@storybook/addon-knobs';
import on from '../../../internal/vendor/@carbon/web-components/globals/mixins/on.js';
import ifNonEmpty from '../../../internal/vendor/@carbon/web-components/globals/directives/if-non-empty.js';
import textNullable from '../../../../.storybook/knob-text-nullable';
import c4dLeftNav from '../left-nav';
import '../masthead-container';
import { CTA_TYPE } from '../../cta/defs';
import styles from './masthead.stories.scss';
import { ifDefined } from 'lit/directives/if-defined.js';
import { mastheadL0Data, mastheadL1Data, mastheadLogoData } from './links';
import {
  UNAUTHENTICATED_STATUS,
  MASTHEAD_AUTH_METHOD,
} from '../../../internal/vendor/@carbon/ibmdotcom-services-store/types/profileAPI';
import {
  authenticatedProfileItems,
  unauthenticatedProfileItems,
} from './profile-items';
import { C4D_CUSTOM_PROFILE_LOGIN } from '../../../globals/internal/feature-flags';
import readme from './README.stories.mdx';

const userStatuses = {
  authenticated: 'test.user@ibm.com',
  unauthenticated: UNAUTHENTICATED_STATUS,
};

const scopeParameters = [
  {
    name: 'All',
    appId: 'all',
    value: 'all',
  },
  {
    name: 'Analyst',
    appId: 'analyst',
    value: 'analyst',
  },
  {
    name: 'PartnerWorld',
    appId: 'pw',
    value: ['pw', 'pwp'],
  },
  {
    name: 'Developer',
    appId: 'dw',
    value: ['dw', 'dwaspera'],
  },
  {
    name: 'IBM Docs',
    appId: 'ibmdocs',
    label: 'Search Label',
    value: ['ibmdocs', 'dw'],
  },
];

const dataEndpoints = {
  cloud: '/common/carbon-for-ibm-dotcom/translations/cloud-masthead',
  v2: '/common/carbon-for-ibm-dotcom/translations/masthead-footer/v2',
  'v2.1': '/common/carbon-for-ibm-dotcom/translations/masthead-footer/v2.1',
};

async function customTypeaheadApiFunction(searchVal) {
  return fetch(
    `https://ibm.com/docs/api/v1/suggest?query=${searchVal}&lang=undefined&categories=&limit=6`
  )
    .then((response) => response.json())
    .then((data) => {
      const searchResults = [
        data.hints,
        {
          title: 'Product pages',
          items: data.products,
        },
      ];
      return searchResults;
    });
}

export const Default = (args) => {
  const {
    customProfileLogin,
    hasProfile,
    hasSearch,
    hasContact,
    selectedMenuItem,
    searchPlaceholder,
    userStatus,
    authMethod,
    useMock,
  } = args?.MastheadComposite ?? {};
  return html`
    <style>
      ${styles}
    </style>
    ${useMock
      ? html`
          <c4d-masthead-container
            selected-menu-item="${ifDefined(selectedMenuItem)}"
            user-status="${ifDefined(userStatus)}"
            searchPlaceholder="${ifDefined(searchPlaceholder)}"
            has-profile="${hasProfile}"
            has-search="${hasSearch}"
            has-contact="${hasContact}"
            .l0Data="${mastheadL0Data}"
            .authenticatedProfileItems="${ifDefined(authenticatedProfileItems)}"
            .unauthenticatedProfileItems="${ifNonEmpty(
              unauthenticatedProfileItems
            )}"
            custom-profile-login="${customProfileLogin}"
            auth-method="${MASTHEAD_AUTH_METHOD.DEFAULT}"></c4d-masthead-container>
        `
      : html`
          <c4d-masthead-container
            data-endpoint="${dataEndpoints['v2.1']}"
            selected-menu-item="${ifNonEmpty(selectedMenuItem)}"
            user-status="${ifNonEmpty(userStatus)}"
            searchPlaceholder="${ifNonEmpty(searchPlaceholder)}"
            has-profile="${hasProfile}"
            has-search="${hasSearch}"
            has-contact="${hasContact}"
            custom-profile-login="${customProfileLogin}"
            auth-method="${authMethod}"></c4d-masthead-container>
        `}
  `;
};

export const WithCustomTypeahead = (args) => {
  const { useMock } = args?.MastheadComposite ?? {};

  document.documentElement.addEventListener(
    'c4d-search-with-typeahead-input',
    async (e) => {
      const results = await customTypeaheadApiFunction(
        (e as CustomEvent).detail.value
      );
      document.dispatchEvent(
        new CustomEvent('c4d-custom-typeahead-api-results', { detail: results })
      );
    }
  );

  return html`
    <style>
      ${styles}
    </style>
    ${useMock
      ? html`
          <c4d-masthead-container
            .l0Data="${mastheadL0Data}"
            .authenticatedProfileItems="${ifNonEmpty(
              authenticatedProfileItems
            )}"
            .unauthenticatedProfileItems="${ifNonEmpty(
              unauthenticatedProfileItems
            )}"
            ?custom-typeahead-api=${true}></c4d-masthead-container>
        `
      : html`
          <c4d-masthead-container
            data-endpoint="${dataEndpoints['v2.1']}"
            ?custom-typeahead-api=${true}></c4d-masthead-container>
        `}
  `;
};

WithCustomTypeahead.story = {
  name: 'With custom typeahead',
  parameters: {
    knobs: {
      MastheadComposite: () => ({}),
    },
    propsSet: {
      default: {
        MastheadComposite: {
          hasProfile: 'true',
          hasSearch: 'true',
          searchPlaceHolder: 'Search all of IBM',
          selectedMenuItem: 'Services & Consulting',
          userStatus: userStatuses.unauthenticated,
        },
      },
    },
  },
};

export const searchOpenOnload = (args) => {
  const { searchPlaceholder, useMock } = args?.MastheadComposite ?? {};
  return html`
    <style>
      ${styles}
    </style>
    ${useMock
      ? html`
          <c4d-masthead-container
            .l0Data="${mastheadL0Data}"
            .authenticatedProfileItems="${ifNonEmpty(
              authenticatedProfileItems
            )}"
            .unauthenticatedProfileItems="${ifNonEmpty(
              unauthenticatedProfileItems
            )}"
            activate-search="true"
            searchPlaceholder="${ifDefined(
              searchPlaceholder
            )}"></c4d-masthead-container>
        `
      : html`
          <c4d-masthead-container
            data-endpoint="${dataEndpoints['v2.1']}"
            activate-search="true"
            searchPlaceholder="${ifDefined(
              searchPlaceholder
            )}"></c4d-masthead-container>
        `}
  `;
};

searchOpenOnload.story = {
  name: 'Search open onload',
  parameters: {
    knobs: {
      MastheadComposite: () => ({
        searchPlaceholder: textNullable(
          'search placeholder (searchPlaceholder)',
          'Search all of IBM'
        ),
      }),
    },
  },
};

export const withPlatform = (args) => {
  const { platform, platformUrl, useMock } = args?.WithPlatform ?? {};
  return html`
    <style>
      ${styles}
    </style>
    ${useMock
      ? html`
          <c4d-masthead-container
            platform="${ifNonEmpty(platform)}"
            .l0Data="${mastheadL0Data}"
            .authenticatedProfileItems="${ifNonEmpty(
              authenticatedProfileItems
            )}"
            .unauthenticatedProfileItems="${ifNonEmpty(
              unauthenticatedProfileItems
            )}"
            .platformUrl="${ifNonEmpty(platformUrl)}"></c4d-masthead-container>
        `
      : html`
          <c4d-masthead-container
            data-endpoint="${dataEndpoints['v2.1']}"
            platform="${ifNonEmpty(platform)}"
            .platformUrl="${ifNonEmpty(platformUrl)}"></c4d-masthead-container>
        `}
  `;
};

withPlatform.story = {
  name: 'With platform',
  parameters: {
    knobs: {
      MastheadComposite: () => ({}),
      WithPlatform: () => ({
        platform: textNullable('platform name (platform)', 'Platform'),
        platformUrl: textNullable(
          'platform url (platformUrl)',
          'https://www.ibm.com'
        ),
        useMock: boolean('use mock nav data (use-mock)', false),
      }),
    },
    propsSet: {
      default: {
        MastheadComposite: {
          platform: 'Platform',
          hasProfile: 'true',
          hasSearch: 'true',
          searchPlaceHolder: 'Search all of IBM',
          selectedMenuItem: 'Services & Consulting',
          userStatus: userStatuses.unauthenticated,
        },
      },
    },
  },
};

export const withL1 = (args) => {
  const { selectedMenuItem, selectedMenuItemL1, showContactCta, useMock } =
    args?.MastheadComposite ?? {};

  let l1Data = { ...mastheadL1Data };
  if (l1Data?.actions?.cta) {
    showContactCta
      ? (l1Data.actions.cta.ctaType = CTA_TYPE.CHAT)
      : delete l1Data.actions.cta.ctaType;
  }

  return html`
    <style>
      ${styles}
    </style>
    ${useMock
      ? html`
          <c4d-masthead-container
            .l0Data="${mastheadL0Data}"
            .authenticatedProfileItems="${ifNonEmpty(
              authenticatedProfileItems
            )}"
            .unauthenticatedProfileItems="${ifNonEmpty(
              unauthenticatedProfileItems
            )}"
            .l1Data="${l1Data}"
            selected-menu-item="${ifNonEmpty(selectedMenuItem)}"
            selected-menu-item-l1="${ifNonEmpty(
              selectedMenuItemL1
            )}"></c4d-masthead-container>
        `
      : html`
          <c4d-masthead-container
            data-endpoint="${dataEndpoints['v2.1']}"
            .l1Data="${l1Data}"
            selected-menu-item="${ifNonEmpty(selectedMenuItem)}"
            selected-menu-item-l1="${ifNonEmpty(
              selectedMenuItemL1
            )}"></c4d-masthead-container>
        `}
  `;
};

withL1.story = {
  name: 'With L1',
  parameters: {
    knobs: {
      MastheadComposite: () => ({
        selectedMenuItem: textNullable(
          'selected menu item in L0 (selected-menu-item)',
          'Consulting'
        ),
        selectedMenuItemL1: textNullable(
          'selected menu item in L1 (selected-menu-item-l1)',
          ''
        ),
        showContactCta: boolean('use Contact module CTA', false),
        useMock: boolean('use mock nav data (use-mock)', false),
      }),
    },
    propsSet: {
      default: {
        MastheadComposite: {
          selectedMenuItem: 'Consulting',
          selectedMenuItemL1: '',
          showContactCta: false,
          useMock: false,
        },
      },
    },
  },
};

export const withAlternateLogoAndTooltip = (args) => {
  const { mastheadLogo, useMock } = args?.MastheadComposite ?? {};
  return html`
    <style>
      ${styles}
    </style>
    ${useMock
      ? html`
          <c4d-masthead-container
            .l0Data="${mastheadL0Data}"
            .authenticatedProfileItems="${ifNonEmpty(
              authenticatedProfileItems
            )}"
            .unauthenticatedProfileItems="${ifNonEmpty(
              unauthenticatedProfileItems
            )}"
            .logoData="${mastheadLogo === 'alternateWithTooltip'
              ? mastheadLogoData
              : null}"></c4d-masthead-container>
        `
      : html`
          <c4d-masthead-container
            data-endpoint="${dataEndpoints['v2.1']}"
            .logoData="${mastheadLogo === 'alternateWithTooltip'
              ? mastheadLogoData
              : null}"></c4d-masthead-container>
        `}
  `;
};

withAlternateLogoAndTooltip.story = {
  name: 'With alternate logo and tooltip',
  parameters: {
    knobs: {
      MastheadComposite: () => ({
        mastheadLogo: select(
          'masthead logo data (logoData)',
          {
            defaultWithNoTooltip: null,
            alternateWithTooltip: 'alternateWithTooltip',
          },
          'alternateWithTooltip'
        ),
      }),
    },
    propsSet: {
      default: {
        MastheadComposite: {
          platform: null,
          hasProfile: 'true',
          hasSearch: 'true',
          searchPlaceholder: 'Search all of IBM',
          selectedMenuItem: 'Services & Consulting',
          userStatus: userStatuses.unauthenticated,
        },
      },
    },
  },
};

export const WithScopedSearch = (args) => {
  const { useMock } = args?.MastheadComposite ?? {};
  return html`
    <style>
      ${styles}
    </style>
    ${useMock
      ? html`
          <c4d-masthead-container
            .l0Data="${mastheadL0Data}"
            .authenticatedProfileItems="${ifNonEmpty(
              authenticatedProfileItems
            )}"
            .unauthenticatedProfileItems="${ifNonEmpty(
              unauthenticatedProfileItems
            )}"
            .scopeParameters=${scopeParameters}></c4d-masthead-container>
        `
      : html`
          <c4d-masthead-container
            data-endpoint="${dataEndpoints['v2.1']}"
            .scopeParameters=${scopeParameters}></c4d-masthead-container>
        `}
  `;
};

WithScopedSearch.story = {
  name: 'With scoped search',
  parameters: {
    knobs: {
      MastheadComposite: () => ({}),
    },
    propsSet: {
      default: {
        MastheadComposite: {
          hasProfile: 'true',
          hasSearch: 'true',
          searchPlaceHolder: 'Search all of IBM',
          selectedMenuItem: 'Services & Consulting',
          userStatus: userStatuses.unauthenticated,
        },
      },
    },
  },
};

export default {
  title: 'Components/Masthead',
  decorators: [
    (story) => {
      if (!(window as any)._hPageShow) {
        (window as any)._hPageShow = on(window, 'pageshow', () => {
          const leftNav = document.querySelector('c4d-left-nav');
          if (leftNav) {
            (leftNav as c4dLeftNav).expanded = false;
          }
        });
      }
      return html`
        ${story()}
        <script>
          window.digitalData.page.pageInfo.ibm.contactModuleConfiguration = {
            routing: {
              focusArea: 'Cloud - Automation - All',
              languageCode: 'en',
              regionCode: 'US',
            },
            translation: {
              languageCode: 'en',
              regionCode: 'US',
            },
          };
        </script>
        <script
          src="//www.ibm.com/common/digitaladvisor/cm-app/latest/cm-app.min.js"
          defer></script>
      `;
    },
  ],
  parameters: {
    ...readme.parameters,
    knobs: {
      escapeHTML: false,
      MastheadComposite: () => ({
        platform: textNullable('platform name (platform)', ''),
        hasProfile: select(
          'show the profile functionality (has-profile)',
          ['true', 'false'],
          'true'
        ),
        hasSearch: select(
          'show the search functionality (has-search)',
          ['true', 'false'],
          'true'
        ),
        hasContact: select(
          'Contact us button visibility (has-contact)',
          ['true', 'false'],
          'true'
        ),
        searchPlaceholder: textNullable(
          'search placeholder (searchPlaceholder)',
          'Search all of IBM'
        ),
        selectedMenuItem: textNullable(
          'selected menu item (selected-menu-item)',
          'Consulting'
        ),
        userStatus: select(
          'The user authenticated status (user-status)',
          userStatuses,
          userStatuses.unauthenticated
        ),
        customProfileLogin:
          C4D_CUSTOM_PROFILE_LOGIN &&
          textNullable(
            'custom profile login url (customProfileLogin)',
            'https://www.example.com/'
          ),
        useMock: boolean('use mock nav data (use-mock)', false),
      }),
    },
    propsSet: {
      default: {
        MastheadComposite: {
          platform: null,
          hasProfile: 'true',
          hasSearch: 'true',
          searchPlaceholder: 'Search all of IBM',
          selectedMenuItem: 'Services & Consulting',
          userStatus: userStatuses.unauthenticated,
          customProfileLogin: 'https://www.example.com/',
          useMockData: false,
        },
      },
    },
  },
};
