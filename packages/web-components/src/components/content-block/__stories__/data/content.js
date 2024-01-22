/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';

import imgLg1x1 from '../../../../../.storybook/storybook-images/assets/960/fpo--1x1--960x960--006.jpg';
import imgLg16x9 from '../../../../../.storybook/storybook-images/assets/720/fpo--16x9--720x405--005.jpg';
import imgXlg16x9 from '../../../../../.storybook/storybook-images/assets/1312/fpo--16x9--1312x738--005.jpg';
import imgMd16x9 from '../../../../../.storybook/storybook-images/assets/960/fpo--16x9--960x540--005.jpg';
import imgLg4x3 from '../../../../../.storybook/storybook-images/assets/720/fpo--4x3--720x540--004.jpg';
import imgSm4x3 from '../../../../../.storybook/storybook-images/assets/480/fpo--4x3--480x360--005.jpg';
import ArrowRight20 from '../../../../internal/vendor/@carbon/web-components/icons/arrow--right/20.js';

export const cardGroupItem1 = html`
  <c4d-card-group-item href="https://www.example.com">
    <c4d-card-heading>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt
    </c4d-card-heading>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </p>
    <c4d-card-footer icon-placement="left">
      ${ArrowRight20({ slot: 'icon' })}
    </c4d-card-footer>
  </c4d-card-group-item>
`;

export const cardGroupItem2 = html`
  <c4d-card-group-item href="https://www.example.com">
    <c4d-card-heading>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt
    </c4d-card-heading>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
    <c4d-card-footer icon-placement="left">
      ${ArrowRight20({ slot: 'icon' })}
    </c4d-card-footer>
  </c4d-card-group-item>
`;

export const card = (heading) => html`
  <c4d-card slot="footer" cta-type="local" href="https://www.example.com">
    <c4d-card-heading>${heading} processing</c4d-card-heading>
    <c4d-card-footer></c4d-card-footer>
  </c4d-card>
`;

export const imageCard = html`
  <c4d-card href="http://www.example.com" cta-type="local">
    <c4d-card-heading>Lorem ipsum dolor sit atemt</c4d-card-heading>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et
      ultricies est.
    </p>
    <c4d-image slot="image" alt="example image" default-src="${imgLg4x3}">
    </c4d-image>
    <c4d-card-footer></c4d-card-footer>
  </c4d-card>
`;

export const videoCard = html`
  <c4d-video-cta-container>
    <c4d-card cta-type="video" href="0_ibuqxqbe">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et
        ultricies est.
      </p>
      <c4d-card-footer> </c4d-card-footer>
    </c4d-card>
  </c4d-video-cta-container>
`;

export const currentComponents = [
  'Callout quote',
  'Callout with media',
  'Card group',
  'Card in card',
  'Carousel',
  'Content group',
  'Content item row',
  'Content item',
  'Feature card',
  'Image',
  'Link list',
  'Quote',
  'Structured list',
  'Tabs extended',
  'Video player',
];

export const image = html`
  <c4d-image
    alt="Image alt text"
    default-src="${imgLg16x9}"
    heading="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
  </c4d-image>
`;

export const calloutQuote = html`
  <c4d-callout-quote mark-type="double-curved" color-scheme="regular">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus est purus,
    posuere at est vitae, ornare rhoncus sem. Suspendisse vitae tellus
    fermentum, hendrerit augue eu, placerat magna.
    <c4d-quote-source-heading
      >Lorem ipsum dolor sit amet</c4d-quote-source-heading
    >
    <c4d-quote-source-copy> consectetur adipiscing elit </c4d-quote-source-copy>
    <c4d-quote-source-bottom-copy> IBM Cloud </c4d-quote-source-bottom-copy>
    <c4d-callout-link-with-icon
      slot="footer"
      href="https://example.com"
      cta-type="local">
      Link with icon
    </c4d-callout-link-with-icon>
  </c4d-callout-quote>
`;

