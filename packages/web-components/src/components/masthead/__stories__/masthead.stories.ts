/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { select, boolean } from '@storybook/addon-knobs';
import on from 'carbon-components/es/globals/js/misc/on.js';
import ifNonNull from '../../../internal/vendor/@carbon/web-components/globals/directives/if-non-null.js';
import textNullable from '../../../../.storybook/knob-text-nullable';
import DDSLeftNav from '../left-nav';
import '../masthead-container';
import { CTA_TYPE } from '../../cta/defs';
import styles from './masthead.stories.scss';
import { mastheadLinksV2 as links, mastheadL1Data, logoData } from './links';
import {
  UNAUTHENTICATED_STATUS,
  MASTHEAD_AUTH_METHOD,
} from '../../../internal/vendor/@carbon/ibmdotcom-services-store/types/profileAPI';
import {
  authenticatedProfileItems,
  unauthenticatedProfileItems,
} from './profile-items';
import { DDS_CUSTOM_PROFILE_LOGIN } from '../../../globals/internal/feature-flags';
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
          <dds-masthead-composite
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceholder="${ifNonNull(searchPlaceholder)}"
            .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
            has-profile="${hasProfile}"
            has-search="${hasSearch}"
            has-contact="${hasContact}"
            .navLinks="${links}"
            .unauthenticatedProfileItems="${ifNonNull(
              unauthenticatedProfileItems
            )}"
            custom-profile-login="${customProfileLogin}"
            auth-method="${MASTHEAD_AUTH_METHOD.DEFAULT}"></dds-masthead-composite>
        `
      : html`
          <dds-masthead-container
            data-endpoint="${dataEndpoints['v2.1']}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceholder="${ifNonNull(searchPlaceholder)}"
            has-profile="${hasProfile}"
            has-search="${hasSearch}"
            has-contact="${hasContact}"
            custom-profile-login="${customProfileLogin}"
            auth-method="${authMethod}"></dds-masthead-container>
        `}
  `;
};

export const withCloudData = (args) => {
  const {
    customProfileLogin,
    hasSearch,
    selectedMenuItem,
    searchPlaceholder,
    useMock,
  } = args?.MastheadComposite ?? {};

  return html`
    <style>
      ${styles}
    </style>
    ${useMock
      ? html`
          <dds-masthead-composite
            platform="Cloud"
            .platformUrl="https://www.ibm.com/cloud"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            searchPlaceholder="${ifNonNull(searchPlaceholder)}"
            .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
            has-search="${hasSearch}"
            .navLinks="${links}"
            .unauthenticatedProfileItems="${ifNonNull(
              unauthenticatedProfileItems
            )}"
            custom-profile-login="${customProfileLogin}"
            auth-method="${MASTHEAD_AUTH_METHOD.COOKIE}"></dds-masthead-composite>
        `
      : html`
          <dds-masthead-container
            data-endpoint="${dataEndpoints['cloud']}"
            platform="Cloud"
            .platformUrl="https://www.ibm.com/cloud"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            searchPlaceholder="${ifNonNull(searchPlaceholder)}"
            has-search="${hasSearch}"
            custom-profile-login="${customProfileLogin}"
            auth-method="${MASTHEAD_AUTH_METHOD.COOKIE}"></dds-masthead-container>
        `}
  `;
};

export const WithCustomTypeahead = (args) => {
  const { useMock } = args?.MastheadComposite ?? {};

  document.documentElement.addEventListener(
    'dds-search-with-typeahead-input',
    async (e) => {
      const results = await customTypeaheadApiFunction(
        (e as CustomEvent).detail.value
      );
      document.dispatchEvent(
        new CustomEvent('dds-custom-typeahead-api-results', { detail: results })
      );
    }
  );

  return html`
    <style>
      ${styles}
    </style>
    ${useMock
      ? html`
          <dds-masthead-composite
            .navLinks="${links}"
            ?custom-typeahead-api=${true}></dds-masthead-composite>
        `
      : html`
          <dds-masthead-container
            data-endpoint="${dataEndpoints['v2.1']}"
            ?custom-typeahead-api=${true}></dds-masthead-container>
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
          <dds-masthead-composite
            .navLinks="${links}"
            activate-search="true"
            searchPlaceholder="${ifNonNull(
              searchPlaceholder
            )}"></dds-masthead-composite>
        `
      : html`
          <dds-masthead-container
            data-endpoint="${dataEndpoints['v2.1']}"
            activate-search="true"
            searchPlaceholder="${ifNonNull(
              searchPlaceholder
            )}"></dds-masthead-container>
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
          <dds-masthead-composite
            platform="${ifNonNull(platform)}"
            .navLinks="${links}"
            .platformUrl="${ifNonNull(platformUrl)}"></dds-masthead-composite>
        `
      : html`
          <dds-masthead-container
            data-endpoint="${dataEndpoints['v2.1']}"
            platform="${ifNonNull(platform)}"
            .platformUrl="${ifNonNull(platformUrl)}"></dds-masthead-container>
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
          <dds-masthead-composite
            .navLinks="${links}"
            .l1Data="${l1Data}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            selected-menu-item-l1="${ifNonNull(
              selectedMenuItemL1
            )}"></dds-masthead-composite>
        `
      : html`
          <dds-masthead-container
            data-endpoint="${dataEndpoints['v2.1']}"
            .l1Data="${l1Data}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            selected-menu-item-l1="${ifNonNull(
              selectedMenuItemL1
            )}"></dds-masthead-container>
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
          <dds-masthead-composite
            .navLinks="${links}"
            .logoData="${mastheadLogo === 'alternateWithTooltip'
              ? logoData
              : null}"></dds-masthead-composite>
        `
      : html`
          <dds-masthead-container
            data-endpoint="${dataEndpoints['v2.1']}"
            .logoData="${mastheadLogo === 'alternateWithTooltip'
              ? logoData
              : null}"></dds-masthead-container>
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
          <dds-masthead-composite
            .navLinks="${links}"
            .scopeParameters=${scopeParameters}></dds-masthead-composite>
        `
      : html`
          <dds-masthead-container
            data-endpoint="${dataEndpoints['v2.1']}"
            .scopeParameters=${scopeParameters}></dds-masthead-container>
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
          const leftNav = document.querySelector('dds-left-nav');
          if (leftNav) {
            (leftNav as DDSLeftNav).expanded = false;
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
          DDS_CUSTOM_PROFILE_LOGIN &&
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
