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
import coreEvents from '@storybook/core-events';
import addons from '@storybook/addons';

import '@carbon/web-components/es/components/skip-to-content/skip-to-content.js';

import { withKnobs } from '@storybook/addon-knobs';
import { CURRENT_THEME } from '@carbon/storybook-addon-theme/es/shared';

import containerStyles from './container.scss'; // eslint-disable-line import/first

import { setCustomElements } from '@storybook/web-components';
import customElementsMetadata from '../custom-elements.json';

setCustomElements(customElementsMetadata);

export const parameters = {
  layout: 'fullscreen',
  options: {
    storySort: {
      order: [
        'Overview',
        [
          'Getting started',
          'Building for IBM(dotcom)',
          'Carbon CDN style helpers',
          'Stable selectors',
          'Enable right-to-left (RTL)',
          'Feature flags',
          'Contributing to the Web Components package',
          'Breaking Changes',
        ],
        'Components',
      ],
    },
  },
  controls: { disabled: true },
  actions: { disabled: true },
};

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
      <bx-skip-to-content href="#main-content"
        >Skip to main content</bx-skip-to-content
      >
      <div
        id="main-content"
        name="main-content"
        data-floating-menu-container
        data-modal-container
        role="main"
        class="${classes}">
        ${result}
      </div>
    `;
  },
  withKnobs,
  (story, { parameters }) => {
    const root = document.documentElement;
    root.toggleAttribute(
      'storybook-carbon-theme-prevent-reload',
      parameters['carbon-theme']?.preventReload
    );
    if (parameters['carbon-theme']?.disabled) {
      root.setAttribute('storybook-carbon-theme', '');
    } else {
      root.setAttribute('storybook-carbon-theme', preservedTheme || '');
    }
    return story();
  },
];

addons.getChannel().on(CURRENT_THEME, (theme) => {
  document.documentElement.setAttribute(
    'storybook-carbon-theme',
    (preservedTheme = theme)
  );
  // Re-rendering upon theme change causes adverse effect for some stories
  if (
    !document.documentElement.hasAttribute(
      'storybook-carbon-theme-prevent-reload'
    )
  ) {
    addons.getChannel().emit(coreEvents.FORCE_RE_RENDER);
  }
});

// Reset knobs when changing stories to prevent them carrying over.
// This can be removed when stories switch to controls.
// https://github.com/storybookjs/addon-knobs/issues/19
let currentPath;
if (window.parent) {
  const parentWindow = window.parent;
  parentWindow.setInterval(function () {
    const urlParams = new URLSearchParams(parentWindow.location.search);
    const path = urlParams.get('path');
    if (path && path !== currentPath) {
      currentPath = path;

      const knobButtons = parentWindow.document.querySelectorAll(
        '#panel-tab-content button'
      );
      if (knobButtons) {
        const resetButton = knobButtons[knobButtons.length - 1];
        (resetButton as HTMLElement)?.click();
      }
    }
    const knobLabel = parentWindow.document.querySelector(
      '[id*="tabbutton-knobs-"]'
    );
    if (knobLabel) {
      (knobLabel as HTMLElement).textContent = 'Knobs';
    }
  }, 100);
}