export const calloutWithMedia = html`
  <c4d-callout-with-media color-scheme="regular">
    <c4d-content-block-heading
      >Curabitur malesuada varius mi eu posuere</c4d-content-block-heading
    >
    <c4d-callout-with-media-copy size="sm"
      >${`Lorem ipsum *dolor* sit amet, consectetur adipiscing elit. Aenean et ultricies est.
      Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales
      nulla quis, *consequat* libero. Here are
      some common categories:`}</c4d-callout-with-media-copy
    >
    <c4d-callout-with-media-image
      alt="Image alt text"
      default-src="${imgLg16x9}"
      heading="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
    </c4d-callout-with-media-image>
  </c4d-callout-with-media>
`;

export const cardGroup = html`
  <c4d-card-group>
    ${cardGroupItem1}${cardGroupItem2}${cardGroupItem1}
    ${cardGroupItem2}${cardGroupItem1}${cardGroupItem2}
  </c4d-card-group>
`;

export const cardInCard = html`
  <c4d-card-in-card href="https://example.com" cta-type="local">
    <c4d-card-in-card-image slot="image" default-src="${imgLg16x9}">
      <c4d-image-item media="(min-width: 1312px)" srcset="${imgXlg16x9}">
      </c4d-image-item>
      <c4d-image-item media="(min-width: 672px)" srcset="${imgMd16x9}">
      </c4d-image-item>
      <c4d-image-item media="(min-width: 320px)" srcset="${imgSm4x3}">
      </c4d-image-item>
    </c4d-card-in-card-image>
    <c4d-card-eyebrow>Label</c4d-card-eyebrow>
    <c4d-card-heading
      >Standard Bank Group prepares to embrace Africa’s AI
      opportunity</c4d-card-heading
    >
    <c4d-card-footer></c4d-card-footer>
  </c4d-card-in-card>
`;

export const carousel = html`
  <c4d-carousel>
    ${imageCard}${videoCard}${imageCard}${videoCard}${imageCard}${videoCard}
  </c4d-carousel>
`;

export const contentBlock = html`
  <c4d-content-block>
    <c4d-content-block-heading
      >What is the latest news in artificial
      intelligence?</c4d-content-block-heading
    >
    <c4d-content-block-copy
      >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quam ante,
      mattis id pellentesque at, molestie et ipsum. Proin sodales est hendrerit
      maximus malesuada. Orci varius natoque penatibus et magnis dis parturient
      montes, nascetur ridiculus mus. Etiam at arcu ligula. Praesent faucibus
      est ligula, vitae finibus ante aliquet a.</c4d-content-block-copy
    >
    <c4d-card slot="footer" cta-type="local" href="https://www.example.com">
      <c4d-card-heading>Learn more about natural processing</c4d-card-heading>
      <c4d-card-footer></c4d-card-footer>
    </c4d-card>
  </c4d-content-block>
`;

export const contentGroup = html`
  <c4d-content-group>
    <c4d-content-group-heading
      >Natural language processing (NLP)</c4d-content-group-heading
    >
    <c4d-content-group-copy
      >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quam ante,
      mattis id pellentesque at, molestie et ipsum. Proin sodales est hendrerit
      maximus malesuada. Orci varius natoque penatibus et magnis dis parturient
      montes, nascetur ridiculus mus. Etiam at arcu ligula. Praesent faucibus
      est ligula, vitae finibus ante aliquet a.
    </c4d-content-group-copy>
    ${card(`Learn more about natual language processing`)}
  </c4d-content-group>
`;

export const contentItem = html`
  <c4d-content-item>
    <c4d-content-item-heading
      >Natural language understanding</c4d-content-item-heading
    >
    <c4d-content-item-copy
      >${`This area of NLP takes “real world” text and applies a symbolic system
     for a machine to interpret its meaning, using formal logic; structures that describe the various 
     relationships between concepts (ontologies); and other semantic tools.`}</c4d-content-item-copy
    >
    <c4d-link-with-icon
      slot="footer"
      cta-type="local"
      href="https://www.example.com">
      Learn more about NLP</c4d-link-with-icon
    >
  </c4d-content-item>
`;

