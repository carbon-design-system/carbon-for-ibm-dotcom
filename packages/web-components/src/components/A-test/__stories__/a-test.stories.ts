/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import '../../content-section/index';
import '../../content-block/index';
import '../../content-item/index';
import '../../content-group-simple/index';
import '../../content-group-pictograms/index';
import '../../cta/index';
import '../../content-item-horizontal/index';
import '../../card-group/index';
import '../../callout-quote/index';
// import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

/* eslint-disable max-len */

const contentItem = html`
  <dds-content-item>
    <dds-content-item-heading>Content item heading</dds-content-item-heading>
    <dds-content-item-copy
      >Content item copy. Content item copy. Content item copy. Content item copy. Content item copy. Content item copy. Content
      item copy. Content item copy. Content item copy.
    </dds-content-item-copy>
    <dds-text-cta slot="footer" cta-type="local" href="https://www.example.com">Content item CTA</dds-text-cta>
  </dds-content-item>
`;

const contentGroupSimple = html`
  <dds-content-group-simple>
    <dds-content-group-heading>Content Group Simple</dds-content-group-heading>
    <dds-content-group-copy
      >Content group copy. Content group copy. Content group copy. Content group copy. Content group copy. Content group copy.
      Content group copy. Content group copy. Content group copy. Content group copy.
    </dds-content-group-copy>
    <dds-image
      slot="media"
      alt="Image alt text"
      default-src="https://fpoimg.com/672x378?text=16:9&bg_color=ee5396&text_color=161616"
      heading="Curabitur malesuada varius mi eu posuere"
    >
    </dds-image>
    <dds-card-link-cta slot="footer" href="https://www.ibm.com/" cta-type="local">
      <dds-card-link-heading>Lorem ipsum dolor sit amet</dds-card-link-heading>
      <dds-card-cta-footer> </dds-card-cta-footer>
    </dds-card-link-cta>
  </dds-content-group-simple>
`;

const contentGroupPictograms = html`
  <dds-content-group-pictograms>
    <dds-content-group-heading>Content Group Pictograms</dds-content-group-heading>
    <dds-content-group-copy
      >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nonporttitor libero, in venenatis magna. Lorem ipsum
      dolor sit amet, consectetur adipiscing elit. Vestibulum non porttitor libero, in venenatis magna. Lorem ipsum dolor sit
      amet, consectetur adipiscing elit. Vestibulum non porttitor libero, in venenatis magna.
    </dds-content-group-copy>
    <dds-pictogram-item>
      <svg
        version="1.1"
        slot="pictogram"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="64"
        height="64"
        viewBox="8 8 32 32"
        xml:space="preserve"
        style="stroke: black"
      >
        <g>
          <g>
            <path
              style="fill:none;stroke-width:0.72;stroke-linejoin:round;stroke-miterlimit:10;"
              d="M15,29H9V10h25v19h-7
           M34,26h-7 M15,26H9 M30,29v8h9V21h-5 M30,34h9 M20.998,27.621c0-0.573-0.447-1.037-0.998-1.037s-0.998,0.464-0.998,1.037v2.378
           l-0.005-6.962c0-0.573-0.447-1.037-0.998-1.037S17,22.464,17,23.037v5.882v4.924C17,36.139,18.792,38,21.002,38
           S25,36.121,25,33.842v-5.04c0-0.573-0.447-1.037-0.998-1.037s-0.998,0.464-0.998,1.037v1.196l-0.005-1.935
           c0-0.573-0.447-1.037-0.998-1.037s-1.002,0.464-1.002,1.037l0.004,1.935L20.998,27.621z"
            />
          </g>
        </g>
        <g></g>
      </svg>
      <dds-content-item-heading>
        Aliquam condimentum interdum
      </dds-content-item-heading>
      <dds-content-item-copy
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non porttitor libero, in venenatis magna.
      </dds-content-item-copy>
      <dds-link-with-icon href="https://www.example.com" slot="footer">
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
          <path d="M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z"></path>
        </svg>
      </dds-link-with-icon>
    </dds-pictogram-item>
  </dds-content-group-pictograms>
`;

