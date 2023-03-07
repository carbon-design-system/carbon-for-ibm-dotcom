/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { boolean, select } from '@storybook/addon-knobs';
// Below path will be there when an application installs `@carbon/web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import Fade16 from '@carbon/web-components/es/icons/fade/16';
import contentStyles from '@carbon/styles/scss/components/ui-shell/content/_content.scss';
import textNullable from '../../../.storybook/knob-text-nullable';
import { ifDefined } from 'lit/directives/if-defined.js';
import { SIDE_NAV_COLLAPSE_MODE, SIDE_NAV_USAGE_MODE } from './side-nav';
import './side-nav-items';
import './side-nav-link';
import './side-nav-divider';
import './side-nav-menu';
import './side-nav-menu-item';
import './header';
import './header-nav';
import './header-nav-item';
import './header-menu';
import './header-menu-item';
import './header-menu-button';
import './header-name';
import styles from './ui-shell-story.scss';
import storyDocs from './ui-shell-story.mdx';
import { prefix } from '../../globals/settings';

const collapseModes = {
  Responsive: null,
  [`Fixed (${SIDE_NAV_COLLAPSE_MODE.FIXED})`]: SIDE_NAV_COLLAPSE_MODE.FIXED,
  [`Rail (${SIDE_NAV_COLLAPSE_MODE.RAIL})`]: SIDE_NAV_COLLAPSE_MODE.RAIL,
};

const usageModes = {
  Regular: null,
  [`For header nav (${SIDE_NAV_USAGE_MODE.HEADER_NAV})`]:
    SIDE_NAV_USAGE_MODE.HEADER_NAV,
};

const updateRailExpanded = ({
  collapseMode,
  expanded,
  usageMode = SIDE_NAV_USAGE_MODE.REGULAR,
}) => {
  document.body.classList.toggle(
    `${prefix}-ce-demo-devenv--with-rail`,
    collapseMode === SIDE_NAV_COLLAPSE_MODE.RAIL
  );
  document.body.classList.toggle(
    `${prefix}-ce-demo-devenv--rail-expanded`,
    collapseMode === SIDE_NAV_COLLAPSE_MODE.RAIL && expanded
  );
  document.body.classList.toggle(
    `${prefix}-ce-demo-devenv--with-side-nav-for-header`,
    usageMode === SIDE_NAV_USAGE_MODE.HEADER_NAV
  );
};

const StoryContent = () => html`
  <style type="text/css">
    ${contentStyles.cssText}
  </style>
  <main class="${prefix}--content ${prefix}-ce-demo-devenv--ui-shell-content">
    <div class="${prefix}--grid">
      <div class="${prefix}--row">
        <div class="${prefix}--offset-lg-3 ${prefix}--col-lg-13">
          <h2>Purpose and function</h2>
          <p>
            The shell is perhaps the most crucial piece of any UI built with
            Carbon. It contains the shared navigation framework for the entire
            design system and ties the products in IBM’s portfolio together in a
            cohesive and elegant way. The shell is the home of the topmost
            navigation, where users can quickly and dependably gain their
            bearings and move between pages.
            <br />
            <br />
            The shell was designed with maximum flexibility built in, to serve
            the needs of a broad range of products and users. Adopting the shell
            ensures compliance with IBM design standards, simplifies development
            efforts, and provides great user experiences. All IBM products built
            with Carbon are required to use the shell’s header.
            <br />
            <br />
            To better understand the purpose and function of the UI shell,
            consider the “shell” of MacOS, which contains the Apple menu,
            top-level navigation, and universal, OS-level controls at the top of
            the screen, as well as a universal dock along the bottom or side of
            the screen. The Carbon UI shell is roughly analogous in function to
            these parts of the Mac UI. For example, the app switcher portion of
            the shell can be compared to the dock in MacOS.
          </p>
          <h2>Header responsive behavior</h2>
          <p>
            As a header scales down to fit smaller screen sizes, headers with
            persistent side nav menus should have the side nav collapse into
            “hamburger” menu. See the example to better understand responsive
            behavior of the header.
          </p>
          <h2>Secondary navigation</h2>
          <p>
            The side-nav contains secondary navigation and fits below the
            header. It can be configured to be either fixed-width or flexible,
            with only one level of nested items allowed. Both links and category
            lists can be used in the side-nav and may be mixed together. There
            are several configurations of the side-nav, but only one
            configuration should be used per product section. If tabs are needed
            on a page when using a side-nav, then the tabs are secondary in
            hierarchy to the side-nav.
          </p>
        </div>
      </div>
    </div>
  </main>
`;

