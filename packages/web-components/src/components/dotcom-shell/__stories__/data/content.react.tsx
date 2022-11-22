/* eslint-disable max-len */
/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import DDSImage from '@carbon/ibmdotcom-web-components/es/components-react/image/image';
import DDSImageItem from '@carbon/ibmdotcom-web-components/es/components-react/image/image-item';
import DDSContentBlockSegmented from '@carbon/ibmdotcom-web-components/es/components-react/content-block-segmented/content-block-segmented';
import DDSContentBlockSegmentedItem from '@carbon/ibmdotcom-web-components/es/components-react/content-block-segmented/content-block-segmented-item';
import DDSContentGroupHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-group/content-group-heading';
import DDSContentItemCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-copy';
import DDSTextCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/text-cta';
import DDSContentItemHorizontal from '@carbon/ibmdotcom-web-components/es/components-react/content-item-horizontal/content-item-horizontal';
import DDSContentItemHorizontalEyebrow from '@carbon/ibmdotcom-web-components/es/components-react/content-item-horizontal/content-item-horizontal-eyebrow';
import DDSContentItemHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-item/content-item-heading';
import DDSContentItemHorizontalCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-item-horizontal/content-item-horizontal-copy';
import DDSLinkList from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list';
import DDSLinkListItemCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/link-list-item-cta';
import DDSUniversalBanner from '@carbon/ibmdotcom-web-components/es/components-react/universal-banner/universal-banner';
import DDSUniversalBannerImage from '@carbon/ibmdotcom-web-components/es/components-react/universal-banner/universal-banner-image';
import DDSUniversalBannerHeading from '@carbon/ibmdotcom-web-components/es/components-react/universal-banner/universal-banner-heading';
import DDSUniversalBannerCopy from '@carbon/ibmdotcom-web-components/es/components-react/universal-banner/universal-banner-copy';
import DDSButtonCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/button-cta';
import DDSCardGroupItem from '@carbon/ibmdotcom-web-components/es/components-react/card-group/card-group-item';
import DDSCardHeading from '@carbon/ibmdotcom-web-components/es/components-react/card/card-heading';
import DDSCardEyebrow from '@carbon/ibmdotcom-web-components/es/components-react/card/card-eyebrow';
import DDSCardCTAFooter from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta-footer';
import DDSLeadspace from '@carbon/ibmdotcom-web-components/es/components-react/leadspace/leadspace';
import DDSLeadspaceHeading from '@carbon/ibmdotcom-web-components/es/components-react/leadspace/leadspace-heading';
import DDSButtonGroup from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group';
import DDSButtonGroupItem from '@carbon/ibmdotcom-web-components/es/components-react/button-group/button-group-item';
import DDSLeadspaceWithSearch from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-with-search/leadspace-with-search';
import DDSLeadspaceWithSearchHeading from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-with-search/leadspace-with-search-heading';
import DDSLeadspaceWithSearchContent from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-with-search/leadspace-with-search-content';
import DDSLeadspaceWithSearchContentHeading from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-with-search/leadspace-with-search-content-heading';
import DDSLeadspaceWithSearchContentCopy from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-with-search/leadspace-with-search-content-copy';
import DDSSearchWithTypeahead from '@carbon/ibmdotcom-web-components/es/components-react/search-with-typeahead/search-with-typeahead';
import DDSLeadspaceBlock from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-block/leadspace-block';
import DDSLeadspaceBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-block/leadspace-block-heading';
import DDSLeadspaceBlockContent from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-block/leadspace-block-content';
import DDSContentBlockHeading from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-heading';
import DDSContentBlockCopy from '@carbon/ibmdotcom-web-components/es/components-react/content-block/content-block-copy';
import DDSLeadspaceBlockMedia from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-block/leadspace-block-media';
import DDSVideoPlayerContainer from '@carbon/ibmdotcom-web-components/es/components-react/video-player/video-player-container';
import DDSLinkListHeading from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-heading';
import DDSLinkListItem from '@carbon/ibmdotcom-web-components/es/components-react/link-list/link-list-item';
import DDSLeadspaceBlockCTA from '@carbon/ibmdotcom-web-components/es/components-react/leadspace-block/leadspace-block-cta';
import DDSFeatureCard from '@carbon/ibmdotcom-web-components/es/components-react/feature-card/feature-card';
import DDSFeatureCardFooter from '@carbon/ibmdotcom-web-components/es/components-react/feature-card/feature-card-footer';
import DDSCardCTA from '@carbon/ibmdotcom-web-components/es/components-react/cta/card-cta';
import DDSCalloutWithMedia from '@carbon/ibmdotcom-web-components/es/components-react/callout-with-media/callout-with-media';
import DDSCalloutWithMediaCopy from '@carbon/ibmdotcom-web-components/es/components-react/callout-with-media/callout-with-media-copy';
import DDSCalloutWithMediaVideo from '@carbon/ibmdotcom-web-components/es/components-react/callout-with-media/callout-with-media-video';
import DDSContentBlockHorizontal from '@carbon/ibmdotcom-web-components/es/components-react/content-block-horizontal/content-block-horizontal';
import DDSLogoGrid from '@carbon/ibmdotcom-web-components/es/components-react/logo-grid/logo-grid';
import DDSLogoGridItem from '@carbon/ibmdotcom-web-components/es/components-react/logo-grid/logo-grid-item';
import DDSContentBlockCards from '@carbon/ibmdotcom-web-components/es/components-react/content-block-cards/content-block-cards';
import DDSCardGroup from '@carbon/ibmdotcom-web-components/es/components-react/card-group/card-group';
import DDSCalloutQuote from '@carbon/ibmdotcom-web-components/es/components-react/callout-quote/callout-quote';
import DDSQuoteSourceHeading from '@carbon/ibmdotcom-web-components/es/components-react/quote/quote-source-heading';
import DDSQuoteSourceCopy from '@carbon/ibmdotcom-web-components/es/components-react/quote/quote-source-copy';
import DDSQuoteSourceBottomCopy from '@carbon/ibmdotcom-web-components/es/components-react/quote/quote-source-bottom-copy';
import DDSCalloutLinkWithIcon from '@carbon/ibmdotcom-web-components/es/components-react/callout-quote/callout-link-with-icon';
import DDSCTABlock from '@carbon/ibmdotcom-web-components/es/components-react/cta-block/cta-block';
import DDSCTABlockItemRow from '@carbon/ibmdotcom-web-components/es/components-react/cta-block/cta-block-item-row';
import DDSCTABlockItem from '@carbon/ibmdotcom-web-components/es/components-react/cta-block/cta-block-item';
import DDSTableOfContents from '@carbon/ibmdotcom-web-components/es/components-react/table-of-contents/table-of-contents';

