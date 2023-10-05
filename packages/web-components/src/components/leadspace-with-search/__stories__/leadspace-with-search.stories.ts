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
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'attributes') {
      currentTheme = htmlElement.getAttribute(
        mutation.attributeName!
      ) as string;
    }
  });
});
observer.observe(htmlElement, { attributes: true });

export const Default = (args) => {
  const { theme, heading, subheading, paragraph } =
    args?.LeadspaceWithSearch ?? {};
  const secondTheme = theme.split('-')[2];
  const subheadingComponent = document.querySelector(
    'c4d-leadspace-with-search-content-heading'
  );

  if (subheadingComponent) {
    subheadingComponent!.shadowRoot!.innerHTML = subheading;
  }
  return html`
    <c4d-leadspace-with-search adjacent-theme="${theme}">
      <c4d-leadspace-with-search-heading
        >${heading}</c4d-leadspace-with-search-heading
      >
      <c4d-leadspace-with-search-content>
        <c4d-leadspace-with-search-content-heading
          >${subheading}</c4d-leadspace-with-search-content-heading
        >
        <c4d-leadspace-with-search-content-copy
          style="${!paragraph ? 'display: none' : ''}"
          >${paragraph}
        </c4d-leadspace-with-search-content-copy>
      </c4d-leadspace-with-search-content>
      <c4d-search-with-typeahead
        slot="search"
        leadspace-search></c4d-search-with-typeahead>
      <c4d-hr
        slot="hr"
        style="${currentTheme === secondTheme ? 'display: none' : ''}"></c4d-hr>
    </c4d-leadspace-with-search>
  `;
};

export const WithImage = (args) => {
  const { theme, heading, subheading, paragraph } =
    args?.LeadspaceWithSearch ?? {};
  const secondTheme = theme.split('-')[2];

  const subheadingComponent = document.querySelector(
    'c4d-leadspace-with-search-content-heading'
  );

  if (subheadingComponent) {
    subheadingComponent!.shadowRoot!.innerHTML = subheading;
  }

  return html`
    <c4d-leadspace-with-search adjacent-theme="${theme}">
      <c4d-background-media
        gradient-direction="left-to-right"
        default-src="${image}"
        slot="image">
      </c4d-background-media>
      <c4d-leadspace-with-search-heading
        >${heading}</c4d-leadspace-with-search-heading
      >
      <c4d-leadspace-with-search-content>
        <c4d-leadspace-with-search-content-heading
          >${subheading}</c4d-leadspace-with-search-content-heading
        >
        <c4d-leadspace-with-search-content-copy
          style="${!paragraph ? 'display: none' : ''}"
          >${paragraph}
        </c4d-leadspace-with-search-content-copy>
      </c4d-leadspace-with-search-content>
      <c4d-search-with-typeahead
        slot="search"
        leadspace-search></c4d-search-with-typeahead>
      <c4d-hr
        slot="hr"
        style="${currentTheme === secondTheme ? 'display: none' : ''}"></c4d-hr>
    </c4d-leadspace-with-search>
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
    (story) => html`
      <div class="cds--grid">
        <div class="cds--row">
          <div class="cds--col-lg-8cdsds--offset-lg-cdscds--no-gutter">
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
        subheading: text(
          'Subheading',
          'Innovate like a startup, scale for the enterprise'
        ),
        paragraph: text('Paragraph:', ''),
        theme:
          select(`Adjacent theme`, adjacentThemes, adjacentThemes.Monotheme) ??
          0,
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
