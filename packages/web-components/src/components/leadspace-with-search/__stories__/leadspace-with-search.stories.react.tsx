/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
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
import DDSLeadSpaceBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-block/leadspace-block-heading';
import DDSLeadSpaceBlockContent from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-block/leadspace-block-content';
import DDSLeadspaceSearchBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-with-search/leadspace-search-block-heading';
import DDSLeadspaceSearchBlockCopy from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-with-search/leadspace-search-block-copy';
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
      <DDSLeadSpaceBlockHeading slot="heading">Find a product</DDSLeadSpaceBlockHeading>
      <DDSLeadSpaceBlockContent slot="content">
        <DDSLeadspaceSearchBlockHeading>Innovate like a startup, scale for the enterprise</DDSLeadspaceSearchBlockHeading>
        <DDSLeadspaceSearchBlockCopy>
          Automate your software release process with continuous delivery (CD)—the most critical part of adopting DevOps. Build,
          test, and deploy code changes quickly, ensuring software is always ready for deployment.
        </DDSLeadspaceSearchBlockCopy>
      </DDSLeadSpaceBlockContent>
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
      <DDSLeadSpaceBlockHeading slot="heading">Find a product</DDSLeadSpaceBlockHeading>
      <DDSLeadSpaceBlockContent slot="content">
        <DDSLeadspaceSearchBlockHeading>Innovate like a startup, scale for the enterprise</DDSLeadspaceSearchBlockHeading>
        <DDSLeadspaceSearchBlockCopy>
          Automate your software release process with continuous delivery (CD)—the most critical part of adopting DevOps. Build,
          test, and deploy code changes quickly, ensuring software is always ready for deployment.
        </DDSLeadspaceSearchBlockCopy>
      </DDSLeadSpaceBlockContent>
      <DDSSearchWithTypeahead slot="search" leadspace-search></DDSSearchWithTypeahead>
      <DDSHorizontalRule slot="hr" style={{ display: currentTheme === secondTheme ? 'none' : '' }}></DDSHorizontalRule>
    </DDSLeadspaceWithSearch>
  );
};

export default {
  title: 'Components/Lead space search',
  parameters: {
    ...readme.parameters,
    useRawContainer: true,
    hasGrid: true,
    hasVerticalSpacingInComponent: true,
    knobs: {
      LeadspaceWithSearch: ({ groupId }) => ({
        theme: select(`Adjacent theme`, adjacentThemes, adjacentThemes.Monotheme, groupId),
      }),
    },
  },
  decorators: [
    story => {
      return (
        <>
          <div className="dds-ce-demo-devenv--simple-grid dds-ce-demo-devenv--simple-grid--content-layout">{story()}</div>
        </>
      );
    },
  ],
};
