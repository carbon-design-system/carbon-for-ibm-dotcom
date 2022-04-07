/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select, text } from '@storybook/addon-knobs';
import { html } from 'lit-element';
import readme from './README.stories.mdx';
import { ADJACENT_THEMES } from '../defs';
import '../index';
import image from '../../../../../storybook-images/assets/card-section-offset/background-media.jpg';

const adjacentThemes = {
  'White/Gray 10': ADJACENT_THEMES.WHITE_AND_G10,
  'Gray 10/White': ADJACENT_THEMES.G10_AND_WHITE,
  'Gray 90/Gray 100': ADJACENT_THEMES.G90_AND_G100,
  'Gray 100/Gray 90': ADJACENT_THEMES.G100_AND_G90,
  Monotheme: '',
};

// observing the Storybook theme attribute change
const htmlElement = document.documentElement;
let currentTheme = '';
// eslint-disable-next-line func-names
const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    if (mutation.type === 'attributes') {
      currentTheme = htmlElement.getAttribute(mutation.attributeName!) as string;
    }
  });
});
observer.observe(htmlElement, { attributes: true });

export const Default = args => {
  const { theme, heading, subheading, paragraph } = args?.LeadspaceWithSearch ?? {};
  const secondTheme = theme.split('-')[2];
  return html`
    <dds-leadspace-with-search adjacent-theme="${theme}">
      <dds-leadspace-with-search-heading>${heading}</dds-leadspace-with-search-heading>
      <dds-leadspace-with-search-content>
        <dds-leadspace-with-search-content-heading>${subheading}</dds-leadspace-with-search-content-heading>
        <dds-leadspace-with-search-content-copy style="${!paragraph ? 'display: none' : ''}"
          >${paragraph}
        </dds-leadspace-with-search-content-copy>
      </dds-leadspace-with-search-content>
      <dds-search-with-typeahead slot="search" leadspace-search></dds-search-with-typeahead>
      <dds-hr slot="hr" style="${currentTheme === secondTheme ? 'display: none' : ''}"></dds-hr>
    </dds-leadspace-with-search>
  `;
};

export const WithImage = args => {
  const { theme, heading, subheading, paragraph } = args?.LeadspaceWithSearch ?? {};
  const secondTheme = theme.split('-')[2];
  return html`
    <dds-leadspace-with-search adjacent-theme="${theme}">
      <dds-background-media gradient-direction="left-to-right" mobile-position="bottom" default-src="${image}" slot="image">
      </dds-background-media>
      <dds-leadspace-with-search-heading>${heading}</dds-leadspace-with-search-heading>
      <dds-leadspace-with-search-content>
        <dds-leadspace-with-search-content-heading>${subheading}</dds-leadspace-with-search-content-heading>
        <dds-leadspace-with-search-content-copy style="${!paragraph ? 'display: none' : ''}"
          >${paragraph}
        </dds-leadspace-with-search-content-copy>
      </dds-leadspace-with-search-content>
      <dds-search-with-typeahead slot="search" leadspace-search></dds-search-with-typeahead>
      <dds-hr slot="hr" style="${currentTheme === secondTheme ? 'display: none' : ''}"></dds-hr>
    </dds-leadspace-with-search>
  `;
};

WithImage.story = {
  name: 'With image',
  parameters: {
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

export default {
  title: 'Components/Lead space search',
  decorators: [
    story => html`
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-lg-8 bx--offset-lg-4 bx--no-gutter">
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
        heading: text('Heading:', 'Find a product'),
        subheading: 'Innovate like a startup, scale for the enterprise',
        paragraph: text('Paragraph:', ''),
        theme: select(`Adjacent theme`, adjacentThemes, adjacentThemes.Monotheme) ?? 0,
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
