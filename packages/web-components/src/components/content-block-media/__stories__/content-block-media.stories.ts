/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../content-block-media';
import '../../content-block/content-block-heading';
import '../../content-block/content-block-copy';
import '../../content-group/content-group-heading';
import '../../content-item/content-item-heading';
import '../../content-item/content-item-copy';
import '../../content-item/content-item';
import '../content-block-media-content';
import '../../card/card-heading';
import '../../card-link/card-link';
import '../../feature-card/feature-card';
import '../../feature-card/feature-card-footer';
import '../../link-list/link-list';
import '../../link-list/link-list-heading';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import { html } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import { select } from '@storybook/addon-knobs';
import textNullable from '../../../../.storybook/knob-text-nullable';
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--002.jpg';
import imgLg1x1 from '../../../../../storybook-images/assets/720/fpo--1x1--720x720--004.jpg';
import imgMd16x9 from '../../../../../storybook-images/assets/480/fpo--16x9--480x270--002.jpg';
import imgSm16x9 from '../../../../../storybook-images/assets/320/fpo--16x9--320x180--002.jpg';
import readme from './README.stories.mdx';
import { CONTENT_BLOCK_COMPLEMENTARY_STYLE_SCHEME } from '../../content-block/defs';

const complementaryStyleSchemes = {
  'Without border': null,
  // eslint-disable-next-line max-len
  'With border': CONTENT_BLOCK_COMPLEMENTARY_STYLE_SCHEME.WITH_BORDER,
};

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

const linkListItems = [
  'Containerization A Complete Guide',
  'Why should you use microservices and containers',
  'Learn more about Kubernetes',
  'Explore AI use cases in all industries',
];

export const Default = ({ parameters }) => {
  const { blockHeading, simpleGroupHeading, featureCard, complementaryStyleScheme } = parameters?.props?.ContentBlockMedia ?? {};
  return html`
    <dds-content-block-media complementary-style-scheme="${ifNonNull(complementaryStyleScheme)}">
      <dds-content-block-heading>
        ${blockHeading}
      </dds-content-block-heading>
      <dds-content-block-copy size="lg"
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec
        hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero. Phasellus at elit sollicitudin, sodales
        nulla quis, consequat libero.
      </dds-content-block-copy>
      <dds-content-block-media-content>
        <dds-content-group-heading>
          ${simpleGroupHeading}
        </dds-content-group-heading>
        <dds-image-with-caption slot="media" alt="Image alt text" default-src="${imgLg16x9}" heading="Lorem ipsum">
          <dds-image-item media="(min-width: 672px)" srcset="${imgLg16x9}"> </dds-image-item>
          <dds-image-item media="(min-width: 400px)" srcset="${imgMd16x9}"> </dds-image-item>
          <dds-image-item media="(min-width: 320px)" srcset="${imgSm16x9}"> </dds-image-item>
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
          ${simpleGroupHeading}
        </dds-content-group-heading>
        <dds-image-with-caption slot="media" alt="Image alt text" default-src="${imgLg16x9}" heading="Lorem ipsum">
          <dds-image-item media="(min-width: 672px)" srcset="${imgLg16x9}"> </dds-image-item>
          <dds-image-item media="(min-width: 400px)" srcset="${imgMd16x9}"> </dds-image-item>
          <dds-image-item media="(min-width: 320px)" srcset="${imgSm16x9}"> </dds-image-item>
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
        ${featureCard === 'CTA'
          ? html`
              <dds-content-group-heading>
                Lorem ipsum dolor sit amet
              </dds-content-group-heading>
              <dds-feature-card href="https://example.com">
                <dds-image slot="image" alt="Feature card image" default-src="${imgLg1x1}"></dds-image>
                <dds-card-heading>Consectetur adipisicing elit</dds-card-heading>
                <dds-feature-card-footer>
                  ${ArrowRight20({ slot: 'icon' })}
                </dds-feature-card-footer>
              </dds-feature-card>
            `
          : ``}
      </dds-content-block-media-content>
    </dds-content-block-media>
  `;
};