export const sideNav = (args) => {
  const { collapseMode, expanded } = args?.[`${prefix}-side-nav`] ?? {};
  const { href } = args?.[`${prefix}-side-nav-menu-item`] ?? {};
  updateRailExpanded({ collapseMode, expanded });
  const result = html`
    <style>
      ${styles}
    </style>
    <cds-side-nav
      aria-label="Side navigation"
      collapse-mode="${ifDefined(collapseMode)}"
      ?expanded=${expanded}>
      <cds-side-nav-items>
        <cds-side-nav-menu title="L0 menu">
          <cds-side-nav-menu-item href="${ifDefined(href)}">
            L0 menu item
          </cds-side-nav-menu-item>
          <cds-side-nav-menu-item href="${ifDefined(href)}">
            L0 menu item
          </cds-side-nav-menu-item>
          <cds-side-nav-menu-item href="${ifDefined(href)}">
            L0 menu item
          </cds-side-nav-menu-item>
        </cds-side-nav-menu>
        <cds-side-nav-menu title="L0 menu">
          <cds-side-nav-menu-item href="${ifDefined(href)}">
            L0 menu item
          </cds-side-nav-menu-item>
          <cds-side-nav-menu-item
            active
            aria-current="page"
            href="${ifDefined(href)}">
            L0 menu item
          </cds-side-nav-menu-item>
          <cds-side-nav-menu-item href="${ifDefined(href)}">
            L0 menu item
          </cds-side-nav-menu-item>
        </cds-side-nav-menu>
        <cds-side-nav-menu title="L0 menu">
          <cds-side-nav-menu-item href="${ifDefined(href)}">
            L0 menu item
          </cds-side-nav-menu-item>
          <cds-side-nav-menu-item href="${ifDefined(href)}">
            L0 menu item
          </cds-side-nav-menu-item>
          <cds-side-nav-menu-item href="${ifDefined(href)}">
            L0 menu item
          </cds-side-nav-menu-item>
        </cds-side-nav-menu>
        <cds-side-nav-divider></cds-side-nav-divider>
        <cds-side-nav-link href="javascript:void(0)">L0 link</cds-side-nav-link>
        <cds-side-nav-link href="javascript:void(0)">L0 link</cds-side-nav-link>
      </cds-side-nav-items>
    </cds-side-nav>
    ${StoryContent()}
  `;
  (result as any).hasMainTag = true;
  return result;
};

sideNav.storyName = 'Side nav';

sideNav.parameters = {
  knobs: {
    [`${prefix}-side-nav`]: () => ({
      expanded: boolean('Expanded (expanded)', true),
      collapseMode: select(
        'Collapse mode (collapse-mode)',
        collapseModes,
        null
      ),
    }),
    [`${prefix}-side-nav-menu-item`]: () => ({
      href: textNullable('Link href (href)', 'javascript:void 0'), // eslint-disable-line no-script-url
    }),
  },
};

export const sideNavWithIcons = (args) => {
  const { collapseMode, expanded } = args?.[`${prefix}-side-nav`] ?? {};
  const { href } = args?.[`${prefix}-side-nav-menu-item`] ?? {};
  updateRailExpanded({ collapseMode, expanded });
  const result = html`
    <style>
      ${styles}
    </style>
    <cds-side-nav
      aria-label="Side navigation"
      collapse-mode="${ifDefined(collapseMode)}"
      ?expanded=${expanded}>
      <cds-side-nav-items>
        <cds-side-nav-menu title="L0 menu">
          ${Fade16({ slot: 'title-icon' })}
          <cds-side-nav-menu-item href="${ifDefined(href)}">
            L0 menu item
          </cds-side-nav-menu-item>
          <cds-side-nav-menu-item href="${ifDefined(href)}">
            L0 menu item
          </cds-side-nav-menu-item>
          <cds-side-nav-menu-item href="${ifDefined(href)}">
            L0 menu item
          </cds-side-nav-menu-item>
        </cds-side-nav-menu>
        <cds-side-nav-menu title="L0 menu">
          ${Fade16({ slot: 'title-icon' })}
          <cds-side-nav-menu-item href="${ifDefined(href)}">
            L0 menu item
          </cds-side-nav-menu-item>
          <cds-side-nav-menu-item
            active
            aria-current="page"
            href="${ifDefined(href)}">
            L0 menu item
          </cds-side-nav-menu-item>
          <cds-side-nav-menu-item href="${ifDefined(href)}">
            L0 menu item
          </cds-side-nav-menu-item>
        </cds-side-nav-menu>
        <cds-side-nav-menu title="L0 menu">
          ${Fade16({ slot: 'title-icon' })}
          <cds-side-nav-menu-item href="${ifDefined(href)}">
            L0 menu item
          </cds-side-nav-menu-item>
          <cds-side-nav-menu-item href="${ifDefined(href)}">
            L0 menu item
          </cds-side-nav-menu-item>
          <cds-side-nav-menu-item href="${ifDefined(href)}">
            L0 menu item
          </cds-side-nav-menu-item>
        </cds-side-nav-menu>
        <cds-side-nav-divider></cds-side-nav-divider>
        <cds-side-nav-link href="javascript:void(0)"
          >${Fade16({ slot: 'title-icon' })}L0 link</cds-side-nav-link
        >
        <cds-side-nav-link href="javascript:void(0)"
          >${Fade16({ slot: 'title-icon' })}L0 link</cds-side-nav-link
        >
      </cds-side-nav-items>
    </cds-side-nav>
    ${StoryContent()}
  `;
  (result as any).hasMainTag = true;
  return result;
};

