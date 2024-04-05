/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../index';
import '../../cta/index';
import '../../link-list/link-list';
import '../../link-list/link-list-heading';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { select } from '@storybook/addon-knobs';
import textNullable from '../../../../.storybook/knob-text-nullable';
import imgLg16x9 from '../../../../.storybook/storybook-images/assets/720/fpo--16x9--720x405--002.jpg';
import imgLg1x1 from '../../../../.storybook/storybook-images/assets/720/fpo--1x1--720x720--004.jpg';
import imgMd16x9 from '../../../../.storybook/storybook-images/assets/480/fpo--16x9--480x270--002.jpg';
import imgSm16x9 from '../../../../.storybook/storybook-images/assets/320/fpo--16x9--320x180--002.jpg';
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
    - list "item 1a"
  1. list item 2
     1. list item 2a
        - list item 2a.a
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

export const Default = (args) => {
  const {
    blockHeading,
    simpleGroupHeading,
    featureCard,
    complementaryStyleScheme,
  } = args?.ContentBlockMedia ?? {};
  return html`
    <c4d-content-block-media
      complementary-style-scheme="${ifDefined(complementaryStyleScheme)}">
      <c4d-content-block-heading> ${blockHeading} </c4d-content-block-heading>
      <c4d-content-block-copy size="md"
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et
        ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at
        elit sollicitudin, sodales nulla quis, consequat libero. Phasellus at
        elit sollicitudin, sodales nulla quis, consequat libero.
      </c4d-content-block-copy>
      <c4d-content-block-media-content>
        <c4d-content-group-heading>
          ${simpleGroupHeading}
        </c4d-content-group-heading>
        <c4d-image
          slot="media"
          alt="Image alt text"
          default-src="${imgLg16x9}"
          heading="Lorem ipsum">
          <c4d-image-item media="(min-width: 672px)" srcset="${imgLg16x9}">
          </c4d-image-item>
          <c4d-image-item media="(min-width: 400px)" srcset="${imgMd16x9}">
          </c4d-image-item>
          <c4d-image-item media="(min-width: 320px)" srcset="${imgSm16x9}">
          </c4d-image-item>
        </c4d-image>
        ${items.map(
          ({ heading: itemHeading, copy: itemCopy }) => html`
            <c4d-content-item>
              <c4d-content-item-heading
                >${itemHeading}</c4d-content-item-heading
              >
              <c4d-content-item-copy>${itemCopy}</c4d-content-item-copy>
            </c4d-content-item>
          `
        )}
        <c4d-card-link-cta
          slot="footer"
          href="https://example.com"
          cta-type="local">
          <c4d-card-link-heading
            >Lorem ipsum dolor sit amet</c4d-card-link-heading
          >
          <c4d-card-footer></c4d-card-footer>
        </c4d-card-link-cta>
      </c4d-content-block-media-content>
      <c4d-content-block-media-content>
        <c4d-content-group-heading>
          ${simpleGroupHeading}
        </c4d-content-group-heading>
        <c4d-image
          slot="media"
          alt="Image alt text"
          default-src="${imgLg16x9}"
          heading="Lorem ipsum">
          <c4d-image-item media="(min-width: 672px)" srcset="${imgLg16x9}">
          </c4d-image-item>
          <c4d-image-item media="(min-width: 400px)" srcset="${imgMd16x9}">
          </c4d-image-item>
          <c4d-image-item media="(min-width: 320px)" srcset="${imgSm16x9}">
          </c4d-image-item>
        </c4d-image>
        ${items.map(
          ({ heading: itemHeading, copy: itemCopy }) => html`
            <c4d-content-item>
              <c4d-content-item-heading
                >${itemHeading}</c4d-content-item-heading
              >
              <c4d-content-item-copy>${itemCopy}</c4d-content-item-copy>
            </c4d-content-item>
          `
        )}
        <c4d-card-link-cta
          slot="footer"
          href="https://example.com"
          cta-type="local">
          <c4d-card-link-heading
            >Lorem ipsum dolor sit amet</c4d-card-link-heading
          >
          <c4d-card-footer></c4d-card-footer>
        </c4d-card-link-cta>
      </c4d-content-block-media-content>
      <c4d-content-block-media-content>
        ${featureCard === 'CTA'
          ? html`
              <c4d-feature-cta href="https://example.com" cta-type="local">
                <c4d-image
                  slot="image"
                  alt="Feature card image"
                  default-src="${imgLg1x1}"></c4d-image>
                <c4d-card-heading
                  >Consectetur adipisicing elit</c4d-card-heading
                >
                <c4d-feature-cta-footer></c4d-feature-cta-footer>
              </c4d-feature-cta>
            `
          : ``}
      </c4d-content-block-media-content>
    </c4d-content-block-media>
  `;
};

