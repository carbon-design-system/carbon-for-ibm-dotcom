/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { select } from '@storybook/addon-knobs';
import on from 'carbon-components/es/globals/js/misc/on.js';
import inPercy from '@percy-io/in-percy';
import textNullable from '../../../../.storybook/knob-text-nullable';
import c4dLeftNav from '../left-nav';
import '../masthead-container';
import styles from './masthead.stories.scss';
import { ifDefined } from 'lit/directives/if-defined.js';
import { mastheadLinks as links, mastheadL1Data, logoData } from './links';
import { UNAUTHENTICATED_STATUS } from '../../../internal/vendor/@carbon/ibmdotcom-services-store/types/profileAPI';
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
    selectedMenuItem,
    searchPlaceholder,
    userStatus,
  } = args?.MastheadComposite ?? {};
  const { useMock } = args?.Other ?? {};
  return html`
    <style>
      ${styles}
    </style>
    ${useMock
      ? html`
          <c4d-masthead-composite
            selected-menu-item="${ifDefined(selectedMenuItem)}"
            user-status="${ifDefined(userStatus)}"
            searchPlaceholder="${ifDefined(searchPlaceholder)}"
            .authenticatedProfileItems="${ifDefined(authenticatedProfileItems)}"
            has-profile="${hasProfile}"
            has-search="${hasSearch}"
            .unauthenticatedProfileItems="${ifDefined(
              unauthenticatedProfileItems
            )}"
            custom-profile-login="${customProfileLogin}"></c4d-masthead-composite>
        `
      : html`
          <c4d-masthead-container
            selected-menu-item="${ifDefined(selectedMenuItem)}"
            user-status="${ifDefined(userStatus)}"
            searchPlaceholder="${ifDefined(searchPlaceholder)}"
            has-profile="${hasProfile}"
            has-search="${hasSearch}"
            custom-profile-login="${customProfileLogin}"></c4d-masthead-container>
        `}
  `;
};

export const WithCustomTypeahead = (args) => {
  const { useMock } = args?.Other ?? {};

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
          <c4d-masthead-composite
            ?custom-typeahead-api=${true}></c4d-masthead-composite>
        `
      : html`
          <c4d-masthead-container
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
  const { searchPlaceholder } = args?.MastheadComposite ?? {};
  const { useMock } = args?.Other ?? {};
  return html`
    <style>
      ${styles}
    </style>
    ${useMock
      ? html`
          <c4d-masthead-composite
            activate-search="true"
            searchPlaceholder="${ifDefined(
              searchPlaceholder
            )}"></c4d-masthead-composite>
        `
      : html`
          <c4d-masthead-container
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
  const { platform, platformUrl } = args?.WithPlatform ?? {};
  const { useMock } = args?.Other ?? {};
  return html`
    <style>
      ${styles}
    </style>
    ${useMock
      ? html`
          <c4d-masthead-composite
            platform="${ifDefined(platform)}"
            .platformUrl="${ifDefined(platformUrl)}"></c4d-masthead-composite>
        `
      : html`
          <c4d-masthead-container
            platform="${ifDefined(platform)}"
            .platformUrl="${ifDefined(platformUrl)}"></c4d-masthead-container>
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
      }),
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

export const withL1 = (args) => {
  const { selectedMenuItem } = args?.MastheadComposite ?? {};
  const { useMock } = args?.Other ?? {};
  return html`
    <style>
      ${styles}
    </style>
    ${useMock
      ? html`
          <c4d-masthead-composite
            .l1Data="${mastheadL1Data}"
            selected-menu-item="${ifDefined(
              selectedMenuItem
            )}"></c4d-masthead-composite>
        `
      : html`
          <c4d-masthead-container
            .l1Data="${mastheadL1Data}"
            selected-menu-item="${ifDefined(
              selectedMenuItem
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
          'selected menu item (selected-menu-item)',
          'Products'
        ),
      }),
    },
    propsSet: {
      default: {
        MastheadComposite: {
          hasProfile: 'true',
          hasSearch: 'true',
          searchPlaceholder: 'Search all of IBM',
          selectedMenuItem: 'Lorem ipsum dolor sit amet',
          userStatus: userStatuses.unauthenticated,
        },
      },
    },
  },
};

export const withAlternateLogoAndTooltip = (args) => {
  const { mastheadLogo } = args?.MastheadComposite ?? {};
  const { useMock } = args?.Other ?? {};
  return html`
    <style>
      ${styles}
    </style>
    ${useMock
      ? html`
          <c4d-masthead-composite
            .logoData="${mastheadLogo === 'alternateWithTooltip'
              ? logoData
              : null}"></c4d-masthead-composite>
        `
      : html`
          <c4d-masthead-container
            .logoData="${mastheadLogo === 'alternateWithTooltip'
              ? logoData
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

export const WithScopedSearch = ({ parameters }) => {
  const { useMock } = parameters?.props?.Other ?? {};

  return html`
    <style>
      ${styles}
    </style>
    ${useMock
      ? html`
          <c4d-masthead-composite
            .scopeParameters=${scopeParameters}></c4d-masthead-composite>
        `
      : html`
          <c4d-masthead-container
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
      return story();
    },
  ],
  parameters: {
    ...readme.parameters,
    knobs: {
      escapeHTML: false,
      MastheadComposite: () => ({
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
        searchPlaceholder: textNullable(
          'search placeholder (searchPlaceholder)',
          'Search all of IBM'
        ),
        selectedMenuItem: textNullable(
          'selected menu item (selected-menu-item)',
          'Consulting & Services'
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
      }),
    },
    props: (() => {
      // Lets `<c4d-masthead-container>` load the nav links
      const useMock =
        inPercy() || new URLSearchParams(window.location.search).has('mock');
      return {
        MastheadComposite: {
          navLinks: !useMock ? undefined : links,
        },
        Other: {
          useMock,
        },
      };
    })(),
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
          navLinks: links,
        },
      },
    },
  },
};
