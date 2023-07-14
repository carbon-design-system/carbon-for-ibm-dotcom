/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { boolean, select } from '@storybook/addon-knobs';
import on from 'carbon-components/es/globals/js/misc/on.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import inPercy from '@percy-io/in-percy';
import textNullable from '../../../../.storybook/knob-text-nullable';
import DDSLeftNav from '../left-nav';
import '../masthead-container';
import styles from './masthead.stories.scss';
import { mastheadLinks as links, mastheadL1Data, logoData } from './links';
import { UNAUTHENTICATED_STATUS } from '../../../internal/vendor/@carbon/ibmdotcom-services-store/types/profileAPI';
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

/**
 * platform knob data
 */
const platformData = {
  name: 'IBM Cloud',
  url: 'https://www.ibm.com/cloud',
};

const urlObject = {
  'en-US': {
    url: 'https://www.example.com/us-en',
  },
  'fr-FR': {
    url: 'https://www.example.com/fr-fr/sample',
  },
  'es-MX': {
    url: 'https://www.example.com/ibm/es-mx/sample',
  },
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
    `https://ibmdocs-dev.mybluemix.net/docs/api/v1/suggest?query=${searchVal}&lang=undefined&categories=&limit=6`
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
    platform,
    hasProfile,
    hasSearch,
    selectedMenuItem,
    searchPlaceholder,
    userStatus,
    navLinks,
  } = args?.MastheadComposite ?? {};
  const { useMock } = args?.Other ?? {};
  return html`
    <style>
      ${styles}
    </style>
    ${useMock
      ? html`
          <dds-masthead-composite
            platform="${ifDefined(platform)}"
            .platformUrl="${ifDefined(platformData.url)}"
            selected-menu-item="${ifDefined(selectedMenuItem)}"
            user-status="${ifDefined(userStatus)}"
            searchPlaceholder="${ifDefined(searchPlaceholder)}"
            .authenticatedProfileItems="${ifDefined(authenticatedProfileItems)}"
            has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            .navLinks="${navLinks}"
            .unauthenticatedProfileItems="${ifDefined(
              unauthenticatedProfileItems
            )}"
            custom-profile-login="${customProfileLogin}"></dds-masthead-composite>
        `
      : html`
          <dds-masthead-container
            platform="${ifDefined(platform)}"
            .platformUrl="${ifDefined(platformData.url)}"
            selected-menu-item="${ifDefined(selectedMenuItem)}"
            user-status="${ifDefined(userStatus)}"
            searchPlaceholder="${ifDefined(searchPlaceholder)}"
            .navLinks="${navLinks}"
            has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            custom-profile-login="${customProfileLogin}"></dds-masthead-container>
        `}
  `;
};

export const WithCustomTypeahead = (args) => {
  const {
    customProfileLogin,
    navLinks,
    platform,
    selectedMenuItem,
    userStatus,
    searchPlaceholder,
    hasProfile,
    hasSearch,
  } = args?.MastheadComposite ?? {};
  const { useMock } = args?.Other ?? {};

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
            platform="${ifDefined(platform)}"
            .platformUrl="${ifDefined(platformData.url)}"
            selected-menu-item="${ifDefined(selectedMenuItem)}"
            user-status="${ifDefined(userStatus)}"
            searchPlaceholder="${ifDefined(searchPlaceholder)}"
            .authenticatedProfileItems="${ifDefined(authenticatedProfileItems)}"
            has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            .navLinks="${navLinks}"
            .unauthenticatedProfileItems="${ifDefined(
              unauthenticatedProfileItems
            )}"
            custom-profile-login="${customProfileLogin}"
            ?custom-typeahead-api=${true}></dds-masthead-composite>
        `
      : html`
          <dds-masthead-container
            platform="${ifDefined(platform)}"
            .platformUrl="${ifDefined(platformData.url)}"
            selected-menu-item="${ifDefined(selectedMenuItem)}"
            user-status="${ifDefined(userStatus)}"
            searchPlaceholder="${ifDefined(searchPlaceholder)}"
            .navLinks="${navLinks}"
            has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            custom-profile-login="${customProfileLogin}"
            ?custom-typeahead-api=${true}></dds-masthead-container>
        `}
  `;
};

WithCustomTypeahead.story = {
  name: 'With custom typeahead',
};