export const contentItemRow = ({
  thumbnail = false,
  image = false,
} = {}) => html`
  <c4d-content-item-row ?thumbnail=${thumbnail}>
    ${image
      ? html`<c4d-image
          slot="media"
          alt="Alt text"
          default-src="${imgLg16x9}"></c4d-image>`
      : ''}
    <c4d-content-item-row-eyebrow>Lorem ipsum</c4d-content-item-row-eyebrow>
    <c4d-content-item-heading>Aliquam condimentum</c4d-content-item-heading>
    <c4d-content-item-row-copy
      >Lorem ipsum dolor sit amet, _consectetur_ adipiscing elit. Aenean et
      ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit
      sollicitudin.</c4d-content-item-row-copy
    >
    <c4d-link-list slot="footer" type="vertical">
      <c4d-link-list-item-cta
        icon-placement="right"
        href="https://www.ibm.com"
        cta-type="local">
        Learn more
      </c4d-link-list-item-cta>
      <c4d-link-list-item-cta
        icon-placement="right"
        href="https://www.ibm.com"
        cta-type="external">
        Microservices and containers
      </c4d-link-list-item-cta>
    </c4d-link-list>
    ${thumbnail
      ? html`<c4d-image
          slot="thumbnail"
          alt="Alt text"
          default-src="${imgLg16x9}"></c4d-image>`
      : ''}
  </c4d-content-item-row>
`;

export const contentItemRowStory = html`${contentItemRow()}${contentItemRow({
  thumbnail: true,
})}${contentItemRow({ image: true })}`;

export const ctaBlock = html`
  <c4d-cta-block no-border>
    <c4d-content-block-heading>Take the next step</c4d-content-block-heading>
    <c4d-content-block-copy
      >Want to discuss your options with a DevOps expert? Contact our sales team
      to evaluate your needs.</c4d-content-block-copy
    >

    <c4d-button-group slot="action">
      <c4d-button-group-item href="https://example.com">
        Secondary Button
      </c4d-button-group-item>
      <c4d-button-group-item ref="https://example.com">
        Primary button
      </c4d-button-group-item>
    </c4d-button-group>

    <c4d-cta-block-item-row>
      <c4d-cta-block-item>
        <c4d-content-item-heading>Get connected</c4d-content-item-heading>
        <c4d-content-item-copy
          >IBM DevOps partners have a wide range of expertise. Find one to build
          that right solution for you.</c4d-content-item-copy
        >
        <c4d-text-cta
          slot="footer"
          cta-type="local"
          icon-placement="right"
          href="example.com"
          >Find a partner</c4d-text-cta
        >
      </c4d-cta-block-item>

      <c4d-cta-block-item>
        <c4d-content-item-heading>Learn how</c4d-content-item-heading>
        <c4d-content-item-copy
          >Dig into more self-directed larning about DevOps
          methodologies.</c4d-content-item-copy
        >
        <c4d-text-cta
          slot="footer"
          cta-type="local"
          icon-placement="right"
          href="example.com"
          >Browse tutorials</c4d-text-cta
        >
      </c4d-cta-block-item>

      <c4d-cta-block-item>
        <c4d-content-item-heading>Learn how</c4d-content-item-heading>
        <c4d-content-item-copy
          >Dig into more self-directed larning about DevOps
          methodologies.</c4d-content-item-copy
        >
        <c4d-text-cta
          slot="footer"
          cta-type="local"
          icon-placement="right"
          href="example.com"
          >Browse tutorials</c4d-text-cta
        >
      </c4d-cta-block-item>
    </c4d-cta-block-item-row>
  </c4d-cta-block>
`;

export const featureCard = html`
  <c4d-feature-card cta-type="local" href="https://example.com">
    <c4d-image
      slot="image"
      alt="Image alt text"
      default-src="${imgLg16x9}"></c4d-image>
    <c4d-card-heading>Natural language processing (NLP)</c4d-card-heading>
    <c4d-feature-card-footer> </c4d-feature-card-footer>
  </c4d-feature-card>
`;

export const linkListItemCopy = [
  'Learn more about Kubernetes',
  'Containerization A Complete Guide',
  'Microservices and containers',
];

