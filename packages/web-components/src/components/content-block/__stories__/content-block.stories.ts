/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../index';
import '../../card/index';
import { html } from 'lit-element';
import { boolean, select } from '@storybook/addon-knobs';

import ArrowRight20 from '../../../internal/vendor/@carbon/web-components/icons/arrow--right/20.js';
import { CONTENT_BLOCK_COMPLEMENTARY_STYLE_SCHEME } from '../content-block';
import readme from './README.stories.mdx';
import * as components from './data/content.js';

const currentComponents = [
  'None',
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

const componentVariables = {
  'Callout quote': components.calloutQuote,
  'Callout with media': components.calloutWithMedia,
  'Card group': components.cardGroup,
  'Card in card': components.cardInCard,
  Carousel: components.carousel,
  'Content group': components.contentGroup,
  'Content item row': components.contentItemRowStory,
  'Content item': components.contentItem,
  'Feature card': components.featureCard,
  Image: components.image,
  'Link list': components.linkList,
  Quote: components.quote,
  'Structured list': components.structuredList,
  'Tabs extended': components.tabsExtended,
  'Video player': components.videoPlayer,
};

export const Default = (args) => {
  const { heading, subHeading, child, copy, showCopy, showCTA, border, aside } =
    args?.ContentBlock ?? {};

  const childStory = componentVariables[child];

  return html`
    <div class="cds--col-lg-12 cds--no-gutter">
      <c4d-content-block
        complementary-style-scheme="${border
          ? CONTENT_BLOCK_COMPLEMENTARY_STYLE_SCHEME.WITH_BORDER
          : ''}">
        ${heading
          ? html`
              <c4d-content-block-heading
                >Heading text for Content Block</c4d-content-block-heading
              >
            `
          : ''}
        ${subHeading
          ? html` <c4d-content-block-copy>Subheading</c4d-content-block-copy> `
          : ''}
        ${showCopy
          ? html`
              <c4d-content-block-copy size="sm">${copy}</c4d-content-block-copy>
            `
          : ``}
        ${childStory}
        ${showCTA === 'card-link'
          ? html`
              <c4d-card
                link
                slot="footer"
                cta-type="local"
                href="https://www.example.com">
                <c4d-card-heading
                  >Learn more about natual language processing</c4d-card-heading
                >
                <c4d-card-footer></c4d-card-footer>
              </c4d-card>
            `
          : ``}
        ${showCTA === 'button'
          ? html`
              <c4d-button
                slot="footer"
                cta-type="local"
                href="https://www.example.com">
                CTA Button
              </c4d-button>
            `
          : ``}
        ${showCTA === 'button-group'
          ? html`
              <c4d-button-group slot="footer">
                <c4d-button-group-item
                  href="https://example.com"
                  cta-type="local">
                  Secondary Button
                </c4d-button-group-item>
                <c4d-button-group-item
                  href="https://example.com"
                  cta-type="local">
                  Primary button
                </c4d-button-group-item>
              </c4d-button-group>
            `
          : ``}
        ${showCTA === 'link'
          ? html`
              <c4d-link-with-icon
                slot="footer"
                cta-type="local"
                href="https://www.example.com">
                CTA Link
              </c4d-link-with-icon>
            `
          : ``}
        ${aside
          ? html`
              <c4d-link-list type="default" slot="complementary">
                <c4d-link-list-heading>Tutorial</c4d-link-list-heading>
                <c4d-link-list-item-cta
                  href="https://example.com"
                  cta-type="local"
                  type="default">
                  <p>Containerization A Complete Guide</p>
                </c4d-link-list-item-cta>
                <c4d-link-list-item-cta
                  href="https://example.com"
                  cta-type="external"
                  type="default">
                  <p>Why should you use microservices and containers</p>
                </c4d-link-list-item-cta>
              </c4d-link-list>
            `
          : ``}
      </c4d-content-block>
    </div>
  `;
};

export default {
  title: 'Components/Content block',
  decorators: [
    (story) => html`
      <div class="cds--grid">
        <div class="cds--row">${story()}</div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      ContentBlock: () => ({
        heading: boolean('Heading:', true),
        subHeading: boolean('Sub-heading:', true),
        showCopy: boolean('Copy:', true),
        copy:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quam ante, mattis id pellentesque at,' +
          ' molestie et ipsum. Proin sodales est hendrerit maximus malesuada. Orci varius natoque penatibus et' +
          ' magnis dis parturient montes, nascetur ridiculus mus. Etiam at arcu ligula. Praesent faucibus est ' +
          'ligula, vitae finibus ante aliquet a.',
        child: select('Child component:', currentComponents, 'None'),
        aside: boolean('Aside:', false),
        showCTA: select(
          'CTA',
          ['none', 'link', 'button', 'button-group', 'card-link'],
          ''
        ),
        border: boolean('Border:', false),
      }),
    },
    propsSet: {
      default: {
        ContentBlock: {
          heading: true,
          showCopy: true,
          copy:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quam ante, mattis id pellentesque at,' +
            ' molestie et ipsum. Proin sodales est hendrerit maximus malesuada. Orci varius natoque penatibus et' +
            ' magnis dis parturient montes, nascetur ridiculus mus. Etiam at arcu ligula. Praesent faucibus est ' +
            'ligula, vitae finibus ante aliquet a.',
          aside: false,
          addChildren: '',
          showCTA: true,
          border: false,
        },
      },
    },
  },
};
