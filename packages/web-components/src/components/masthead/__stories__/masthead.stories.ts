/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Action, Reducer } from 'redux';
import { html } from 'lit-element';
import { boolean } from '@storybook/addon-knobs';
import contentStyles from 'carbon-components/scss/components/ui-shell/_content.scss';
import ifNonNull from 'carbon-custom-elements/es/globals/directives/if-non-null';
import inPercy from '@percy-io/in-percy';
import textNullable from '../../../../.storybook/knob-text-nullable';
import { reducers, store } from '../masthead-container';
import styles from './masthead.stories.scss';
import links from './links';
import readme from './README.stories.mdx';

store.replaceReducer(reducers as Reducer<unknown, Action<any>>);

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
  const { authenticated, brandName, navLinks } = parameters?.props?.['dds-masthead-container'] ?? {};
  return html`
    <style>
      ${styles}
    </style>
    <dds-masthead-container
      ?authenticated="${authenticated}"
      brand-name="${ifNonNull(brandName)}"
      .navLinks="${navLinks}"
    ></dds-masthead-container>
    ${StoryContent()}
  `;
};

export default {
  title: 'Components/Masthead',
  parameters: {
    ...readme.parameters,
    knobs: {
      'dds-masthead-container': ({ groupId }) => ({
        authenticated: boolean('Show the authenticated UI (authenticated)', false, groupId),
        brandName: textNullable('Brand name (brand-name)', '', groupId),
      }),
    },
    props: {
      'dds-masthead-container': {
        // Lets `<dds-masthead-container>` load the nav links if `CORS_PROXY` is set
        navLinks: process.env.CORS_PROXY && !inPercy() ? undefined : links,
      },
    },
  },
};
