/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-html'; // eslint-disable-line import/first
import { classMap } from 'lit-html/directives/class-map';
import 'carbon-web-components/es/components/skip-to-content/skip-to-content.js';
import { addParameters, configure, setCustomElements } from '@storybook/web-components'; // eslint-disable-line import/first
import coreEvents from '@storybook/core-events';
import addons from '@storybook/addons';
import { withKnobs } from '@storybook/addon-knobs';
import { CURRENT_THEME } from '@carbon/storybook-addon-theme/es/shared';
import customElements from '../custom-elements.json';
import theme from './theme';
import getSimpleStorySort from './get-simple-story-sort';
import containerStyles from './container.scss'; // eslint-disable-line import/first

if (process.env.STORYBOOK_USE_RTL === 'true') {
  document.documentElement.setAttribute('dir', 'rtl');
}

setCustomElements(customElements);

addParameters({
  layout: 'fullscreen',
  options: {
    showRoots: true,
    storySort: getSimpleStorySort([
      'overview-getting-started--page',
      'overview-building-for-ibm-dotcom--page',
      'overview-carbon-cdn-style-helpers--page',
      'overview-stable-selectors--page',
      'overview-using-server-side-template--page',
      'overview-enable-right-to-left-rtl--page',
      'overview-feature-flags--page',
      'overview-contributing-to-the-web-components-package--page',
      'overview-breaking-changes--page',
    ]),
    theme: theme,
  },
});

let preservedTheme;
export const decorators = [
  (story, { parameters }) => {
    const result = story();
    const { hasStoryPadding } = parameters;
    const classes = classMap({
      'dds-story-padding': hasStoryPadding,
    });

    return html`
      <style>
        ${containerStyles}
      </style>
      <bx-skip-to-content href="#main-content">Skip to main content</bx-skip-to-content>
      <div id="main-content" name="main-content" data-floating-menu-container data-modal-container role="main" class="${classes}">
        ${result}
      </div>
    `;
  },
  withKnobs,
  (story, { parameters }) => {
    const root = document.documentElement;
    root.toggleAttribute('storybook-carbon-theme-prevent-reload', parameters['carbon-theme']?.preventReload);
    if (parameters['carbon-theme']?.disabled) {
      root.setAttribute('storybook-carbon-theme', '');
    } else {
      root.setAttribute('storybook-carbon-theme', preservedTheme || '');
    }
    return story();
  },
];

addons.getChannel().on(CURRENT_THEME, theme => {
  document.documentElement.setAttribute('storybook-carbon-theme', (preservedTheme = theme));
  // Re-rendering upon theme change causes adverse effect for some stories
  if (!document.documentElement.hasAttribute('storybook-carbon-theme-prevent-reload')) {
    addons.getChannel().emit(coreEvents.FORCE_RE_RENDER);
  }
});

const reqDocs = require.context('../docs', true, /\.stories\.mdx$/);
configure(reqDocs, module);

const reqComponents = require.context('../src/components', true, /\.stories\.[jt]s$/);
configure(reqComponents, module);

if (module.hot) {
  module.hot.accept(reqComponents.id, () => {
    const currentLocationHref = window.location.href;
    window.history.pushState(null, '', currentLocationHref);
    window.location.reload();
  });
}

let currentPath;
if (window.parent) {
  const parentWindow = window.parent;
  parentWindow.setInterval(function() {
    const urlParams = new URLSearchParams(parentWindow.location.search);
    const path = urlParams.get('path');
    if (path && path !== currentPath) {
      currentPath = path;

      const knobButtons = parentWindow.document.querySelectorAll('#panel-tab-content button');
      if (knobButtons) {
        const resetButton = knobButtons[knobButtons.length - 1];
        (resetButton as HTMLElement)?.click();
      }
    }
  }, 100);
}