import ArrowRight20 from '@carbon/icons-react/es/arrow--right/20.js';
import logosGroup from '../../../logo-grid/__stories__/data/logos.js';
import { TOC_TYPES } from '../../../table-of-contents/defs';

import imgSm16x9 from '../../../../../../storybook-images/assets/320/fpo--16x9--320x180--002.jpg';
import imgMd16x9 from '../../../../../../storybook-images/assets/480/fpo--16x9--480x270--002.jpg';
import imgLg16x9 from '../../../../../../storybook-images/assets/720/fpo--16x9--720x405--002.jpg';
import imgLg1x1 from '../../../../../../storybook-images/assets/720/fpo--1x1--720x720--005.jpg';
import imgXlg4x3 from '../../../../../../storybook-images/assets/1312/fpo--4x3--1312x984--003.jpg';

import leadspaceImg from '../../../../../../storybook-images/assets/leadspace/fpo--leadspace--1584x560--002.jpg';

export const image = (
  <DDSImage
    alt="Image alt text"
    default-src={imgLg16x9}
    heading="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  >
    <DDSImageItem media="min-width: 672px" srcset={imgLg16x9}></DDSImageItem>
    <DDSImageItem media="min-width: 400px" srcset={imgMd16x9}></DDSImageItem>
    <DDSImageItem media="min-width: 320px" srcset={imgSm16x9}></DDSImageItem>
  </DDSImage>
);

