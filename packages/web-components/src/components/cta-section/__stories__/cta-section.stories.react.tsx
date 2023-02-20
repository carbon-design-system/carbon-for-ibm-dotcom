/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, number, select } from '@storybook/addon-knobs';
import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import DDSCTASection from '@carbon/ibmdotcom-web-components/es/components-react/cta-section/cta-section';
import DDSCTABlock from '@carbon/ibmdotcom-web-components/es/components-react/cta-block/cta-block';
import DDSContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import DDSContentBlockCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-copy';
import DDSTextCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/text-cta';
/* eslint-disable max-len */
import DDSLightboxVideoPlayerContainer from '@carbon/ibmdotcom-web-components/es/components-react/lightbox-media-viewer/lightbox-video-player-container';
/* eslint-disable max-len */
import DDSContentSectionHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-section/content-section-heading';
import DDSCTABlockItemRow from '@carbon/ibmdotcom-web-components/es/components-react/cta-block/cta-block-item-row';
import DDSCTABlockItem from '@carbon/ibmdotcom-web-components/es/components-react/cta-block/cta-block-item';
import DDSContentItemHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-heading';
import DDSContentItemCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-copy';
import Desktop from '@carbon/pictograms-react/es/desktop/index.js';
import DDSVideoPlayerContainer from '@carbon/ibmdotcom-web-components/es/components-react/video-player/video-player-container';
import DDSLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list';
import DDSLinkListHeading from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-heading';
import DDSLinkListItem from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-item';
import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';

import readme from './README.stories.react.mdx';
import content from './content';

const contentItemTypeMap = {
  text: ({ heading, copy, links }) => (
    <DDSCTABlockItem>
      <DDSContentItemHeading>{heading}</DDSContentItemHeading>
      <DDSContentItemCopy>{copy}</DDSContentItemCopy>
      {links.map(elem => (
        <DDSTextCTA slot="footer" cta-type="local" icon-placement="right" href={elem.href}>
          {elem.copy}
        </DDSTextCTA>
      ))}
    </DDSCTABlockItem>
  ),
  statistics: ({ heading, copy, links }) => (
    <DDSCTABlockItem>
      <span slot="statistics">10%</span>
      <DDSContentItemHeading>{heading}</DDSContentItemHeading>
      <DDSContentItemCopy>{copy}</DDSContentItemCopy>
      {links.map(elem => (
        <DDSTextCTA slot="footer" cta-type="local" icon-placement="right" href={elem.href}>
          {elem.copy}
        </DDSTextCTA>
      ))}
    </DDSCTABlockItem>
  ),
  pictogram: ({ heading, copy, links }) => (
    <DDSCTABlockItem>
      <DDSContentItemHeading>{heading}</DDSContentItemHeading>
      <DDSContentItemCopy>{copy}</DDSContentItemCopy>
      {links.map(elem => (
        <DDSTextCTA slot="footer" cta-type="local" icon-placement="right" href={elem.href}>
          {elem.copy}
        </DDSTextCTA>
      ))}
      <Desktop slot="media" width="80" height="80" viewBox="0 0 32 32" />
    </DDSCTABlockItem>
  ),
  media: ({ heading, copy, links }) => (
    <DDSCTABlockItem>
      <DDSVideoPlayerContainer video-id="1_9h94wo6b" aspect-ratio="4x3" slot="media" hide-caption playing-mode="lightbox" />
      <DDSContentItemHeading>{heading}</DDSContentItemHeading>
      <DDSContentItemCopy>{copy}</DDSContentItemCopy>
      {links.map(elem => (
        <DDSTextCTA slot="footer" cta-type="local" icon-placement="right" href={elem.href}>
          {elem.copy}
        </DDSTextCTA>
      ))}
    </DDSCTABlockItem>
  ),
};

const renderItems = (item, count) => {
  if (count.length < 4) {
    return <DDSCTABlockItemRow _noBorder>{count.map((_, index) => item({ ...content[index] }))}</DDSCTABlockItemRow>;
  }

  const itemArray = count;
  const spliced = itemArray.splice(3);

  return (
    <>
      <DDSCTABlockItemRow>{itemArray.map((_, index) => item({ ...content[index] }))}</DDSCTABlockItemRow>
      <DDSCTABlockItemRow _noBorder>{spliced.map((_, index) => item({ ...content[index] }))}</DDSCTABlockItemRow>
    </>
  );
};

const contentItemTypeOptions = {
  Text: 'text',
  Statistics: 'statistics',
  Pictogram: 'pictogram',
  Media: 'media',
};

