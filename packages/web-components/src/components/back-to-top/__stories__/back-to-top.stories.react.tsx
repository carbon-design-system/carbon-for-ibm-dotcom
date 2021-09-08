/**
 * @license
 *
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import classnames from 'classnames';
import ArrowDown20 from '@carbon/icons-react/es/arrow--down/20.js';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
import DDSBackToTop from '@carbon/ibmdotcom-web-components/es/components-react/back-to-top/back-to-top';
import DDSLeadspace from '@carbon/ibmdotcom-web-components/es/components-react/leadspace/leadspace';
import DDSLeadspaceHeading from '@carbon/ibmdotcom-web-components/es/components-react/leadspace/leadspace-heading';
import DDSButtonGroup from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group';
import DDSButtonGroupItem from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group-item';
import DDSCTASection from '@carbon/ibmdotcom-web-components/es/components-react/cta-section/cta-section';
import DDSCTABlock from '@carbon/ibmdotcom-web-components/es/components-react/cta-block/cta-block';
import DDSContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import DDSContentBlockCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-copy';
import DDSLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list';
import DDSLinkListHeading from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-heading';
import DDSLinkListItem from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-item';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
import React from 'react';
import readme from './README.stories.react.mdx';

export const Default = () => {
  return (
    <>
      <DDSLeadspace type="centered">
        <DDSLeadspaceHeading>Back to Top component demo</DDSLeadspaceHeading>
        The Back to Top component is designed to appear after the user scrolls the distance equals to current screen height.
        <DDSButtonGroup slot="action">
          <DDSButtonGroupItem aria-label="Scroll down" href="#">
            Scroll down
            <ArrowDown20 slot="icon" />
          </DDSButtonGroupItem>
        </DDSButtonGroup>
      </DDSLeadspace>
      <DDSCTASection>
        <DDSCTABlock _noBorder={true}>
          <DDSContentBlockHeading>Welcome to the end of page</DDSContentBlockHeading>
          <DDSContentBlockCopy>
            To go back to the top of the page with one click, find the Back to top button at the lower right of this page.
          </DDSContentBlockCopy>
          <DDSButtonGroup slot="action">
            <DDSButtonGroupItem href="#">
              Try it on premises
              <ArrowRight20 slot="icon" />
            </DDSButtonGroupItem>
            <DDSButtonGroupItem href="#">
              Try it on cloud
              <ArrowRight20 slot="icon" />
            </DDSButtonGroupItem>
          </DDSButtonGroup>
          <DDSLinkList slot="link-list" type="end">
            <DDSLinkListHeading>More ways to explore Linux servers</DDSLinkListHeading>
            <DDSLinkListItem href="https://example.com">
              Products <ArrowRight20 slot="icon" />
            </DDSLinkListItem>
            <DDSLinkListItem href="https://example.com">
              Key concepts <ArrowRight20 slot="icon" />
            </DDSLinkListItem>
            <DDSLinkListItem href="https://example.com">
              Analyst insights <ArrowRight20 slot="icon" />
            </DDSLinkListItem>
            <DDSLinkListItem href="https://example.com">
              Blogs <ArrowRight20 slot="icon" />
            </DDSLinkListItem>
            <DDSLinkListItem href="https://example.com">
              Client stories <ArrowRight20 slot="icon" />
            </DDSLinkListItem>
            <DDSLinkListItem href="https://example.com">
              Events <ArrowRight20 slot="icon" />
            </DDSLinkListItem>
            <DDSLinkListItem href="https://example.com">
              Latest Research <ArrowRight20 slot="icon" />
            </DDSLinkListItem>
            <DDSLinkListItem href="https://example.com">
              Training <ArrowRight20 slot="icon" />
            </DDSLinkListItem>
            <DDSLinkListItem href="https://example.com">
              Partners <ArrowRight20 slot="icon" />
            </DDSLinkListItem>
          </DDSLinkList>
        </DDSCTABlock>
      </DDSCTASection>
      <DDSBackToTop />
    </>
  );
};

Default.story = {};

export default {
  title: 'Components/Back to top',
  decorators: [
    story => {
      const classes = classnames('bx--content dds-ce-demo-devenv--ui-shell-content');
      return (
        <>
          <div className={classes}>{story()}</div>
        </>
      );
    },
  ],
  parameters: {
    ...readme.parameters,
    hasGrid: true,
  },
};
