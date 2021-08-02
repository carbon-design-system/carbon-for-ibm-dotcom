/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { select, text } from '@storybook/addon-knobs';
import { html } from 'lit-element';
import '../leadspace-with-search';
import '../../search-with-typeahead/search-with-typeahead';
import '../leadspace-search-block-heading';
import '../leadspace-search-block-copy';
import readme from './README.stories.mdx';
import { ADJACENT_THEMES } from '../defs';

import image from '../../../../../storybook-images/assets/card-section-offset/background-media.jpg';

const copy = `Automate your software release process with continuous 
delivery (CD)—the most critical part of adopting DevOps. 
Build, test, and deploy code changes quickly, 
ensuring software is always ready for deployment.`;

const adjacentThemes = {
  'White/ Gray 10': ADJACENT_THEMES.WHITE_AND_G10,
  'Gray 10/ White': ADJACENT_THEMES.G10_AND_WHITE,
  'Gray 90/ Gray 100': ADJACENT_THEMES.G90_AND_G100,
  'Gray 100/Gray 90': ADJACENT_THEMES.G100_AND_G90,
  Monotheme: '',
};

export const Default = ({ parameters }) => {
  const { theme, heading, subheading, paragraph } = parameters?.props?.LeadspaceWithSearch ?? {};
  return html`
    <dds-leadspace-with-search adjacent-theme="${theme}">
      <dds-leadspace-block-heading slot="heading">${heading}</dds-leadspace-block-heading>
      <dds-leadspace-block-content slot="content">
        <dds-leadspace-search-block-heading>${subheading}</dds-leadspace-search-block-heading>
        <dds-leadspace-search-block-copy>${paragraph}</dds-leadspace-search-block-copy>
      </dds-leadspace-block-content>
      <dds-search-with-typeahead slot="search" alt-search active should-remain-open></dds-search-with-typeahead>
    </dds-leadspace-with-search>
  `;
};

export const WithImage = ({ parameters }) => {
  const { theme, heading, subheading, paragraph } = parameters?.props?.LeadspaceWithSearch ?? {};
  return html`
    <dds-leadspace-with-search adjacent-theme="${theme}">
      <dds-background-media gradient-direction="left-to-right" mobile-position="bottom" default-src="${image}" slot="image">
      </dds-background-media>
      <dds-leadspace-block-heading slot="heading">${heading}</dds-leadspace-block-heading>
      <dds-leadspace-block-content slot="content">
        <dds-leadspace-search-block-heading>${subheading}</dds-leadspace-search-block-heading>
        <dds-leadspace-search-block-copy>${paragraph}</dds-leadspace-search-block-copy>
      </dds-leadspace-block-content>
      <dds-search-with-typeahead slot="search" alt-search active should-remain-open></dds-search-with-typeahead>
    </dds-leadspace-with-search>
  `;
};

export default {
  title: 'Components/Leadspace with search',
  parameters: {
    ...readme.parameters,
    hasGrid: true,
    hasVerticalSpacingInComponent: true,
    knobs: {
      LeadspaceWithSearch: ({ groupId }) => ({
        heading: text('Heading:', 'Find a product', groupId),
        subheading: text('Subheading:', 'Innovate like a startup, scale for the enterprise', groupId),
        paragraph: text('Paragraph:', copy, groupId),
        theme: select(`Adjacent theme`, adjacentThemes, adjacentThemes.Monotheme, groupId) ?? 0,
      }),
    },
  },
  decorators: [
    story => html`
      <style></style>
      <div class="dds-ce-demo-devenv--simple-grid dds-ce-demo-devenv--simple-grid--content-layout">
        ${story()}
      </div>
    `,
  ],
};
