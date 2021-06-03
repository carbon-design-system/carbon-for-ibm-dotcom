/**
 * Copyright IBM Corp. 2016, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import logosGroup from '../../../logo-grid/__stories__/data/logos.js';

import imgSm16x9 from '../../../../../../storybook-images/assets/320/fpo--16x9--320x180--002.jpg';
import imgMd16x9 from '../../../../../../storybook-images/assets/480/fpo--16x9--480x270--002.jpg';
import imgLg16x9 from '../../../../../../storybook-images/assets/720/fpo--16x9--720x405--002.jpg';
import imgLg1x1 from '../../../../../../storybook-images/assets/720/fpo--1x1--720x720--005.jpg';
import imgXlg4x3 from '../../../../../../storybook-images/assets/1312/fpo--4x3--1312x984--003.jpg';

import leadspaceImg from '../../../../../../storybook-images/assets/leadspace/fpo--leadspace--1584x560--002.jpg';

const image = html`
  <dds-image-with-caption
    alt="Image alt text"
    default-src="${imgLg16x9}"
    heading="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  >
    <dds-image-item media="(min-width: 672px)" srcset="${imgLg16x9}"> </dds-image-item>
    <dds-image-item media="(min-width: 400px)" srcset="${imgMd16x9}"> </dds-image-item>
    <dds-image-item media="(min-width: 320px)" srcset="${imgSm16x9}"> </dds-image-item>
  </dds-image-with-caption>
`;

const contentBlockSegmentedItems = html`
  <dds-content-block-segmented-item>
    <dds-content-group-heading>A scelerisque purus semper eget duis at tellus. </dds-content-group-heading>
    <dds-content-item-copy
      >Elementum nibh tellus molestie nunc non. Habitant morbi tristique senectus et netus et malesuada fames.
    </dds-content-item-copy>
    <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="https://example.com"
      >Lorem Ipsum dolor sit</dds-text-cta
    >
  </dds-content-block-segmented-item>

  <dds-content-block-segmented-item>
    <dds-content-group-heading>A scelerisque purus semper eget duis at tellus. </dds-content-group-heading>
    <dds-content-item-copy
      >Elementum nibh tellus molestie nunc non. Habitant morbi tristique senectus et netus et malesuada fames.
    </dds-content-item-copy>
  </dds-content-block-segmented-item>
`;

const contentBlockSegmentedItemsWithImage = html`
  <dds-content-block-segmented-item>
    <dds-content-group-heading>A scelerisque purus semper eget duis at tellus. </dds-content-group-heading>
    <dds-content-item-copy
      >Elementum nibh tellus molestie nunc non. Habitant morbi tristique senectus et netus et malesuada fames.
    </dds-content-item-copy>
    ${image}
    <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="https://example.com"
      >Lorem Ipsum dolor sit</dds-text-cta
    >
  </dds-content-block-segmented-item>
`;

const contentItemHorizontal = html`
  <dds-content-item-horizontal>
    <dds-content-item-horizontal-eyebrow>Lorem ipsum</dds-content-item-horizontal-eyebrow>
    <dds-content-item-heading>Aliquam condimentum</dds-content-item-heading>
    <dds-content-item-horizontal-copy
      >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
      Phasellus at elit sollicitudin.</dds-content-item-horizontal-copy
    >
    <dds-link-list slot="footer" type="vertical">
      <dds-link-list-item-cta icon-placement="right" href="https://www.ibm.com" cta-type="local">
        Link text
      </dds-link-list-item-cta>
      <dds-link-list-item-cta icon-placement="right" href="https://www.ibm.com" cta-type="external">
        External link text
      </dds-link-list-item-cta>
    </dds-link-list>
  </dds-content-item-horizontal>
`;

const cardGroupItems = html`
  <dds-card-group-item href="https://example.com">
    <dds-image slot="image" alt="Image alt text" default-src="${imgXlg4x3}"> </dds-image>
    <dds-card-eyebrow>Topic</dds-card-eyebrow>
    <dds-card-heading>Natural Language Processing.</dds-card-heading>
    <dds-card-footer slot="footer">
      ${ArrowRight20({ slot: 'icon' })}
    </dds-card-footer>
  </dds-card-group-item>
`;

const StoryContent = ({ type = 'default' }) =>
  type === 'default'
    ? html`
      <main class="bx--content dds-ce-demo-devenv--ui-shell-content">
        <div class="bx--grid">
          <dds-table-of-contents stickyOffset="48">
            <a name="1" data-title="Lorem ipsum dolor sit amet"></a>
            <dds-leadspace-block>
              <dds-leadspace-block-heading>Lorem ipsum dolor sit amet</dds-leadspace-block-heading>
              <dds-leadspace-block-content>
                <dds-content-block-heading>
                  Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.
                </dds-content-block-heading>
                <dds-content-block-copy slot="copy"
                >Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                  ut aliquip ex ea commodo consequat.
                </dds-content-block-copy>
                <dds-leadspace-block-media slot="media">
                  <dds-video-player-container video-id="1_9h94wo6b"></dds-video-player-container>
                </dds-leadspace-block-media>
                <dds-link-list type="end">
                  <dds-link-list-heading>Featured products</dds-link-list-heading>
                  <dds-link-list-item href="https://example.com">
                    IBM Cloud Continuous Delivery ${ArrowRight20({ slot: 'icon' })}
                  </dds-link-list-item>
                  <dds-link-list-item href="https://example.com">
                    UrbanCode ${ArrowRight20({ slot: 'icon' })}
                  </dds-link-list-item>
                  <dds-link-list-item href="https://example.com">
                    View all products ${ArrowRight20({ slot: 'icon' })}
                  </dds-link-list-item>
                </dds-link-list>
                <dds-leadspace-block-cta>
                  <dds-button-group-item href="www.ibm.com">Contact sales ${ArrowRight20({
                    slot: 'icon',
                  })}</dds-button-group-item>
                </dds-leadspace-block-cta>
              </dds-leadspace-block-content>
            </dds-leadspace-block>

            <a name="2" data-title="Pharetra pharetra massa massa ultricies mi quis."></a>
            <dds-content-block-segmented>
              <dds-content-block-heading>Pharetra pharetra massa massa ultricies mi quis.</dds-content-block-heading>
              ${Array.from([1, 2]).map(() => contentBlockSegmentedItems)}
            </dds-content-block-segmented>

            <dds-feature-card size='large' href="https://example.com">
              <dds-image slot="image" alt="Image alt text"
                         default-src="${imgLg1x1}"
              >
                </dds-image-item>
                <dds-image-item
                  media="(min-width: 991px)"
                  srcset="${imgLg1x1}"
                >
              </dds-image>
              <dds-card-eyebrow>scelerisque purus</dds-card-eyebrow>
              <dds-card-heading>Elementum nibh tellus molestie nunc?</dds-card-heading>
              <p>Habitant morbi tristique senectus et netus et malesuada fames. Habitant morbu tristique.</p>
              <dds-feature-card-footer>
                ${ArrowRight20({ slot: 'icon' })}
              </dds-feature-card-footer>
            </dds-feature-card>

            <a name="3" data-title="Elementum nibh tellus molestie nunc non."></a>
            <dds-content-block-segmented>
              <dds-content-block-heading>Elementum nibh tellus molestie nunc non.
              </dds-content-block-heading>
              ${Array.from([1, 2]).map(() => contentBlockSegmentedItemsWithImage)}
              <dds-card-cta slot="footer" cta-type="local" href="https://example.com">
                Lorem ipsum dolor
                <dds-card-cta-footer></dds-card-cta-footer>
              </dds-card-cta>
            </dds-content-block-segmented>

            <dds-callout-with-media>
              <dds-content-block-heading slot="heading">Mauris ultrices eros in cursus</dds-content-block-heading>
              <dds-callout-with-media-copy size="sm"
              >Porttitor eget dolor morbi non arcu. Et ligula ullamcorper malesuada proin libero nunc consequat.
                In est ante in nibh mauris cursus mattis. Turpis tincidunt id aliquet risus feugiat in.
                Vel facilisis volutpat est velit egestas dui.
              </dds-callout-with-media-copy>
              <dds-callout-with-media-video video-id="1_9h94wo6b"></dds-callout-with-media-video>
            </dds-callout-with-media>

            <a name="4" data-title="Tincidunt ornare massa"></a>
            <dds-content-group-horizontal>
              <dds-content-block-heading>Tincidunt ornare massa</dds-content-block-heading>
              ${Array.from([1, 2]).map(() => contentItemHorizontal)}
            </dds-content-group-horizontal>

            <a name="5" data-title="Lobortis elementum nibh tellus"></a>
            <dds-logo-grid ?hide-border="true">
              <dds-content-block-heading>Lobortis elementum nibh tellus</dds-content-block-heading>
              ${logosGroup &&
                logosGroup.map(
                  elem => html`
                    <dds-logo-grid-item default-src="${elem.imgSrc}" alt="${elem.altText}"></dds-logo-grid-item>
                  `
                )}
            </dds-logo-grid>

            <a name="6" data-title="Aliquam condimentum interdum"></a>
            <dds-content-block-cards>
              <dds-content-block-heading>Aliquam condimentum interdum</dds-content-block-heading>
              <dds-card-group>
                ${Array.from([1, 2, 3]).map(() => cardGroupItems)}
              </dds-card-group>
            </dds-content-block-cards>

            <dds-callout-quote>
              Duis aute irure dolor in reprehenderit
              <dds-quote-source-heading>
                Lorem ipsum dolor sit amet
              </dds-quote-source-heading>
              <dds-quote-source-copy>
                consectetur adipiscing elit
              </dds-quote-source-copy>
              <dds-quote-source-bottom-copy>
                IBM Cloud
              </dds-quote-source-bottom-copy>
              <dds-callout-link-with-icon slot="footer" href="https://example.com">
                Link with Icon ${ArrowRight20({ slot: 'icon' })}
              </dds-callout-link-with-icon>
            </dds-callout-quote>

            <a name="7" data-title="Duis aute irure dolor in reprehenderit"></a>
            <dds-cta-block no-border>
              <dds-content-block-heading>Take the next step</dds-content-block-heading>
              <dds-content-block-copy>Want to discuss your options with a DevOps expert? <br />
                Contact our sales team to evaluate your needs.</dds-content-block-copy>

              <dds-button-group slot="action">
                <dds-button-group-item href="https://example.com">
                  Secondary Button ${ArrowRight20({ slot: 'icon' })}
                </dds-button-group-item>
                <dds-button-group-item href="https://example.com">
                  Primary button ${ArrowRight20({ slot: 'icon' })}
                </dds-button-group-item>
              </dds-button-group>

              <dds-cta-block-item-row no-border>
                <dds-cta-block-item>
                  <dds-content-item-heading>Get connected</dds-content-item-heading>
                  <dds-content-item-copy
                  >IBM DevOps partners have a wide range of expertise. Find one to build the right solution for
                    you.</dds-content-item-copy
                  >
                  <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="example.com">
                    Find a partner
                  </dds-text-cta>
                </dds-cta-block-item>

                <dds-cta-block-item>
                  <dds-content-item-heading>Learn how</dds-content-item-heading>
                  <dds-content-item-copy>IBM DevOps partners have a wide range of expertise</dds-content-item-copy>
                  <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="example.com">
                    Browse tutorials
                  </dds-text-cta>
                </dds-cta-block-item>
              </dds-cta-block-item-row>
            </dds-cta-block>
          </dds-table-of-contents>
        </div>
      </main>
    `
    : html`
      <dds-leadspace
        size="medium"
        gradient-style-scheme="true"
        alt=""
        default-src="${leadspaceImg}"
      >
        <dds-leadspace-heading>Leadspace Title</dds-leadspace-heading>
        Use this area for a short line of copy to support the title
        <dds-button-group slot="action">
          <dds-button-group-item aria-label="" href=""
          >test</dds-button-group-item
          >
        </dds-button-group>
        <dds-image slot="image" class="bx--image" alt="" default-src="${leadspaceImg}">
          <dds-image-item media="(min-width: 672px)" srcset="${leadspaceImg}"></dds-image-item>
          <dds-image-item media="(min-width: 0)" srcset="${leadspaceImg}"></dds-image-item>
        </dds-image>
      </dds-leadspace>
      <main class="bx--content dds-ce-demo-devenv--ui-shell-content" style="padding-top: 0">
        <div class="bx--grid">
          <dds-table-of-contents stickyOffset="48" toc-layout="horizontal">
                  <div class="bx--row">
              <div class="bx--col-lg-12">
                <a name="1" data-title="Lorem ipsum dolor sit amet"></a>
            <dds-leadspace-block>
              <dds-leadspace-block-heading>Lorem ipsum dolor sit amet</dds-leadspace-block-heading>
              <dds-leadspace-block-content>
                <dds-content-block-heading>
                  Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.
                </dds-content-block-heading>
                <dds-content-block-copy slot="copy"
                >Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                  ut aliquip ex ea commodo consequat.
                </dds-content-block-copy>
                <dds-leadspace-block-media slot="media">
                  <dds-video-player-container video-id="1_9h94wo6b"></dds-video-player-container>
                </dds-leadspace-block-media>
                <dds-link-list type="end">
                  <dds-link-list-heading>Featured products</dds-link-list-heading>
                  <dds-link-list-item href="https://example.com">
                    IBM Cloud Continuous Delivery ${ArrowRight20({ slot: 'icon' })}
                  </dds-link-list-item>
                  <dds-link-list-item href="https://example.com">
                    UrbanCode ${ArrowRight20({ slot: 'icon' })}
                  </dds-link-list-item>
                  <dds-link-list-item href="https://example.com">
                    View all products ${ArrowRight20({ slot: 'icon' })}
                  </dds-link-list-item>
                </dds-link-list>
                <dds-leadspace-block-cta>
                  <dds-button-group-item href="www.ibm.com">Contact sales ${ArrowRight20({
                    slot: 'icon',
                  })}</dds-button-group-item>
                </dds-leadspace-block-cta>
              </dds-leadspace-block-content>
            </dds-leadspace-block>

            <a name="2" data-title="Pharetra pharetra massa massa ultricies mi quis."></a>
            <dds-content-block-segmented>
              <dds-content-block-heading>Pharetra pharetra massa massa ultricies mi quis.</dds-content-block-heading>
              ${Array.from([1, 2]).map(() => contentBlockSegmentedItems)}
            </dds-content-block-segmented>

            <dds-feature-card-block-large href="https://example.com">
              <dds-image slot="image" alt="Image alt text"
                         default-src="${imgLg1x1}"
              >
                </dds-image-item>
                <dds-image-item
                  media="(min-width: 991px)"
                  srcset="${imgLg1x1}"
                >
              </dds-image>
              <dds-card-eyebrow>scelerisque purus</dds-card-eyebrow>
              <dds-card-heading>Elementum nibh tellus molestie nunc?</dds-card-heading>
              <p>Habitant morbi tristique senectus et netus et malesuada fames. Habitant morbu tristique.</p>
              <dds-feature-card-block-large-footer>
                ${ArrowRight20({ slot: 'icon' })}
              </dds-feature-card-block-large-footer>
            </dds-feature-card-block-large>

            <a name="3" data-title="Elementum nibh tellus molestie nunc non."></a>
            <dds-content-block-segmented>
              <dds-content-block-heading>Elementum nibh tellus molestie nunc non.
              </dds-content-block-heading>
              ${Array.from([1, 2]).map(() => contentBlockSegmentedItemsWithImage)}
              <dds-card-cta slot="footer" cta-type="local" href="https://example.com">
                Lorem ipsum dolor
                <dds-card-cta-footer></dds-card-cta-footer>
              </dds-card-cta>
            </dds-content-block-segmented>

            <dds-callout-with-media>
              <dds-content-block-heading slot="heading">Mauris ultrices eros in cursus</dds-content-block-heading>
              <dds-content-item-copy
              >Porttitor eget dolor morbi non arcu. Et ligula ullamcorper malesuada proin libero nunc consequat.
                In est ante in nibh mauris cursus mattis. Turpis tincidunt id aliquet risus feugiat in.
                Vel facilisis volutpat est velit egestas dui.
              </dds-content-item-copy>
              <dds-callout-with-media-video video-id="1_9h94wo6b"></dds-callout-with-media-video>
            </dds-callout-with-media>

            <a name="4" data-title="Tincidunt ornare massa"></a>
            <dds-content-group-horizontal>
              <dds-content-block-heading>Tincidunt ornare massa</dds-content-block-heading>
              ${Array.from([1, 2]).map(() => contentItemHorizontal)}
            </dds-content-group-horizontal>
              </div>
            </div>
          </dds-table-of-contents>
        </div>
      </main>`;

export default StoryContent;
