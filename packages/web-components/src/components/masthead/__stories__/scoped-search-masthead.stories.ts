/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { boolean, select } from '@storybook/addon-knobs';
import on from '../../../internal/vendor/@carbon/web-components/globals/mixins/on.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import inPercy from '@percy-io/in-percy';
import textNullable from '../../../../.storybook/knob-text-nullable';
import c4dLeftNav from '../left-nav';
import '../masthead-container';
import styles from './masthead.stories.scss';
import { mastheadL0Data } from './links';
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

/**
 * platform knob data
 */
const platformData = {
  name: 'IBM Cloud',
  url: 'https://www.ibm.com/cloud',
};

const scopeParameters = [
  {
    name: 'All',
    value: 'all',
  },
  {
    name: 'Analyst',
    value: 'analyst',
  },
  {
    name: 'PartnerWorld',
    value: 'pw',
  },
  {
    name: 'Developer',
    value: 'dw',
  },
];

const dataEndpoint =
  '/common/carbon-for-ibm-dotcom/translations/masthead-footer/v2.1';

export const Default = (args) => {
  const {
    customProfileLogin,
    platform,
    selectedMenuItem,
    userStatus,
    searchPlaceholder,
    hasProfile,
    hasSearch,
  } = args?.MastheadComposite ?? {};
  const { useMock } = args?.Other ?? {};

  return html`
    <style>
      ${styles}
    </style>
    ${useMock
      ? html`
          <c4d-masthead-composite
            platform="${ifDefined(platform)}"
            .platformUrl="${ifDefined(platformData.url)}"
            selected-menu-item="${ifDefined(selectedMenuItem)}"
            user-status="${ifDefined(userStatus)}"
            searchPlaceholder="${ifDefined(searchPlaceholder)}"
            .authenticatedProfileItems="${ifDefined(authenticatedProfileItems)}"
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            .l0Data="${mastheadL0Data}"
            .unauthenticatedProfileItems="${ifDefined(
              unauthenticatedProfileItems
            )}"
            custom-profile-login="${customProfileLogin}"
            .scopeParameters=${scopeParameters}></c4d-masthead-composite>
        `
      : html`
          <c4d-masthead-container
            platform="${ifDefined(platform)}"
            .platformUrl="${ifDefined(platformData.url)}"
            selected-menu-item="${ifDefined(selectedMenuItem)}"
            user-status="${ifDefined(userStatus)}"
            searchPlaceholder="${ifDefined(searchPlaceholder)}"
            data-endpoint=${dataEndpoint}
            ?has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            custom-profile-login="${customProfileLogin}"
            .scopeParameters=${scopeParameters}></c4d-masthead-container>
        `}
  `;
};

export default {
  title: 'Experimental/Masthead with scoped search',
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
    percy: {
      skip: true,
    },
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
        },
      },
    },
  },
};