sideNavWithIcons.storyName = 'Side nav with icons';

sideNavWithIcons.parameters = {
  knobs: sideNav.parameters.knobs,
};

export const header = (args) => {
  const { collapseMode, expanded, usageMode } =
    args?.[`${prefix}-side-nav`] ?? {};
  const { href } = args?.[`${prefix}-side-nav-menu-item`] ?? {};
  updateRailExpanded({ collapseMode, expanded, usageMode });
  const handleButtonToggle = (event) => {
    updateRailExpanded({
      collapseMode,
      expanded: event.detail.active,
      usageMode,
    });
  };
  const result = html`
    <style>
      ${styles}
    </style>
    <cds-header aria-label="IBM Platform Name">
      <cds-header-menu-button
        button-label-active="Close menu"
        button-label-inactive="Open menu"
        @cds-header-menu-button-toggled="${handleButtonToggle}"></cds-header-menu-button>
      <cds-header-name href="javascript:void 0" prefix="IBM"
        >[Platform]</cds-header-name
      >
      <cds-header-nav menu-bar-label="IBM [Platform]">
        <cds-header-nav-item href="javascript:void 0"
          >Link 1</cds-header-nav-item
        >
        <cds-header-nav-item href="javascript:void 0"
          >Link 2</cds-header-nav-item
        >
        <cds-header-nav-item href="javascript:void 0"
          >Link 3</cds-header-nav-item
        >
        <cds-header-menu menu-label="Link 4" trigger-content="Link 4">
          <cds-header-menu-item href="javascript:void 0"
            >Sub-link 1</cds-header-menu-item
          >
          <cds-header-menu-item href="javascript:void 0"
            >Sub-link 2</cds-header-menu-item
          >
          <cds-header-menu-item href="javascript:void 0"
            >Sub-link 3</cds-header-menu-item
          >
        </cds-header-menu>
      </cds-header-nav>
    </cds-header>
    <cds-side-nav
      aria-label="Side navigation"
      collapse-mode="${ifDefined(collapseMode)}"
      ?expanded=${expanded}
      usage-mode="${ifDefined(usageMode)}">
      <cds-side-nav-items>
        <cds-side-nav-menu title="L0 menu">
          ${Fade16({ slot: 'title-icon' })}
          <cds-side-nav-menu-item href="${ifDefined(href)}">
            L0 menu item
          </cds-side-nav-menu-item>
          <cds-side-nav-menu-item href="${ifDefined(href)}">
            L0 menu item
          </cds-side-nav-menu-item>
          <cds-side-nav-menu-item href="${ifDefined(href)}">
            L0 menu item
          </cds-side-nav-menu-item>
        </cds-side-nav-menu>
        <cds-side-nav-menu title="L0 menu">
          ${Fade16({ slot: 'title-icon' })}
          <cds-side-nav-menu-item href="${ifDefined(href)}">
            L0 menu item
          </cds-side-nav-menu-item>
          <cds-side-nav-menu-item
            active
            aria-current="page"
            href="${ifDefined(href)}">
            L0 menu item
          </cds-side-nav-menu-item>
          <cds-side-nav-menu-item href="${ifDefined(href)}">
            L0 menu item
          </cds-side-nav-menu-item>
        </cds-side-nav-menu>
        <cds-side-nav-menu title="L0 menu">
          ${Fade16({ slot: 'title-icon' })}
          <cds-side-nav-menu-item href="${ifDefined(href)}">
            L0 menu item
          </cds-side-nav-menu-item>
          <cds-side-nav-menu-item href="${ifDefined(href)}">
            L0 menu item
          </cds-side-nav-menu-item>
          <cds-side-nav-menu-item href="${ifDefined(href)}">
            L0 menu item
          </cds-side-nav-menu-item>
        </cds-side-nav-menu>
        <cds-side-nav-divider></cds-side-nav-divider>
        <cds-side-nav-link href="javascript:void(0)"
          >${Fade16({ slot: 'title-icon' })}L0 link</cds-side-nav-link
        >
        <cds-side-nav-link href="javascript:void(0)"
          >${Fade16({ slot: 'title-icon' })}L0 link</cds-side-nav-link
        >
      </cds-side-nav-items>
    </cds-side-nav>
    ${StoryContent()}
  `;
  (result as any).hasMainTag = true;
  return result;
};

header.parameters = {
  knobs: {
    [`${prefix}-side-nav`]: () => ({
      ...sideNav.parameters.knobs[`${prefix}-side-nav`](),
      usageMode: select('Usage mode (usage-mode)', usageModes, null),
    }),
    [`${prefix}-side-nav-menu-item`]:
      sideNav.parameters.knobs[`${prefix}-side-nav-menu-item`],
  },
};

export default {
  title: 'Components/UI Shell',
  parameters: {
    ...storyDocs.parameters,
  },
};
