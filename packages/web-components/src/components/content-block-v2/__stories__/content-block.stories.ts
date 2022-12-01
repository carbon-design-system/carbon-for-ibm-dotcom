/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../index';
import '../../cta/index';
import '../../card-link/index';
import '../../content-item/index';
import '../../content-group-simple/index';
import '../../callout-quote/index';

import { html } from 'lit-element';
import { boolean, optionsKnob } from '@storybook/addon-knobs';
import ArrowRight20 from '@carbon/carbon-web-components/es/icons/arrow--right/20.js';
import { CONTENT_BLOCK_COMPLEMENTARY_STYLE_SCHEME } from '../content-block';
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--002.jpg';
import imgMd16x9 from '../../../../../storybook-images/assets/480/fpo--16x9--480x270--002.jpg';
import imgSm16x9 from '../../../../../storybook-images/assets/320/fpo--16x9--320x180--002.jpg';
import readme from './README.stories.mdx';

const itemsHeading = 'Lorem ipsum dolor sit amet.';

const copyWithList = `Lorem ipsum *dolor* sit amet, consectetur adipiscing elit. Aenean et ultricies est.
  Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales
  nulla quis, *consequat* libero. Here are
  some common categories:
  Lorem ipsum dolor sit amet, [consectetur adipiscing](https://www.ibm.com) elit.
  Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
  Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
  Aenean et ultricies est.
  Mauris iaculis eget dolor nec hendrerit.
  Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.

  - [list item](https://www.ibm.com)
    - list item 1a
  1. list item 2
    1. list item 2a
`;

const itemsCopy = `Lorem ipsum dolor sit amet, *consectetur* adipiscing elit.
  Vivamus sed interdum tortor. Sed id pellentesque diam.
  In ut quam id mauris finibus efficitur quis ut arcu.
  Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem.
  Curabitur pretium elit non blandit lobortis.
  Donec quis pretium odio, in dignissim sapien.`;

const items = [
  {
    itemsHeading,
    itemsCopy,
  },
  {
    itemsHeading,
    itemsCopy: copyWithList,
  },
  {
    itemsHeading,
    itemsCopy,
  },
];

const image = html`
  <dds-image
    slot="media"
    alt="Image alt text"
    default-src="${imgLg16x9}"
    heading="Lorem ipsum dolor sit amet."
  >
    <dds-image-item media="(min-width: 672px)" srcset="${imgLg16x9}">
    </dds-image-item>
    <dds-image-item media="(min-width: 400px)" srcset="${imgMd16x9}">
    </dds-image-item>
    <dds-image-item media="(min-width: 320px)" srcset="${imgSm16x9}">
    </dds-image-item>
  </dds-image>
`;