export const contentBlockSegmentedItems = (
  <>
    <DDSContentBlockSegmentedItem>
      <DDSContentGroupHeading>
        A scelerisque purus semper eget duis at tellus.{' '}
      </DDSContentGroupHeading>
      <DDSContentItemCopy>
        Elementum nibh tellus molestie nunc non. Habitant morbi tristique
        senectus et netus et malesuada fames.
      </DDSContentItemCopy>
      <DDSTextCTA
        slot="footer"
        cta-type="local"
        icon-placement="right"
        href="https://example.com"
      >
        Lorem Ipsum dolor sit
      </DDSTextCTA>
    </DDSContentBlockSegmentedItem>

    <DDSContentBlockSegmentedItem>
      <DDSContentGroupHeading>
        A scelerisque purus semper eget duis at tellus.{' '}
      </DDSContentGroupHeading>
      <DDSContentItemCopy>
        Elementum nibh tellus molestie nunc non. Habitant morbi tristique
        senectus et netus et malesuada fames.
      </DDSContentItemCopy>
    </DDSContentBlockSegmentedItem>
  </>
);

export const contentBlockSegmentedItemsWithImage = (
  <DDSContentBlockSegmentedItem>
    <DDSContentGroupHeading>
      A scelerisque purus semper eget duis at tellus.{' '}
    </DDSContentGroupHeading>
    <DDSContentItemCopy>
      Elementum nibh tellus molestie nunc non. Habitant morbi tristique senectus
      et netus et malesuada fames.
    </DDSContentItemCopy>
    {image}
    <DDSTextCTA
      slot="footer"
      cta-type="local"
      icon-placement="right"
      href="https://example.com"
    >
      Lorem Ipsum dolor sit
    </DDSTextCTA>
  </DDSContentBlockSegmentedItem>
);

export const contentItemHorizontal = (
  <DDSContentItemHorizontal>
    <DDSContentItemHorizontalEyebrow>
      Lorem ipsum
    </DDSContentItemHorizontalEyebrow>
    <DDSContentItemHeading>Aliquam condimentum</DDSContentItemHeading>
    <DDSContentItemHorizontalCopy>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et
      ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit
      sollicitudin.
    </DDSContentItemHorizontalCopy>
    <DDSLinkList slot="footer" type="vertical">
      <DDSLinkListItemCTA
        icon-placement="right"
        href="https://www.ibm.com"
        cta-type="local"
      >
        Link text
      </DDSLinkListItemCTA>
      <DDSLinkListItemCTA
        icon-placement="right"
        href="https://www.ibm.com"
        cta-type="external"
      >
        External link text
      </DDSLinkListItemCTA>
    </DDSLinkList>
  </DDSContentItemHorizontal>
);

export const universalBanner = (srcImage) => (
  <DDSUniversalBanner image-width="4-col">
    <DDSUniversalBannerImage
      slot="image"
      default-src={srcImage}
    ></DDSUniversalBannerImage>
    <DDSUniversalBannerHeading slot="heading">
      heading
    </DDSUniversalBannerHeading>
    <DDSUniversalBannerCopy slot="copy">copy</DDSUniversalBannerCopy>
    <DDSButtonCTA
      slot="cta"
      cta-type="local"
      kind="tertiary"
      href="https://www.example.com"
    >
      cta copy
    </DDSButtonCTA>
  </DDSUniversalBanner>
);

export const cardGroupItems = (
  <DDSCardGroupItem href="https://example.com">
    <DDSImage
      slot="image"
      alt="Image alt text"
      default-src={imgXlg4x3}
    ></DDSImage>
    <DDSCardEyebrow>Topic</DDSCardEyebrow>
    <DDSCardHeading>Natural Language Processing.</DDSCardHeading>
    <DDSCardCTAFooter></DDSCardCTAFooter>
  </DDSCardGroupItem>
);

