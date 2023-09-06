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
import C4DBackgroundMedia from '@carbon/ibmdotcom-web-components/es/components-react/background-media/background-media';
import C4DLeadspaceWithSearch from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-with-search/leadspace-with-search';
import C4DLeadspaceWithSearchHeading from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-with-search/leadspace-with-search-heading';
import C4DLeadspaceWithSearchContent from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-with-search/leadspace-with-search-content';
import C4DLeadspaceWithSearchContentHeading from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-with-search/leadspace-with-search-content-heading';
import C4DLeadspaceWithSearchContentCopy from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-with-search/leadspace-with-search-content-copy';
import C4DHorizontalRule from '@carbon/ibmdotcom-web-components/es/components-react/horizontal-rule/horizontal-rule';
import C4DSearchWithTypeahead from '@carbon/ibmdotcom-web-components/es/components-react/search-with-typeahead/search-with-typeahead';
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
  const { theme } = args?.LeadspaceWithSearch ?? {};
  const secondTheme = theme.split('-')[2];
  return (
    <C4DLeadspaceWithSearch adjacent-theme={theme}>
      <C4DLeadspaceWithSearchHeading>
        Find a product
      </C4DLeadspaceWithSearchHeading>
      <C4DLeadspaceWithSearchContent>
        <C4DLeadspaceWithSearchContentHeading>
          Innovate like a startup, scale for the enterprise
        </C4DLeadspaceWithSearchContentHeading>
        <C4DLeadspaceWithSearchContentCopy>
          Automate your software release process with continuous delivery
          (CD)—the most critical part of adopting DevOps. Build, test, and
          deploy code changes quickly, ensuring software is always ready for
          deployment.
        </C4DLeadspaceWithSearchContentCopy>
      </C4DLeadspaceWithSearchContent>
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

export const WithImage = (args) => {
  const { theme } = args?.LeadspaceWithSearch ?? {};
  const secondTheme = theme.split('-')[2];
  return (
    <C4DLeadspaceWithSearch adjacent-theme={theme}>
      <C4DBackgroundMedia
        gradient-direction="left-to-right"
        mobile-position="bottom"
        default-src={image}
        slot="image"></C4DBackgroundMedia>
      <C4DLeadspaceWithSearchHeading>
        Find a product
      </C4DLeadspaceWithSearchHeading>
      <C4DLeadspaceWithSearchContent>
        <C4DLeadspaceWithSearchContentHeading>
          Innovate like a startup, scale for the enterprise
        </C4DLeadspaceWithSearchContentHeading>
        <C4DLeadspaceWithSearchContentCopy>
          Automate your software release process with continuous delivery
          (CD)—the most critical part of adopting DevOps. Build, test, and
          deploy code changes quickly, ensuring software is always ready for
          deployment.
        </C4DLeadspaceWithSearchContentCopy>
      </C4DLeadspaceWithSearchContent>
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
        theme: select(
          `Adjacent theme`,
          adjacentThemes,
          adjacentThemes.Monotheme
        ),
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