export const withLinkList = (args) => {
  const {
    blockHeading,
    simpleGroupHeading,
    featureCard,
    linkListHeading,
    complementaryStyleScheme,
    totalLinks,
  } = args?.ContentBlockMedia ?? {};
  return html`
    <c4d-content-block-media
      complementary-style-scheme="${ifDefined(complementaryStyleScheme)}">
      <c4d-content-block-heading> ${blockHeading} </c4d-content-block-heading>
      <c4d-content-block-copy size="md"
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et
        ultricies est. Mauris iaculis eget dolor nec hendrerit. Phasellus at
        elit sollicitudin, sodales nulla quis, consequat libero. Phasellus at
        elit sollicitudin, sodales nulla quis, consequat libero.
      </c4d-content-block-copy>
      <c4d-content-block-media-content>
        <c4d-content-group-heading>
          ${simpleGroupHeading}
        </c4d-content-group-heading>
        <c4d-image
          slot="media"
          alt="Image alt text"
          default-src="${imgLg16x9}"
          heading="Lorem ipsum">
          <c4d-image-item media="(min-width: 672px)" srcset="${imgLg16x9}">
          </c4d-image-item>
          <c4d-image-item media="(min-width: 400px)" srcset="${imgMd16x9}">
          </c4d-image-item>
          <c4d-image-item media="(min-width: 320px)" srcset="${imgSm16x9}">
          </c4d-image-item>
        </c4d-image>
        ${items.map(
          ({ heading: itemHeading, copy: itemCopy }) => html`
            <c4d-content-item>
              <c4d-content-item-heading
                >${itemHeading}</c4d-content-item-heading
              >
              <c4d-content-item-copy>${itemCopy}</c4d-content-item-copy>
            </c4d-content-item>
          `
        )}
        <c4d-card-link-cta
          slot="footer"
          href="https://example.com"
          cta-type="local">
          <c4d-card-link-heading
            >Lorem ipsum dolor sit amet</c4d-card-link-heading
          >
          <c4d-card-footer></c4d-card-footer>
        </c4d-card-link-cta>
      </c4d-content-block-media-content>
      <c4d-content-block-media-content>
        <c4d-content-group-heading>
          Lorem ipsum dolor sit amet
        </c4d-content-group-heading>
        <c4d-image
          slot="media"
          alt="Image alt text"
          default-src="${imgLg16x9}"
          heading="Lorem ipsum">
          <c4d-image-item media="(min-width: 672px)" srcset="${imgLg16x9}">
          </c4d-image-item>
          <c4d-image-item media="(min-width: 400px)" srcset="${imgMd16x9}">
          </c4d-image-item>
          <c4d-image-item media="(min-width: 320px)" srcset="${imgSm16x9}">
          </c4d-image-item>
        </c4d-image>
        ${items.map(
          ({ heading: itemHeading, copy: itemCopy }) => html`
            <c4d-content-item>
              <c4d-content-item-heading
                >${itemHeading}</c4d-content-item-heading
              >
              <c4d-content-item-copy>${itemCopy}</c4d-content-item-copy>
            </c4d-content-item>
          `
        )}
        <c4d-card-link-cta
          slot="footer"
          href="https://example.com"
          cta-type="local">
          <c4d-card-link-heading
            >Lorem ipsum dolor sit amet</c4d-card-link-heading
          >
          <c4d-card-footer></c4d-card-footer>
        </c4d-card-link-cta>
      </c4d-content-block-media-content>
      <c4d-content-block-media-content>
        ${featureCard === 'CTA'
          ? html`
              <c4d-feature-cta href="https://example.com" cta-type="local">
                <c4d-image
                  slot="image"
                  alt="Feature card image"
                  default-src="${imgLg1x1}"></c4d-image>
                <c4d-card-heading
                  >Consectetur adipisicing elit</c4d-card-heading
                >
                <c4d-feature-cta-footer> </c4d-feature-cta-footer>
              </c4d-feature-cta>
            `
          : ``}
      </c4d-content-block-media-content>
      <c4d-link-list type="default" slot="complementary">
        <c4d-link-list-heading>${linkListHeading}</c4d-link-list-heading>
        ${linkListItems.slice(0, totalLinks).map(
          (linkListCopy) => html`
            <c4d-link-list-item-cta
              href="https://example.com"
              cta-type="local"
              type="default">
              <p>${linkListCopy}</p>
            </c4d-link-list-item-cta>
          `
        )}
      </c4d-link-list>
    </c4d-content-block-media>
  `;
};

