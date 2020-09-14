/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-html'; // eslint-disable-line import/first
import { classMap } from 'lit-html/directives/class-map';
import { configure, addDecorator, addParameters, setCustomElements } from '@storybook/web-components'; // eslint-disable-line import/first
import { withKnobs } from '@storybook/addon-knobs';
import customElements from '../custom-elements.json';
import theme from './theme';
import './skip-to-content';
import containerStyles from './container.scss'; // eslint-disable-line import/first

if (process.env.STORYBOOK_IBMDOTCOM_WEB_COMPONENTS_USE_RTL === 'true') {
  document.documentElement.setAttribute('dir', 'rtl');
}

setCustomElements(customElements);

const SORT_ORDER = [
  'overview-getting-started--page',
  'overview-building-for-ibm-dotcom--page',
  'overview-stable-selectors--page',
];

addParameters({
  options: {
    showRoots: true,
    storySort(lhs, rhs) {
      const [lhsId] = lhs;
      const [rhsId] = rhs;
      const lhsSortOrder = SORT_ORDER.indexOf(lhsId);
      const rhsSortOrder = SORT_ORDER.indexOf(rhsId);
      if (lhsSortOrder >= 0 && rhsSortOrder >= 0) {
        return lhsSortOrder - rhsSortOrder;
      }
      return 0;
    },
    theme: theme,
  },
});

// The TS configuration for `@storybook/web-components` does not seem to allow returning `TemplateResult` in decorators,
// using `TemplateResult` in decorators seems to work with `@storybook/web-components` actually
// @ts-ignore
addDecorator((story, { parameters }) => {
  const result = story();
  const { hasMainTag } = result as any;
  const { hasGrid } = parameters;
  const classes = classMap({
    'dds-ce-demo-devenv--container': true,
    'dds-ce-demo-devenv--container--has-grid': hasGrid,
  });
  return html`
    <style>
      ${containerStyles}
    </style>
    <bx-ce-demo-skip-to-content href="#main-content">Skip to main content</bx-ce-demo-skip-to-content>
    <div
      id="main-content"
      name="main-content"
      data-floating-menu-container
      role="${hasMainTag ? 'none' : 'main'}"
      class="${classes}"
    >
      ${result}
    </div>
  `;
});

addDecorator(withKnobs);

addDecorator((story, { parameters }) => {
  const { knobs } = parameters;
  if (Object(knobs) === knobs) {
    if (!parameters.props) {
      parameters.props = {};
    }
    Object.keys(knobs).forEach(name => {
      if (!parameters.props[name]) {
        parameters.props[name] = {};
      }
      if (typeof knobs[name] === 'function') {
        Object.assign(parameters.props[name], knobs[name]({ groupId: name }));
      }
    });
  }
  return story();
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
