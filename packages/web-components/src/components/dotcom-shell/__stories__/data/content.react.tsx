/* eslint-disable max-len */
/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import C4DImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';
import C4DImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item';
import C4DContentBlockSegmented from '@carbon/ibmdotcom-web-components/es/components-react/content-block-segmented/content-block-segmented';
import C4DContentBlockSegmentedItem from '@carbon/ibmdotcom-web-components/es/components-react/content-block-segmented/content-block-segmented-item';
import C4DContentGroupHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-heading';
import C4DContentItemCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-copy';
import C4DTextCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/text-cta';
import C4DContentItemRow from '@carbon/ibmdotcom-web-components/es/components-react/content-item-row/content-item-row';
import C4DContentItemRowEyebrow from '@carbon/ibmdotcom-web-components/es/components-react/content-item-row/content-item-row-eyebrow';
import C4DContentItemHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-heading';
import C4DContentItemRowCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item-row/content-item-row-copy';
import C4DLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list';
import C4DLinkListItemCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/link-list-item-cta';
import C4DGlobalBanner from '@carbon/ibmdotcom-web-components/es/components-react/global-banner/global-banner';
import C4DGlobalBannerImage from '@carbon/ibmdotcom-web-components/es/components-react/global-banner/global-banner-image';
import C4DGlobalBannerHeading from '@carbon/ibmdotcom-web-components/es/components-react/global-banner/global-banner-heading';
import C4DGlobalBannerCopy from '@carbon/ibmdotcom-web-components/es/components-react/global-banner/global-banner-copy';
import C4DButton from '@carbon/ibmdotcom-web-components/es/components-react/button/button';
import C4DCardGroupItem from '@carbon/ibmdotcom-web-components/es/components-react/card-group/card-group-item';
import C4DCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import C4DCardEyebrow from '@carbon/ibmdotcom-web-components/es/components-react/card/card-eyebrow';
import C4DCardCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-footer';
import C4DLeadspace from '@carbon/ibmdotcom-web-components/es/components-react/leadspace/leadspace';
import C4DLeadspaceHeading from '@carbon/ibmdotcom-web-components/es/components-react/leadspace/leadspace-heading';
import C4DButtonGroup from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group';
import C4DButtonGroupItem from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group-item';
import C4DLeadspaceWithSearch from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-with-search/leadspace-with-search';
import C4DLeadspaceWithSearchCopy from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-with-search/leadspace-with-search-copy';
import C4DSearchWithTypeahead from '@carbon/ibmdotcom-web-components/es/components-react/search-with-typeahead/search-with-typeahead';
import C4DLeadspaceBlock from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-block/leadspace-block';
import C4DLeadspaceBlockContent from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-block/leadspace-block-content';
import C4DContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import C4DContentBlockCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-copy';
import C4DLeadspaceBlockMedia from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-block/leadspace-block-media';
import C4DVideoPlayerContainer from '@carbon/ibmdotcom-web-components/es/components-react/video-player/video-player-container';
import C4DLinkListHeading from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-heading';
import C4DLinkListItem from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-item';
import C4DFeatureCard from '@carbon/ibmdotcom-web-components/es/components-react/feature-card/feature-card';
import C4DFeatureCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/feature-card/feature-card-footer';
import C4DCardCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta';
import C4DCalloutWithMedia from '@carbon/ibmdotcom-web-components/es/components-react/callout-with-media/callout-with-media';
import C4DCalloutWithMediaCopy from '@carbon/ibmdotcom-web-components/es/components-react/callout-with-media/callout-with-media-copy';
import C4DCalloutWithMediaVideo from '@carbon/ibmdotcom-web-components/es/components-react/callout-with-media/callout-with-media-video';
import C4DContentBlockHorizontal from '@carbon/ibmdotcom-web-components/es/components-react/content-block-horizontal/content-block-horizontal';
import C4DLogoGrid from '@carbon/ibmdotcom-web-components/es/components-react/logo-grid/logo-grid';
import C4DLogoGridItem from '@carbon/ibmdotcom-web-components/es/components-react/logo-grid/logo-grid-item';
import C4DContentBlockCards from '@carbon/ibmdotcom-web-components/es/components-react/content-block-cards/content-block-cards';
import C4DCardGroup from '@carbon/ibmdotcom-web-components/es/components-react/card-group/card-group';
import C4DCalloutQuote from '@carbon/ibmdotcom-web-components/es/components-react/callout-quote/callout-quote';
import C4DQuoteSourceHeading from '@carbon/ibmdotcom-web-components/es/components-react/quote/quote-source-heading';
import C4DQuoteSourceCopy from '@carbon/ibmdotcom-web-components/es/components-react/quote/quote-source-copy';
import C4DQuoteSourceBottomCopy from '@carbon/ibmdotcom-web-components/es/components-react/quote/quote-source-bottom-copy';
import C4DCalloutLinkWithIcon from '@carbon/ibmdotcom-web-components/es/components-react/callout-quote/callout-link-with-icon';
import C4DCTABlock from '@carbon/ibmdotcom-web-components/es/components-react/cta-block/cta-block';
import C4DCTABlockItemRow from '@carbon/ibmdotcom-web-components/es/components-react/cta-block/cta-block-item-row';
import C4DCTABlockItem from '@carbon/ibmdotcom-web-components/es/components-react/cta-block/cta-block-item';
import C4DTableOfContents from '@carbon/ibmdotcom-web-components/es/components-react/table-of-contents/table-of-contents';

