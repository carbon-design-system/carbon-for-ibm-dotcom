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
import C4DLeadspaceBlock from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-block/leadspace-block';
// eslint-disable-next-line max-len
import C4DLeadspaceBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-block/leadspace-block-heading';
// eslint-disable-next-line max-len
import C4DLeadspaceBlockContent from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-block/leadspace-block-content';
import C4DContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import C4DContentBlockCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-copy';
import C4DLeadspaceBlockMedia from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-block/leadspace-block-media';
import C4DLeadspaceBlockCTA from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-block/leadspace-block-cta';
import C4DImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';
import C4DImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item';
import C4DLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list';
import C4DLinkListHeading from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-heading';
import C4DLinkListItem from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-item';
import C4DButtonGroupItem from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group-item';
import C4DVideoPlayerContainer from '@carbon/ibmdotcom-web-components/es/components-react/video-player/video-player-container';

import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--004.jpg';
import imgSm16x9 from '../../../../../storybook-images/assets/320/fpo--16x9--320x180--004.jpg';
import imgMd16x9 from '../../../../../storybook-images/assets/480/fpo--16x9--480x270--004.jpg';

import readme from './README.stories.react.mdx';
import styles from './leadspace-block.stories.scss';

const image = (
  <C4DImage
    alt="Image alt text"
    default-src={imgLg16x9}
    heading="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
    <C4DImageItem media="(min-width: 672px)" srcset={imgLg16x9} />
    <C4DImageItem media="(min-width: 400px)" srcset={imgMd16x9} />
    <C4DImageItem media="(min-width: 320px)" srcset={imgSm16x9} />
  </C4DImage>
);

const linkList = (
  <C4DLinkList type="end">
    <C4DLinkListHeading>Featured products</C4DLinkListHeading>
    <C4DLinkListItem href="https://example.com">
      IBM Cloud Continuous Delivery <ArrowRight20 slot="icon" />
    </C4DLinkListItem>
    <C4DLinkListItem href="https://example.com">
      UrbanCode <ArrowRight20 slot="icon" />
    </C4DLinkListItem>
    <C4DLinkListItem href="https://example.com">
      View all products <Download20 slot="icon" />
    </C4DLinkListItem>
  </C4DLinkList>
);

const buttonCTA = (
  <C4DLeadspaceBlockCTA>
    <C4DButtonGroupItem href="www.ibm.com">
      Contact sales <ArrowRight20 slot="icon" />
    </C4DButtonGroupItem>
  </C4DLeadspaceBlockCTA>
);

export const Default = (args) => {
  const { title, heading, copy } = args?.LeadSpaceBlock ?? {};
  return (
    <C4DLeadspaceBlock>
      <C4DLeadspaceBlockHeading>{title}</C4DLeadspaceBlockHeading>
      <C4DLeadspaceBlockContent>
        <C4DContentBlockHeading>{heading}</C4DContentBlockHeading>
        <C4DContentBlockCopy>{copy}</C4DContentBlockCopy>
        <C4DLeadspaceBlockMedia slot="media">{image}</C4DLeadspaceBlockMedia>
        {linkList} {buttonCTA}
      </C4DLeadspaceBlockContent>
    </C4DLeadspaceBlock>
  );
};

export const withVideo = (args) => {
  const { title, heading, copy } = args?.LeadSpaceBlock ?? {};
  return (
    <C4DLeadspaceBlock>
      <C4DLeadspaceBlockHeading>{title}</C4DLeadspaceBlockHeading>
      <C4DLeadspaceBlockContent>
        <C4DContentBlockHeading>{heading}</C4DContentBlockHeading>
        <C4DContentBlockCopy>{copy}</C4DContentBlockCopy>
        <C4DLeadspaceBlockMedia slot="media">
          <C4DVideoPlayerContainer video-id="1_9h94wo6b"></C4DVideoPlayerContainer>
        </C4DLeadspaceBlockMedia>
        {linkList} {buttonCTA}
      </C4DLeadspaceBlockContent>
    </C4DLeadspaceBlock>
  );
};

export default {
  title: 'Components/Lead space block',
  decorators: [
    (story) => {
      return (
        <>
          <style type="text/css">{styles.cssText}</style>
          <div className="cds--grid">
            <div className="cds--row">
              <div className="cds--col-lg-9 cds--no-gutter">{story()}</div>
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
        heading: text(
          'heading (required):',
          'Innovate like a startup and scale for the enterprise '
        ),
        copy: `Automate your software release process with continuous delivery (CD)—the most
            critical part of adopting DevOps. Build, test, and deploy code changes quickly,
            ensuring software is always ready for deployment.`,
      }),
    },
  },
};
