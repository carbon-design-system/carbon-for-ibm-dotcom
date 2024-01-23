/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, number, select } from '@storybook/addon-knobs';
import React from 'react';
// Below path will be there when an application installs `@carbon/ibmdotcom-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import C4DCTASection from '@carbon/ibmdotcom-web-components/es/components-react/cta-section/cta-section';
import C4DCTABlock from '@carbon/ibmdotcom-web-components/es/components-react/cta-block/cta-block';
import C4DContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import C4DContentBlockCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-copy';
import C4DTextCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/text-cta';
/* eslint-disable max-len */
import C4DLightboxVideoPlayerContainer from '@carbon/ibmdotcom-web-components/es/components-react/lightbox-media-viewer/lightbox-video-player-container';
/* eslint-disable max-len */
import C4DContentSectionHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-section/content-section-heading';
import C4DCTABlockItemRow from '@carbon/ibmdotcom-web-components/es/components-react/cta-block/cta-block-item-row';
import C4DCTABlockItem from '@carbon/ibmdotcom-web-components/es/components-react/cta-block/cta-block-item';
import C4DContentItemHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-heading';
import C4DContentItemCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-copy';
import Desktop from '@carbon/pictograms-react/es/desktop/index.js';
import C4DVideoPlayerContainer from '@carbon/ibmdotcom-web-components/es/components-react/video-player/video-player-container';
import C4DLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list';
import C4DLinkListHeading from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-heading';
import C4DLinkListItem from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-item';
import { ArrowRight } from '@carbon/icons-react';

import readme from './README.stories.react.mdx';
import content from './content';

const iconProps = {
  size: 20,
  slot: 'icon',
};

const contentItemTypeMap = {
  text: ({ heading, copy, links }) => (
    <C4DCTABlockItem>
      <C4DContentItemHeading>{heading}</C4DContentItemHeading>
      <C4DContentItemCopy>{copy}</C4DContentItemCopy>
      {links.map((elem) => (
        <C4DTextCTA
          slot="footer"
          cta-type="local"
          icon-placement="right"
          href={elem.href}>
          {elem.copy}
        </C4DTextCTA>
      ))}
    </C4DCTABlockItem>
  ),
  statistics: ({ heading, copy, links }) => (
    <C4DCTABlockItem>
      <span slot="statistics">10%</span>
      <C4DContentItemHeading>{heading}</C4DContentItemHeading>
      <C4DContentItemCopy>{copy}</C4DContentItemCopy>
      {links.map((elem) => (
        <C4DTextCTA
          slot="footer"
          cta-type="local"
          icon-placement="right"
          href={elem.href}>
          {elem.copy}
        </C4DTextCTA>
      ))}
    </C4DCTABlockItem>
  ),
  pictogram: ({ heading, copy, links }) => (
    <C4DCTABlockItem>
      <C4DContentItemHeading>{heading}</C4DContentItemHeading>
      <C4DContentItemCopy>{copy}</C4DContentItemCopy>
      {links.map((elem) => (
        <C4DTextCTA
          slot="footer"
          cta-type="local"
          icon-placement="right"
          href={elem.href}>
          {elem.copy}
        </C4DTextCTA>
      ))}
      <Desktop slot="media" width="80" height="80" viewBox="0 0 32 32" />
    </C4DCTABlockItem>
  ),
  media: ({ heading, copy, links }) => (
    <C4DCTABlockItem>
      <C4DVideoPlayerContainer
        video-id="0_ibuqxqbe"
        aspect-ratio="4x3"
        slot="media"
        hide-caption
        playing-mode="lightbox"
      />
      <C4DContentItemHeading>{heading}</C4DContentItemHeading>
      <C4DContentItemCopy>{copy}</C4DContentItemCopy>
      {links.map((elem) => (
        <C4DTextCTA
          slot="footer"
          cta-type="local"
          icon-placement="right"
          href={elem.href}>
          {elem.copy}
        </C4DTextCTA>
      ))}
    </C4DCTABlockItem>
  ),
};

const renderItems = (item, count) => {
  if (count.length < 4) {
    return (
      <C4DCTABlockItemRow _noBorder>
        {count.map((_, index) => item({ ...content[index] }))}
      </C4DCTABlockItemRow>
    );
  }

  const itemArray = count;
  const spliced = itemArray.splice(3);

  return (
    <>
      <C4DCTABlockItemRow>
        {itemArray.map((_, index) => item({ ...content[index] }))}
      </C4DCTABlockItemRow>
      <C4DCTABlockItemRow _noBorder>
        {spliced.map((_, index) => item({ ...content[index] }))}
      </C4DCTABlockItemRow>
    </>
  );
};

const contentItemTypeOptions = {
  Text: 'text',
  Statistics: 'statistics',
  Pictogram: 'pictogram',
  Media: 'media',
};