export const contentLeadspace = (
  <DDSLeadspace
    size="medium"
    gradient-style-scheme="true"
    alt=""
    default-src={leadspaceImg}
  >
    <DDSLeadspaceHeading>Leadspace Title</DDSLeadspaceHeading>
    Use this area for a short line of copy to support the title
    <DDSButtonGroup slot="action">
      <DDSButtonGroupItem aria-label="" href="">
        test
      </DDSButtonGroupItem>
    </DDSButtonGroup>
    <DDSImage slot="image" class="bx--image" alt="" default-src={leadspaceImg}>
      <DDSImageItem
        media="(min-width: 672px)"
        srcset={leadspaceImg}
      ></DDSImageItem>
      <DDSImageItem media="(min-width: 0)" srcset={leadspaceImg}></DDSImageItem>
    </DDSImage>
  </DDSLeadspace>
);

export const contentLeadspaceSearch = (
  <DDSLeadspaceWithSearch adjacent-theme="white-and-g10" scroll-behavior>
    <DDSLeadspaceWithSearchHeading>
      Find a product
    </DDSLeadspaceWithSearchHeading>
    <DDSLeadspaceWithSearchContent>
      <DDSLeadspaceWithSearchContentHeading>
        Innovate like a startup, scale for the enterprise
      </DDSLeadspaceWithSearchContentHeading>
      <DDSLeadspaceWithSearchContentCopy>
        Automate your software release process with continuous delivery (CD)—the
        most critical part of adopting DevOps. Build, test, and deploy code
        changes quickly, ensuring software is always ready for deployment.
      </DDSLeadspaceWithSearchContentCopy>
    </DDSLeadspaceWithSearchContent>
    <DDSSearchWithTypeahead
      slot="search"
      leadspace-search
      active
      should-remain-open
    ></DDSSearchWithTypeahead>
  </DDSLeadspaceWithSearch>
);