import { ArrowRight } from '@carbon/icons-react';
import logosGroup from '../../../logo-grid/__stories__/data/logos.js';
import { TOC_TYPES } from '../../../table-of-contents/defs';

import imgSm16x9 from '../../../../../.storybook/storybook-images/assets/320/fpo--16x9--320x180--002.jpg';
import imgMd16x9 from '../../../../../.storybook/storybook-images/assets/480/fpo--16x9--480x270--002.jpg';
import imgLg16x9 from '../../../../../.storybook/storybook-images/assets/720/fpo--16x9--720x405--002.jpg';
import imgLg1x1 from '../../../../../.storybook/storybook-images/assets/720/fpo--1x1--720x720--005.jpg';
import imgXlg4x3 from '../../../../../.storybook/storybook-images/assets/1312/fpo--4x3--1312x984--003.jpg';

import leadspaceImg from '../../../../../.storybook/storybook-images/assets/leadspace/fpo--leadspace--1584x560--002.jpg';

export const image = (
  <C4DImage
    alt="Image alt text"
    default-src={imgLg16x9}
    heading="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
    <C4DImageItem media="min-width: 672px" srcset={imgLg16x9}></C4DImageItem>
    <C4DImageItem media="min-width: 400px" srcset={imgMd16x9}></C4DImageItem>
    <C4DImageItem media="min-width: 320px" srcset={imgSm16x9}></C4DImageItem>
  </C4DImage>
);

export const contentBlockSegmentedItems = (
  <>
    <C4DContentBlockSegmentedItem>
      <C4DContentGroupHeading>
        A scelerisque purus semper eget duis at tellus.{' '}
      </C4DContentGroupHeading>
      <C4DContentItemCopy>
        Elementum nibh tellus molestie nunc non. Habitant morbi tristique
        senectus et netus et malesuada fames.
      </C4DContentItemCopy>
      <C4DTextCTA
        slot="footer"
        cta-type="local"
        icon-placement="right"
        href="https://example.com">
        Lorem Ipsum dolor sit
      </C4DTextCTA>
    </C4DContentBlockSegmentedItem>

    <C4DContentBlockSegmentedItem>
      <C4DContentGroupHeading>
        A scelerisque purus semper eget duis at tellus.{' '}
      </C4DContentGroupHeading>
      <C4DContentItemCopy>
        Elementum nibh tellus molestie nunc non. Habitant morbi tristique
        senectus et netus et malesuada fames.
      </C4DContentItemCopy>
    </C4DContentBlockSegmentedItem>
  </>
);

export const contentBlockSegmentedItemsWithImage = (
  <C4DContentBlockSegmentedItem>
    <C4DContentGroupHeading>
      A scelerisque purus semper eget duis at tellus.{' '}
    </C4DContentGroupHeading>
    <C4DContentItemCopy>
      Elementum nibh tellus molestie nunc non. Habitant morbi tristique senectus
      et netus et malesuada fames.
    </C4DContentItemCopy>
    {image}
    <C4DTextCTA
      slot="footer"
      cta-type="local"
      icon-placement="right"
      href="https://example.com">
      Lorem Ipsum dolor sit
    </C4DTextCTA>
  </C4DContentBlockSegmentedItem>
);