export const searchOpenOnload = (args) => {
  const {
    customProfileLogin,
    platform,
    selectedMenuItem,
    userStatus,
    searchPlaceholder,
    hasProfile,
    hasSearch,
    navLinks,
  } = args?.MastheadComposite ?? {};
  const { useMock } = args?.Other ?? {};
  return html`
    <style>
      ${styles}
    </style>
    ${useMock
      ? html`
          <dds-masthead-composite
            activate-search="true"
            platform="${ifDefined(platformData.name)}"
            .platformUrl="${ifDefined(platformData.url)}"
            selected-menu-item="${ifDefined(selectedMenuItem)}"
            user-status="${ifDefined(userStatus)}"
            searchPlaceholder="${ifDefined(searchPlaceholder)}"
            .authenticatedProfileItems="${ifDefined(authenticatedProfileItems)}"
            .navLinks="${navLinks}"
            has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            .unauthenticatedProfileItems="${ifDefined(
              unauthenticatedProfileItems
            )}"
            custom-profile-login="${customProfileLogin}"></dds-masthead-composite>
        `
      : html`
          <dds-masthead-container
            activate-search="true"
            platform="${ifDefined(platform)}"
            .platformUrl="${ifDefined(platformData.url)}"
            selected-menu-item="${ifDefined(selectedMenuItem)}"
            user-status="${ifDefined(userStatus)}"
            searchPlaceholder="${ifDefined(searchPlaceholder)}"
            .navLinks="${navLinks}"
            has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            custom-profile-login="${customProfileLogin}"></dds-masthead-container>
        `}
  `;
};

searchOpenOnload.story = {
  name: 'Search open onload',
};

export const withPlatform = (args) => {
  const {
    selectedMenuItem,
    userStatus,
    navLinks,
    hasProfile,
    hasSearch,
    searchPlaceholder,
  } = args?.MastheadComposite ?? {};
  const { useMock } = args?.Other ?? {};
  return html`
    <style>
      ${styles}
    </style>
    ${useMock
      ? html`
          <dds-masthead-composite
            platform="${ifDefined(platformData.name)}"
            .platformUrl="${ifDefined(urlObject)}"
            selected-menu-item="${ifDefined(selectedMenuItem)}"
            user-status="${ifDefined(userStatus)}"
            searchPlaceholder="${ifDefined(searchPlaceholder)}"
            .authenticatedProfileItems="${ifDefined(authenticatedProfileItems)}"
            .navLinks="${navLinks}"
            has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            .unauthenticatedProfileItems="${ifDefined(
              unauthenticatedProfileItems
            )}"></dds-masthead-composite>
        `
      : html`
          <dds-masthead-container
            platform="Platform"
            .platformUrl="${ifDefined(platformData.url)}"
            user-status="${ifDefined(userStatus)}"
            searchPlaceholder="${ifDefined(searchPlaceholder)}"
            has-profile="${hasProfile}"
            ?has-search="${hasSearch}"></dds-masthead-container>
        `}
  `;
};

withPlatform.story = {
  name: 'With platform',
  parameters: {
    knobs: {
      MastheadComposite: () => ({
        hasProfile: select(
          'show the profile functionality (has-profile)',
          ['true', 'false'],
          'true'
        ),
        hasSearch: boolean('show the search functionality (has-search)', true),
        searchPlaceholder: textNullable(
          'search placeholder (searchPlaceholder)',
          inPercy() ? '' : 'Search all of IBM'
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
      }),
    },
    propsSet: {
      default: {
        MastheadComposite: {
          hasProfile: 'true',
          hasSearch: true,
          searchPlaceHolder: 'Search all of IBM',
          selectedMenuItem: 'Services & Consulting',
          userStatus: userStatuses.unauthenticated,
        },
      },
    },
  },
};

export const withL1 = (args) => {
  const {
    selectedMenuItem,
    userStatus,
    navLinks,
    hasProfile,
    hasSearch,
    searchPlaceholder,
  } = args?.MastheadComposite ?? {};
  const { useMock } = args?.Other ?? {};
  return html`
    <style>
      ${styles}
    </style>
    ${useMock
      ? html`
          <dds-masthead-composite
            selected-menu-item="${ifDefined(selectedMenuItem)}"
            searchPlaceholder="${ifDefined(searchPlaceholder)}"
            user-status="${ifDefined(userStatus)}"
            .authenticatedProfileItems="${ifDefined(authenticatedProfileItems)}"
            has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            .l1Data="${mastheadL1Data}"
            .navLinks="${navLinks}"
            .unauthenticatedProfileItems="${ifDefined(
              unauthenticatedProfileItems
            )}"></dds-masthead-composite>
        `
      : html`
          <dds-masthead-container
            selected-menu-item="${ifDefined(selectedMenuItem)}"
            user-status="${ifDefined(userStatus)}"
            has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            .l1Data="${mastheadL1Data}"
            .navLinks="${navLinks}"></dds-masthead-container>
        `}
  `;
};

withL1.story = {
  name: 'With L1',
  parameters: {
    knobs: {
      MastheadComposite: () => ({
        hasProfile: select(
          'show the profile functionality (has-profile)',
          ['true', 'false'],
          'true'
        ),
        hasSearch: boolean('show the search functionality (has-search)', true),
        searchPlaceholder: textNullable(
          'search placeholder (searchPlaceholder)',
          inPercy() ? '' : 'Search all of IBM'
        ),
        selectedMenuItem: textNullable(
          'selected menu item (selected-menu-item)',
          'Products'
        ),
        userStatus: select(
          'The user authenticated status (user-status)',
          userStatuses,
          userStatuses.unauthenticated
        ),
      }),
    },
    propsSet: {
      default: {
        MastheadComposite: {
          hasProfile: 'true',
          hasSearch: true,
          searchPlaceholder: 'Search all of IBM',
          selectedMenuItem: 'Lorem ipsum dolor sit amet',
          userStatus: userStatuses.unauthenticated,
        },
      },
    },
  },
};

