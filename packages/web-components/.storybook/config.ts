/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-html'; // eslint-disable-line import/first
import { configure, addDecorator, addParameters, setCustomElements } from '@storybook/web-components'; // eslint-disable-line import/first
import { withKnobs } from '@storybook/addon-knobs';
import customElements from '../custom-elements.json';
import theme from './theme';
import getSimpleStorySort from './get-simple-story-sort';
import decoratorKnobs from './decorator-knobs';
import containerStyles from './container.scss'; // eslint-disable-line import/first

if (process.env.STORYBOOK_IBMDOTCOM_WEB_COMPONENTS_USE_RTL === 'true') {
  document.documentElement.setAttribute('dir', 'rtl');
}

setCustomElements(customElements);

addParameters({
  options: {
    showRoots: true,
    storySort: getSimpleStorySort([
      'overview-getting-started--page',
      'overview-building-for-ibm-dotcom--page',
      'overview-stable-selectors--page',
    ]),
    theme: theme,
  },
});

// The TS configuration for `@storybook/web-components` does not seem to allow returning `TemplateResult` in decorators,
// using `TemplateResult` in decorators seems to work with `@storybook/web-components` actually
// @ts-ignore
addDecorator(story => {
  const result = story();
  const { hasMainTag } = result as any;
  return html`
    <style>
      ${containerStyles}
    </style>
    <div
      name="main-content"
      data-floating-menu-container
      role="${hasMainTag ? 'none' : 'main'}"
      class="dds-ce-demo-devenv--container"
    >
      ${result}
    </div>
  `;
});

addDecorator(withKnobs);
addDecorator(decoratorKnobs);

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