export const contentItemHorizontal = (
  <C4DContentItemRow>
    <C4DContentItemRowEyebrow>Lorem ipsum</C4DContentItemRowEyebrow>
    <C4DContentItemHeading>Aliquam condimentum</C4DContentItemHeading>
    <C4DContentItemRowCopy>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et
      ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit
      sollicitudin.
    </C4DContentItemRowCopy>
    <C4DLinkList slot="footer" type="vertical">
      <C4DLinkListItemCTA
        icon-placement="right"
        href="https://www.ibm.com"
        cta-type="local">
        Link text
      </C4DLinkListItemCTA>
      <C4DLinkListItemCTA
        icon-placement="right"
        href="https://www.ibm.com"
        cta-type="external">
        External link text
      </C4DLinkListItemCTA>
    </C4DLinkList>
  </C4DContentItemRow>
);

export const globalBanner = (srcImage) => (
  <C4DGlobalBanner image-width="4-col">
    <C4DGlobalBannerImage
      slot="image"
      default-src={srcImage}></C4DGlobalBannerImage>
    <C4DGlobalBannerHeading slot="heading">heading</C4DGlobalBannerHeading>
    <C4DGlobalBannerCopy slot="copy">copy</C4DGlobalBannerCopy>
    <C4DButton
      slot="cta"
      cta-type="local"
      kind="tertiary"
      href="https://www.example.com">
      cta copy
    </C4DButton>
  </C4DGlobalBanner>
);

export const cardGroupItems = (
  <C4DCardGroupItem href="https://example.com">
    <C4DImage
      slot="image"
      alt="Image alt text"
      default-src={imgXlg4x3}></C4DImage>
    <C4DCardEyebrow>Topic</C4DCardEyebrow>
    <C4DCardHeading>Natural Language Processing.</C4DCardHeading>
    <C4DCardCTAFooter></C4DCardCTAFooter>
  </C4DCardGroupItem>
);

export const contentLeadspace = (
  <C4DLeadspace
    size="medium"
    gradient-style-scheme="true"
    alt=""
    default-src={leadspaceImg}>
    <C4DLeadspaceHeading>Leadspace Title</C4DLeadspaceHeading>
    Use this area for a short line of copy to support the title
    <C4DButtonGroup slot="action">
      <C4DButtonGroupItem aria-label="" href="">
        test
      </C4DButtonGroupItem>
    </C4DButtonGroup>
    <C4DImage slot="image" class="cds--image" alt="" default-src={leadspaceImg}>
      <C4DImageItem
        media="(min-width: 672px)"
        srcset={leadspaceImg}></C4DImageItem>
      <C4DImageItem media="(min-width: 0)" srcset={leadspaceImg}></C4DImageItem>
    </C4DImage>
  </C4DLeadspace>
);

export const contentLeadspaceSearch = (
  <C4DLeadspaceWithSearch adjacent-theme="white-and-g10" scroll-behavior>
    <C4DLeadspaceHeading>
      Find a product - Innovate like a startup, scale for the enterprise
    </C4DLeadspaceHeading>
    <C4DLeadspaceWithSearchCopy>
      Automate your software release process with continuous delivery (CD)—the
      most critical part of adopting DevOps. Build, test, and deploy code
      changes quickly, ensuring software is always ready for deployment.
    </C4DLeadspaceWithSearchCopy>
    <C4DSearchWithTypeahead
      slot="search"
      leadspace-search
      active
      should-remain-open></C4DSearchWithTypeahead>
  </C4DLeadspaceWithSearch>
);