export const linkListItem = ({ copy = '' } = {}) => html`
  <c4d-link-list-item href="https://example.com">
    <p>${copy}</p>
    <svg
      slot="icon"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 20 20">
      <path
        d="M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z"></path>
    </svg>
  </c4d-link-list-item>
`;

export const linkList = html`
  <c4d-link-list type="end">
    <c4d-link-list-heading>Tutorial</c4d-link-list-heading>
    ${linkListItem({ copy: linkListItemCopy[0] })}
    ${linkListItem({ copy: linkListItemCopy[1] })}
    ${linkListItem({ copy: linkListItemCopy[2] })}
  </c4d-link-list>
`;

export const quote = html`
  <c4d-quote inverse mark-type="double-curved">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus est purus,
    posuere at est vitae, ornare rhoncus sem. Suspendisse vitae tellus
    fermentum, hendrerit augue eu, placerat magna.
    <c4d-quote-source-heading>
      Lorem ipsum dolor sit amet
    </c4d-quote-source-heading>
    <c4d-quote-source-copy> consectetur adipiscing elit </c4d-quote-source-copy>
    <c4d-quote-source-bottom-copy> IBM Cloud </c4d-quote-source-bottom-copy>
    <c4d-quote-link-with-icon
      slot="footer"
      href="https://example.com"
      cta-type="local">
      Link with Icon
    </c4d-quote-link-with-icon>
  </c4d-quote>
`;

export const structuredList = html`
  <c4d-structured-list>
    <c4d-structured-list-head>
      <c4d-structured-list-header-row>
        <c4d-structured-list-header-cell
          >Column A</c4d-structured-list-header-cell
        >
        <c4d-structured-list-header-cell
          >Column B</c4d-structured-list-header-cell
        >
        <c4d-structured-list-header-cell
          >Column C</c4d-structured-list-header-cell
        >
      </c4d-structured-list-header-row>
    </c4d-structured-list-head>
    <c4d-structured-list-body>
      <c4d-structured-list-row>
        <c4d-structured-list-cell>Row 1</c4d-structured-list-cell>
        <c4d-structured-list-cell>Row 1</c4d-structured-list-cell>
        <c4d-structured-list-cell>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
          magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere
          sem vel euismod dignissim.
        </c4d-structured-list-cell>
      </c4d-structured-list-row>
      <c4d-structured-list-row>
        <c4d-structured-list-cell>Row 2</c4d-structured-list-cell>
        <c4d-structured-list-cell>Row 2</c4d-structured-list-cell>
        <c4d-structured-list-cell>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
          magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere
          sem vel euismod dignissim.
        </c4d-structured-list-cell>
      </c4d-structured-list-row>
      <c4d-structured-list-row>
        <c4d-structured-list-cell>Row 3</c4d-structured-list-cell>
        <c4d-structured-list-cell>Row 3</c4d-structured-list-cell>
        <c4d-structured-list-cell>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dui
          magna, finibus id tortor sed, aliquet bibendum augue. Aenean posuere
          sem vel euismod dignissim.
        </c4d-structured-list-cell>
      </c4d-structured-list-row>
    </c4d-structured-list-body>
  </c4d-structured-list>
`;

export const tabsExtended = html`
  <c4d-tabs-extended orientation="horizontal">
    <c4d-tab label="First tab">
      <p>Content for first tab goes here.</p>
    </c4d-tab>
    <c4d-tab label="Second tab">
      <p>Content for second tab goes here.</p>
    </c4d-tab>
    <c4d-tab label="Third tab" selected="true">
      <p>Content for third tab goes here.</p>
    </c4d-tab>
    <c4d-tab label="Fourth tab">
      <p>Content for fourth tab goes here.</p>
    </c4d-tab>
    <c4d-tab label="Fifth tab" disabled="true">
      <p>Content for fifth tab goes here.</p>
    </c4d-tab>
  </c4d-tabs-extended>
`;

export const videoPlayer = html`
  <c4d-video-player-container id="my-video" video-id="0_ibuqxqbe">
  </c4d-video-player-container>
`;