export const tocContent = (
  <>
    <DDSLeadspaceBlock name="1" data-title="Lorem ipsum dolor sit amet">
      <DDSLeadspaceBlockHeading>
        Lorem ipsum dolor sit amet
      </DDSLeadspaceBlockHeading>
      <DDSLeadspaceBlockContent>
        <DDSContentBlockHeading>
          Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.
        </DDSContentBlockHeading>
        <DDSContentBlockCopy slot="copy">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat.
        </DDSContentBlockCopy>
        <DDSLeadspaceBlockMedia slot="media">
          <DDSVideoPlayerContainer video-id="1_9h94wo6b"></DDSVideoPlayerContainer>
        </DDSLeadspaceBlockMedia>
        <DDSLinkList type="end">
          <DDSLinkListHeading>Featured products</DDSLinkListHeading>
          <DDSLinkListItem href="https://example.com">
            IBM Cloud Continuous Delivery <ArrowRight20 slot="icon" />
          </DDSLinkListItem>
          <DDSLinkListItem href="https://example.com">
            UrbanCode <ArrowRight20 slot="icon" />
          </DDSLinkListItem>
          <DDSLinkListItem href="https://example.com">
            View all products <ArrowRight20 slot="icon" />
          </DDSLinkListItem>
        </DDSLinkList>
        <DDSLeadspaceBlockCTA>
          <DDSButtonGroupItem href="www.ibm.com">
            Contact sales <ArrowRight20 slot="icon" />
          </DDSButtonGroupItem>
        </DDSLeadspaceBlockCTA>
      </DDSLeadspaceBlockContent>
    </DDSLeadspaceBlock>

    <DDSContentBlockSegmented
      name="2"
      data-title="Pharetra pharetra massa massa ultricies mi quis."
    >
      <DDSContentBlockHeading>
        Pharetra pharetra massa massa ultricies mi quis.
      </DDSContentBlockHeading>
      {Array.from([1, 2]).map(() => contentBlockSegmentedItems)}
    </DDSContentBlockSegmented>
    <DDSFeatureCard size="large" href="https://example.com">
      <DDSImage slot="image" alt="Image alt text" default-src={imgLg1x1}>
        <DDSImageItem
          media="(min-width: 991px)"
          srcset={imgLg1x1}
        ></DDSImageItem>
      </DDSImage>
      <DDSCardEyebrow>scelerisque purus</DDSCardEyebrow>
      <DDSCardHeading>Elementum nibh tellus molestie nunc?</DDSCardHeading>
      <p>
        Habitant morbi tristique senectus et netus et malesuada fames. Habitant
        morbu tristique.
      </p>
      <DDSFeatureCardFooter>
        <ArrowRight20 slot="icon" />
      </DDSFeatureCardFooter>
    </DDSFeatureCard>

    <DDSContentBlockSegmented
      name="3"
      data-title="Elementum nibh tellus molestie nunc non."
    >
      <DDSContentBlockHeading>
        Elementum nibh tellus molestie nunc non.
      </DDSContentBlockHeading>
      {Array.from([1, 2]).map(() => contentBlockSegmentedItemsWithImage)}
      <DDSCardCTA slot="footer" cta-type="local" href="https://example.com">
        Lorem ipsum dolor
        <DDSCardCTAFooter></DDSCardCTAFooter>
      </DDSCardCTA>
    </DDSContentBlockSegmented>

    <DDSCalloutWithMedia>
      <DDSContentBlockHeading slot="heading">
        Mauris ultrices eros in cursus
      </DDSContentBlockHeading>
      <DDSCalloutWithMediaCopy size="sm">
        Porttitor eget dolor morbi non arcu. Et ligula ullamcorper malesuada
        proin libero nunc consequat. In est ante in nibh mauris cursus mattis.
        Turpis tincidunt id aliquet risus feugiat in. Vel facilisis volutpat est
        velit egestas dui.
      </DDSCalloutWithMediaCopy>
      <DDSCalloutWithMediaVideo video-id="1_9h94wo6b"></DDSCalloutWithMediaVideo>
    </DDSCalloutWithMedia>

    <DDSContentBlockHorizontal name="4" data-title="Tincidunt ornare massa">
      <DDSContentBlockHeading>Tincidunt ornare massa</DDSContentBlockHeading>
      {Array.from([1, 2]).map(() => contentItemHorizontal)}
    </DDSContentBlockHorizontal>

    <DDSLogoGrid
      name="5"
      data-title="Lobortis elementum nibh tellus"
      hide-border="true"
    >
      <DDSContentBlockHeading>
        Lobortis elementum nibh tellus
      </DDSContentBlockHeading>
      {logosGroup &&
        logosGroup.map((elem) => (
          <DDSLogoGridItem
            default-src={elem.imgSrc}
            alt={elem.altText}
          ></DDSLogoGridItem>
        ))}
    </DDSLogoGrid>

    <DDSContentBlockCards name="6" data-title="Aliquam condimentum interdum">
      <DDSContentBlockHeading>
        Aliquam condimentum interdum
      </DDSContentBlockHeading>
      <DDSCardGroup>
        {Array.from([1, 2, 3]).map(() => cardGroupItems)}
      </DDSCardGroup>
    </DDSContentBlockCards>
    <DDSCalloutQuote>
      Duis aute irure dolor in reprehenderit
      <DDSQuoteSourceHeading>Lorem ipsum dolor sit amet</DDSQuoteSourceHeading>
      <DDSQuoteSourceCopy>consectetur adipiscing elit</DDSQuoteSourceCopy>
      <DDSQuoteSourceBottomCopy>IBM Cloud</DDSQuoteSourceBottomCopy>
      <DDSCalloutLinkWithIcon slot="footer" href="https://example.com">
        Link with Icon <ArrowRight20 slot="icon" />
      </DDSCalloutLinkWithIcon>
    </DDSCalloutQuote>

    <DDSCTABlock
      name="7"
      data-title="Duis aute irure dolor in reprehenderit"
      no-border
    >
      <DDSContentBlockHeading>Take the next step</DDSContentBlockHeading>
      <DDSContentBlockCopy>
        Want to discuss your options with a DevOps expert? <br />
        Contact our sales team to evaluate your needs.
      </DDSContentBlockCopy>
      <DDSButtonGroup slot="action">
        <DDSButtonGroupItem href="https://example.com">
          Secondary Button <ArrowRight20 slot="icon" />
        </DDSButtonGroupItem>
        <DDSButtonGroupItem href="https://example.com">
          Primary button <ArrowRight20 slot="icon" />
        </DDSButtonGroupItem>
      </DDSButtonGroup>
      <DDSCTABlockItemRow no-border>
        <DDSCTABlockItem>
          <DDSContentItemHeading>Get connected</DDSContentItemHeading>
          <DDSContentItemCopy>
            IBM DevOps partners have a wide range of expertise. Find one to
            build the right solution for you.
          </DDSContentItemCopy>
          <DDSTextCTA
            slot="footer"
            cta-type="local"
            icon-placement="right"
            href="example.com"
          >
            Find a partner
          </DDSTextCTA>
        </DDSCTABlockItem>
        <DDSCTABlockItem>
          <DDSContentItemHeading>Learn how</DDSContentItemHeading>
          <DDSContentItemCopy>
            IBM DevOps partners have a wide range of expertise
          </DDSContentItemCopy>
          <DDSTextCTA
            slot="footer"
            cta-type="local"
            icon-placement="right"
            href="example.com"
          >
            Browse tutorials
          </DDSTextCTA>
        </DDSCTABlockItem>
      </DDSCTABlockItemRow>
    </DDSCTABlock>
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
    'bx--content',
    'dds-ce-demo-devenv--ui-shell-content',
    config?.l1 ? 'has-l1' : null,
    config?.leadspace ? 'has-leadspace' : null,
  ]
    .filter((className) => className != null)
    .join(' ');

  return (
    <div className={mainClasses}>
      {config?.leadspace ? contentLeadspace : null}
      {config?.tocLayout === TOC_TYPES.HORIZONTAL ? (
        <DDSTableOfContents stickyOffset={48} toc-layout={config.tocLayout}>
          <div className="bx--row">
            <div className="bx--col-lg-12">{tocContent}</div>
          </div>
        </DDSTableOfContents>
      ) : (
        <DDSTableOfContents stickyOffset={48} toc-layout={config.tocLayout}>
          {tocContent}
        </DDSTableOfContents>
      )}
    </div>
  );
};

