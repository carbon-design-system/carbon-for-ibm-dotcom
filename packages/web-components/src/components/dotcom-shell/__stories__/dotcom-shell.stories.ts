/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { select } from '@storybook/addon-knobs';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import on from 'carbon-components/es/globals/js/misc/on';
import contentStyles from 'carbon-components/scss/components/ui-shell/_content.scss';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import inPercy from '@percy-io/in-percy';
import textNullable from '../../../../.storybook/knob-text-nullable';
import DDSLeftNav from '../../masthead/left-nav';
import '../dotcom-shell-container';
import { authenticatedProfileItems, unauthenticatedProfileItems } from '../../masthead/__stories__/profile-items';
import logosGroup from '../../logo-grid/__stories__/data/logos.json';
import mastheadStyles from '../../masthead/__stories__/masthead.stories.scss';
import { FOOTER_SIZE } from '../../footer/footer';
import mastheadLinks from '../../masthead/__stories__/links';
import mockFooterLinks from '../../footer/__stories__/links';
import mockLegalLinks from '../../footer/__stories__/legal-links';
import mockLocaleList from '../../locale-modal/__stories__/locale-data.json';
import '../../card/card-eyebrow';
import '../../card/card-heading';
import '../../leadspace-block/leadspace-block';
import '../../leadspace-block/leadspace-block-content';
import '../../leadspace-block/leadspace-block-cta';
import '../../leadspace-block/leadspace-block-heading';
import '../../leadspace-block/leadspace-block-media';
import '../../link-list/link-list';
import '../../link-list/link-list-heading';
import '../../link-list/link-list-item';
import '../../quote/quote';
import '../../quote/quote-source-bottom-copy';
import '../../quote/quote-source-copy';
import '../../quote/quote-source-heading';
import readme from './README.stories.mdx';

const footerSizes = {
  Default: FOOTER_SIZE.REGULAR,
  [`Short (${FOOTER_SIZE.SHORT})`]: FOOTER_SIZE.SHORT,
};

const image = html`
  <dds-image-with-caption
    alt="Image alt text"
    default-src="https://fpoimg.com/672x378?text=16:9&amp;bg_color=ee5396&amp;text_color=161616"
    heading="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  >
    <dds-image-item
      media="(min-width: 672px)"
      srcset="https://fpoimg.com/672x378?text=16:9&amp;bg_color=ee5396&amp;text_color=161616"
    >
    </dds-image-item>
    <dds-image-item
      media="(min-width: 400px)"
      srcset="https://fpoimg.com/400x225?text=16:9&amp;bg_color=ee5396&amp;text_color=161616"
    >
    </dds-image-item>
    <dds-image-item
      media="(min-width: 320px)"
      srcset="https://fpoimg.com/320x180?text=16:9&amp;bg_color=ee5396&amp;text_color=161616"
    >
    </dds-image-item>
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
    <span slot="eyebrow">Lorem ipsum</span>
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
    <dds-image
      slot="image"
      alt="Image alt text"
      default-src="https://fpoimg.com/1056x792?text=4:3&amp;bg_color=ee5396&amp;text_color=161616"
    >
    </dds-image>
    <dds-card-eyebrow>Topic</dds-card-eyebrow>
    <dds-card-heading>Natural Language Processing.</dds-card-heading>
    <dds-card-footer slot="footer">
      ${ArrowRight20({ slot: 'icon' })}
    </dds-card-footer>
  </dds-card-group-item>
`;

