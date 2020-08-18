/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { select } from '@storybook/addon-knobs';
import contentStyles from 'carbon-components/scss/components/ui-shell/_content.scss';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null';
import inPercy from '@percy-io/in-percy';
import textNullable from '../../../../.storybook/knob-text-nullable';
import { USER_AUTHENTICATION_STATUS } from '../../../globals/services-store/types/profileAPI';
import '../masthead-container';
import styles from './masthead.stories.scss';
import links from './links';
import readme from './README.stories.mdx';

const userStatuses = {
  [`Authenticated (${USER_AUTHENTICATION_STATUS.AUTHENTICATED})`]: USER_AUTHENTICATION_STATUS.AUTHENTICATED,
  [`Unauthenticated (${USER_AUTHENTICATION_STATUS.UNAUTHENTICATED})`]: USER_AUTHENTICATION_STATUS.UNAUTHENTICATED,
};

const StoryContent = () => html`
  <style type="text/css">
    ${contentStyles.cssText}
  </style>
  <main class="bx--content dds-ce-demo-devenv--ui-shell-content">
    <div class="bx--grid">
      <div class="bx--row">
        <div class="bx--offset-lg-3 bx--col-lg-13">
          <h2>
            Purpose and function
          </h2>
          <p>
            The shell is perhaps the most crucial piece of any UI built with Carbon. It contains the shared navigation framework
            for the entire design system and ties the products in IBM’s portfolio together in a cohesive and elegant way. The
            shell is the home of the topmost navigation, where users can quickly and dependably gain their bearings and move
            between pages.
            <br />
            <br />
            The shell was designed with maximum flexibility built in, to serve the needs of a broad range of products and users.
            Adopting the shell ensures compliance with IBM design standards, simplifies development efforts, and provides great
            user experiences. All IBM products built with Carbon are required to use the shell’s header.
            <br />
            <br />
            To better understand the purpose and function of the UI shell, consider the “shell” of MacOS, which contains the Apple
            menu, top-level navigation, and universal, OS-level controls at the top of the screen, as well as a universal dock
            along the bottom or side of the screen. The Carbon UI shell is roughly analogous in function to these parts of the Mac
            UI. For example, the app switcher portion of the shell can be compared to the dock in MacOS.
          </p>
          <h2>
            Header responsive behavior
          </h2>
          <p>
            As a header scales down to fit smaller screen sizes, headers with persistent side nav menus should have the side nav
            collapse into “hamburger” menu. See the example to better understand responsive behavior of the header.
          </p>
          <h2>
            Secondary navigation
          </h2>
          <p>
            The side-nav contains secondary navigation and fits below the header. It can be configured to be either fixed-width or
            flexible, with only one level of nested items allowed. Both links and category lists can be used in the side-nav and
            may be mixed together. There are several configurations of the side-nav, but only one configuration should be used per
            product section. If tabs are needed on a page when using a side-nav, then the tabs are secondary in hierarchy to the
            side-nav.
          </p>
        </div>
      </div>
    </div>
  </main>
`;

export const Default = ({ parameters }) => {
  const { brandName, userStatus, navLinks } = parameters?.props?.['dds-masthead-container'] ?? {};
  const { useMock } = parameters?.props?.Other ?? {};
  return html`
    <style>
      ${styles}
    </style>
    ${useMock
      ? html`
          <dds-masthead-composite
            brand-name="${ifNonNull(brandName)}"
            user-status="${ifNonNull(userStatus)}"
            .navLinks="${navLinks}"
          ></dds-masthead-composite>
        `
      : html`
          <dds-masthead-container
            brand-name="${ifNonNull(brandName)}"
            user-status="${ifNonNull(userStatus)}"
            .navLinks="${navLinks}"
          ></dds-masthead-container>
        `}
    ${StoryContent()}
  `;
};

export default {
  title: 'Components/Masthead',
  parameters: {
    ...readme.parameters,
    knobs: {
      'dds-masthead-container': ({ groupId }) => ({
        brandName: textNullable('Brand name (brand-name)', '', groupId),
        userStatus: select('The user authenticated status (user-status)', userStatuses, null, groupId),
        logoHref: textNullable('Logo href (logo-href)', 'https://www.ibm.com', groupId),
      }),
    },
    props: (() => {
      // Lets `<dds-masthead-container>` load the nav links, etc. if `CORS_PROXY` is set
      const useMock = !process.env.CORS_PROXY || inPercy() || new URLSearchParams(window.location.search).has('mock');
      return {
        'dds-masthead-container': {
          navLinks: !useMock ? undefined : links,
        },
        Other: {
          useMock,
        },
      };
    })(),
  },
};
