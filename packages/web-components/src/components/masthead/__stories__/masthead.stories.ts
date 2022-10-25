/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { boolean, select } from '@storybook/addon-knobs';
import on from 'carbon-components/es/globals/js/misc/on.js';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import inPercy from '@percy-io/in-percy';
import textNullable from '../../../../.storybook/knob-text-nullable';
import DDSLeftNav from '../left-nav';
import '../masthead-container';
import styles from './masthead.stories.scss';
import { mastheadLinks as links, mastheadL1Data, logoData } from './links';
import {
  UNAUTHENTICATED_STATUS,
  MASTHEAD_AUTH_METHOD,
} from '../../../internal/vendor/@carbon/ibmdotcom-services-store/types/profileAPI';
import { authenticatedProfileItems, unauthenticatedProfileItems } from './profile-items';
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

async function customTypeaheadApiFunction(searchVal) {
  return fetch(`https://ibmdocs-dev.mybluemix.net/docs/api/v1/suggest?query=${searchVal}&lang=undefined&categories=&limit=6`)
    .then(response => response.json())
    .then(data => {
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

export const Default = args => {
  const {
    customProfileLogin,
    platform,
    hasProfile,
    hasSearch,
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
            platform="${ifNonNull(platform)}"
            .platformUrl="${ifNonNull(platformData.url)}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceholder="${ifNonNull(searchPlaceholder)}"
            .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
            has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            .navLinks="${links}"
            .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
            custom-profile-login="${customProfileLogin}"
            auth-method="${MASTHEAD_AUTH_METHOD.DEFAULT}"
          ></dds-masthead-composite>
        `
      : html`
          <dds-masthead-container
            platform="${ifNonNull(platform)}"
            .platformUrl="${ifNonNull(platformData.url)}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceholder="${ifNonNull(searchPlaceholder)}"
            has-profile="${hasProfile}"
            .navLinks="${links}"
            ?has-search="${hasSearch}"
            custom-profile-login="${customProfileLogin}"
            auth-method="${authMethod}"
          ></dds-masthead-container>
        `}
  `;
};

export const withV2Data = args => {
  const { customProfileLogin, hasProfile, hasSearch, searchPlaceholder, userStatus, hasContact, platform, useMock } =
    args?.MastheadComposite ?? {};
  return html`
    <style>
      ${styles}
    </style>
    ${useMock
      ? html`
          <dds-masthead-composite
            user-status="${ifNonNull(userStatus)}"
            searchPlaceholder="${ifNonNull(searchPlaceholder)}"
            .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
            has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            .navLinks="${links}"
            .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
            custom-profile-login="${customProfileLogin}"
            auth-method="${MASTHEAD_AUTH_METHOD.DEFAULT}"
            has-contact="${hasContact}"
          ></dds-masthead-composite>
        `
      : html`
          <dds-masthead-container
            data-endpoint="/common/carbon-for-ibm-dotcom/translations/masthead-footer/v2"
            platform="${ifNonNull(platform)}"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceholder="${ifNonNull(searchPlaceholder)}"
            has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            custom-profile-login="${customProfileLogin}"
            auth-method="${MASTHEAD_AUTH_METHOD.DEFAULT}"
            has-contact="${hasContact}"
          ></dds-masthead-container>
        `}
  `;
};

withV2Data.story = {
  name: 'With v2 Data',
};

export const withCloudData = ({ parameters }) => {
  const { customProfileLogin, hasSearch, selectedMenuItem, searchPlaceholder, platform, useMock } =
    parameters?.props?.MastheadComposite ?? {};
  return html`
    <style>
      ${styles}
    </style>
    ${useMock
      ? html`
          <dds-masthead-composite
            platform="Cloud"
            .platformUrl="${ifNonNull(platformData.url)}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            searchPlaceholder="${ifNonNull(searchPlaceholder)}"
            .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
            ?has-search="${hasSearch}"
            .navLinks="${links}"
            .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
            custom-profile-login="${customProfileLogin}"
            auth-method="${MASTHEAD_AUTH_METHOD.COOKIE}"
          ></dds-masthead-composite>
        `
      : html`
          <dds-masthead-container
            data-endpoint="/common/carbon-for-ibm-dotcom/translations/cloud-masthead"
            platform="${platform || 'Cloud'}"
            .platformUrl="${ifNonNull(platformData.url)}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            searchPlaceholder="${ifNonNull(searchPlaceholder)}"
            ?has-search="${hasSearch}"
            custom-profile-login="${customProfileLogin}"
            auth-method="${MASTHEAD_AUTH_METHOD.COOKIE}"
          ></dds-masthead-container>
        `}
  `;
};

export const WithCustomTypeahead = args => {
  const {
    endpoint,
    customProfileLogin,
    platform,
    selectedMenuItem,
    userStatus,
    searchPlaceholder,
    hasProfile,
    hasSearch,
    useMock,
  } = args?.MastheadComposite ?? {};

  document.documentElement.addEventListener('dds-search-with-typeahead-input', async e => {
    const results = await customTypeaheadApiFunction((e as CustomEvent).detail.value);
    document.dispatchEvent(new CustomEvent('dds-custom-typeahead-api-results', { detail: results }));
  });

  return html`
    <style>
      ${styles}
    </style>
    ${useMock
      ? html`
          <dds-masthead-composite
            platform="${ifNonNull(platform)}"
            .platformUrl="${ifNonNull(platformData.url)}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceholder="${ifNonNull(searchPlaceholder)}"
            .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
            has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            .navLinks="${links}"
            .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
            custom-profile-login="${customProfileLogin}"
            ?custom-typeahead-api=${true}
          ></dds-masthead-composite>
        `
      : html`
          <dds-masthead-container
            data-endpoint="${ifNonNull(endpoint)}"
            platform="${ifNonNull(platform)}"
            .platformUrl="${ifNonNull(platformData.url)}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceholder="${ifNonNull(searchPlaceholder)}"
            .navLinks="${links}"
            has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            custom-profile-login="${customProfileLogin}"
            ?custom-typeahead-api=${true}
          ></dds-masthead-container>
        `}
  `;
};

WithCustomTypeahead.story = {
  name: 'With custom typeahead',
};

export const searchOpenOnload = args => {
  const {
    endpoint,
    customProfileLogin,
    platform,
    selectedMenuItem,
    userStatus,
    searchPlaceholder,
    hasProfile,
    hasSearch,
    useMock,
  } = args?.MastheadComposite ?? {};
  return html`
    <style>
      ${styles}
    </style>
    ${useMock
      ? html`
          <dds-masthead-composite
            activate-search
            platform="${ifNonNull(platformData.name)}"
            .platformUrl="${ifNonNull(platformData.url)}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceholder="${ifNonNull(searchPlaceholder)}"
            .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
            .navLinks="${links}"
            has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
            custom-profile-login="${customProfileLogin}"
          ></dds-masthead-composite>
        `
      : html`
          <dds-masthead-container
            data-endpoint="${ifNonNull(endpoint)}"
            activate-search
            platform="${ifNonNull(platform)}"
            .platformUrl="${ifNonNull(platformData.url)}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceholder="${ifNonNull(searchPlaceholder)}"
            .navLinks="${links}"
            has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            custom-profile-login="${customProfileLogin}"
          ></dds-masthead-container>
        `}
  `;
};

searchOpenOnload.story = {
  name: 'Search open onload',
};

export const withPlatform = args => {
  const { endpoint, selectedMenuItem, userStatus, hasProfile, hasSearch, searchPlaceholder, platform, useMock } =
    args?.MastheadComposite ?? {};
  return html`
    <style>
      ${styles}
    </style>
    ${useMock
      ? html`
          <dds-masthead-composite
            platform="${ifNonNull(platformData.name)}"
            .platformUrl="${ifNonNull(urlObject)}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceholder="${ifNonNull(searchPlaceholder)}"
            .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
            .navLinks="${links}"
            has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
          ></dds-masthead-composite>
        `
      : html`
          <dds-masthead-container
            data-endpoint="${ifNonNull(endpoint)}"
            platform="${ifNonNull(platform)}"
            .platformUrl="${ifNonNull(platformData.url)}"
            .navLinks="${links}"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceholder="${ifNonNull(searchPlaceholder)}"
            has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
          ></dds-masthead-container>
        `}
  `;
};

withPlatform.story = {
  name: 'With platform',
  parameters: {
    knobs: {
      MastheadComposite: () => ({
        platform: textNullable('platform name (platform)', 'Platform'),
        hasProfile: select('show the profile functionality (has-profile)', ['true', 'false'], 'true'),
        hasSearch: boolean('show the search functionality (has-search)', true),
        searchPlaceholder: textNullable('search placeholder (searchPlaceholder)', inPercy() ? '' : 'Search all of IBM'),
        selectedMenuItem: textNullable('selected menu item (selected-menu-item)', 'Consulting & Services'),
        userStatus: select('The user authenticated status (user-status)', userStatuses, userStatuses.unauthenticated),
      }),
    },
    propsSet: {
      default: {
        MastheadComposite: {
          platform: 'Platform',
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

export const withL1 = args => {
  const { endpoint, selectedMenuItem, userStatus, hasProfile, hasSearch, searchPlaceholder, platform, useMock } =
    args?.MastheadComposite ?? {};
  return html`
    <style>
      ${styles}
    </style>
    ${useMock
      ? html`
          <dds-masthead-composite
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            searchPlaceholder="${ifNonNull(searchPlaceholder)}"
            user-status="${ifNonNull(userStatus)}"
            .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
            has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            .l1Data="${mastheadL1Data}"
            .navLinks="${links}"
            .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
          ></dds-masthead-composite>
        `
      : html`
          <dds-masthead-container
            platform="${ifNonNull(platform)}"
            .platformData="${ifNonNull(platformData.url)}"
            data-endpoint="${ifNonNull(endpoint)}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            user-status="${ifNonNull(userStatus)}"
            has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            .l1Data="${mastheadL1Data}"
            .navLinks="${links}"
          ></dds-masthead-container>
        `}
  `;
};

withL1.story = {
  name: 'With L1',
  parameters: {
    knobs: {
      MastheadComposite: () => ({
        platform: textNullable('platform name (platform)', ''),
        hasProfile: select('show the profile functionality (has-profile)', ['true', 'false'], 'true'),
        hasSearch: boolean('show the search functionality (has-search)', true),
        searchPlaceholder: textNullable('search placeholder (searchPlaceholder)', inPercy() ? '' : 'Search all of IBM'),
        selectedMenuItem: textNullable('selected menu item (selected-menu-item)', 'Products'),
        userStatus: select('The user authenticated status (user-status)', userStatuses, userStatuses.unauthenticated),
      }),
    },
    propsSet: {
      default: {
        MastheadComposite: {
          hasProfile: 'true',
          hasSearch: true,
          platform: null,
          searchPlaceholder: 'Search all of IBM',
          selectedMenuItem: 'Lorem ipsum dolor sit amet',
          userStatus: userStatuses.unauthenticated,
        },
      },
    },
  },
};

export const withAlternateLogoAndTooltip = args => {
  const { endpoint, selectedMenuItem, userStatus, hasProfile, hasSearch, searchPlaceholder, mastheadLogo, platform, useMock } =
    args?.MastheadComposite ?? {};
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
            ?has-search="${hasSearch}"
            .navLinks="${links}"
            .logoData="${mastheadLogo === 'alternateWithTooltip' ? logoData : undefined}"
            .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
          ></dds-masthead-composite>
        `
      : html`
          <dds-masthead-container
            platform="${ifNonNull(platform)}"
            .platformData="${ifNonNull(platformData.url)}"
            data-endpoint="${ifNonNull(endpoint)}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceholder="${ifNonNull(searchPlaceholder)}"
            .navLinks="${links}"
            .logoData="${mastheadLogo === 'alternateWithTooltip' ? logoData : undefined}"
            has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
          ></dds-masthead-container>
        `}
  `;
};

withAlternateLogoAndTooltip.story = {
  name: 'With alternate logo and tooltip',
  parameters: {
    knobs: {
      MastheadComposite: () => ({
        platform: textNullable('platform name (platform)', ''),
        hasProfile: select('show the profile functionality (has-profile)', ['true', 'false'], 'true'),
        hasSearch: boolean('show the search functionality (has-search)', true),
        searchPlaceholder: textNullable('search placeholder (searchPlaceholder)', 'Search all of IBM'),
        selectedMenuItem: textNullable('selected menu item (selected-menu-item)', 'Consulting & Services'),
        mastheadLogo: select(
          'masthead logo data (logoData)',
          { defaultWithNoTooltip: null, alternateWithTooltip: 'alternateWithTooltip' },
          'alternateWithTooltip'
        ),
        userStatus: select('The user authenticated status (user-status)', userStatuses, userStatuses.unauthenticated),
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

export default {
  title: 'Components/Masthead',
  decorators: [
    story => {
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
        platform: textNullable('platform name (platform)', ''),
        hasProfile: select('show the profile functionality (has-profile)', ['true', 'false'], 'true'),
        hasSearch: boolean('show the search functionality (has-search)', true),
        searchPlaceholder: textNullable('search placeholder (searchPlaceholder)', 'Search all of IBM'),
        selectedMenuItem: textNullable('selected menu item (selected-menu-item)', 'Consulting & Services'),
        userStatus: select('The user authenticated status (user-status)', userStatuses, userStatuses.unauthenticated),
        customProfileLogin:
          DDS_CUSTOM_PROFILE_LOGIN && textNullable('custom profile login url (customProfileLogin)', 'https://www.example.com/'),
        useMock: boolean('use mock nav data (use-mock)', false),
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
          customProfileLogin: 'https://www.example.com/',
          useMockData: false,
        },
      },
    },
  },
};
