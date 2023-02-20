/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { select } from '@storybook/addon-knobs';
import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
/* eslint-disable max-len */
// @ts-ignore
import DDSBackgroundMedia from '@carbon/ibmdotcom-web-components/es/components-react/background-media/background-media';
import DDSLeadspaceWithSearch from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-with-search/leadspace-with-search';
import DDSLeadspaceWithSearchHeading from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-with-search/leadspace-with-search-heading';
import DDSLeadspaceWithSearchContent from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-with-search/leadspace-with-search-content';
import DDSLeadspaceWithSearchContentHeading from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-with-search/leadspace-with-search-content-heading';
import DDSLeadspaceWithSearchContentCopy from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-with-search/leadspace-with-search-content-copy';
import DDSHorizontalRule from '@carbon/ibmdotcom-web-components/es/components-react/horizontal-rule/horizontal-rule';
import DDSSearchWithTypeahead from '@carbon/ibmdotcom-web-components/es/components-react/search-with-typeahead/search-with-typeahead';
/* eslint-enable max-len */
import { ADJACENT_THEMES } from '../defs';
import readme from './README.stories.react.mdx';

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

export const Default = ({ parameters }) => {
  const { theme } = parameters?.props?.LeadspaceWithSearch ?? {};
  const secondTheme = theme.split('-')[2];
  return (
    <DDSLeadspaceWithSearch adjacent-theme={theme}>
      <DDSLeadspaceWithSearchHeading>Find a product</DDSLeadspaceWithSearchHeading>
      <DDSLeadspaceWithSearchContent>
        <DDSLeadspaceWithSearchContentHeading>
          Innovate like a startup, scale for the enterprise
        </DDSLeadspaceWithSearchContentHeading>
        <DDSLeadspaceWithSearchContentCopy>
          Automate your software release process with continuous delivery (CD)—the most critical part of adopting DevOps. Build,
          test, and deploy code changes quickly, ensuring software is always ready for deployment.
        </DDSLeadspaceWithSearchContentCopy>
      </DDSLeadspaceWithSearchContent>
      <DDSSearchWithTypeahead slot="search" leadspace-search></DDSSearchWithTypeahead>
      <DDSHorizontalRule slot="hr" style={{ display: currentTheme === secondTheme ? 'none' : '' }}></DDSHorizontalRule>
    </DDSLeadspaceWithSearch>
  );
};

export const WithImage = ({ parameters }) => {
  const { theme } = parameters?.props?.LeadspaceWithSearch ?? {};
  const secondTheme = theme.split('-')[2];
  return (
    <DDSLeadspaceWithSearch adjacent-theme={theme}>
      <DDSBackgroundMedia
        gradient-direction="left-to-right"
        mobile-position="bottom"
        default-src={image}
        slot="image"></DDSBackgroundMedia>
      <DDSLeadspaceWithSearchHeading>Find a product</DDSLeadspaceWithSearchHeading>
      <DDSLeadspaceWithSearchContent>
        <DDSLeadspaceWithSearchContentHeading>
          Innovate like a startup, scale for the enterprise
        </DDSLeadspaceWithSearchContentHeading>
        <DDSLeadspaceWithSearchContentCopy>
          Automate your software release process with continuous delivery (CD)—the most critical part of adopting DevOps. Build,
          test, and deploy code changes quickly, ensuring software is always ready for deployment.
        </DDSLeadspaceWithSearchContentCopy>
      </DDSLeadspaceWithSearchContent>
      <DDSSearchWithTypeahead slot="search" leadspace-search></DDSSearchWithTypeahead>
      <DDSHorizontalRule slot="hr" style={{ display: currentTheme === secondTheme ? 'none' : '' }}></DDSHorizontalRule>
    </DDSLeadspaceWithSearch>
  );
};

export default {
  title: 'Components/Lead space search',
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      LeadspaceWithSearch: ({ groupId }) => ({
        theme: select(`Adjacent theme`, adjacentThemes, adjacentThemes.Monotheme, groupId),
      }),
    },
  },
  decorators: [
    story => {
      return (
        <div className="bx--grid">
          <div className="bx--row">
            <div className="bx--col-lg-8 bx--offset-lg-4 bx--no-gutter">{story()}</div>
          </div>
        </div>
      );
    },
  ],
};