export const tocContent = (
  <>
    <C4DLeadspaceBlock name="1" data-title="Lorem ipsum dolor sit amet">
      <C4DLeadspaceHeading>Lorem ipsum dolor sit amet</C4DLeadspaceHeading>
      <C4DLeadspaceBlockContent>
        <C4DContentBlockCopy slot="copy">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat.
        </C4DContentBlockCopy>
        <C4DLeadspaceBlockMedia>
          <C4DVideoPlayerContainer video-id="0_ibuqxqbe"></C4DVideoPlayerContainer>
        </C4DLeadspaceBlockMedia>
        <C4DLinkList type="end">
          <C4DLinkListHeading>Featured products</C4DLinkListHeading>
          <C4DLinkListItem href="https://example.com">
            IBM Cloud Continuous Delivery <ArrowRight size="20" slot="icon" />
          </C4DLinkListItem>
          <C4DLinkListItem href="https://example.com">
            UrbanCode <ArrowRight size="20" slot="icon" />
          </C4DLinkListItem>
          <C4DLinkListItem href="https://example.com">
            View all products <ArrowRight size="20" slot="icon" />
          </C4DLinkListItem>
        </C4DLinkList>
        <C4DButton href="https://example.com" cta-type="local">
          Contact sales
        </C4DButton>
      </C4DLeadspaceBlockContent>
    </C4DLeadspaceBlock>

    <C4DContentBlockSegmented
      name="2"
      data-title="Pharetra pharetra massa massa ultricies mi quis.">
      <C4DContentBlockHeading>
        Pharetra pharetra massa massa ultricies mi quis.
      </C4DContentBlockHeading>
      {Array.from([1, 2]).map(() => contentBlockSegmentedItems)}
    </C4DContentBlockSegmented>
    <C4DFeatureCard size="large" href="https://example.com">
      <C4DImage slot="image" alt="Image alt text" default-src={imgLg1x1}>
        <C4DImageItem
          media="(min-width: 991px)"
          srcset={imgLg1x1}></C4DImageItem>
      </C4DImage>
      <C4DCardEyebrow>scelerisque purus</C4DCardEyebrow>
      <C4DCardHeading>Elementum nibh tellus molestie nunc?</C4DCardHeading>
      <p>
        Habitant morbi tristique senectus et netus et malesuada fames. Habitant
        morbu tristique.
      </p>
      <C4DFeatureCardFooter>
        <ArrowRight size="20" slot="icon" />
      </C4DFeatureCardFooter>
    </C4DFeatureCard>

    <C4DContentBlockSegmented
      name="3"
      data-title="Elementum nibh tellus molestie nunc non.">
      <C4DContentBlockHeading>
        Elementum nibh tellus molestie nunc non.
      </C4DContentBlockHeading>
      {Array.from([1, 2]).map(() => contentBlockSegmentedItemsWithImage)}
      <C4DCardCTA slot="footer" cta-type="local" href="https://example.com">
        Lorem ipsum dolor
        <C4DCardCTAFooter></C4DCardCTAFooter>
      </C4DCardCTA>
    </C4DContentBlockSegmented>

    <C4DCalloutWithMedia>
      <C4DContentBlockHeading slot="heading">
        Mauris ultrices eros in cursus
      </C4DContentBlockHeading>
      <C4DCalloutWithMediaCopy size="sm">
        Porttitor eget dolor morbi non arcu. Et ligula ullamcorper malesuada
        proin libero nunc consequat. In est ante in nibh mauris cursus mattis.
        Turpis tincidunt id aliquet risus feugiat in. Vel facilisis volutpat est
        velit egestas dui.
      </C4DCalloutWithMediaCopy>
      <C4DCalloutWithMediaVideo video-id="0_ibuqxqbe"></C4DCalloutWithMediaVideo>
    </C4DCalloutWithMedia>

    <C4DContentBlockHorizontal name="4" data-title="Tincidunt ornare massa">
      <C4DContentBlockHeading>Tincidunt ornare massa</C4DContentBlockHeading>
      {Array.from([1, 2]).map(() => contentItemHorizontal)}
    </C4DContentBlockHorizontal>

    <C4DLogoGrid
      name="5"
      data-title="Lobortis elementum nibh tellus"
      hide-border="true">
      <C4DContentBlockHeading>
        Lobortis elementum nibh tellus
      </C4DContentBlockHeading>
      {logosGroup &&
        logosGroup.map((elem) => (
          <C4DLogoGridItem
            default-src={elem.imgSrc}
            alt={elem.altText}></C4DLogoGridItem>
        ))}
    </C4DLogoGrid>

    <C4DContentBlockCards name="6" data-title="Aliquam condimentum interdum">
      <C4DContentBlockHeading>
        Aliquam condimentum interdum
      </C4DContentBlockHeading>
      <C4DCardGroup>
        {Array.from([1, 2, 3]).map(() => cardGroupItems)}
      </C4DCardGroup>
    </C4DContentBlockCards>
    <C4DCalloutQuote>
      Duis aute irure dolor in reprehenderit
      <C4DQuoteSourceHeading>Lorem ipsum dolor sit amet</C4DQuoteSourceHeading>
      <C4DQuoteSourceCopy>consectetur adipiscing elit</C4DQuoteSourceCopy>
      <C4DQuoteSourceBottomCopy>IBM Cloud</C4DQuoteSourceBottomCopy>
      <C4DCalloutLinkWithIcon
        slot="footer"
        href="https://example.com"
        cta-type="local">
        Link with Icon
      </C4DCalloutLinkWithIcon>
    </C4DCalloutQuote>

    <C4DCTABlock
      name="7"
      data-title="Duis aute irure dolor in reprehenderit"
      no-border>
      <C4DContentBlockHeading>Take the next step</C4DContentBlockHeading>
      <C4DContentBlockCopy>
        Want to discuss your options with a DevOps expert? <br />
        Contact our sales team to evaluate your needs.
      </C4DContentBlockCopy>
      <C4DButtonGroup slot="action">
        <C4DButtonGroupItem href="https://example.com">
          Secondary Button <ArrowRight size="20" slot="icon" />
        </C4DButtonGroupItem>
        <C4DButtonGroupItem href="https://example.com">
          Primary button <ArrowRight size="20" slot="icon" />
        </C4DButtonGroupItem>
      </C4DButtonGroup>
      <C4DCTABlockItemRow no-border>
        <C4DCTABlockItem>
          <C4DContentItemHeading>Get connected</C4DContentItemHeading>
          <C4DContentItemCopy>
            IBM DevOps partners have a wide range of expertise. Find one to
            build the right solution for you.
          </C4DContentItemCopy>
          <C4DTextCTA
            slot="footer"
            cta-type="local"
            icon-placement="right"
            href="example.com">
            Find a partner
          </C4DTextCTA>
        </C4DCTABlockItem>
        <C4DCTABlockItem>
          <C4DContentItemHeading>Learn how</C4DContentItemHeading>
          <C4DContentItemCopy>
            IBM DevOps partners have a wide range of expertise
          </C4DContentItemCopy>
          <C4DTextCTA
            slot="footer"
            cta-type="local"
            icon-placement="right"
            href="example.com">
            Browse tutorials
          </C4DTextCTA>
        </C4DCTABlockItem>
      </C4DCTABlockItemRow>
    </C4DCTABlock>
  </>
);

