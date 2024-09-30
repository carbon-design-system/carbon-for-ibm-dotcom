/* eslint-disable max-len */
/**
 * Copyright IBM Corp. 2016, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import ArrowRight20 from '@carbon/web-components/es/icons/arrow--right/20.js';
import logosGroup from '../../../logo-grid/__stories__/data/logos.js';
import { TOC_TYPES } from '../../../table-of-contents/defs';

import '../../../card/index';
import '../../../cta/index';
import '../../../card-group/index';
import '../../../content-block/index';
import '../../../content-block-segmented/index';
import '../../../content-item-row/index';
import '../../../leadspace/index';
import '../../../image/index';
import '../../../leadspace-block/index';
import '../../../link-list/index';
import '../../../quote/index';
import '../../../cta-block/index';
import '../../../callout-quote/index';
import '../../../callout-with-media/index';
import '../../../table-of-contents/index';

import imgSm16x9 from '../../../../../.storybook/storybook-images/assets/320/fpo--16x9--320x180--002.jpg';
import imgMd16x9 from '../../../../../.storybook/storybook-images/assets/480/fpo--16x9--480x270--002.jpg';
import imgLg16x9 from '../../../../../.storybook/storybook-images/assets/720/fpo--16x9--720x405--002.jpg';
import imgLg1x1 from '../../../../../.storybook/storybook-images/assets/720/fpo--1x1--720x720--005.jpg';
import imgXlg4x3 from '../../../../../.storybook/storybook-images/assets/1312/fpo--4x3--1312x984--003.jpg';

import leadspaceImg from '../../../../../.storybook/storybook-images/assets/leadspace/fpo--leadspace--1584x560--002.jpg';

export const image = html`
  <c4d-image
    alt="Image alt text"
    default-src="${imgLg16x9}"
    heading="Lorem ipsum dolor sit amet, consectetur adipiscing elit.">
    <c4d-image-item media="(min-width: 672px)" srcset="${imgLg16x9}">
    </c4d-image-item>
    <c4d-image-item media="(min-width: 400px)" srcset="${imgMd16x9}">
    </c4d-image-item>
    <c4d-image-item media="(min-width: 320px)" srcset="${imgSm16x9}">
    </c4d-image-item>
  </c4d-image>
`;

export const contentBlockSegmentedItems = html`
  <c4d-content-block-segmented-item>
    <c4d-content-group-heading
      >A scelerisque purus semper eget duis at tellus.
    </c4d-content-group-heading>
    <c4d-content-item-copy
      >Elementum nibh tellus molestie nunc non. Habitant morbi tristique
      senectus et netus et malesuada fames.
    </c4d-content-item-copy>
    <c4d-text-cta
      slot="footer"
      cta-type="local"
      icon-placement="right"
      href="https://example.com"
      >Lorem Ipsum dolor sit</c4d-text-cta
    >
  </c4d-content-block-segmented-item>

  <c4d-content-block-segmented-item>
    <c4d-content-group-heading
      >A scelerisque purus semper eget duis at tellus.
    </c4d-content-group-heading>
    <c4d-content-item-copy
      >Elementum nibh tellus molestie nunc non. Habitant morbi tristique
      senectus et netus et malesuada fames.
    </c4d-content-item-copy>
  </c4d-content-block-segmented-item>
`;

export const contentBlockSegmentedItemsWithImage = html`
  <c4d-content-block-segmented-item>
    <c4d-content-group-heading
      >A scelerisque purus semper eget duis at tellus.
    </c4d-content-group-heading>
    <c4d-content-item-copy
      >Elementum nibh tellus molestie nunc non. Habitant morbi tristique
      senectus et netus et malesuada fames.
    </c4d-content-item-copy>
    ${image}
    <c4d-text-cta
      slot="footer"
      cta-type="local"
      icon-placement="right"
      href="https://example.com"
      >Lorem Ipsum dolor sit</c4d-text-cta
    >
  </c4d-content-block-segmented-item>
`;

export const contentItemHorizontal = html`
  <c4d-content-item-row>
    <c4d-content-item-row-eyebrow>Lorem ipsum</c4d-content-item-row-eyebrow>
    <c4d-content-item-heading>Aliquam condimentum</c4d-content-item-heading>
    <c4d-content-item-row-copy
      >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et
      ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at elit
      sollicitudin.</c4d-content-item-row-copy
    >
    <c4d-link-list slot="footer" type="vertical">
      <c4d-link-list-item-cta
        icon-placement="right"
        href="https://www.ibm.com"
        cta-type="local">
        Link text
      </c4d-link-list-item-cta>
      <c4d-link-list-item-cta
        icon-placement="right"
        href="https://www.ibm.com"
        cta-type="external">
        External link text
      </c4d-link-list-item-cta>
    </c4d-link-list>
  </c4d-content-item-row>
`;

export const globalBanner = (srcImage) => html`
  <c4d-global-banner image-width="4-col">
    <c4d-global-banner-image
      slot="image"
      default-src="${srcImage}"></c4d-global-banner-image>
    <c4d-global-banner-heading slot="heading"
      >heading</c4d-global-banner-heading
    >
    <c4d-global-banner-copy slot="copy">copy</c4d-global-banner-copy>
    <c4d-button
      slot="cta"
      cta-type="local"
      kind="tertiary"
      href="https://www.example.com">
      cta copy
    </c4d-button>
  </c4d-global-banner>
`;

export const cardGroupItems = html`
  <c4d-card-group-item href="https://example.com">
    <c4d-image slot="image" alt="Image alt text" default-src="${imgXlg4x3}">
    </c4d-image>
    <c4d-card-eyebrow>Topic</c4d-card-eyebrow>
    <c4d-card-heading>Natural Language Processing.</c4d-card-heading>
    <c4d-card-footer> ${ArrowRight20({ slot: 'icon' })} </c4d-card-footer>
  </c4d-card-group-item>
`;

export const contentLeadspace = html`
  <c4d-leadspace
    size="medium"
    gradient-style-scheme="true"
    alt=""
    default-src="${leadspaceImg}">
    <c4d-leadspace-heading>Leadspace Title</c4d-leadspace-heading>
    Use this area for a short line of copy to support the title
    <c4d-button-group slot="action">
      <c4d-button-group-item aria-label="" href="">test</c4d-button-group-item>
    </c4d-button-group>
    <c4d-image
      slot="image"
      class="cds--image"
      alt=""
      default-src="${leadspaceImg}">
      <c4d-image-item
        media="(min-width: 672px)"
        srcset="${leadspaceImg}"></c4d-image-item>
      <c4d-image-item
        media="(min-width: 0)"
        srcset="${leadspaceImg}"></c4d-image-item>
    </c4d-image>
  </c4d-leadspace>
`;

export const contentLeadspaceSearch = html`
  <c4d-leadspace-with-search
    adjacent-theme="white-and-g10"
    sticky-search
    scroll-behavior>
    <c4d-leadspace-heading highlight="Find a product -"
      >Find a product - Innovate like a startup, scale for the
      enterprise</c4d-leadspace-heading
    >
    <c4d-leadspace-with-search-copy>
      Automate your software release process with continuous delivery (CD)—the
      most critical part of adopting DevOps. Build, test, and deploy code
      changes quickly, ensuring software is always ready for deployment.
    </c4d-leadspace-with-search-copy>
    <c4d-search-with-typeahead
      slot="search"
      leadspace-search
      active
      should-remain-open></c4d-search-with-typeahead>
  </c4d-leadspace-with-search>
`;

export const tocContent = html`
  <a name="1" data-title="Lorem ipsum dolor sit amet"></a>
  <c4d-leadspace-block border>
    <c4d-leadspace-heading
      >Lorem ipsum dolor sit amet</c4d-leadspace-heading
    >
    <c4d-leadspace-block-content>
      <c4d-content-block-copy slot="copy"
        >Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
        ut aliquip ex ea commodo consequat.
      </c4d-content-block-copy>
      <c4d-leadspace-block-media>
        <c4d-video-player-container
          video-id="0_ibuqxqbe"></c4d-video-player-container>
      </c4d-leadspace-block-media>
      <c4d-link-list type="end">
        <c4d-link-list-heading>Featured products</c4d-link-list-heading>
        <c4d-link-list-item href="https://example.com">
          IBM Cloud Continuous Delivery ${ArrowRight20({ slot: 'icon' })}
        </c4d-link-list-item>
        <c4d-link-list-item href="https://example.com">
          UrbanCode ${ArrowRight20({ slot: 'icon' })}
        </c4d-link-list-item>
        <c4d-link-list-item href="https://example.com">
          View all products ${ArrowRight20({ slot: 'icon' })}
        </c4d-link-list-item>
      </c4d-link-list>
      <c4d>
      <c4d-button href="https://example.com" cta-type="local">
        Contact sales
      </c4d-button>
    </c4d-leadspace-block-content>
  </c4d-leadspace-block>

  <a name="2" data-title="Pharetra pharetra massa massa ultricies mi quis."></a>
  <c4d-content-block-segmented>
    <c4d-content-block-heading
      >Pharetra pharetra massa massa ultricies mi
      quis.</c4d-content-block-heading
    >
    ${Array.from([1, 2]).map(() => contentBlockSegmentedItems)}
  </c4d-content-block-segmented>
  <c4d-feature-card size="large" href="https://example.com">
    <c4d-image slot="image" alt="Image alt text" default-src="${imgLg1x1}">
      <c4d-image-item
        media="(min-width: 991px)"
        srcset="${imgLg1x1}"></c4d-image-item>
    </c4d-image>
    <c4d-card-eyebrow>scelerisque purus</c4d-card-eyebrow>
    <c4d-card-heading>Elementum nibh tellus molestie nunc?</c4d-card-heading>
    <p>
      Habitant morbi tristique senectus et netus et malesuada fames. Habitant
      morbu tristique.
    </p>
    <c4d-feature-card-footer>
      ${ArrowRight20({ slot: 'icon' })}
    </c4d-feature-card-footer>
  </c4d-feature-card>

  <a name="3" data-title="Elementum nibh tellus molestie nunc non."></a>
  <c4d-content-block-segmented>
    <c4d-content-block-heading
      >Elementum nibh tellus molestie nunc non.
    </c4d-content-block-heading>
    ${Array.from([1, 2]).map(() => contentBlockSegmentedItemsWithImage)}
    <c4d-card-cta slot="footer" cta-type="local" href="https://example.com">
      Lorem ipsum dolor
      <c4d-card-footer></c4d-card-footer>
    </c4d-card-cta>
  </c4d-content-block-segmented>

  <c4d-callout-with-media>
    <c4d-content-block-heading
      >Mauris ultrices eros in cursus</c4d-content-block-heading
    >
    <c4d-callout-with-media-copy size="sm"
      >Porttitor eget dolor morbi non arcu. Et ligula ullamcorper malesuada
      proin libero nunc consequat. In est ante in nibh mauris cursus mattis.
      Turpis tincidunt id aliquet risus feugiat in. Vel facilisis volutpat est
      velit egestas dui.
    </c4d-callout-with-media-copy>
    <c4d-callout-with-media-video
      video-id="0_ibuqxqbe"></c4d-callout-with-media-video>
  </c4d-callout-with-media>

  <a name="4" data-title="Tincidunt ornare massa"></a>
  <c4d-content-block-horizontal>
    <c4d-content-block-heading
      >Tincidunt ornare massa</c4d-content-block-heading
    >
    ${Array.from([1, 2]).map(() => contentItemHorizontal)}
  </c4d-content-block-horizontal>

  <a name="5" data-title="Lobortis elementum nibh tellus"></a>
  <c4d-logo-grid ?hide-border="true">
    <c4d-content-block-heading
      >Lobortis elementum nibh tellus</c4d-content-block-heading
    >
    ${
      logosGroup &&
      logosGroup.map(
        (elem) => html`
          <c4d-logo-grid-item
            default-src="${elem.imgSrc}"
            alt="${elem.altText}"></c4d-logo-grid-item>
        `
      )
    }
  </c4d-logo-grid>

  <a name="6" data-title="Aliquam condimentum interdum"></a>
  <c4d-content-block-cards>
    <c4d-content-block-heading
      >Aliquam condimentum interdum</c4d-content-block-heading
    >
    <c4d-card-group>
      ${Array.from([1, 2, 3]).map(() => cardGroupItems)}
    </c4d-card-group>
  </c4d-content-block-cards>
  <c4d-callout-quote>
    Duis aute irure dolor in reprehenderit
    <c4d-quote-source-heading>
      Lorem ipsum dolor sit amet
    </c4d-quote-source-heading>
    <c4d-quote-source-copy> consectetur adipiscing elit </c4d-quote-source-copy>
    <c4d-quote-source-bottom-copy> IBM Cloud </c4d-quote-source-bottom-copy>
    <c4d-callout-link-with-icon slot="footer" href="https://example.com" cta-type="local">
      Link with Icon
    </c4d-callout-link-with-icon>
  </c4d-callout-quote>

  <a name="7" data-title="Duis aute irure dolor in reprehenderit"></a>
  <c4d-cta-block no-border>
    <c4d-content-block-heading>Take the next step</c4d-content-block-heading>
    <c4d-content-block-copy
      >Want to discuss your options with a DevOps expert? <br />
      Contact our sales team to evaluate your needs.</c4d-content-block-copy
    >
    <c4d-button-group slot="action">
      <c4d-button-group-item href="https://example.com">
        Secondary Button ${ArrowRight20({ slot: 'icon' })}
      </c4d-button-group-item>
      <c4d-button-group-item href="https://example.com">
        Primary button ${ArrowRight20({ slot: 'icon' })}
      </c4d-button-group-item>
    </c4d-button-group>
    <c4d-cta-block-item-row no-border>
      <c4d-cta-block-item>
        <c4d-content-item-heading>Get connected</c4d-content-item-heading>
        <c4d-content-item-copy
          >IBM DevOps partners have a wide range of expertise. Find one to build
          the right solution for you.</c4d-content-item-copy
        >
        <c4d-text-cta
          slot="footer"
          cta-type="local"
          icon-placement="right"
          href="example.com">
          Find a partner
        </c4d-text-cta>
      </c4d-cta-block-item>
      <c4d-cta-block-item>
        <c4d-content-item-heading>Learn how</c4d-content-item-heading>
        <c4d-content-item-copy
          >IBM DevOps partners have a wide range of
          expertise</c4d-content-item-copy
        >
        <c4d-text-cta
          slot="footer"
          cta-type="local"
          icon-placement="right"
          href="example.com">
          Browse tutorials
        </c4d-text-cta>
      </c4d-cta-block-item>
    </c4d-cta-block-item-row>
  </c4d-cta-block>
`;

export const StoryContent = (
  config = {
    l1: false,
    leadspace: false,
    leadspaceSearch: false,
    tocLayout: TOC_TYPES.DEFAULT,
  }
) => {
  const mainClasses = [
    'cds--content',
    'c4d-ce-demo-devenv--ui-shell-content',
    config?.l1 ? 'has-l1' : null,
    config?.leadspace ? 'has-leadspace' : null,
  ]
    .filter((className) => className != null)
    .join(' ');

  return html`
    <div class="${mainClasses}">
      ${config?.leadspace ? contentLeadspace : null}
      ${config?.leadspaceSearch ? contentLeadspaceSearch : null}
      ${config?.tocLayout === TOC_TYPES.HORIZONTAL
        ? html`
            <c4d-table-of-contents
              stickyOffset="48"
              toc-layout=${config.tocLayout}>
              <div class="cds--row">
                <div class="cds--col-lg-12">${tocContent}</div>
              </div>
            </c4d-table-of-contents>
          `
        : html`
            <c4d-table-of-contents
              stickyOffset="48"
              toc-layout=${config.tocLayout}>
              ${tocContent}
            </c4d-table-of-contents>
          `}
    </div>
  `;
};

export const StoryContentNoToC = () =>
  html`
    <div
      class="c4d-ce-demo-devenv--ui-shell-content"
      style="padding-right:1rem">
      <div class="cds--grid cds--col-lg-8">
        ${contentLeadspaceSearch}

        <c4d-content-block-segmented>
          <c4d-content-block-heading
            >Pharetra pharetra massa massa ultricies mi
            quis.</c4d-content-block-heading
          >
          ${Array.from([1, 2]).map(() => contentBlockSegmentedItems)}
        </c4d-content-block-segmented>

        <c4d-feature-card size="large" href="https://example.com">
          <c4d-image
            slot="image"
            alt="Image alt text"
            default-src="${imgLg1x1}">
            <c4d-image-item
              media="(min-width: 991px)"
              srcset="${imgLg1x1}"></c4d-image-item>
          </c4d-image>
          <c4d-card-eyebrow>scelerisque purus</c4d-card-eyebrow>
          <c4d-card-heading
            >Elementum nibh tellus molestie nunc?</c4d-card-heading
          >
          <p>
            Habitant morbi tristique senectus et netus et malesuada fames.
            Habitant morbu tristique.
          </p>
          <c4d-feature-card-footer>
            ${ArrowRight20({ slot: 'icon' })}
          </c4d-feature-card-footer>
        </c4d-feature-card>

        <c4d-content-block-segmented>
          <c4d-content-block-heading
            >Elementum nibh tellus molestie nunc non.
          </c4d-content-block-heading>
          ${Array.from([1, 2]).map(() => contentBlockSegmentedItemsWithImage)}
          <c4d-card-cta
            slot="footer"
            cta-type="local"
            href="https://example.com">
            Lorem ipsum dolor
            <c4d-card-footer></c4d-card-footer>
          </c4d-card-cta>
        </c4d-content-block-segmented>

        <c4d-callout-with-media>
          <c4d-content-block-heading slot="heading"
            >Mauris ultrices eros in cursus</c4d-content-block-heading
          >
          <c4d-callout-with-media-copy size="sm"
            >Porttitor eget dolor morbi non arcu. Et ligula ullamcorper
            malesuada proin libero nunc consequat. In est ante in nibh mauris
            cursus mattis. Turpis tincidunt id aliquet risus feugiat in. Vel
            facilisis volutpat est velit egestas dui.
          </c4d-callout-with-media-copy>
          <c4d-callout-with-media-video
            video-id="0_ibuqxqbe"></c4d-callout-with-media-video>
        </c4d-callout-with-media>

        <c4d-content-block-horizontal>
          <c4d-content-block-heading
            >Tincidunt ornare massa</c4d-content-block-heading
          >
          ${Array.from([1, 2]).map(() => contentItemHorizontal)}
        </c4d-content-block-horizontal>

        <c4d-logo-grid ?hide-border="true">
          <c4d-content-block-heading
            >Lobortis elementum nibh tellus</c4d-content-block-heading
          >
          ${logosGroup &&
          logosGroup.map(
            (elem) => html`
              <c4d-logo-grid-item
                default-src="${elem.imgSrc}"
                alt="${elem.altText}"></c4d-logo-grid-item>
            `
          )}
        </c4d-logo-grid>

        <c4d-content-block-cards>
          <c4d-content-block-heading
            >Aliquam condimentum interdum</c4d-content-block-heading
          >
          <c4d-card-group>
            ${Array.from([1, 2, 3]).map(() => cardGroupItems)}
          </c4d-card-group>
        </c4d-content-block-cards>

        <c4d-callout-quote>
          Duis aute irure dolor in reprehenderit
          <c4d-quote-source-heading>
            Lorem ipsum dolor sit amet
          </c4d-quote-source-heading>
          <c4d-quote-source-copy>
            consectetur adipiscing elit
          </c4d-quote-source-copy>
          <c4d-quote-source-bottom-copy>
            IBM Cloud
          </c4d-quote-source-bottom-copy>
          <c4d-callout-link-with-icon
            slot="footer"
            href="https://example.com"
            cta-type="local">
            Link with Icon
          </c4d-callout-link-with-icon>
        </c4d-callout-quote>

        <c4d-cta-block no-border>
          <c4d-content-block-heading
            >Take the next step</c4d-content-block-heading
          >
          <c4d-content-block-copy
            >Want to discuss your options with a DevOps expert? <br />
            Contact our sales team to evaluate your
            needs.</c4d-content-block-copy
          >

          <c4d-button-group slot="action">
            <c4d-button-group-item href="https://example.com">
              Secondary Button ${ArrowRight20({ slot: 'icon' })}
            </c4d-button-group-item>
            <c4d-button-group-item href="https://example.com">
              Primary button ${ArrowRight20({ slot: 'icon' })}
            </c4d-button-group-item>
          </c4d-button-group>

          <c4d-cta-block-item-row no-border>
            <c4d-cta-block-item>
              <c4d-content-item-heading>Get connected</c4d-content-item-heading>
              <c4d-content-item-copy
                >IBM DevOps partners have a wide range of expertise. Find one to
                build the right solution for you.</c4d-content-item-copy
              >
              <c4d-text-cta
                slot="footer"
                cta-type="local"
                icon-placement="right"
                href="example.com">
                Find a partner
              </c4d-text-cta>
            </c4d-cta-block-item>

            <c4d-cta-block-item>
              <c4d-content-item-heading>Learn how</c4d-content-item-heading>
              <c4d-content-item-copy
                >IBM DevOps partners have a wide range of
                expertise</c4d-content-item-copy
              >
              <c4d-text-cta
                slot="footer"
                cta-type="local"
                icon-placement="right"
                href="example.com">
                Browse tutorials
              </c4d-text-cta>
            </c4d-cta-block-item>
          </c4d-cta-block-item-row>
        </c4d-cta-block>
      </div>
    </div>
  `;

export default { StoryContent, StoryContentNoToC };
/* eslint-enable max-len */