const contentGroupWithPictogramItems = html`
  <dds-content-group>
    <dds-content-group-heading>Content Group heading</dds-content-group-heading>
    <dds-content-group-copy>Contains Pictogram items</dds-content-group-copy>
    <dds-pictogram-item>
      <svg
        version="1.1"
        slot="pictogram"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="64"
        height="64"
        viewBox="8 8 32 32"
        xml:space="preserve"
        style="stroke: black"
      >
        <g>
          <g>
            <path
              style="fill:none;stroke-width:0.72;stroke-linejoin:round;stroke-miterlimit:10;"
              d="M15,29H9V10h25v19h-7
       M34,26h-7 M15,26H9 M30,29v8h9V21h-5 M30,34h9 M20.998,27.621c0-0.573-0.447-1.037-0.998-1.037s-0.998,0.464-0.998,1.037v2.378
       l-0.005-6.962c0-0.573-0.447-1.037-0.998-1.037S17,22.464,17,23.037v5.882v4.924C17,36.139,18.792,38,21.002,38
       S25,36.121,25,33.842v-5.04c0-0.573-0.447-1.037-0.998-1.037s-0.998,0.464-0.998,1.037v1.196l-0.005-1.935
       c0-0.573-0.447-1.037-0.998-1.037s-1.002,0.464-1.002,1.037l0.004,1.935L20.998,27.621z"
            />
          </g>
        </g>
        <g></g>
      </svg>
      <dds-content-item-heading>Lorem ipsum dolor sit</dds-content-item-heading>
      <dds-content-item-copy
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
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
          <path d="M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z"></path>
        </svg>
      </dds-link-with-icon>
    </dds-pictogram-item>
  </dds-content-group>
`;

