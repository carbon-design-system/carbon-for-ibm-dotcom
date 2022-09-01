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

export const Default = ({ parameters }) => {
  const {
    customProfileLogin,
    platform,
    hasProfile,
    hasSearch,
    selectedMenuItem,
    searchPlaceholder,
    userStatus,
    navLinks,
    authMethod,
  } = parameters?.props?.MastheadComposite ?? {};
  const { useMock } = parameters?.props?.Other ?? {};
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
            .navLinks="${navLinks}"
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
            .navLinks="${navLinks}"
            has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            custom-profile-login="${customProfileLogin}"
            auth-method="${authMethod}"
          ></dds-masthead-container>
        `}
  `;
};

export const withV2Data = ({ parameters }) => {
  const { customProfileLogin, hasProfile, hasSearch, searchPlaceholder, userStatus, navLinks, hasContact } =
    parameters?.props?.MastheadComposite ?? {};
  const { useMock } = parameters?.props?.Other ?? {};
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
            .navLinks="${navLinks}"
            .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
            custom-profile-login="${customProfileLogin}"
            auth-method="${MASTHEAD_AUTH_METHOD.DEFAULT}"
            has-contact="${hasContact}"
          ></dds-masthead-composite>
        `
      : html`
          <dds-masthead-container
            data-endpoint="/common/carbon-for-ibm-dotcom/translations/masthead-footer/v2"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceholder="${ifNonNull(searchPlaceholder)}"
            .navLinks="${navLinks}"
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
  const { customProfileLogin, hasSearch, selectedMenuItem, searchPlaceholder, navLinks } =
    parameters?.props?.MastheadComposite ?? {};
  const { useMock } = parameters?.props?.Other ?? {};
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
            .navLinks="${navLinks}"
            .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
            custom-profile-login="${customProfileLogin}"
            auth-method="${MASTHEAD_AUTH_METHOD.COOKIE}"
          ></dds-masthead-composite>
        `
      : html`
          <dds-masthead-container
            data-endpoint="/common/carbon-for-ibm-dotcom/translations/cloud-masthead"
            platform="Cloud"
            .platformUrl="${ifNonNull(platformData.url)}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            searchPlaceholder="${ifNonNull(searchPlaceholder)}"
            .navLinks="${navLinks}"
            ?has-search="${hasSearch}"
            custom-profile-login="${customProfileLogin}"
            auth-method="${MASTHEAD_AUTH_METHOD.COOKIE}"
          ></dds-masthead-container>
        `}
  `;
};