export const withAlternateLogoAndTooltip = (args) => {
  const {
    selectedMenuItem,
    userStatus,
    navLinks,
    hasProfile,
    hasSearch,
    searchPlaceholder,
    mastheadLogo,
  } = args?.MastheadComposite ?? {};
  const { useMock } = args?.Other ?? {};
  return html`
    <style>
      ${styles}
    </style>
    ${useMock
      ? html`
          <dds-masthead-composite
            selected-menu-item="${ifDefined(selectedMenuItem)}"
            user-status="${ifDefined(userStatus)}"
            searchPlaceholder="${ifDefined(searchPlaceholder)}"
            .authenticatedProfileItems="${ifDefined(authenticatedProfileItems)}"
            has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            .navLinks="${navLinks}"
            .logoData="${mastheadLogo === 'alternateWithTooltip'
              ? logoData
              : null}"
            .unauthenticatedProfileItems="${ifDefined(
              unauthenticatedProfileItems
            )}"></dds-masthead-composite>
        `
      : html`
          <dds-masthead-container
            selected-menu-item="${ifDefined(selectedMenuItem)}"
            user-status="${ifDefined(userStatus)}"
            searchPlaceholder="${ifDefined(searchPlaceholder)}"
            .navLinks="${navLinks}"
            .logoData="${mastheadLogo === 'alternateWithTooltip'
              ? logoData
              : null}"
            has-profile="${hasProfile}"
            ?has-search="${hasSearch}"></dds-masthead-container>
        `}
  `;
};

withAlternateLogoAndTooltip.story = {
  name: 'With alternate logo and tooltip',
  parameters: {
    knobs: {
      MastheadComposite: () => ({
        hasProfile: select(
          'show the profile functionality (has-profile)',
          ['true', 'false'],
          'true'
        ),
        hasSearch: boolean('show the search functionality (has-search)', true),
        searchPlaceholder: textNullable(
          'search placeholder (searchPlaceholder)',
          'Search all of IBM'
        ),
        selectedMenuItem: textNullable(
          'selected menu item (selected-menu-item)',
          'Consulting & Services'
        ),
        mastheadLogo: select(
          'masthead logo data (logoData)',
          {
            defaultWithNoTooltip: null,
            alternateWithTooltip: 'alternateWithTooltip',
          },
          'alternateWithTooltip'
        ),
        userStatus: select(
          'The user authenticated status (user-status)',
          userStatuses,
          userStatuses.unauthenticated
        ),
      }),
    },
    propsSet: {
      default: {
        MastheadComposite: {
          platform: null,
          hasProfile: 'true',
          hasSearch: true,
          searchPlaceholder: 'Search all of IBM',
          selectedMenuItem: 'Services & Consulting',
          userStatus: userStatuses.unauthenticated,
        },
      },
    },
  },
};

export const WithScopedSearch = ({ parameters }) => {
  const {
    customProfileLogin,
    platform,
    selectedMenuItem,
    userStatus,
    searchPlaceholder,
    hasProfile,
    hasSearch,
    navLinks,
  } = parameters?.props?.MastheadComposite ?? {};
  const { useMock } = parameters?.props?.Other ?? {};

  return html`
    <style>
      ${styles}
    </style>
    ${useMock
      ? html`
          <dds-masthead-composite
            platform="${ifDefined(platform)}"
            .platformUrl="${ifDefined(platformData.url)}"
            selected-menu-item="${ifDefined(selectedMenuItem)}"
            user-status="${ifDefined(userStatus)}"
            searchPlaceholder="${ifDefined(searchPlaceholder)}"
            .authenticatedProfileItems="${ifDefined(authenticatedProfileItems)}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            .navLinks="${navLinks}"
            .unauthenticatedProfileItems="${ifDefined(
              unauthenticatedProfileItems
            )}"
            custom-profile-login="${customProfileLogin}"
            .scopeParameters=${scopeParameters}></dds-masthead-composite>
        `
      : html`
          <dds-masthead-container
            platform="${ifDefined(platform)}"
            .platformUrl="${ifDefined(platformData.url)}"
            selected-menu-item="${ifDefined(selectedMenuItem)}"
            user-status="${ifDefined(userStatus)}"
            searchPlaceholder="${ifDefined(searchPlaceholder)}"
            .navLinks="${navLinks}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            custom-profile-login="${customProfileLogin}"
            .scopeParameters=${scopeParameters}></dds-masthead-container>
        `}
  `;
};

WithScopedSearch.story = {
  name: 'With scoped search',
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
        hasSearch: boolean('show the search functionality (has-search)', true),
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
          DDS_CUSTOM_PROFILE_LOGIN &&
          textNullable(
            'custom profile login url (customProfileLogin)',
            'https://www.example.com/'
          ),
      }),
    },
    props: (() => {
      // Lets `<dds-masthead-container>` load the nav links
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
          hasSearch: true,
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
