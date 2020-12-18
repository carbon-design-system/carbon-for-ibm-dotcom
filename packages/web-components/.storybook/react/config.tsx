/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cx from 'classnames';
import React, { StrictMode } from 'react';
import coreEvents from '@storybook/core-events';
import addons from '@storybook/addons';
import { configure, addDecorator, addParameters } from '@storybook/react'; // eslint-disable-line import/first
import { withKnobs } from '@storybook/addon-knobs';
import BXSkipToContent from 'carbon-web-components/es/components-react/skip-to-content/skip-to-content';
import { CURRENT_THEME } from '@carbon/storybook-addon-theme/es/shared';
import theme from './theme';
import getSimpleStorySort from '../get-simple-story-sort';
import decoratorKnobs from '../decorator-knobs';
import containerStyles from '../container.scss'; // eslint-disable-line import/first

if (process.env.STORYBOOK_CARBON_CUSTOM_ELEMENTS_USE_RTL === 'true') {
  document.documentElement.setAttribute('dir', 'rtl');
}

addParameters({
  options: {
    showRoots: true,
    storySort: getSimpleStorySort([
      'overview-getting-started--page',
      'overview-building-for-ibm-dotcom--page',
      'overview-stable-selectors--page',
      'overview-using-server-side-template--page',
      'overview-enable-right-to-left-rtl--page',
      'overview-feature-flags--page',
      'overview-contributing-to-the-web-components-package--page',
    ]),
    theme: theme,
  },
});

addDecorator((story, { parameters }) => {
  const result = story();
  const { hasMainTag } = result as any;
  const { hasGrid, hasVerticalSpacingInComponent } = parameters;
  const classes = cx('dds-ce-demo-devenv--container', {
    'dds-ce-demo-devenv--container--has-grid': hasGrid,
    'dds-ce-demo-devenv--container--has-vertical-spacing-in-component': hasVerticalSpacingInComponent,
  });
  return (
    <StrictMode>
      <style>{containerStyles.cssText}</style>
      <BXSkipToContent href="#main-content">Skip to main content</BXSkipToContent>
      <div
        id="main-content"
        data-floating-menu-container
        data-modal-container
        role={hasMainTag ? 'none' : 'main'}
        className={classes}>
        {result}
      </div>
    </StrictMode>
  );
});

addDecorator(withKnobs);
addDecorator(decoratorKnobs);

let preservedTheme;

addDecorator((story, { parameters }) => {
  const root = document.documentElement;
  root.toggleAttribute('storybook-carbon-theme-prevent-reload', parameters['carbon-theme']?.preventReload);
  if (parameters['carbon-theme']?.disabled) {
    root.setAttribute('storybook-carbon-theme', '');
  } else {
    root.setAttribute('storybook-carbon-theme', preservedTheme || '');
  }
  return story();
});

addons.getChannel().on(CURRENT_THEME, theme => {
  document.documentElement.setAttribute('storybook-carbon-theme', (preservedTheme = theme));
  // Re-rendering upon theme change causes adverse effect for some stories
  if (!document.documentElement.hasAttribute('storybook-carbon-theme-prevent-reload')) {
    addons.getChannel().emit(coreEvents.FORCE_RE_RENDER);
  }
});

const reqDocs = require.context('../../docs', true, /\.stories\.react\.mdx$/);
configure(reqDocs, module);

const reqComponents = require.context('../../src/components', true, /\.stories\.react\.[jt]sx$/);
configure(reqComponents, module);

if (module.hot) {
  module.hot.accept(reqComponents.id, () => {
    const currentLocationHref = window.location.href;
    window.history.pushState(null, '', currentLocationHref);
    window.location.reload();
  });
}
