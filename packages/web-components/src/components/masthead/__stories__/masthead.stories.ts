/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { select } from '@storybook/addon-knobs';
import on from 'carbon-components/es/globals/js/misc/on';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import inPercy from '@percy-io/in-percy';
import textNullable from '../../../../.storybook/knob-text-nullable';
import DDSLeftNav from '../left-nav';
import '../masthead-container';
import styles from './masthead.stories.scss';
import { mastheadLinks as links, customLinks, l1Data, logoData } from './links';
import { UNAUTHENTICATED_STATUS } from '../../../internal/vendor/@carbon/ibmdotcom-services-store/types/profileAPI';
import { authenticatedProfileItems, unauthenticatedProfileItems } from './profile-items';
import readme from './README.stories.mdx';

const userStatuses = {
  [`Authenticated`]: 'test.user@ibm.com',
  [`Unauthenticated`]: UNAUTHENTICATED_STATUS,
};

export const Default = ({ parameters }) => {
  const { platform, selectedMenuItem, userStatus, navLinks } = parameters?.props?.MastheadComposite ?? {};
  const { useMock } = parameters?.props?.Other ?? {};
  return html`
    <style>
      ${styles}
    </style>
    ${useMock
      ? html`
          <dds-masthead-composite
            platform="${ifNonNull(platform)}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            user-status="${ifNonNull(userStatus)}"
            .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
            .navLinks="${navLinks}"
            .logoData="${logoData}"
            .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
          ></dds-masthead-composite>
        `
      : html`
          <dds-masthead-container
            platform="${ifNonNull(platform)}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            user-status="${ifNonNull(userStatus)}"
            .navLinks="${navLinks}"
          ></dds-masthead-container>
        `}
  `;
};

export const WithCustomData = ({ parameters }) => {
  const { platform, selectedMenuItem, userStatus } = parameters?.props?.MastheadComposite ?? {};
  return html`
    <style>
      ${styles}
    </style>
    <dds-masthead-composite
      platform="${ifNonNull(platform)}"
      selected-menu-item="${ifNonNull(selectedMenuItem)}"
      user-status="${ifNonNull(userStatus)}"
      .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
      .navLinks="${customLinks}"
      .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
    ></dds-masthead-composite>
  `;
};

export const withL1 = ({ parameters }) => {
  const { platform, selectedMenuItem, userStatus, navLinks } = parameters?.props?.MastheadComposite ?? {};
  const { useMock } = parameters?.props?.Other ?? {};
  return html`
    <style>
      ${styles}
    </style>
    ${useMock
      ? html`
          <dds-masthead-composite
            platform="${ifNonNull(platform)}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            user-status="${ifNonNull(userStatus)}"
            .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
            .l1Data="${l1Data}"
            .navLinks="${navLinks}"
            .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
          ></dds-masthead-composite>
        `
      : html`
          <dds-masthead-container
            platform="${ifNonNull(platform)}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            user-status="${ifNonNull(userStatus)}"
            .l1Data="${l1Data}"
            .navLinks="${navLinks}"
          ></dds-masthead-container>
        `}
  `;
};

export const withAlternateLogoAndTooltip = ({ parameters }) => {
  const { platform, selectedMenuItem, userStatus, navLinks } = parameters?.props?.MastheadComposite ?? {};
  const { useMock } = parameters?.props?.Other ?? {};
  return html`
    <style>
      ${styles}
    </style>
    ${useMock
      ? html`
          <dds-masthead-composite
            platform="${ifNonNull(platform)}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            user-status="${ifNonNull(userStatus)}"
            .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
            .l1Data="${l1Data}"
            .navLinks="${navLinks}"
            .logoData="${logoData}"
            .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
          ></dds-masthead-composite>
        `
      : html`
          <dds-masthead-container
            platform="${ifNonNull(platform)}"
            selected-menu-item="${ifNonNull(selectedMenuItem)}"
            user-status="${ifNonNull(userStatus)}"
            .l1Data="${l1Data}"
            .navLinks="${navLinks}"
            .logoData="${logoData}"
          ></dds-masthead-container>
        `}
  `;
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
    'carbon-theme': { disabled: true },
    knobs: {
      MastheadComposite: ({ groupId }) => ({
        platform: textNullable('Platform (platform)', '', groupId),
        selectedMenuItem: textNullable('selected menu item (selected-menu-item)', 'Services & Consulting', groupId),
        userStatus: select('The user authenticated status (user-status)', userStatuses, null, groupId),
        logoHref: textNullable('Logo href (logo-href)', 'https://www.ibm.com', groupId),
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
  },
};