export const Simple = (args) => {
  const { heading, copy, border } = args?.CTASection ?? {};

  return (
    <>
      <C4DCTASection>
        <C4DCTABlock _noBorder={!border}>
          <C4DContentBlockHeading>{heading}</C4DContentBlockHeading>
          <C4DContentBlockCopy>{copy}</C4DContentBlockCopy>
          <C4DTextCTA
            slot="action"
            cta-type="local"
            icon-placement="right"
            href="example.com">
            Browse tutorials
          </C4DTextCTA>
        </C4DCTABlock>
      </C4DCTASection>
      <C4DLightboxVideoPlayerContainer></C4DLightboxVideoPlayerContainer>
    </>
  );
};

Simple.story = {
  parameters: {
    knobs: {
      CTASection: () => ({
        heading: 'Optional title heading-05 color text-01',
        copy: 'Optional text heading-03 color text-01, Lorem ipsum dolor sit amet, consecteture adipiscing elit sed dose.',
        border: boolean('CTA Block border', false),
      }),
    },
  },
};

export const WithContentItems = (args) => {
  const { heading, copy, border } = args?.CTASection ?? {};
  const { contentItemType, contentItemCount } = args?.WithContentItems ?? {};

  return (
    <>
      <C4DCTASection>
        <C4DContentSectionHeading>
          Related products and services
        </C4DContentSectionHeading>
        <C4DCTABlock _noBorder={!border}>
          <C4DContentBlockHeading>
            {heading || undefined}
          </C4DContentBlockHeading>
          <C4DContentBlockCopy>{copy}</C4DContentBlockCopy>
          <C4DTextCTA
            slot="action"
            cta-type="local"
            icon-placement="right"
            href="example.com">
            Browse tutorials
          </C4DTextCTA>
          {renderItems(contentItemType, contentItemCount)}
        </C4DCTABlock>
      </C4DCTASection>
      <C4DLightboxVideoPlayerContainer></C4DLightboxVideoPlayerContainer>
    </>
  );
};

WithContentItems.story = {
  name: 'With content items',
  parameters: {
    knobs: {
      CTASection: () => ({
        heading: 'Optional title heading-05 color text-01',
        copy: 'Optional text heading-03 color text-01, Lorem ipsum dolor sit amet, consecteture adipiscing elit sed dose.',
        border: boolean('CTA Block border', false),
      }),
      WithContentItems: () => ({
        contentItemType:
          contentItemTypeMap[
            select(
              `Content item type`,
              contentItemTypeOptions,
              contentItemTypeOptions.Text
            ) ?? 0
          ],
        contentItemCount: Array.from({
          length: number('Number of content items', 3, { min: 2, max: 6 }),
        }),
      }),
    },
  },
};

export const WithLinkList = (args) => {
  const { heading, copy, border } = args?.CTASection ?? {};

  return (
    <C4DCTASection>
      <C4DContentSectionHeading>
        Related products and services
      </C4DContentSectionHeading>
      <C4DCTABlock _noBorder={!border}>
        <C4DContentBlockHeading>{heading}</C4DContentBlockHeading>
        <C4DContentBlockCopy>{copy}</C4DContentBlockCopy>
        <C4DTextCTA
          slot="action"
          cta-type="local"
          icon-placement="right"
          href="example.com">
          Browse tutorials
        </C4DTextCTA>
        <C4DLinkList slot="link-list" type="end">
          <C4DLinkListHeading>More ways to explore DevOps</C4DLinkListHeading>
          <C4DLinkListItem href="https://example.com">
            Events <ArrowRight {...iconProps} />
          </C4DLinkListItem>
          <C4DLinkListItem href="https://example.com">
            Blogs <ArrowRight {...iconProps} />
          </C4DLinkListItem>
          <C4DLinkListItem href="https://example.com">
            Training <ArrowRight {...iconProps} />
          </C4DLinkListItem>
          <C4DLinkListItem href="https://example.com">
            Developer resources <ArrowRight {...iconProps} />
          </C4DLinkListItem>
          <C4DLinkListItem href="https://example.com">
            Research <ArrowRight {...iconProps} />
          </C4DLinkListItem>
          <C4DLinkListItem href="https://example.com">
            News <ArrowRight {...iconProps} />
          </C4DLinkListItem>
        </C4DLinkList>
      </C4DCTABlock>
    </C4DCTASection>
  );
};

WithLinkList.story = {
  name: 'With link list',
  parameters: {
    knobs: {
      CTASection: () => ({
        heading: 'Optional title heading-05 color text-01',
        copy: 'Optional text heading-03 color text-01, Lorem ipsum dolor sit amet, consecteture adipiscing elit sed dose.',
        border: boolean('CTA Block border', false),
      }),
    },
  },
};

export default {
  title: 'Components/CTA section',
  decorators: [
    (story) => {
      return <>{story()}</>;
    },
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
  },
};
