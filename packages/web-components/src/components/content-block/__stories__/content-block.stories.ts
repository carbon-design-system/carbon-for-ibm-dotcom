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
  <c4d-image
    slot="media"
    alt="Image alt text"
    default-src="${imgLg16x9}"
    heading="Lorem ipsum dolor sit amet.">
    <c4d-image-item media="(min-width: 672px)" srcset="${imgLg16x9}">
    </c4d-image-item>
    <c4d-image-item media="(min-width: 400px)" srcset="${imgMd16x9}">
    </c4d-image-item>
    <c4d-image-item media="(min-width: 320px)" srcset="${imgSm16x9}">
    </c4d-image-item>
  </c4d-image>
`;

export const Default = (args) => {
  const { heading, copy, showCopy, addChildren, showCTA, border, aside } =
    args?.ContentBlock ?? {};
  return html`
    <c4d-content-block
      complementary-style-scheme="${border
        ? CONTENT_BLOCK_COMPLEMENTARY_STYLE_SCHEME.WITH_BORDER
        : ''}">
      ${heading
        ? html`
            <c4d-content-block-heading
              >What is the latest news in artificial
              intelligence?</c4d-content-block-heading
            >
          `
        : ''}
      ${showCopy
        ? html` <c4d-content-block-copy>${copy}</c4d-content-block-copy> `
        : ``}
      ${addChildren.includes('Content group simple')
        ? html`
            <c4d-content-group-simple>
              <c4d-content-group-heading
                >Natural language processing (NLP)</c4d-content-group-heading
              >
              <c4d-content-group-copy
                >Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Vestibulum non porttitor libero, in venenatis
                magna.</c4d-content-group-copy
              >
              ${image}
              ${items.map(
                ({ itemsHeading: itemHeading, itemsCopy: itemCopy }) => html`
                  <c4d-content-item>
                    <c4d-content-item-heading
                      >${itemHeading}</c4d-content-item-heading
                    >
                    <c4d-content-item-copy>${itemCopy}</c4d-content-item-copy>
                  </c4d-content-item>
                `
              )}
            </c4d-content-group-simple>
          `
        : ``}
      ${showCTA
        ? html`
            <c4d-card-link-cta
              slot="footer"
              cta-type="local"
              href="https://www.example.com">
              <c4d-card-link-heading
                >Learn more about natual language
                processing</c4d-card-link-heading
              >
              <c4d-card-cta-footer></c4d-card-cta-footer>
            </c4d-card-link-cta>
          `
        : ``}
      ${aside
        ? html`
            <c4d-link-list type="default" slot="complementary">
              <c4d-link-list-heading>Tutorials</c4d-link-list-heading>
              <c4d-link-list-item-card href="https://example.com">
                <p>Learn more about Kubernetes</p>
                <c4d-card-footer>
                  ${ArrowRight20({ slot: 'icon' })}
                </c4d-card-footer>
              </c4d-link-list-item-card>
              <c4d-link-list-item-card href="https://example.com">
                <p>Containerization A Complete Guide</p>
                <c4d-card-footer>
                  ${ArrowRight20({ slot: 'icon' })}
                </c4d-card-footer>
              </c4d-link-list-item-card>
            </c4d-link-list>
          `
        : ``}
    </c4d-content-block>
  `;
};

export default {
  title: 'Components/Content block',
  decorators: [
    (story) => html`
      <div class="cds--grid">
        <div class="cds--row">
          <div class="cds--col-lg-12 cds--no-gutter">${story()}</div>
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
