/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../index';
import '../../cta/index';
import '../../card-link/index';
import { html } from 'lit';
import { boolean, optionsKnob } from '@storybook/addon-knobs';
import ArrowRight20 from '../../../internal/vendor/@carbon/web-components/icons/arrow--right/20.js';
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
    heading="Lorem ipsum dolor sit amet.">
    <dds-image-item media="(min-width: 672px)" srcset="${imgLg16x9}">
    </dds-image-item>
    <dds-image-item media="(min-width: 400px)" srcset="${imgMd16x9}">
    </dds-image-item>
    <dds-image-item media="(min-width: 320px)" srcset="${imgSm16x9}">
    </dds-image-item>
  </dds-image>
`;

export const Default = (args) => {
  const { heading, copy, showCopy, addChildren, showCTA, border, aside } =
    args?.ContentBlock ?? {};
  return html`
    <dds-content-block
      complementary-style-scheme="${border
        ? CONTENT_BLOCK_COMPLEMENTARY_STYLE_SCHEME.WITH_BORDER
        : ''}">
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
      ${addChildren.includes('Content group simple')
        ? html`
            <dds-content-group-simple>
              <dds-content-group-heading
                >Natural language processing (NLP)</dds-content-group-heading
              >
              <dds-content-group-copy
                >Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum non porttitor libero, in venenatis
                magna.</dds-content-group-copy
              >
              ${image}
              ${items.map(
                ({ itemsHeading: itemHeading, itemsCopy: itemCopy }) => html`
                  <dds-content-item>
                    <dds-content-item-heading
                      >${itemHeading}</dds-content-item-heading
                    >
                    <dds-content-item-copy>${itemCopy}</dds-content-item-copy>
                  </dds-content-item>
                `
              )}
            </dds-content-group-simple>
          `
        : ``}
      ${showCTA
        ? html`
            <dds-card-link-cta
              slot="footer"
              cta-type="local"
              href="https://www.example.com">
              <dds-card-link-heading
                >Learn more about natual language
                processing</dds-card-link-heading
              >
              <dds-card-cta-footer></dds-card-cta-footer>
            </dds-card-link-cta>
          `
        : ``}
      ${aside
        ? html`
            <dds-link-list type="default" slot="complementary">
              <dds-link-list-heading>Tutorials</dds-link-list-heading>
              <dds-link-list-item-card href="https://example.com">
                <p>Learn more about Kubernetes</p>
                <dds-card-footer>
                  ${ArrowRight20({ slot: 'icon' })}
                </dds-card-footer>
              </dds-link-list-item-card>
              <dds-link-list-item-card href="https://example.com">
                <p>Containerization A Complete Guide</p>
                <dds-card-footer>
                  ${ArrowRight20({ slot: 'icon' })}
                </dds-card-footer>
              </dds-link-list-item-card>
            </dds-link-list>
          `
        : ``}
    </dds-content-block>
  `;
};

export default {
  title: 'Components/Content block',
  decorators: [
    (story) => html`
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-lg-12 bx--no-gutter">${story()}</div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      ContentBlock: () => ({
        heading: boolean('Heading:', true),
        showCopy: boolean('Copy:', true),
        copy:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quam ante, mattis id pellentesque at,' +
          ' molestie et ipsum. Proin sodales est hendrerit maximus malesuada. Orci varius natoque penatibus et' +
          ' magnis dis parturient montes, nascetur ridiculus mus. Etiam at arcu ligula. Praesent faucibus est ' +
          'ligula, vitae finibus ante aliquet a.',

        aside: boolean('Aside:', false),
        addChildren: optionsKnob(
          'Add children:',
          {
            'Content group simple': 'Content group simple',
          },
          '',
          { display: 'multi-select' }
        ),
        showCTA: boolean('CTA:', true),
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
