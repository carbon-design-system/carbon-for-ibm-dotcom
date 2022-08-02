/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import addons from '@storybook/addons';
import { CURRENT_THEME } from '@carbon/storybook-addon-theme/es/shared';
import Container from './Container';
import { knob } from '@storybook/addon-knobs';

const SORT_ORDER_GROUP = ['Overview', 'Components'];

const SORT_ORDER = [
  'overview-getting-started--page',
  'overview-building-for-ibm-dot-com--page',
  'overview-environment-variables--page',
  'overview-feature-flags--page',
  'overview-enable-right-to-left-rtl--page',
  'overview-contributing-to-the-react-package--page',
  'overview-breaking-changes--page',
];

export const parameters = {
  layout: 'fullscreen',
  controls: { disabled: true },
  options: {
    storySort(lhs, rhs) {
      const [lhsId, lhsMeta] = lhs;
      const [rhsId, rhsMeta] = rhs;
      const lhsSortOrder = SORT_ORDER.indexOf(lhsId);
      const rhsSortOrder = SORT_ORDER.indexOf(rhsId);
      if (lhsSortOrder >= 0 && rhsSortOrder >= 0) {
        return lhsSortOrder - rhsSortOrder;
      }
      const { kind: lhsKind } = lhsMeta;
      const { kind: rhsKind } = rhsMeta;
      const lhsGroup = lhsKind.split('|')[0];
      const rhsGroup = rhsKind.split('|')[0];
      const lhsGroupSortOrder = SORT_ORDER_GROUP.indexOf(lhsGroup);
      const rhsGroupSortOrder = SORT_ORDER_GROUP.indexOf(rhsGroup);
      if (lhsGroupSortOrder >= 0 && rhsGroupSortOrder >= 0) {
        return lhsGroupSortOrder - rhsGroupSortOrder;
      }
      return 0;
    },
  },
};

let preservedTheme;

export const decorators = [
  (story, { parameters }) => {
    const root = document.documentElement;
    if (parameters['carbon-theme']?.disabled) {
      root.setAttribute('storybook-carbon-theme', '');
    } else {
      root.setAttribute('storybook-carbon-theme', preservedTheme || '');
    }
    return story();
  },
  (story, { parameters }) => {
    return <Container story={story} parameters={parameters}></Container>;
  },
];

addons.getChannel().on(CURRENT_THEME, theme => {
  document.documentElement.setAttribute(
    'storybook-carbon-theme',
    (preservedTheme = theme)
  );
  addons.getChannel().emit(coreEvents.FORCE_RE_RENDER);
});

// Reset knobs when changing stories to prevent them carrying over.
// This can be removed when stories switch to controls.
// https://github.com/storybookjs/addon-knobs/issues/19
let currentPath;
if (window.parent) {
  const parentWindow = window.parent;
  parentWindow.setInterval(function() {
    const urlParams = new URLSearchParams(parentWindow.location.search);
    const path = urlParams.get('path');
    if (path && path !== currentPath) {
      currentPath = path;

      const knobButtons = parentWindow.document.querySelectorAll(
        '#panel-tab-content button'
      );
      if (knobButtons) {
        const resetButton = knobButtons[knobButtons.length - 1];
        if (resetButton) resetButton.click();
      }
    }
    const knobLabel = parentWindow.document.querySelector(
      '[id*="tabbutton-knobs-"]'
    );
    if (knobLabel) {
      knobLabel.textContent = 'Knobs';
    }
  }, 100);
}