export const WithCustomTypeahead = ({ parameters }) => {
  const {
    endpoint,
    customProfileLogin,
    navLinks,
    platform,
    selectedMenuItem,
    userStatus,
    searchPlaceholder,
    hasProfile,
    hasSearch,
  } = parameters?.props?.MastheadComposite ?? {};
  const { useMock } = parameters?.props?.Other ?? {};

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
            .navLinks="${navLinks}"
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
            .navLinks="${navLinks}"
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

export const searchOpenOnload = ({ parameters }) => {
  const {
    endpoint,
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
            activate-search
            platform="${ifNonNull(platformData.name)}"
            .platformUrl="${ifNonNull(platformData.url)}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceholder="${ifNonNull(searchPlaceholder)}"
            .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
            .navLinks="${navLinks}"
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
            .navLinks="${navLinks}"
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

export const withPlatform = ({ parameters }) => {
  const { endpoint, selectedMenuItem, userStatus, navLinks, hasProfile, hasSearch, searchPlaceholder } =
    parameters?.props?.MastheadComposite ?? {};
  const { useMock } = parameters?.props?.Other ?? {};
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
            .navLinks="${navLinks}"
            has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
          ></dds-masthead-composite>
        `
      : html`
          <dds-masthead-container
            data-endpoint="${ifNonNull(endpoint)}"
            platform="Platform"
            .platformUrl="${ifNonNull(platformData.url)}"
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
      MastheadComposite: ({ groupId }) => ({
        hasProfile: select('show the profile functionality (has-profile)', ['true', 'false'], 'true', groupId),
        hasSearch: boolean('show the search functionality (has-search)', true, groupId),
        searchPlaceholder: textNullable('search placeholder (searchPlaceholder)', inPercy() ? '' : 'Search all of IBM', groupId),
        selectedMenuItem: textNullable('selected menu item (selected-menu-item)', 'Consulting & Services', groupId),
        userStatus: select('The user authenticated status (user-status)', userStatuses, userStatuses.unauthenticated, groupId),
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

export const withL1 = ({ parameters }) => {
  const { endpoint, selectedMenuItem, userStatus, navLinks, hasProfile, hasSearch, searchPlaceholder } =
    parameters?.props?.MastheadComposite ?? {};
  const { useMock } = parameters?.props?.Other ?? {};
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
            .navLinks="${navLinks}"
            .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
          ></dds-masthead-composite>
        `
      : html`
          <dds-masthead-container
            data-endpoint="${ifNonNull(endpoint)}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            user-status="${ifNonNull(userStatus)}"
            has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            .l1Data="${mastheadL1Data}"
            .navLinks="${navLinks}"
          ></dds-masthead-container>
        `}
  `;
};

withL1.story = {
  name: 'With L1',
  parameters: {
    knobs: {
      MastheadComposite: ({ groupId }) => ({
        hasProfile: select('show the profile functionality (has-profile)', ['true', 'false'], 'true', groupId),
        hasSearch: boolean('show the search functionality (has-search)', true, groupId),
        searchPlaceholder: textNullable('search placeholder (searchPlaceholder)', inPercy() ? '' : 'Search all of IBM', groupId),
        selectedMenuItem: textNullable('selected menu item (selected-menu-item)', 'Products', groupId),
        userStatus: select('The user authenticated status (user-status)', userStatuses, userStatuses.unauthenticated, groupId),
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

export const withAlternateLogoAndTooltip = ({ parameters }) => {
  const { endpoint, selectedMenuItem, userStatus, navLinks, hasProfile, hasSearch, searchPlaceholder, mastheadLogo } =
    parameters?.props?.MastheadComposite ?? {};
  const { useMock } = parameters?.props?.Other ?? {};
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
            .navLinks="${navLinks}"
            .logoData="${mastheadLogo === 'alternateWithTooltip' ? logoData : undefined}"
            .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
          ></dds-masthead-composite>
        `
      : html`
          <dds-masthead-container
            data-endpoint="${ifNonNull(endpoint)}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceholder="${ifNonNull(searchPlaceholder)}"
            .navLinks="${navLinks}"
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
      MastheadComposite: ({ groupId }) => ({
        hasProfile: select('show the profile functionality (has-profile)', ['true', 'false'], 'true', groupId),
        hasSearch: boolean('show the search functionality (has-search)', true, groupId),
        searchPlaceholder: textNullable('search placeholder (searchPlaceholder)', 'Search all of IBM', groupId),
        selectedMenuItem: textNullable('selected menu item (selected-menu-item)', 'Consulting & Services', groupId),
        mastheadLogo: select(
          'masthead logo data (logoData)',
          { defaultWithNoTooltip: null, alternateWithTooltip: 'alternateWithTooltip' },
          'alternateWithTooltip',
          groupId
        ),
        userStatus: select('The user authenticated status (user-status)', userStatuses, userStatuses.unauthenticated, groupId),
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
      MastheadComposite: ({ groupId }) => ({
        hasProfile: select('show the profile functionality (has-profile)', ['true', 'false'], 'true', groupId),
        hasSearch: boolean('show the search functionality (has-search)', true, groupId),
        hasContact: select('Contact us button visibility (has-contact)', ['true', 'false'], 'true', groupId),
        searchPlaceholder: textNullable('search placeholder (searchPlaceholder)', 'Search all of IBM', groupId),
        selectedMenuItem: textNullable('selected menu item (selected-menu-item)', 'Consulting & Services', groupId),
        userStatus: select('The user authenticated status (user-status)', userStatuses, userStatuses.unauthenticated, groupId),
        customProfileLogin:
          DDS_CUSTOM_PROFILE_LOGIN &&
          textNullable('custom profile login url (customProfileLogin)', 'https://www.example.com/', groupId),
      }),
    },
    props: (() => {
      // Lets `<dds-masthead-container>` load the nav links
      const useMock = inPercy() || new URLSearchParams(window.location.search).has('mock');
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