withLinkList.story = {
  name: 'With link list',
  parameters: {
    gridContentClasses: 'cds--col-lg-12',
    knobs: {
      ContentBlockMedia: () => ({
        blockHeading: textNullable(
          'Heading (required)',
          'Curabitur malesuada varius mi eu posuere'
        ),
        simpleGroupHeading: textNullable(
          'Simple Group Heading (required)',
          'Lorem ipsum dolor sit amet'
        ),
        featureCard: select('FeatureCard (optional)', ['CTA', 'none'], 'CTA'),
        linkListHeading: textNullable(
          'Link list heading (heading)',
          'Tutorials'
        ),
        totalLinks: select('Number of links', [2, 3, 4], 2),
        complementaryStyleScheme: select(
          'Container bottom border',
          complementaryStyleSchemes,
          complementaryStyleSchemes['With border']
        ),
      }),
    },
    propsSet: {
      default: {
        ContentBlockMedia: {
          blockHeading: 'Curabitur malesuada varius mi eu posuere',
          simpleGroupHeading: 'Lorem ipsum dolor sit amet',
          featureCard: 'CTA',
          linkListHeading: 'Tutorials',
          totalLinks: '2',
          complementaryStyleSchemes: 'with-border',
        },
      },
    },
  },
};

export default {
  title: 'Components/Content block media',
  decorators: [
    (story, { parameters }) => html`
      <div class="cds--grid">
        <div class="cds--row">
          <div class="${parameters.gridContentClasses} cds--no-gutter">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    gridContentClasses: 'cds--col-lg-8',
    hasStoryPadding: true,
    knobs: {
      ContentBlockMedia: () => ({
        blockHeading: textNullable(
          'Heading (required)',
          'Curabitur malesuada varius mi eu posuere'
        ),
        simpleGroupHeading: textNullable(
          'Simple Group Heading (required)',
          'Lorem ipsum dolor sit amet'
        ),
        featureCard: select('FeatureCard (optional)', ['CTA', 'none'], 'CTA'),
        complementaryStyleScheme: select(
          'Container bottom border',
          complementaryStyleSchemes,
          complementaryStyleSchemes['With border']
        ),
      }),
    },
    propsSet: {
      default: {
        ContentBlockMedia: {
          blockHeading: 'Curabitur malesuada varius mi eu posuere',
          simpleGroupHeading: 'Lorem ipsum dolor sit amet',
          featureCard: 'CTA',
          complementaryStyleScheme: 'with-border',
        },
      },
    },
  },
};