export const withLinkList = ({ parameters }) => {
  const { blockHeading, simpleGroupHeading, featureCard, linkListHeading, complementaryStyleScheme, totalLinks } =
    parameters?.props?.ContentBlockMedia ?? {};
  return html`
    <dds-content-block-media complementary-style-scheme="${ifNonNull(complementaryStyleScheme)}">
      <dds-content-block-heading>
        ${blockHeading}
      </dds-content-block-heading>
      <dds-content-block-copy size="lg"
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec
        hendrerit. Phasellus at elit sollicitudin, sodales nulla quis, consequat libero. Phasellus at elit sollicitudin, sodales
        nulla quis, consequat libero.
      </dds-content-block-copy>
      <dds-content-block-media-content>
        <dds-content-group-heading>
          ${simpleGroupHeading}
        </dds-content-group-heading>
        <dds-image-with-caption slot="media" alt="Image alt text" default-src="${imgLg16x9}" heading="Lorem ipsum">
          <dds-image-item media="(min-width: 672px)" srcset="${imgLg16x9}"> </dds-image-item>
          <dds-image-item media="(min-width: 400px)" srcset="${imgMd16x9}"> </dds-image-item>
          <dds-image-item media="(min-width: 320px)" srcset="${imgSm16x9}"> </dds-image-item>
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
        <dds-image-with-caption slot="media" alt="Image alt text" default-src="${imgLg16x9}" heading="Lorem ipsum">
          <dds-image-item media="(min-width: 672px)" srcset="${imgLg16x9}"> </dds-image-item>
          <dds-image-item media="(min-width: 400px)" srcset="${imgMd16x9}"> </dds-image-item>
          <dds-image-item media="(min-width: 320px)" srcset="${imgSm16x9}"> </dds-image-item>
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
        ${featureCard === 'CTA'
          ? html`
              <dds-content-group-heading>
                Lorem ipsum dolor sit amet
              </dds-content-group-heading>
              <dds-feature-card href="https://example.com">
                <dds-image slot="image" alt="Feature card image" default-src="${imgLg1x1}"></dds-image>
                <dds-card-heading>Consectetur adipisicing elit</dds-card-heading>
                <dds-feature-card-footer>
                  ${ArrowRight20({ slot: 'icon' })}
                </dds-feature-card-footer>
              </dds-feature-card>
            `
          : ``}
      </dds-content-block-media-content>
      <dds-link-list type="default" slot="complementary">
        <dds-link-list-heading>${linkListHeading}</dds-link-list-heading>
        ${linkListItems.slice(0, totalLinks).map(
          linkListCopy => html`
            <dds-link-list-item-card-cta href="https://example.com" cta-type="local">
              <p>${linkListCopy}</p>
              <dds-card-cta-footer></dds-card-cta-footer>
            </dds-link-list-item-card-cta>
          `
        )}
      </dds-link-list>
    </dds-content-block-media>
  `;
};

withLinkList.story = {
  parameters: {
    gridContentClasses: 'dds-ce-demo-devenv--simple-grid--content-layout--with-complementary',
    knobs: {
      ContentBlockMedia: () => ({
        blockHeading: textNullable('Heading (required)', 'Curabitur malesuada varius mi eu posuere'),
        simpleGroupHeading: textNullable('Simple Group Heading (required)', 'Lorem ipsum dolor sit amet'),
        featureCard: select('FeatureCard (optional)', ['CTA', 'none'], 'CTA'),
        linkListHeading: textNullable('Link list heading (heading)', 'Tutorials'),
        totalLinks: select('Number of links', [2, 3, 4], 2),
        complementaryStyleScheme: select(
          'Container bottom border',
          complementaryStyleSchemes,
          complementaryStyleSchemes['With border']
        ),
      }),
    },
  },
};

export default {
  title: 'Components/Content block media',
  decorators: [
    (story, { parameters }) => html`
      <div class="dds-ce-demo-devenv--simple-grid ${parameters.gridContentClasses}">
        ${story()}
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasGrid: true,
    hasVerticalSpacingInComponent: true,
    gridContentClasses: 'dds-ce-demo-devenv--simple-grid--content-layout',
    knobs: {
      ContentBlockMedia: () => ({
        blockHeading: textNullable('Heading (required)', 'Curabitur malesuada varius mi eu posuere'),
        simpleGroupHeading: textNullable('Simple Group Heading (required)', 'Lorem ipsum dolor sit amet'),
        featureCard: select('FeatureCard (optional)', ['CTA', 'none'], 'CTA'),
        complementaryStyleScheme: select(
          'Container bottom border',
          complementaryStyleSchemes,
          complementaryStyleSchemes['With border']
        ),
      }),
    },
  },
};