export const StoryContent = (
  config = {
    l1: false,
    leadspace: false,
    tocLayout: TOC_TYPES.DEFAULT,
  }
) => {
  const mainClasses = [
    'cds--content',
    'cds-ce-demo-devenv--ui-shell-content',
    config?.l1 ? 'has-l1' : null,
    config?.leadspace ? 'has-leadspace' : null,
  ]
    .filter((className) => className != null)
    .join(' ');

  return (
    <div className={mainClasses}>
      {config?.leadspace ? contentLeadspace : null}
      {config?.tocLayout === TOC_TYPES.HORIZONTAL ? (
        <C4DTableOfContents stickyOffset={48} toc-layout={config.tocLayout}>
          <div className="cds--row">
            <div className="cds--col-lg-12">{tocContent}</div>
          </div>
        </C4DTableOfContents>
      ) : (
        <C4DTableOfContents stickyOffset={48} toc-layout={config.tocLayout}>
          {tocContent}
        </C4DTableOfContents>
      )}
    </div>
  );
};

export const StoryContentNoToC = () => (
  <div
    className="cds-ce-demo-devenv--ui-shell-content"
    style={{ paddingRight: '1rem' }}>
    <div className="cds--gridcdsds--col-lg-8">
      {contentLeadspaceSearch}

      <C4DContentBlockSegmented>
        <C4DContentBlockHeading>
          Pharetra pharetra massa massa ultricies mi quis.
        </C4DContentBlockHeading>
        {Array.from([1, 2]).map(() => contentBlockSegmentedItems)}
      </C4DContentBlockSegmented>

      <C4DFeatureCard size="large" href="https://example.com">
        <C4DImage slot="image" alt="Image alt text" default-src={imgLg1x1}>
          <C4DImageItem
            media="(min-width: 991px)"
            srcset={imgLg1x1}></C4DImageItem>
        </C4DImage>
        <C4DCardEyebrow>scelerisque purus</C4DCardEyebrow>
        <C4DCardHeading>Elementum nibh tellus molestie nunc?</C4DCardHeading>
        <p>
          Habitant morbi tristique senectus et netus et malesuada fames.
          Habitant morbu tristique.
        </p>
        <C4DFeatureCardFooter>
          <ArrowRight size="20" slot="icon" />
        </C4DFeatureCardFooter>
      </C4DFeatureCard>

      <C4DContentBlockSegmented>
        <C4DContentBlockHeading>
          Elementum nibh tellus molestie nunc non.
        </C4DContentBlockHeading>
        {Array.from([1, 2]).map(() => contentBlockSegmentedItemsWithImage)}
        <C4DCardCTA slot="footer" cta-type="local" href="https://example.com">
          Lorem ipsum dolor
          <C4DCardCTAFooter></C4DCardCTAFooter>
        </C4DCardCTA>
      </C4DContentBlockSegmented>

      <C4DCalloutWithMedia>
        <C4DContentBlockHeading slot="heading">
          Mauris ultrices eros in cursus
        </C4DContentBlockHeading>
        <C4DCalloutWithMediaCopy size="sm">
          Porttitor eget dolor morbi non arcu. Et ligula ullamcorper malesuada
          proin libero nunc consequat. In est ante in nibh mauris cursus mattis.
          Turpis tincidunt id aliquet risus feugiat in. Vel facilisis volutpat
          est velit egestas dui.
        </C4DCalloutWithMediaCopy>
        <C4DCalloutWithMediaVideo video-id="0_ibuqxqbe"></C4DCalloutWithMediaVideo>
      </C4DCalloutWithMedia>

      <C4DContentBlockHorizontal>
        <C4DContentBlockHeading>Tincidunt ornare massa</C4DContentBlockHeading>
        {Array.from([1, 2]).map(() => contentItemHorizontal)}
      </C4DContentBlockHorizontal>

      <C4DLogoGrid hide-border="true">
        <C4DContentBlockHeading>
          Lobortis elementum nibh tellus
        </C4DContentBlockHeading>
        {logosGroup &&
          logosGroup.map((elem) => (
            <C4DLogoGridItem
              default-src={elem.imgSrc}
              alt={elem.altText}></C4DLogoGridItem>
          ))}
      </C4DLogoGrid>

      <C4DContentBlockCards>
        <C4DContentBlockHeading>
          Aliquam condimentum interdum
        </C4DContentBlockHeading>
        <C4DCardGroup>
          {Array.from([1, 2, 3]).map(() => cardGroupItems)}
        </C4DCardGroup>
      </C4DContentBlockCards>

      <C4DCalloutQuote>
        Duis aute irure dolor in reprehenderit
        <C4DQuoteSourceHeading>
          Lorem ipsum dolor sit amet
        </C4DQuoteSourceHeading>
        <C4DQuoteSourceCopy>consectetur adipiscing elit</C4DQuoteSourceCopy>
        <C4DQuoteSourceBottomCopy>IBM Cloud</C4DQuoteSourceBottomCopy>
        <C4DCalloutLinkWithIcon
          slot="footer"
          href="https://example.com"
          cta-type="local">
          Link with Icon
        </C4DCalloutLinkWithIcon>
      </C4DCalloutQuote>

      <C4DCTABlock no-border>
        <C4DContentBlockHeading>Take the next step</C4DContentBlockHeading>
        <C4DContentBlockCopy>
          Want to discuss your options with a DevOps expert? <br />
          Contact our sales team to evaluate your needs.
        </C4DContentBlockCopy>

        <C4DButtonGroup slot="action">
          <C4DButtonGroupItem href="https://example.com">
            Secondary Button <ArrowRight size="20" slot="icon" />
          </C4DButtonGroupItem>
          <C4DButtonGroupItem href="https://example.com">
            Primary button <ArrowRight size="20" slot="icon" />
          </C4DButtonGroupItem>
        </C4DButtonGroup>

        <C4DCTABlockItemRow no-border>
          <C4DCTABlockItem>
            <C4DContentItemHeading>Get connected</C4DContentItemHeading>
            <C4DContentItemCopy>
              IBM DevOps partners have a wide range of expertise. Find one to
              build the right solution for you.
            </C4DContentItemCopy>
            <C4DTextCTA
              slot="footer"
              cta-type="local"
              icon-placement="right"
              href="example.com">
              Find a partner
            </C4DTextCTA>
          </C4DCTABlockItem>

          <C4DCTABlockItem>
            <C4DContentItemHeading>Learn how</C4DContentItemHeading>
            <C4DContentItemCopy>
              IBM DevOps partners have a wide range of expertise
            </C4DContentItemCopy>
            <C4DTextCTA
              slot="footer"
              cta-type="local"
              icon-placement="right"
              href="example.com">
              Browse tutorials
            </C4DTextCTA>
          </C4DCTABlockItem>
        </C4DCTABlockItemRow>
      </C4DCTABlock>
    </div>
  </div>
);

export default { StoryContent, StoryContentNoToC };
/* eslint-enable max-len */