export const Simple = ({ parameters }) => {
  const { heading, copy, border } = parameters?.props?.CTASection ?? {};

  return (
    <>
      <DDSCTASection>
        <DDSCTABlock _noBorder={!border}>
          <DDSContentBlockHeading>{heading}</DDSContentBlockHeading>
          <DDSContentBlockCopy>{copy}</DDSContentBlockCopy>
          <DDSTextCTA slot="action" cta-type="local" icon-placement="right" href="example.com">
            Browse tutorials
          </DDSTextCTA>
        </DDSCTABlock>
      </DDSCTASection>
      <DDSLightboxVideoPlayerContainer></DDSLightboxVideoPlayerContainer>
    </>
  );
};

Simple.story = {
  parameters: {
    knobs: {
      CTASection: ({ groupId }) => ({
        heading: 'Optional title heading-05 color text-01',
        copy: 'Optional text heading-03 color text-01, Lorem ipsum dolor sit amet, consecteture adipiscing elit sed dose.',
        border: boolean('CTA Block border', false, groupId),
      }),
    },
  },
};

export const WithContentItems = ({ parameters }) => {
  const { heading, copy, border } = parameters?.props?.CTASection ?? {};
  const { contentItemType, contentItemCount } = parameters?.props?.WithContentItems ?? {};

  return (
    <>
      <DDSCTASection>
        <DDSContentSectionHeading>Related products and services</DDSContentSectionHeading>
        <DDSCTABlock _noBorder={!border}>
          <DDSContentBlockHeading>{heading || undefined}</DDSContentBlockHeading>
          <DDSContentBlockCopy>{copy}</DDSContentBlockCopy>
          <DDSTextCTA slot="action" cta-type="local" icon-placement="right" href="example.com">
            Browse tutorials
          </DDSTextCTA>
          {renderItems(contentItemType, contentItemCount)}
        </DDSCTABlock>
      </DDSCTASection>
      <DDSLightboxVideoPlayerContainer></DDSLightboxVideoPlayerContainer>
    </>
  );
};

WithContentItems.story = {
  name: 'With content items',
  parameters: {
    knobs: {
      CTASection: ({ groupId }) => ({
        heading: 'Optional title heading-05 color text-01',
        copy: 'Optional text heading-03 color text-01, Lorem ipsum dolor sit amet, consecteture adipiscing elit sed dose.',
        border: boolean('CTA Block border', false, groupId),
      }),
      WithContentItems: ({ groupId }) => ({
        contentItemType:
          contentItemTypeMap[select(`Content item type`, contentItemTypeOptions, contentItemTypeOptions.Text, groupId) ?? 0],
        contentItemCount: Array.from({
          length: number('Number of content items', 3, { min: 2, max: 6 }, groupId),
        }),
      }),
    },
  },
};

export const WithLinkList = ({ parameters }) => {
  const { heading, copy, border } = parameters?.props?.CTASection ?? {};

  return (
    <DDSCTASection>
      <DDSContentSectionHeading>Related products and services</DDSContentSectionHeading>
      <DDSCTABlock _noBorder={!border}>
        <DDSContentBlockHeading>{heading}</DDSContentBlockHeading>
        <DDSContentBlockCopy>{copy}</DDSContentBlockCopy>
        <DDSTextCTA slot="action" cta-type="local" icon-placement="right" href="example.com">
          Browse tutorials
        </DDSTextCTA>
        <DDSLinkList slot="link-list" type="end">
          <DDSLinkListHeading>More ways to explore DevOps</DDSLinkListHeading>
          <DDSLinkListItem href="https://example.com">
            Events <ArrowRight20 slot="icon" />
          </DDSLinkListItem>
          <DDSLinkListItem href="https://example.com">
            Blogs <ArrowRight20 slot="icon" />
          </DDSLinkListItem>
          <DDSLinkListItem href="https://example.com">
            Training <ArrowRight20 slot="icon" />
          </DDSLinkListItem>
          <DDSLinkListItem href="https://example.com">
            Developer resources <ArrowRight20 slot="icon" />
          </DDSLinkListItem>
          <DDSLinkListItem href="https://example.com">
            Research <ArrowRight20 slot="icon" />
          </DDSLinkListItem>
          <DDSLinkListItem href="https://example.com">
            News <ArrowRight20 slot="icon" />
          </DDSLinkListItem>
        </DDSLinkList>
      </DDSCTABlock>
    </DDSCTASection>
  );
};

WithLinkList.story = {
  name: 'With link list',
  parameters: {
    knobs: {
      CTASection: ({ groupId }) => ({
        heading: 'Optional title heading-05 color text-01',
        copy: 'Optional text heading-03 color text-01, Lorem ipsum dolor sit amet, consecteture adipiscing elit sed dose.',
        border: boolean('CTA Block border', false, groupId),
      }),
    },
  },
};

export default {
  title: 'Components/CTA section',
  decorators: [
    story => {
      return <>{story()}</>;
    },
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
  },
};