export const StoryContentNoToC = () => (
  <div
    className="dds-ce-demo-devenv--ui-shell-content"
    style={{ paddingRight: '1rem' }}
  >
    <div className="bx--grid bx--col-lg-8">
      {contentLeadspaceSearch}

      <DDSContentBlockSegmented>
        <DDSContentBlockHeading>
          Pharetra pharetra massa massa ultricies mi quis.
        </DDSContentBlockHeading>
        {Array.from([1, 2]).map(() => contentBlockSegmentedItems)}
      </DDSContentBlockSegmented>

      <DDSFeatureCard size="large" href="https://example.com">
        <DDSImage slot="image" alt="Image alt text" default-src={imgLg1x1}>
          <DDSImageItem
            media="(min-width: 991px)"
            srcset={imgLg1x1}
          ></DDSImageItem>
        </DDSImage>
        <DDSCardEyebrow>scelerisque purus</DDSCardEyebrow>
        <DDSCardHeading>Elementum nibh tellus molestie nunc?</DDSCardHeading>
        <p>
          Habitant morbi tristique senectus et netus et malesuada fames.
          Habitant morbu tristique.
        </p>
        <DDSFeatureCardFooter>
          <ArrowRight20 slot="icon" />
        </DDSFeatureCardFooter>
      </DDSFeatureCard>

      <DDSContentBlockSegmented>
        <DDSContentBlockHeading>
          Elementum nibh tellus molestie nunc non.
        </DDSContentBlockHeading>
        {Array.from([1, 2]).map(() => contentBlockSegmentedItemsWithImage)}
        <DDSCardCTA slot="footer" cta-type="local" href="https://example.com">
          Lorem ipsum dolor
          <DDSCardCTAFooter></DDSCardCTAFooter>
        </DDSCardCTA>
      </DDSContentBlockSegmented>

      <DDSCalloutWithMedia>
        <DDSContentBlockHeading slot="heading">
          Mauris ultrices eros in cursus
        </DDSContentBlockHeading>
        <DDSCalloutWithMediaCopy size="sm">
          Porttitor eget dolor morbi non arcu. Et ligula ullamcorper malesuada
          proin libero nunc consequat. In est ante in nibh mauris cursus mattis.
          Turpis tincidunt id aliquet risus feugiat in. Vel facilisis volutpat
          est velit egestas dui.
        </DDSCalloutWithMediaCopy>
        <DDSCalloutWithMediaVideo video-id="1_9h94wo6b"></DDSCalloutWithMediaVideo>
      </DDSCalloutWithMedia>

      <DDSContentBlockHorizontal>
        <DDSContentBlockHeading>Tincidunt ornare massa</DDSContentBlockHeading>
        {Array.from([1, 2]).map(() => contentItemHorizontal)}
      </DDSContentBlockHorizontal>

      <DDSLogoGrid hide-border="true">
        <DDSContentBlockHeading>
          Lobortis elementum nibh tellus
        </DDSContentBlockHeading>
        {logosGroup &&
          logosGroup.map((elem) => (
            <DDSLogoGridItem
              default-src={elem.imgSrc}
              alt={elem.altText}
            ></DDSLogoGridItem>
          ))}
      </DDSLogoGrid>

      <DDSContentBlockCards>
        <DDSContentBlockHeading>
          Aliquam condimentum interdum
        </DDSContentBlockHeading>
        <DDSCardGroup>
          {Array.from([1, 2, 3]).map(() => cardGroupItems)}
        </DDSCardGroup>
      </DDSContentBlockCards>

      <DDSCalloutQuote>
        Duis aute irure dolor in reprehenderit
        <DDSQuoteSourceHeading>
          Lorem ipsum dolor sit amet
        </DDSQuoteSourceHeading>
        <DDSQuoteSourceCopy>consectetur adipiscing elit</DDSQuoteSourceCopy>
        <DDSQuoteSourceBottomCopy>IBM Cloud</DDSQuoteSourceBottomCopy>
        <DDSCalloutLinkWithIcon slot="footer" href="https://example.com">
          Link with Icon <ArrowRight20 slot="icon" />
        </DDSCalloutLinkWithIcon>
      </DDSCalloutQuote>

      <DDSCTABlock no-border>
        <DDSContentBlockHeading>Take the next step</DDSContentBlockHeading>
        <DDSContentBlockCopy>
          Want to discuss your options with a DevOps expert? <br />
          Contact our sales team to evaluate your needs.
        </DDSContentBlockCopy>

        <DDSButtonGroup slot="action">
          <DDSButtonGroupItem href="https://example.com">
            Secondary Button <ArrowRight20 slot="icon" />
          </DDSButtonGroupItem>
          <DDSButtonGroupItem href="https://example.com">
            Primary button <ArrowRight20 slot="icon" />
          </DDSButtonGroupItem>
        </DDSButtonGroup>

        <DDSCTABlockItemRow no-border>
          <DDSCTABlockItem>
            <DDSContentItemHeading>Get connected</DDSContentItemHeading>
            <DDSContentItemCopy>
              IBM DevOps partners have a wide range of expertise. Find one to
              build the right solution for you.
            </DDSContentItemCopy>
            <DDSTextCTA
              slot="footer"
              cta-type="local"
              icon-placement="right"
              href="example.com"
            >
              Find a partner
            </DDSTextCTA>
          </DDSCTABlockItem>

          <DDSCTABlockItem>
            <DDSContentItemHeading>Learn how</DDSContentItemHeading>
            <DDSContentItemCopy>
              IBM DevOps partners have a wide range of expertise
            </DDSContentItemCopy>
            <DDSTextCTA
              slot="footer"
              cta-type="local"
              icon-placement="right"
              href="example.com"
            >
              Browse tutorials
            </DDSTextCTA>
          </DDSCTABlockItem>
        </DDSCTABlockItemRow>
      </DDSCTABlock>
    </div>
  </div>
);

export default { StoryContent, StoryContentNoToC };
/* eslint-enable max-len */