const StoryContent = () => html`
  <style type="text/css">
    ${contentStyles.cssText}
  </style>
  <main class="bx--content dds-ce-demo-devenv--ui-shell-content">
    <div class="bx--grid">
      <div class="bx--row">
        <div class="bx--offset-lg-3 bx--col-lg-13">
          <dds-table-of-contents>
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
              <dds-content-block-copy slot="copy"></dds-content-block-copy>
                ${Array.from([1, 2]).map(() => contentBlockSegmentedItems)}
            </dds-content-block-segmented>

            <dds-feature-card-block-large href="https://example.com">
              <dds-image slot="image" alt="Image alt text" 
                default-src="https://fpoimg.com/600x600?text=1:1&amp;bg_color=ee5396&amp;text_color=161616"
              >
                </dds-image-item>
                <dds-image-item
                  media="(min-width: 991px)"
                  srcset="https://fpoimg.com/600x600?text=1:1&amp;bg_color=ee5396&amp;text_color=161616"
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
              <dds-content-block-copy slot="copy"></dds-content-block-copy>
                ${Array.from([1, 2]).map(() => contentBlockSegmentedItemsWithImage)}
                <dds-card-cta slot="footer" cta-type="local" href="https://example.com">
                  Lorem ipsum dolor
                  <dds-card-cta-footer></dds-card-cta-footer>
                </dds-card-cta>
            </dds-content-block-segmented>

            <dds-callout-with-media>
              <dds-content-block-heading>Mauris ultrices eros in cursus</dds-content-block-heading>
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

            <a name="5" data-title="Lobortis elementum nibh tellus"></a>
            <dds-logo-grid ?hide-border="true">
              <dds-content-block-heading>Lobortis elementum nibh tellus</dds-content-block-heading>
              ${logosGroup &&
                logosGroup.map(
                  elem => html`
                    <dds-logo-grid-item default-src="${elem.imgSrc}" alt="${elem.altText}"></dds-logo-grid-item>
                  `
                )}
              <dds-logo-grid-link href="https://example.com">
                <p>Amet justo donec</p>
                ${ArrowRight20({ slot: 'footer' })}
              </dds-logo-grid-link>
            </dds-logo-grid>

            <a name="6" data-title="Aliquam condimentum interdum"></a>
            <dds-content-block-cards>
              <dds-content-block-heading>Aliquam condimentum interdum</dds-content-block-heading>
              <dds-card-group slot="content">
                ${Array.from([1, 2, 3]).map(() => cardGroupItems)}
              </dds-card-group>
            </dds-content-block-cards>
            
            <dds-callout-quote>
              Duis aute irure dolor in reprehenderit
              <dds-quote-source-heading>
                Lorem ipsum
              </dds-quote-source-heading>
              <dds-quote-source-copy>
                dolor sit amet
              </dds-quote-source-copy>
              <dds-link-with-icon slot="footer" href="https://example.com">
                Link with Icon ${ArrowRight20({ slot: 'icon' })}
              </dds-link-with-icon>
            </dds-callout-quote>

            <a name="7" data-title="Duis aute irure dolor in reprehenderit"></a>
            <dds-cta-section>
              <dds-content-block-heading>Take the next step</dds-content-block-heading>
              <dds-cta-section-copy>
                Want to discuss your options with a DevOps expert? Contact our sales team to evaluate your needs.
              </dds-cta-section-copy>

              <dds-button-group slot="action">
                <dds-button-group-item href="https://example.com">
                  Secondary Button ${ArrowRight20({ slot: 'icon' })}
                </dds-button-group-item>
                <dds-button-group-item href="https://example.com">
                  Primary button ${ArrowRight20({ slot: 'icon' })}
                </dds-button-group-item>
              </dds-button-group>

              <dds-cta-section-item>
                <dds-cta-section-item-heading>Get connected</dds-cta-section-item-heading>
                <dds-cta-section-item-copy
                  >IBM DevOps partners have a wide range of expertise. Find one to build the right solution for
                  you.</dds-cta-section-item-copy
                >
                <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="example.com">
                  Find a partner
                </dds-text-cta>
              </dds-cta-section-item>

              <dds-cta-section-item>
                <dds-cta-section-item-heading>Learn how</dds-cta-section-item-heading>
                <dds-cta-section-item-copy>IBM DevOps partners have a wide range of expertise</dds-cta-section-item-copy>
                <dds-text-cta slot="footer" cta-type="local" icon-placement="right" href="example.com">
                  Browse tutorials
                </dds-text-cta>
              </dds-cta-section-item>
            </dds-cta-section>
          </dds-table-of-contents>
        </div>
      </div>
    </div>
  </main>
`;

export const Default = ({ parameters }) => {
  const { brandName, userStatus, navLinks } = parameters?.props?.MastheadComposite ?? {};
  const { langDisplay, language, size: footerSize, legalLinks, links: footerLinks, localeList } =
    parameters?.props?.FooterComposite ?? {};
  const { useMock } = parameters?.props?.Other ?? {};
  return html`
    <style>
      ${mastheadStyles}
    </style>
    ${useMock
      ? html`
          <dds-dotcom-shell-composite
            brand-name="${ifNonNull(brandName)}"
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            footer-size="${ifNonNull(footerSize)}"
            user-status="${ifNonNull(userStatus)}"
            .authenticatedProfileItems="${ifNonNull(authenticatedProfileItems)}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .navLinks="${navLinks}"
            .unauthenticatedProfileItems="${ifNonNull(unauthenticatedProfileItems)}"
          >
            ${StoryContent()}
          </dds-dotcom-shell-composite>
        `
      : html`
          <dds-dotcom-shell-container
            brand-name="${ifNonNull(brandName)}"
            language="${ifNonNull(language)}"
            lang-display="${ifNonNull(langDisplay)}"
            footer-size="${ifNonNull(footerSize)}"
            user-status="${ifNonNull(userStatus)}"
            .legalLinks="${ifNonNull(legalLinks)}"
            .localeList="${ifNonNull(localeList)}"
            .footerLinks="${ifNonNull(footerLinks)}"
            .navLinks="${navLinks}"
          >
            ${StoryContent()}
          </dds-dotcom-shell-container>
        `}
  `;
};

export default {
  title: 'Components/Dotcom shell',
  decorators: [
    story => {
      if (!(window as any)._hPageShow) {
        (window as any)._hPageShow = on(window, 'pageshow', () => {
          const leftNav = document.querySelector('dds-left-nav');
          if (leftNav) {
            (leftNav as DDSLeftNav).expanded = false;
          }
        });
      }
      return story();
    },
  ],
  parameters: {
    ...readme.parameters,
    useRawContainer: true,
    knobs: {
      MastheadComposite: ({ groupId }) => ({
        brandName: textNullable('Brand name (brand-name)', '', groupId),
        logoHref: 'https://www.ibm.com',
      }),
      FooterComposite: ({ groupId }) => ({
        footerSize: select('Size (footer-size)', footerSizes, null, groupId),
      }),
    },
    props: (() => {
      // Lets `<dds-masthead-container>` load the nav links and lets `<dds-footer-container>` load the footer links
      const useMock = inPercy() || new URLSearchParams(window.location.search).has('mock');
      return {
        MastheadComposite: {
          navLinks: !useMock ? undefined : mastheadLinks,
        },
        FooterComposite: {
          langDisplay: !useMock ? undefined : 'United States - English',
          legalLinks: !useMock ? undefined : mockLegalLinks,
          links: !useMock ? undefined : mockFooterLinks,
          localeList: !useMock ? undefined : mockLocaleList,
        },
        Other: {
          useMock,
        },
      };
    })(),
  },
};
