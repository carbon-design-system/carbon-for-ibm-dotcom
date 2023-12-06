/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { text, boolean, select } from '@storybook/addon-knobs';
import React from 'react';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
import Download20 from '@carbon/icons-react/es/download/20.js';

// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import C4DLeadspaceBlock from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-block/leadspace-block';
// eslint-disable-next-line max-len
import C4DLeadspaceHeading from '@carbon/ibmdotcom-web-components/es/components-react/leadspace/leadspace-heading';
// eslint-disable-next-line max-len
import C4DLeadspaceBlockContent from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-block/leadspace-block-content';
import C4DContentBlockCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-copy';
import C4DLeadspaceBlockMedia from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-block/leadspace-block-media';
import C4DImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';
import C4DImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item';
import C4DLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list';
import C4DLinkListHeading from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-heading';
import C4DLinkListItem from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-item';
import C4DButton from '@carbon/ibmdotcom-web-components/es/components-react/button/button';
import C4DVideoPlayerContainer from '@carbon/ibmdotcom-web-components/es/components-react/video-player/video-player-container';

import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--004.jpg';
import imgSm16x9 from '../../../../../storybook-images/assets/320/fpo--16x9--320x180--004.jpg';
import imgMd16x9 from '../../../../../storybook-images/assets/480/fpo--16x9--480x270--004.jpg';

import readme from './README.stories.react.mdx';

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

const video = (
  <C4DVideoPlayerContainer video-id="0_ibuqxqbe"></C4DVideoPlayerContainer>
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
  <C4DButton cta-type="local" href="https://example.com">
    Contact sales
  </C4DButton>
);

export const Default = (args) => {
  const { title, copy, media, border, highlight } = args?.LeadSpaceBlock ?? {};
  return (
    <C4DLeadspaceBlock border={border || undefined}>
      <C4DLeadspaceHeading highlight={highlight} type-style="fluid-heading-05">{title}</C4DLeadspaceHeading>
      <C4DLeadspaceBlockContent>
        <C4DContentBlockCopy>{copy}</C4DContentBlockCopy>
        {media !== 'none' ?
        <C4DLeadspaceBlockMedia>
          {media === 'image' ? image : media === 'video' ? video : ''}
        </C4DLeadspaceBlockMedia>
        : ``}
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
          <div className="cds--grid">
            <div className="cds--row">
              <div className="cds--col-lg-8">{story()}</div>
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
        title: text('title (title)', 'Infuse your AIOps platform with intelligent IT operations'),
        highlight: text('Highlight:', 'intelligent IT operations'),
        copy: `Automate your software release process with continuous delivery (CD)—the most
            critical part of adopting DevOps. Build, test, and deploy code changes quickly,
            ensuring software is always ready for deployment.`,
        media: select('Media:', ['none', 'image', 'video'], 'image'),
        border: boolean('Border:', true)
      }),
    },
  },
};
