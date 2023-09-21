/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { select, text } from '@storybook/addon-knobs';
import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
/* eslint-disable max-len */
// @ts-ignore
import C4DBackgroundMedia from '@carbon/ibmdotcom-web-components/es/components-react/background-media/background-media';
import C4DLeadspaceWithSearch from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-with-search/leadspace-with-search';
import C4DLeadspaceHeading from '@carbon/ibmdotcom-web-components/es/components-react/leadspace/leadspace-heading';
import C4DLeadspaceWithSearchCopy from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-with-search/leadspace-with-search-copy';
import C4DHorizontalRule from '@carbon/ibmdotcom-web-components/es/components-react/horizontal-rule/horizontal-rule';
import C4DSearchWithTypeahead from '@carbon/ibmdotcom-web-components/es/components-react/search-with-typeahead/search-with-typeahead';
/* eslint-enable max-len */
import { ADJACENT_THEMES } from '../defs';
import readme from './README.stories.react.mdx';

const adjacentThemes = {
  'White/Gray 10': ADJACENT_THEMES.WHITE_AND_G10,
  'Gray 10/White': ADJACENT_THEMES.G10_AND_WHITE,
  'Gray 90/Gray 100': ADJACENT_THEMES.G90_AND_G100,
  'Gray 100/Gray 90': ADJACENT_THEMES.G100_AND_G90,
  Monotheme: '',
};

const subheading = `Innovate faster, reduce operational cost and transform 
IT operations (ITOps) across a changing landscape with an AIOps platform that 
delivers visibility into performance data and dependencies across environments.`

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
  const { theme, heading, highlight, subheading } =
    args?.LeadspaceWithSearch ?? {};
  const secondTheme = theme.split('-')[2];
  return (
    <C4DLeadspaceWithSearch adjacent-theme={theme}>
      <C4DLeadspaceHeading highlight={highlight}>
        {heading}
      </C4DLeadspaceHeading>

        <C4DLeadspaceWithSearchCopy>
          {subheading}
        </C4DLeadspaceWithSearchCopy>
      <C4DSearchWithTypeahead
        slot="search"
        leadspace-search></C4DSearchWithTypeahead>
      <C4DHorizontalRule
        slot="hr"
        style={{
          display: currentTheme === secondTheme ? 'none' : '',
        }}></C4DHorizontalRule>
    </C4DLeadspaceWithSearch>
  );
};

export default {
  title: 'Components/Lead space search',
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      LeadspaceWithSearch: () => ({
        heading: text('Heading:', 'Find a product - Innovate like a startup, scale for the enterprise'),
        highlight: text('Highlight:', 'Find a product -'),
        subheading: text('Subheading:', subheading),
        theme: select(`Adjacent theme`, adjacentThemes, adjacentThemes.Monotheme),
      }),
    },
  },
  decorators: [
    (story) => {
      return (
        <div className="cds--grid">
          <div className="cds--row">
            <div className="cds--col-lg-8 cds--offset-lg-4 cds--no-gutter">
              {story()}
            </div>
          </div>
        </div>
      );
    },
  ],
};