export const Default = args => {
  return html`
    <dds-content-section children-custom-class="bx--col-lg-12 bx--no-gutter">
      <dds-content-section-heading>Content section heading</dds-content-section-heading>
      <dds-content-section-copy>Content section copy</dds-content-section-copy>
      <dds-text-cta slot="footer" cta-type="local" href="https://www.example.com">content section cta</dds-text-cta>

      <dds-content-block complementary-style-scheme="with-border">
        <dds-content-block-heading>1st Content Block</dds-content-block-heading>
        <dds-content-block-copy
          >Content block copy Content block copy Content block copy Content block copy Content block copy Content block copy
          Content block copy Content block copy Content block copy</dds-content-block-copy
        >
        ${contentItem} ${contentGroupSimple}

        <dds-content-group-simple>
          <dds-content-group-heading>Content group simple heading $expressive-heading-04</dds-content-group-heading>
          <dds-content-group-copy
            >Optional body copy for content group $body-long-02 In ut quam id mauris finibus efficitur quis ut arcu. Praesent
            purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis
            pretium odio, in dignissim sapien.</dds-content-group-copy
          >
          <!-- <dds-image
          slot="media"
          alt="alt text"
          default-src="https://fpoimg.com/672x336?text=2:1&bg_color=ee5396&text_color=161616"
          heading="Curabitur malesuada varius mi eu posuere"
        ></dds-image> -->
        </dds-content-group-simple>
        <dds-callout-quote mark-type="double-curved">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus est purus, posuere at est vitae, ornare rhoncus sem.
          Suspendisse vitae tellus fermentum, hendrerit augue eu, placerat magna.
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

        <dds-content-group>
          <dds-content-group-heading>Content group WITH CARD GROUP $expressive-heading-04</dds-content-group-heading>
          <dds-content-group-copy
            >Optional body copy for content group $body-long-02 In ut quam id mauris finibus efficitur quis ut arcu. Praesent
            purus turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec quis
            pretium odio, in dignissim sapien.</dds-content-group-copy
          >
          <dds-card-group>
            <dds-card-group-item cta-type="local" href="https://example.com">
              <dds-image
                slot="image"
                alt="alt text"
                default-src="https://fpoimg.com/672x672?text=1:1&bg_color=ee5396&text_color=161616"
              ></dds-image>
              <dds-card-heading>Nunc convallis lobortis</dds-card-heading>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec
                hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
              </p>
              <dds-card-cta-footer slot="footer"> </dds-card-cta-footer>
            </dds-card-group-item>
            <dds-card-group-item cta-type="local" href="https://example.com">
              <dds-image
                slot="image"
                alt="alt text"
                default-src="https://fpoimg.com/672x672?text=1:1&bg_color=ee5396&text_color=161616"
              ></dds-image>
              <dds-card-heading>Nunc convallis lobortis</dds-card-heading>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec
                hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
              </p>
              <dds-card-cta-footer slot="footer"> </dds-card-cta-footer>
            </dds-card-group-item>
            <dds-card-group-item cta-type="local" href="https://example.com">
              <dds-image
                slot="image"
                alt="alt text"
                default-src="https://fpoimg.com/672x672?text=1:1&bg_color=ee5396&text_color=161616"
              ></dds-image>
              <dds-card-heading>Nunc convallis lobortis</dds-card-heading>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec
                hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
              </p>
              <dds-card-cta-footer slot="footer"> </dds-card-cta-footer>
            </dds-card-group-item>
          </dds-card-group>
          <dds-card-link-cta slot="footer" cta-type="local" href="https://www.example.com">
            <dds-card-link-heading>cta copy</dds-card-link-heading>
            <dds-card-cta-footer></dds-card-cta-footer>
          </dds-card-link-cta>
        </dds-content-group>

        <dds-card-group>
          <dds-card-group-item cta-type="local" href="https://example.com">
            <dds-image
              slot="image"
              alt="alt text"
              default-src="https://fpoimg.com/672x672?text=1:1&bg_color=ee5396&text_color=161616"
            ></dds-image>
            <dds-card-heading>Nunc convallis lobortis</dds-card-heading>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec
              hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
            </p>
            <dds-card-cta-footer slot="footer"> </dds-card-cta-footer>
          </dds-card-group-item>
          <dds-card-group-item cta-type="local" href="https://example.com">
            <dds-image
              slot="image"
              alt="alt text"
              default-src="https://fpoimg.com/672x672?text=1:1&bg_color=ee5396&text_color=161616"
            ></dds-image>
            <dds-card-heading>Nunc convallis lobortis</dds-card-heading>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec
              hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
            </p>
            <dds-card-cta-footer slot="footer"> </dds-card-cta-footer>
          </dds-card-group-item>
          <dds-card-group-item cta-type="local" href="https://example.com">
            <dds-image
              slot="image"
              alt="alt text"
              default-src="https://fpoimg.com/672x672?text=1:1&bg_color=ee5396&text_color=161616"
            ></dds-image>
            <dds-card-heading>Nunc convallis lobortis</dds-card-heading>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec
              hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
            </p>
            <dds-card-cta-footer slot="footer"> </dds-card-cta-footer>
          </dds-card-group-item>
        </dds-card-group>
      </dds-content-block>
      <dds-content-block>
        <dds-content-block-heading>2nd Content Block</dds-content-block-heading>
        <dds-content-block-copy
          >Content block copy Content block copy Content block copy Content block copy Content block copy Content block copy
          Content block copy Content block copy Content block copy</dds-content-block-copy
        >
        ${contentGroupPictograms} ${contentGroupWithPictogramItems}
      </dds-content-block>

      <dds-content-block>
        <dds-content-block-heading>3rd Content Block</dds-content-block-heading>
        <dds-content-item-horizontal-media-featured>
          <dds-content-item-horizontal-eyebrow>Lorem ipsum</dds-content-item-horizontal-eyebrow>
          <dds-content-item-heading>Content Item Horizontal Featured Media in Content block</dds-content-item-heading>
          <dds-content-item-horizontal-media-copy
            >Lorem ipsum dolor sit amet, _consectetur_ adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec
            hendrerit. Phasellus at elit sollicitudin.
          </dds-content-item-horizontal-media-copy>
          <dds-link-list slot="footer" type="vertical">
            <dds-link-list-item-cta icon-placement="right" href="https://www.ibm.com" cta-type="local">
              Learn more
            </dds-link-list-item-cta>
            <dds-link-list-item-cta icon-placement="right" href="https://www.ibm.com" cta-type="external">
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
        <dds-content-item-horizontal-media align="right">
          <dds-image
            slot="media"
            alt="Image alt text"
            default-src="https://fpoimg.com/672x336?text=2:1&bg_color=ee5396&text_color=161616"
          >
          </dds-image>
          <dds-content-item-heading>Content item horizontal with media in Content Block</dds-content-item-heading>
          <dds-content-item-horizontal-media-copy>Lorem Ipsum</dds-content-item-horizontal-media-copy>
          <dds-link-list slot="footer" type="vertical">
            <dds-link-list-item-cta icon-placement="right" href="https://www.ibm.com" cta-type="local">
              Learn more
            </dds-link-list-item-cta>
            <dds-link-list-item-cta icon-placement="right" href="https://www.ibm.com" cta-type="external">
              Microservices and containers
            </dds-link-list-item-cta>
          </dds-link-list>
        </dds-content-item-horizontal-media>
        <dds-content-item-horizontal>
          <dds-content-item-horizontal-eyebrow>Content item horizontal</dds-content-item-horizontal-eyebrow>
          <dds-content-item-heading>Aliquam condimentum</dds-content-item-heading>
          <dds-content-item-horizontal-copy
            >Lorem ipsum dolor sit amet, _consectetur_ adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec
            hendrerit. Phasellus at elit sollicitudin.</dds-content-item-horizontal-copy
          >
          <dds-link-list slot="footer" type="vertical">
            <dds-link-list-item-cta icon-placement="right" href="https://www.ibm.com" cta-type="local">
              Learn more
            </dds-link-list-item-cta>
            <dds-link-list-item-cta icon-placement="right" href="https://www.ibm.com" cta-type="external">
              Microservices and containers
            </dds-link-list-item-cta>
          </dds-link-list>
        </dds-content-item-horizontal>
        <dds-card-group>
          <dds-card-group-item cta-type="local" href="https://example.com">
            <dds-card-heading>Nunc convallis lobortis</dds-card-heading>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec
              hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
            </p>
            <dds-card-cta-footer slot="footer"> </dds-card-cta-footer>
          </dds-card-group-item>
          <dds-card-group-item cta-type="local" href="https://example.com">
            <dds-card-heading>Nunc convallis lobortis</dds-card-heading>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec
              hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
            </p>
            <dds-card-cta-footer slot="footer"> </dds-card-cta-footer>
          </dds-card-group-item>
          <dds-card-group-item cta-type="local" href="https://example.com">
            <dds-card-heading>Nunc convallis lobortis</dds-card-heading>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec
              hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
            </p>
            <dds-card-cta-footer slot="footer"> </dds-card-cta-footer>
          </dds-card-group-item>
          <dds-card-group-item cta-type="local" href="https://example.com">
            <dds-card-heading>Nunc convallis lobortis</dds-card-heading>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec
              hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
            </p>
            <dds-card-cta-footer slot="footer"> </dds-card-cta-footer>
          </dds-card-group-item>
          <dds-card-group-item cta-type="local" href="https://example.com">
            <dds-card-heading>Nunc convallis lobortis</dds-card-heading>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec
              hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
            </p>
            <dds-card-cta-footer slot="footer"> </dds-card-cta-footer>
          </dds-card-group-item>
          <dds-card-group-item cta-type="local" href="https://example.com">
            <dds-card-heading>Nunc convallis lobortis</dds-card-heading>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec
              hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
            </p>
            <dds-card-cta-footer slot="footer"> </dds-card-cta-footer>
          </dds-card-group-item>
        </dds-card-group>
      </dds-content-block>
    </dds-content-section>
  `;
};

export default {
  title: 'Components/A Demo',
  decorators: [
    story => html`
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-lg-16 bx--no-gutter">
            <dds-video-container>
              ${story()}
            </dds-video-container>
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    hasStoryPadding: true,
    percy: {
      skip: true,
    },
    knobs: {
      escapeHTML: false,
      ContentSection: () => ({
        heading: textNullable('Heading:', 'Speech recognition (statistical Artificial Intelligence)'),
        copy: textNullable('Copy:', "AI features for understanding speech can be trained for a specific speaker's voice."),
      }),
    },
  },
};