export const Default = (args) => {
  const { padding, heading, copy, showCopy, contentItem, contentGroupSimple, calloutQuote, contentGroupWithCardGroup, cardGroup, contentGroupPictograms, contentGroupWithPictograms, contentItemHorizontalMediaFeatured, contentItemHorizontalMedia, contentItemHorizontal, largeCardGroup, showCTA, border } =
    args?.ContentBlock ?? {};
  return html`
    <dds-content-block-v2 ?border=${border} ?padding=${padding}
    >
      ${heading
        ? html`
            <dds-content-block-heading
              >What is the latest news in artificial
              intelligence?</dds-content-block-heading
            >
          `
        : ''}
      ${showCopy
        ? html` <dds-content-block-copy>${copy}</dds-content-block-copy> `
        : ``}
      ${contentItem ?
        html`
        <dds-content-item>
                <dds-content-item-copy
                  >Content Item. Optional body copy for content block
                  $body-long-02 In ut quam id mauris finibus efficitur quis ut
                  arcu. Praesent purus turpis, venenatis eget odio et, tincidunt
                  bibendum sem. Curabitur pretium elit non blandit lobortis.
                  Donec quis pretium odio, in dignissim
                  sapien.</dds-content-item-copy
                >
                <dds-text-cta
                  slot="footer"
                  cta-type="local"
                  href="https://www.example.com"
                  >Optional CTA</dds-text-cta
                >
              </dds-content-item>
      
        `
      : ''}
      ${contentGroupSimple ? html`
      <dds-content-group-simple>
                <dds-content-group-heading
                  >newww Curabitur malesuada varius mi eu
                  posuere</dds-content-group-heading
                >
                <dds-content-group-copy
                  >Lorem ipsum *dolor* sit amet</dds-content-group-copy
                >
                <dds-image
                  slot="media"
                  alt="Image alt text"
                  default-src="https://fpoimg.com/672x378?text=16:9&bg_color=ee5396&text_color=161616"
                  heading="Curabitur malesuada varius mi eu posuere"
                >
                  <dds-image-item
                    media="(min-width: 672px)"
                    srcset="https://fpoimg.com/672x378?text=16:9&bg_color=ee5396&text_color=161616"
                  >
                  </dds-image-item>
                  <dds-image-item
                    media="(min-width: 400px)"
                    srcset="https://fpoimg.com/400x225?text=16:9&bg_color=ee5396&text_color=161616"
                  >
                  </dds-image-item>
                  <dds-image-item
                    media="(min-width: 320px)"
                    srcset="https://fpoimg.com/672x672?text=16:9&bg_color=ee5396&text_color=161616"
                  >
                  </dds-image-item>
                </dds-image>

                <dds-card-link-cta
                  slot="footer"
                  href="https://www.ibm.com/"
                  cta-type="local"
                >
                  <dds-card-link-heading
                    >Lorem ipsum dolor sit amet</dds-card-link-heading
                  >
                  <dds-card-cta-footer> </dds-card-cta-footer>
                </dds-card-link-cta>
              </dds-content-group-simple>
              
      ` : ``}
      ${calloutQuote ? html`
      <dds-callout-quote mark-type="double-curved">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                est purus, posuere at est vitae, ornare rhoncus sem. Suspendisse
                vitae tellus fermentum, hendrerit augue eu, placerat magna.
                <dds-quote-source-heading>
                  Lorem ipsum dolor sit amet
                </dds-quote-source-heading>
                <dds-quote-source-copy>
                  consectetur adipiscing elit
                </dds-quote-source-copy>
                <dds-quote-source-bottom-copy>
                  IBM Cloud
                </dds-quote-source-bottom-copy>
              </dds-callout-quote>
      ` : ``}
      ${contentGroupWithCardGroup ? html`
      <dds-content-group>
                <dds-content-group-heading
                  >Content group WITH CARD GROUP
                  $expressive-heading-04</dds-content-group-heading
                >
                <dds-content-group-copy
                  >Optional body copy for content group $body-long-02 In ut quam
                  id mauris finibus efficitur quis ut arcu. Praesent purus
                  turpis, venenatis eget odio et, tincidunt bibendum sem.
                  Curabitur pretium elit non blandit lobortis. Donec quis
                  pretium odio, in dignissim sapien.</dds-content-group-copy
                >
                <dds-card-group>
                  <dds-card-group-item
                    cta-type="local"
                    href="https://example.com"
                  >
                    <dds-image
                      slot="image"
                      alt="alt text"
                      default-src="https://fpoimg.com/672x672?text=1:1&bg_color=ee5396&text_color=161616"
                    ></dds-image>
                    <dds-card-heading>Nunc convallis lobortis</dds-card-heading>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Aenean et ultricies est. Mauris iaculis eget dolor nec
                      hendrerit. Phasellus at elit sollicitudin, sodales nulla
                      quis, consequat libero.
                    </p>
                    <dds-card-cta-footer slot="footer"> </dds-card-cta-footer>
                  </dds-card-group-item>
                  <dds-card-group-item
                    cta-type="local"
                    href="https://example.com"
                  >
                    <dds-image
                      slot="image"
                      alt="alt text"
                      default-src="https://fpoimg.com/672x672?text=1:1&bg_color=ee5396&text_color=161616"
                    ></dds-image>
                    <dds-card-heading>Nunc convallis lobortis</dds-card-heading>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Aenean et ultricies est. Mauris iaculis eget dolor nec
                      hendrerit. Phasellus at elit sollicitudin, sodales nulla
                      quis, consequat libero.
                    </p>
                    <dds-card-cta-footer slot="footer"> </dds-card-cta-footer>
                  </dds-card-group-item>
                  <dds-card-group-item
                    cta-type="local"
                    href="https://example.com"
                  >
                    <dds-image
                      slot="image"
                      alt="alt text"
                      default-src="https://fpoimg.com/672x672?text=1:1&bg_color=ee5396&text_color=161616"
                    ></dds-image>
                    <dds-card-heading>Nunc convallis lobortis</dds-card-heading>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Aenean et ultricies est. Mauris iaculis eget dolor nec
                      hendrerit. Phasellus at elit sollicitudin, sodales nulla
                      quis, consequat libero.
                    </p>
                    <dds-card-cta-footer slot="footer"> </dds-card-cta-footer>
                  </dds-card-group-item>
                </dds-card-group>
                <!-- <dds-card-link-cta
                  slot="footer"
                  cta-type="local"
                  href="https://www.example.com"
                >
                  <dds-card-link-heading>cta copy</dds-card-link-heading>
                  <dds-card-cta-footer></dds-card-cta-footer>
                </dds-card-link-cta> -->
              </dds-content-group>
      `: ''}
      ${cardGroup? html`
        <dds-card-group>
                <dds-card-group-item
                  cta-type="local"
                  href="https://example.com"
                >
                  <dds-image
                    slot="image"
                    alt="alt text"
                    default-src="https://fpoimg.com/672x672?text=1:1&bg_color=ee5396&text_color=161616"
                  ></dds-image>
                  <dds-card-heading>Nunc convallis lobortis</dds-card-heading>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean et ultricies est. Mauris iaculis eget dolor nec
                    hendrerit. Phasellus at elit sollicitudin, sodales nulla
                    quis, consequat libero.
                  </p>
                  <dds-card-cta-footer slot="footer"> </dds-card-cta-footer>
                </dds-card-group-item>
                <dds-card-group-item
                  cta-type="local"
                  href="https://example.com"
                >
                  <dds-image
                    slot="image"
                    alt="alt text"
                    default-src="https://fpoimg.com/672x672?text=1:1&bg_color=ee5396&text_color=161616"
                  ></dds-image>
                  <dds-card-heading>Nunc convallis lobortis</dds-card-heading>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean et ultricies est. Mauris iaculis eget dolor nec
                    hendrerit. Phasellus at elit sollicitudin, sodales nulla
                    quis, consequat libero.
                  </p>
                  <dds-card-cta-footer slot="footer"> </dds-card-cta-footer>
                </dds-card-group-item>
                <dds-card-group-item
                  cta-type="local"
                  href="https://example.com"
                >
                  <dds-image
                    slot="image"
                    alt="alt text"
                    default-src="https://fpoimg.com/672x672?text=1:1&bg_color=ee5396&text_color=161616"
                  ></dds-image>
                  <dds-card-heading>Nunc convallis lobortis</dds-card-heading>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean et ultricies est. Mauris iaculis eget dolor nec
                    hendrerit. Phasellus at elit sollicitudin, sodales nulla
                    quis, consequat libero.
                  </p>
                  <dds-card-cta-footer slot="footer"> </dds-card-cta-footer>
                </dds-card-group-item>
              </dds-card-group>
        `: ``}
      ${contentGroupPictograms ? html`
      <dds-content-group-pictograms>
                <dds-content-group-heading
                  >Content Group Pictograms</dds-content-group-heading
                >
                <dds-content-group-copy
                  >Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vestibulum nonporttitor libero, in venenatis magna. Lorem
                  ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
                  non porttitor libero, in venenatis magna. Lorem ipsum dolor
                  sit amet, consectetur adipiscing elit. Vestibulum non
                  porttitor libero, in venenatis magna.
                </dds-content-group-copy>
                <dds-pictogram-item>
                  <svg
                    slot="pictogram"
                    focusable="false"
                    preserveAspectRatio="xMidYMid meet"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="currentColor"
                    data-autoid="dds--pictogram-item__pictogram"
                    aria-label="Pictogram description"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    role="img"
                    class="bx--pictogram-item__pictogram"
                  >
                    <path
                      fill="none"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      stroke-width=".72"
                      d="M37,32 H11c-1.1,0-2-0.9-2-2V13c0-1.1,0.9-2,2-2h26c1.1,
                              0,2,0.9,2,2v17C39,31.1,38.1,32,37,32z M17,37h14 M24,32v5 M9,27h30"
                    ></path>
                  </svg>
                  <dds-content-item-heading>
                    Aliquam condimentum interdum
                  </dds-content-item-heading>
                  <dds-content-item-copy
                    >Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vestibulum non porttitor libero, in venenatis magna.
                  </dds-content-item-copy>
                  <dds-link-with-icon
                    href="https://www.example.com"
                    slot="footer"
                  >
                    Aliquam condimentum interdum
                    <svg
                      slot="icon"
                      focusable="false"
                      preserveAspectRatio="xMidYMid meet"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      aria-hidden="true"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z"
                      ></path>
                    </svg>
                  </dds-link-with-icon>
                </dds-pictogram-item>
                <dds-pictogram-item>
                  <svg
                    slot="pictogram"
                    focusable="false"
                    preserveAspectRatio="xMidYMid meet"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="currentColor"
                    data-autoid="dds--pictogram-item__pictogram"
                    aria-label="Pictogram description"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    role="img"
                    class="bx--pictogram-item__pictogram"
                  >
                    <path
                      fill="none"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      stroke-width=".72"
                      d="M37,32 H11c-1.1,0-2-0.9-2-2V13c0-1.1,0.9-2,2-2h26c1.1,
                                0,2,0.9,2,2v17C39,31.1,38.1,32,37,32z M17,37h14 M24,32v5 M9,27h30"
                    ></path>
                  </svg>
                  <dds-content-item-heading>
                    Aliquam condimentum interdum
                  </dds-content-item-heading>
                  <dds-content-item-copy
                    >Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vestibulum non porttitor libero, in venenatis magna.
                  </dds-content-item-copy>
                  <dds-link-with-icon
                    href="https://www.example.com"
                    slot="footer"
                  >
                    Aliquam condimentum interdum
                    <svg
                      slot="icon"
                      focusable="false"
                      preserveAspectRatio="xMidYMid meet"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      aria-hidden="true"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z"
                      ></path>
                    </svg>
                  </dds-link-with-icon>
                </dds-pictogram-item>
              </dds-content-group-pictograms>
      `: ``}
      ${contentGroupWithPictograms ? html`
      <dds-content-group>
                <dds-content-group-heading
                  >Content Group heading</dds-content-group-heading
                >
                <dds-content-group-copy
                  >Contains Pictogram items</dds-content-group-copy
                >
                <dds-pictogram-item>
                  <svg
                    slot="pictogram"
                    focusable="false"
                    preserveAspectRatio="xMidYMid meet"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="currentColor"
                    data-autoid="dds--pictogram-item__pictogram"
                    aria-label="Pictogram description"
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    role="img"
                    class="bx--pictogram-item__pictogram"
                  >
                    <path
                      fill="none"
                      stroke-linejoin="round"
                      stroke-miterlimit="10"
                      stroke-width=".72"
                      d="M37,32 H11c-1.1,0-2-0.9-2-2V13c0-1.1,0.9-2,2-2h26c1.1,0,2,0.9,2,2v17C39,31.1,38.1,32,37,32z M17,37h14 M24,32v5 M9,27h30"
                    ></path>
                  </svg>
                  <dds-content-item-heading
                    >Lorem ipsum dolor sit</dds-content-item-heading
                  >
                  <dds-content-item-copy
                    >Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam</dds-content-item-copy
                  >
                  <dds-link-with-icon slot="footer">
                    Lorem ipsum dolor
                    <svg
                      slot="icon"
                      focusable="false"
                      preserveAspectRatio="xMidYMid meet"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z"
                      ></path>
                    </svg>
                  </dds-link-with-icon>
                </dds-pictogram-item>
                <!-- <dds-card-link-cta
                  slot="footer"
                  cta-type="local"
                  href="https://www.example.com"
                >
                  <dds-card-link-heading>cta copy</dds-card-link-heading>
                  <dds-card-cta-footer></dds-card-cta-footer>
                </dds-card-link-cta> -->
              </dds-content-group>
      `: ``}
      ${contentItemHorizontalMediaFeatured ? html`
      <dds-content-item-horizontal-media-featured>
                <dds-content-item-horizontal-eyebrow
                  >Lorem ipsum</dds-content-item-horizontal-eyebrow
                >
                <dds-content-item-heading
                  >Content Item Horizontal Featured Media in Content
                  block</dds-content-item-heading
                >
                <dds-content-item-horizontal-media-copy
                  >Lorem ipsum dolor sit amet, _consectetur_ adipiscing elit.
                  Aenean et ultricies est. Mauris iaculis eget dolor nec
                  hendrerit. Phasellus at elit sollicitudin.
                </dds-content-item-horizontal-media-copy>
                <dds-link-list slot="footer" type="vertical">
                  <dds-link-list-item-cta
                    icon-placement="right"
                    href="https://www.ibm.com"
                    cta-type="local"
                  >
                    Learn more
                  </dds-link-list-item-cta>
                  <dds-link-list-item-cta
                    icon-placement="right"
                    href="https://www.ibm.com"
                    cta-type="external"
                  >
                    Microservices and containers
                  </dds-link-list-item-cta>
                </dds-link-list>
                <dds-image
                  slot="media"
                  alt="Image alt text"
                  default-src="https://fpoimg.com/672x336?text=2:1&bg_color=ee5396&text_color=161616"
                >
                </dds-image>
              </dds-content-item-horizontal-media-featured>
      ` : ``}
      ${contentItemHorizontalMedia ? html`
      <dds-content-item-horizontal-media align="right">
                <dds-image
                  slot="media"
                  alt="Image alt text"
                  default-src="https://fpoimg.com/672x336?text=2:1&bg_color=ee5396&text_color=161616"
                >
                </dds-image>
                <dds-content-item-heading
                  >Content item horizontal with media in Content
                  Block</dds-content-item-heading
                >
                <dds-content-item-horizontal-media-copy
                  >Lorem Ipsum</dds-content-item-horizontal-media-copy
                >
                <dds-link-list slot="footer" type="vertical">
                  <dds-link-list-item-cta
                    icon-placement="right"
                    href="https://www.ibm.com"
                    cta-type="local"
                  >
                    Learn more
                  </dds-link-list-item-cta>
                  <dds-link-list-item-cta
                    icon-placement="right"
                    href="https://www.ibm.com"
                    cta-type="external"
                  >
                    Microservices and containers
                  </dds-link-list-item-cta>
                </dds-link-list>
              </dds-content-item-horizontal-media>
      ` : ``}
      ${contentItemHorizontal ? html`
      <dds-content-item-horizontal>
                <dds-content-item-horizontal-eyebrow
                  >Content item horizontal</dds-content-item-horizontal-eyebrow
                >
                <dds-content-item-heading
                  >Aliquam condimentum</dds-content-item-heading
                >
                <dds-content-item-horizontal-copy
                  >Lorem ipsum dolor sit amet, _consectetur_ adipiscing elit.
                  Aenean et ultricies est. Mauris iaculis eget dolor nec
                  hendrerit. Phasellus at elit
                  sollicitudin.</dds-content-item-horizontal-copy
                >
                <dds-link-list slot="footer" type="vertical">
                  <dds-link-list-item-cta
                    icon-placement="right"
                    href="https://www.ibm.com"
                    cta-type="local"
                  >
                    Learn more
                  </dds-link-list-item-cta>
                  <dds-link-list-item-cta
                    icon-placement="right"
                    href="https://www.ibm.com"
                    cta-type="external"
                  >
                    Microservices and containers
                  </dds-link-list-item-cta>
                </dds-link-list>
              </dds-content-item-horizontal>
      `: ``}
      ${showCTA
        ? html`
            <dds-card-link-cta
              slot="footer"
              cta-type="local"
              href="https://www.example.com"
            >
              <dds-card-link-heading
                >Learn more about natual language
                processing</dds-card-link-heading
              >
              <dds-card-cta-footer></dds-card-cta-footer>
            </dds-card-link-cta>
          `
        : ``}
        ${largeCardGroup ? html`
        <dds-card-group>
                <dds-card-group-item
                  cta-type="local"
                  href="https://example.com"
                >
                  <dds-card-heading>Nunc convallis lobortis</dds-card-heading>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean et ultricies est. Mauris iaculis eget dolor nec
                    hendrerit. Phasellus at elit sollicitudin, sodales nulla
                    quis, consequat libero.
                  </p>
                  <dds-card-cta-footer slot="footer"> </dds-card-cta-footer>
                </dds-card-group-item>
                <dds-card-group-item
                  cta-type="local"
                  href="https://example.com"
                >
                  <dds-card-heading>Nunc convallis lobortis</dds-card-heading>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean et ultricies est. Mauris iaculis eget dolor nec
                    hendrerit. Phasellus at elit sollicitudin, sodales nulla
                    quis, consequat libero.
                  </p>
                  <dds-card-cta-footer slot="footer"> </dds-card-cta-footer>
                </dds-card-group-item>
                <dds-card-group-item
                  cta-type="local"
                  href="https://example.com"
                >
                  <dds-card-heading>Nunc convallis lobortis</dds-card-heading>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean et ultricies est. Mauris iaculis eget dolor nec
                    hendrerit. Phasellus at elit sollicitudin, sodales nulla
                    quis, consequat libero.
                  </p>
                  <dds-card-cta-footer slot="footer"> </dds-card-cta-footer>
                </dds-card-group-item>
                <dds-card-group-item
                  cta-type="local"
                  href="https://example.com"
                >
                  <dds-card-heading>Nunc convallis lobortis</dds-card-heading>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean et ultricies est. Mauris iaculis eget dolor nec
                    hendrerit. Phasellus at elit sollicitudin, sodales nulla
                    quis, consequat libero.
                  </p>
                  <dds-card-cta-footer slot="footer"> </dds-card-cta-footer>
                </dds-card-group-item>
                <dds-card-group-item
                  cta-type="local"
                  href="https://example.com"
                >
                  <dds-card-heading>Nunc convallis lobortis</dds-card-heading>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean et ultricies est. Mauris iaculis eget dolor nec
                    hendrerit. Phasellus at elit sollicitudin, sodales nulla
                    quis, consequat libero.
                  </p>
                  <dds-card-cta-footer slot="footer"> </dds-card-cta-footer>
                </dds-card-group-item>
                <dds-card-group-item
                  cta-type="local"
                  href="https://example.com"
                >
                  <dds-card-heading>Nunc convallis lobortis</dds-card-heading>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean et ultricies est. Mauris iaculis eget dolor nec
                    hendrerit. Phasellus at elit sollicitudin, sodales nulla
                    quis, consequat libero.
                  </p>
                  <dds-card-cta-footer slot="footer"> </dds-card-cta-footer>
                </dds-card-group-item>
              </dds-card-group>
        `: ``}
    </dds-content-block-v2>
  `;
};

