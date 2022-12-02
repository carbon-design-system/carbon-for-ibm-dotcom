/**
 * @license
 *
 * Copyright IBM Corp. 2021, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { select } from '@storybook/addon-knobs';
import on from 'carbon-components/es/globals/js/misc/on.js';
import ifNonNull from '@carbon/carbon-web-components/es/globals/directives/if-non-null.js';
import inPercy from '@percy-io/in-percy';
import DDSLeftNav from '../left-nav';
import '../masthead-container';
import '../cloud/cloud-masthead-container';
import styles from './masthead.stories.scss';
import { mastheadLinks as links } from './links';
import {
  authenticatedProfileItems,
  unauthenticatedProfileItems,
} from './profile-items';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

/**
 * platform knob data
 */
const platformData = {
  name: 'IBM Cloud',
  url: 'https://www.ibm.com/cloud',
};

const urlObject = {
  default: {
    url: 'https://www.ibm.com/cloud',
  },
  'en-US': {
    url: 'https://www.ibm.com/us-en/cloud',
  },
  'fr-FR': {
    url: 'https://www.ibm.com/fr-fr/cloud',
  },
  'es-MX': {
    url: 'https://www.ibm.com/es-mx/cloud',
  },
};

export const Default = (args) => {
  const {
    hasContact,
    hasProfile,
    hasSearch,
    selectedMenuItem,
    searchPlaceholder,
    userStatus,
    navLinks,
    redirectPath,
    authMethod,
  } = args?.CloudMastheadComposite ?? {};
  const { useMock } = args?.Other ?? {};
  return html`
    <style>
      ${styles}
    </style>
    ${useMock
      ? html`
          <dds-cloud-masthead-composite
            platform="Cloud"
            .platformUrl="${ifNonNull(platformData.url)}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            has-contact="${hasContact}"
            auth-method="${authMethod}"
            redirect-path="${ifNonNull(redirectPath)}"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceholder="${ifNonNull(searchPlaceholder)}"
            .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
            has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            .navLinks="${navLinks}"
            .unauthenticatedProfileItems="${ifNonNull(
              unauthenticatedProfileItems
            )}"></dds-cloud-masthead-composite>
        `
      : html`
          <dds-cloud-masthead-container
            platform="Cloud"
            .platformUrl="${ifNonNull(urlObject)}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            has-contact="${hasContact}"
            auth-method="${authMethod}"
            redirect-path="${ifNonNull(redirectPath)}"
            user-status="${ifNonNull(userStatus)}"
            searchPlaceholder="${ifNonNull(searchPlaceholder)}"
            .navLinks="${navLinks}"
            has-profile="${hasProfile}"
            ?has-search="${hasSearch}"
            data-endpoint="/common/carbon-for-ibm-dotcom/translations/cloud-masthead"></dds-cloud-masthead-container>
        `}
  `;
};

export default {
  title: 'Components/Cloud masthead',
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
    'carbon-theme': { disabled: true },
    percy: {
      skip: true,
    },
    knobs: {
      escapeHTML: false,
      CloudMastheadComposite: () => ({
        userStatus: select(
          'The user authenticated status (user-status)',
          ['authenticated', 'anonymous'],
          'anonymous'
        ),
        hasContact: select(
          'Contact us button visibility (has-contact)',
          ['true', 'false'],
          'true'
        ),
        selectedMenuItem: textNullable(
          'selected menu item (selected-menu-item)',
          'Docs'
        ),
        redirectPath: textNullable('redirect path (redirect-path)', ''),
        authMethod: select(
          'auth method (auth-method)',
          ['cookie', 'api'],
          'cookie'
        ),
      }),
    },
    props: (() => {
      // Lets `<dds-cloud-masthead-container>` load the nav links
      const useMock =
        inPercy() || new URLSearchParams(window.location.search).has('mock');
      return {
        CloudMastheadComposite: {
          navLinks: !useMock ? undefined : links,
        },
        Other: {
          useMock,
        },
      };
    })(),
    propsSet: {
      default: {
        CloudMastheadComposite: {
          userStatus: 'anonymous',
          hasContact: true,
          selectedMenuItem: 'Docs',
          redirectPath: '',
          authMethod: 'cookie',
          navLinks: links,
        },
      },
    },
  },
};
