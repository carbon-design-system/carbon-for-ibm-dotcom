/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { text } from '@storybook/addon-knobs';
import React from 'react';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
import Download20 from '@carbon/icons-react/es/download/20.js';

// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import DDSLeadspaceBlock from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-block/leadspace-block';
// eslint-disable-next-line max-len
import DDSLeadspaceBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-block/leadspace-block-heading';
// eslint-disable-next-line max-len
import DDSLeadspaceBlockContent from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-block/leadspace-block-content';
import DDSContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import DDSContentBlockCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-copy';
import DDSLeadspaceBlockMedia from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-block/leadspace-block-media';
import DDSLeadspaceBlockCTA from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-block/leadspace-block-cta';
import DDSImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';
import DDSImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item';
import DDSLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list';
import DDSLinkListHeading from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-heading';
import DDSLinkListItem from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-item';
import DDSButtonGroupItem from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group-item';
import DDSVideoPlayerContainer from '@carbon/ibmdotcom-web-components/es/components-react/video-player/video-player-container';

import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--004.jpg';
import imgSm16x9 from '../../../../../storybook-images/assets/320/fpo--16x9--320x180--004.jpg';
import imgMd16x9 from '../../../../../storybook-images/assets/480/fpo--16x9--480x270--004.jpg';

import readme from './README.stories.react.mdx';
import styles from './leadspace-block.stories.scss';

const image = (
  <DDSImage alt="Image alt text" default-src={imgLg16x9} heading="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
    <DDSImageItem media="(min-width: 672px)" srcset={imgLg16x9} />
    <DDSImageItem media="(min-width: 400px)" srcset={imgMd16x9} />
    <DDSImageItem media="(min-width: 320px)" srcset={imgSm16x9} />
  </DDSImage>
);

const linkList = (
  <DDSLinkList type="end">
    <DDSLinkListHeading>Featured products</DDSLinkListHeading>
    <DDSLinkListItem href="https://example.com">
      IBM Cloud Continuous Delivery <ArrowRight20 slot="icon" />
    </DDSLinkListItem>
    <DDSLinkListItem href="https://example.com">
      UrbanCode <ArrowRight20 slot="icon" />
    </DDSLinkListItem>
    <DDSLinkListItem href="https://example.com">
      View all products <Download20 slot="icon" />
    </DDSLinkListItem>
  </DDSLinkList>
);

const buttonCTA = (
  <DDSLeadspaceBlockCTA>
    <DDSButtonGroupItem href="www.ibm.com">
      Contact sales <ArrowRight20 slot="icon" />
    </DDSButtonGroupItem>
  </DDSLeadspaceBlockCTA>
);

export const Default = args => {
  const { title, heading, copy } = args?.LeadSpaceBlock ?? {};
  return (
    <DDSLeadspaceBlock>
      <DDSLeadspaceBlockHeading>{title}</DDSLeadspaceBlockHeading>
      <DDSLeadspaceBlockContent>
        <DDSContentBlockHeading>{heading}</DDSContentBlockHeading>
        <DDSContentBlockCopy>{copy}</DDSContentBlockCopy>
        <DDSLeadspaceBlockMedia slot="media">{image}</DDSLeadspaceBlockMedia>
        {linkList} {buttonCTA}
      </DDSLeadspaceBlockContent>
    </DDSLeadspaceBlock>
  );
};

export const withVideo = args => {
  const { title, heading, copy } = args?.LeadSpaceBlock ?? {};
  return (
    <DDSLeadspaceBlock>
      <DDSLeadspaceBlockHeading>{title}</DDSLeadspaceBlockHeading>
      <DDSLeadspaceBlockContent>
        <DDSContentBlockHeading>{heading}</DDSContentBlockHeading>
        <DDSContentBlockCopy>{copy}</DDSContentBlockCopy>
        <DDSLeadspaceBlockMedia slot="media">
          <DDSVideoPlayerContainer video-id="1_9h94wo6b"></DDSVideoPlayerContainer>
        </DDSLeadspaceBlockMedia>
        {linkList} {buttonCTA}
      </DDSLeadspaceBlockContent>
    </DDSLeadspaceBlock>
  );
};

export default {
  title: 'Components/Lead space block',
  decorators: [
    story => {
      return (
        <>
          <style type="text/css">{styles.cssText}</style>
          <div className="bx--grid">
            <div className="bx--row">
              <div className="bx--col-lg-9 bx--no-gutter">{story()}</div>
            </div>
          </div>
        </>
      );
    },
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      LeadSpaceBlock: () => ({
        title: text('title (title)', 'Continuous delivery'),
        heading: text('heading (required):', 'Innovate like a startup and scale for the enterprise '),
        copy: `Automate your software release process with continuous delivery (CD)—the most
            critical part of adopting DevOps. Build, test, and deploy code changes quickly,
            ensuring software is always ready for deployment.`,
      }),
    },
  },
};