export default {
  title: 'Components/Content block v2',
  decorators: [
    (story) => html`
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-lg-12">${story()}${story()}</div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      ContentBlock: () => ({
        padding: boolean('padding:', false),
        heading: boolean('Heading:', true),
        showCopy: boolean('Copy:', true),
        copy:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quam ante, mattis id pellentesque at,' +
          ' molestie et ipsum. Proin sodales est hendrerit maximus malesuada. Orci varius natoque penatibus et' +
          ' magnis dis parturient montes, nascetur ridiculus mus. Etiam at arcu ligula. Praesent faucibus est ' +
          'ligula, vitae finibus ante aliquet a.',

        // aside: boolean('Aside:', true),
        // addChildren: optionsKnob(
        //   'Add children:',
        //   {
        //     'Content group simple': 'Content group simple',
        //   },
        //   '',
        //   { display: 'multi-select' }
        // ),
        contentItem: boolean('contentItem', false),
        contentGroupSimple: boolean('contentGroupSimple', false),
        calloutQuote: boolean('calloutQuote', false),
        contentGroupWithCardGroup: boolean('contentGroupWithCardGroup', false),
        cardGroup: boolean('cardGroup', false),
        contentGroupPictograms: boolean('contentGroupPictograms', false),
        contentGroupWithPictograms: boolean('contentGroupWithPictograms', false),
        contentItemHorizontalMediaFeatured: boolean('contentItemHorizontalMediaFeatured', false),
        contentItemHorizontalMedia: boolean('contentItemHorizontalMedia', false),
        contentItemHorizontal: boolean('contentItemHorizontal', false),
        largeCardGroup: boolean('largeCardGroup', false),
        showCTA: boolean('CTA:', true),
        border: boolean('Border:', false),
      }),
    },
  
  },
};
