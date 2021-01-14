/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import '../content-block-media';
import '../../content-block/content-block-heading';
import '../../content-block/content-block-paragraph';
import '../../content-group/content-group-heading';
import '../../content-item/content-item-heading';
import '../../content-item/content-item-copy';
import '../../content-item/content-item';
import '../content-block-media-content';
import '../../card/card-heading';
import '../../card-link/card-link';
import '../../feature-card/feature-card';
import '../../feature-card/feature-card-footer';
import readme from './README.stories.mdx';

const heading = 'Lorem ipsum dolor sit amet.';

const copyWithList = `Lorem ipsum *dolor* sit amet, consectetur adipiscing elit. Aenean et ultricies est.
  Mauris iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales
  nulla quis, *consequat* libero. Here are
  some common categories: \n
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

const copy = `Lorem ipsum dolor sit amet, *consectetur* adipiscing elit.
  Vivamus sed interdum tortor. Sed id pellentesque diam.
  In ut quam id mauris finibus efficitur quis ut arcu.
  Praesent purus turpis, venenatis eget odio et, tincidunt bibendum sem.
  Curabitur pretium elit non blandit lobortis.
  Donec quis pretium odio, in dignissim sapien.`;

const items = [
  {
    heading,
    copy,
  },
  {
    heading,
    copy: copyWithList,
  },
  {
    heading,
    copy,
  },
];

export const Default = () => {
  return html`
    <dds-content-block-heading>
      Curabitur malesuada varius mi eu posuere
    </dds-content-block-heading>
    <dds-content-block-paragraph>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
      Phasellus at elit sollicitudin, sodales nulla quis, consequat libero. Phasellus at elit sollicitudin, sodales nulla quis,
      consequat libero.
    </dds-content-block-paragraph>
    <dds-content-block-media-content>
      <dds-content-group-heading>
        Lorem ipsum dolor sit amet
      </dds-content-group-heading>
      <dds-image-with-caption
        slot="media"
        alt="Image alt text"
        default-src="https://fpoimg.com/672x378?text=16:9&amp;bg_color=ee5396&amp;text_color=161616"
        heading="Lorem ipsum"
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
      ${items.map(
        ({ heading: itemHeading, copy: itemCopy }) => html`
          <dds-content-item>
            <dds-content-item-heading>${itemHeading}</dds-content-item-heading>
            <dds-content-item-copy>${itemCopy}</dds-content-item-copy>
          </dds-content-item>
        `
      )}
      <dds-card-link slot="footer" href="https://example.com">
        <p>Lorem ipsum dolor sit amet</p>
        <dds-card-footer>
          ${ArrowRight20({ slot: 'icon' })}
        </dds-card-footer>
      </dds-card-link>
    </dds-content-block-media-content>
    <dds-content-block-media-content>
      <dds-content-group-heading>
        Lorem ipsum dolor sit amet
      </dds-content-group-heading>
      <dds-image-with-caption
        slot="media"
        alt="Image alt text"
        default-src="https://fpoimg.com/672x378?text=16:9&amp;bg_color=ee5396&amp;text_color=161616"
        heading="Lorem ipsum"
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
      ${items.map(
        ({ heading: itemHeading, copy: itemCopy }) => html`
          <dds-content-item>
            <dds-content-item-heading>${itemHeading}</dds-content-item-heading>
            <dds-content-item-copy>${itemCopy}</dds-content-item-copy>
          </dds-content-item>
        `
      )}
      <dds-card-link slot="footer" href="https://example.com">
        <p>Lorem ipsum dolor sit amet</p>
        <dds-card-footer>
          ${ArrowRight20({ slot: 'icon' })}
        </dds-card-footer>
      </dds-card-link>
    </dds-content-block-media-content>
    <dds-content-block-media-content>
      <dds-content-group-heading>
        Lorem ipsum dolor sit amet
      </dds-content-group-heading>
      <dds-feature-card href="https://example.com">
        <dds-image
          slot="image"
          alt="Feature card image"
          default-src="https://fpoimg.com/672x672?text=1:1&amp;bg_color=ee5396&amp;text_color=161616"
        ></dds-image>
        <dds-card-heading>Consectetur adipisicing elit</dds-card-heading>
        <dds-feature-card-footer>
          ${ArrowRight20({ slot: 'icon' })}
        </dds-feature-card-footer>
      </dds-feature-card>
    </dds-content-block-media-content>
  `;
};

export default {
  title: 'Components/Content Block Media',
  decorators: [
    story => html`
      <div class="bx--grid dds-ce-demo-devenv--grid--stretch">
        <div class="bx--row dds-ce-demo-devenv--grid-row">
          <div class="bx--col-sm-4 bx--col-lg-8">
            <dds-content-block-media>
              ${story()}
            </dds-content-block-media>
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasGrid: true,
    hasVerticalSpacingInComponent: true,
  },
};
