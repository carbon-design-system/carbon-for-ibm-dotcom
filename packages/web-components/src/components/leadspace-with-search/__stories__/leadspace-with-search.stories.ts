/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select, text } from '@storybook/addon-knobs';
import { html } from 'lit';
import readme from './README.stories.mdx';
import { ADJACENT_THEMES, DUAL_THEMES } from '../defs';
import '../index';

const adjacentThemes = {
  'Dual theme': ADJACENT_THEMES.DUAL_THEME,
  Monotheme: ADJACENT_THEMES.MONOTHEME,
};

const subheading = `Innovate faster, reduce operational cost and transform 
IT operations (ITOps) across a changing landscape with an AIOps platform that 
delivers visibility into performance data and dependencies across environments.`;

// observing the Storybook theme attribute change
// Normally it would work without this, but the component won't
// re-render unless we do this.
const htmlElement = document.documentElement;
let currentTheme = '';
// eslint-disable-next-line func-names
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'attributes') {
      currentTheme = htmlElement.getAttribute(
        mutation.attributeName!
      ) as string;

      let dualTheme;

      for (const key in DUAL_THEMES) {
        if (DUAL_THEMES[key].startsWith(currentTheme)) {
          dualTheme = DUAL_THEMES[key];
          break;
        }
      }
      const leadspace = document.querySelector('c4d-leadspace-with-search');
      leadspace?.setAttribute('dual-theme', dualTheme as string);
    }
  });
});
observer.observe(htmlElement, { attributes: true });

export const Default = (args) => {
  const { theme, heading, highlight, subheading } =
    args?.LeadspaceWithSearch ?? {};

  const secondTheme = document
    .querySelector('c4d-leadspace-with-search')
    ?.getAttribute('dual-theme')!
    .split('-')[2];

  return html`
    <c4d-leadspace-with-search adjacent-theme="${theme}">
      <c4d-leadspace-heading highlight=${highlight}
        >${heading}</c4d-leadspace-heading
      >
      <c4d-leadspace-with-search-copy
        style="${!subheading ? 'display: none' : ''}"
        >${subheading}
      </c4d-leadspace-with-search-copy>
      <c4d-search-with-typeahead
        slot="search"
        leadspace-search></c4d-search-with-typeahead>
      <c4d-hr
        slot="hr"
        style="${currentTheme === secondTheme ? 'display: none' : ''}"></c4d-hr>
    </c4d-leadspace-with-search>
  `;
};

export default {
  title: 'Components/Lead space search',
  decorators: [
    (story) => html`
      <div class="cds--grid">
        <div class="cds--row">
          <div class="cds--col-lg-8 cds--offset-lg-4 cds--no-gutter">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      LeadspaceWithSearch: () => ({
        heading: text(
          'Heading:',
          'Find a product - Innovate like a startup, scale for the enterprise'
        ),
        highlight: text('Highlight:', 'Find a product -'),
        subheading: text('Subheading:', subheading),
        theme: select(
          `Adjacent theme`,
          adjacentThemes,
          adjacentThemes.Monotheme
        ),
      }),
    },
    propsSet: {
      default: {
        LeadspaceWithSearch: {
          heading: 'Find a product',
          subheading: 'Innovate like a startup, scale for the enterprise',
          paragraph: '',
          theme: adjacentThemes.Monotheme,
        },
      },
    },
  },
};
