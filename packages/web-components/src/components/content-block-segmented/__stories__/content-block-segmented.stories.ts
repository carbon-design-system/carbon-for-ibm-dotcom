/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../index';
import '../../video-player/video-player-container';
import '../../link-list/index';
import '../../cta/index';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { select } from '@storybook/addon-knobs';
// eslint-disable-next-line sort-imports
import { CTA_STYLE, CTA_TYPE } from '../../cta/defs';
import { CONTENT_BLOCK_COMPLEMENTARY_STYLE_SCHEME } from '../../content-block/content-block';
import imgLg16x9 from '../../../../.storybook/storybook-images/assets/720/fpo--16x9--720x405--005.jpg';
import imgMd16x9 from '../../../../.storybook/storybook-images/assets/480/fpo--16x9--480x270--005.jpg';
import imgSm16x9 from '../../../../.storybook/storybook-images/assets/320/fpo--16x9--320x180--005.jpg';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

const hrefsForType = {
  [CTA_TYPE.LOCAL]: 'https://www.example.com',
  [CTA_TYPE.JUMP]: '#example',
  [CTA_TYPE.EXTERNAL]: 'https://www.example.com',
};

const ctaTypes = {
  [`Local (${CTA_TYPE.LOCAL})`]: CTA_TYPE.LOCAL,
  [`Jump (${CTA_TYPE.JUMP})`]: CTA_TYPE.JUMP,
  [`External (${CTA_TYPE.EXTERNAL})`]: CTA_TYPE.EXTERNAL,
};

const ctaStyles = {
  [`Card Link (${CTA_STYLE.CARDLINK})`]: CTA_STYLE.CARDLINK,
  [`Text (${CTA_STYLE.TEXT})`]: CTA_STYLE.TEXT,
};

const complementaryStyleSchemes = {
  Without: null,
  // eslint-disable-next-line max-len
  'With border': CONTENT_BLOCK_COMPLEMENTARY_STYLE_SCHEME.WITH_BORDER,
};
const image = html`
  <c4d-image
    slot="media"
    alt="Image alt text"
    default-src="${imgLg16x9}"
    heading="Mauris iaculis eget dolor nec hendrerit.">
    <c4d-image-item media="(min-width: 672px)" srcset="${imgLg16x9}">
    </c4d-image-item>
    <c4d-image-item media="(min-width: 400px)" srcset="${imgMd16x9}">
    </c4d-image-item>
    <c4d-image-item media="(min-width: 320px)" srcset="${imgSm16x9}">
    </c4d-image-item>
  </c4d-image>
`;

const contentItemCopy =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ' +
  'sed interdum tortor. Sed id pellentesque diam. In ut quam id mauris finibus ' +
  'efficitur quis ut arcu. Praesent purus turpis, venenatis eget odio et, ' +
  'tincidunt bibendum sem. Curabitur pretium elit non blandit lobortis. Donec ' +
  'quis pretium odio, in dignissim sapien. Lorem ipsum dolor sit amet, ' +
  'consectetur adipiscing elit. Vivamus sed interdum tortor. Sed id pellentesque ' +
  'diam. In ut quam id mauris finibus efficitur quis ut arcu. Praesent purus ' +
  'turpis, venenatis eget odio et, tincidunt bibendum sem. Curabitur pretium ' +
  'elit non blandit lobortis. Donec quis pretium odio, in dignissim sapien.';

const video = html`
  <c4d-video-player-container
    slot="media"
    video-id="0_uka1msg4"></c4d-video-player-container>
`;

const linkListItems = [
  'Containerization A Complete Guide',
  'Why should you use microservices and containers',
  'Learn more about Kubernetes',
  'Explore AI use cases in all industries',
];

export const Default = (args) => {
  const { heading, copy, ctaStyle, ctaType, complementaryStyleScheme } =
    args?.ContentBlockSegmented ?? {};
  const headingComponent = document.querySelector('c4d-content-block-heading');

  if (headingComponent && headingComponent.shadowRoot) {
    headingComponent.shadowRoot.textContent = heading;
  }

  return html`
    <c4d-content-block-segmented
      complementary-style-scheme="${ifDefined(complementaryStyleScheme)}">
      <c4d-content-block-heading>${heading}</c4d-content-block-heading>
      <c4d-content-block-copy>${copy}</c4d-content-block-copy>
      ${image}
      <c4d-content-block-segmented-item>
        <c4d-content-group-heading
          >Lorem ipsum dolor sit amet.</c4d-content-group-heading
        >
        <c4d-content-item-copy>${contentItemCopy}</c4d-content-item-copy>
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
          >Lorem ipsum dolor sit amet.</c4d-content-group-heading
        >
        <c4d-content-item-copy>${contentItemCopy}</c4d-content-item-copy>
        ${video}
        <c4d-text-cta
          slot="footer"
          cta-type="local"
          icon-placement="right"
          href="https://example.com"
          >Lorem Ipsum dolor sit</c4d-text-cta
        >
      </c4d-content-block-segmented-item>
      ${ctaStyle === 'text'
        ? html`
            <c4d-text-cta
              slot="footer"
              cta-type=${ctaType}
              icon-placement="right"
              href=${hrefsForType[ctaType]}
              >Lorem ipsum dolor</c4d-text-cta
            >
          `
        : html`
            <c4d-card-link-cta
              slot="footer"
              cta-type=${ctaType}
              href=${hrefsForType[ctaType]}>
              <c4d-card-link-heading>Lorem ipsum dolor</c4d-card-link-heading>
              <c4d-card-footer></c4d-card-footer>
            </c4d-card-link-cta>
          `}
    </c4d-content-block-segmented>
  `;
};

export const withLinkList = (args) => {
  const {
    blockHeading,
    heading,
    copy,
    ctaStyle,
    ctaType,
    complementaryStyleScheme,
    totalLinks,
  } = args?.ContentBlockSegmented ?? {};
  const headingComponent = document.querySelector('c4d-content-block-heading');

  if (headingComponent && headingComponent.shadowRoot) {
    headingComponent.shadowRoot.textContent = blockHeading;
  }

  return html`
    <c4d-content-block-segmented
      complementary-style-scheme="${ifDefined(complementaryStyleScheme)}">
      <c4d-content-block-heading>${blockHeading}</c4d-content-block-heading>
      <c4d-content-block-copy>${copy}</c4d-content-block-copy>
      ${image}
      <c4d-content-block-segmented-item>
        <c4d-content-group-heading
          >Lorem ipsum dolor sit amet.</c4d-content-group-heading
        >
        <c4d-content-item-copy>${contentItemCopy}</c4d-content-item-copy>
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
          >Lorem ipsum dolor sit amet.</c4d-content-group-heading
        >
        <c4d-content-item-copy>${contentItemCopy}</c4d-content-item-copy>
        ${image}
        <c4d-text-cta
          slot="footer"
          cta-type="local"
          icon-placement="right"
          href="https://example.com"
          >Lorem Ipsum dolor sit</c4d-text-cta
        >
      </c4d-content-block-segmented-item>
      <c4d-link-list type="default" slot="complementary">
        <c4d-link-list-heading>${heading}</c4d-link-list-heading>
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
      ${ctaStyle === 'text'
        ? html`
            <c4d-text-cta
              slot="footer"
              cta-type=${ctaType}
              icon-placement="right"
              href=${hrefsForType[ctaType]}
              >Lorem ipsum dolor</c4d-text-cta
            >
          `
        : html`
            <c4d-card-link-cta
              slot="footer"
              cta-type=${ctaType}
              href=${hrefsForType[ctaType]}>
              <c4d-card-link-heading>Lorem ipsum dolor</c4d-card-link-heading>
              <c4d-card-footer></c4d-card-footer>
            </c4d-card-link-cta>
          `}
    </c4d-content-block-segmented>
  `;
};

withLinkList.story = {
  name: 'With link list',
  parameters: {
    percy: {
      skip: true,
    },
    gridContentClasses: 'cds--col-lg-12',
    knobs: {
      ContentBlockSegmented: () => ({
        blockHeading: textNullable(
          'Heading (required)',
          'Lorem ipsum dolor sit amet.'
        ),
        heading: textNullable('Link list heading (heading)', 'Tutorials'),
        totalLinks: select('Number of links', [2, 3, 4], 2),
        copy:
          'Lorem ipsum dolor sit amet, consectetur ' +
          'adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. ' +
          'Phasellus at elit sollicitudin, sodales nulla quis, consequat libero. ' +
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.' +
          ' Mauris iaculis eget dolor nec hendrerit.',
        ctaStyle: select('CTA style (cta-style)', ctaStyles, null),
        ctaType: select('CTA type (cta-type)', ctaTypes, CTA_TYPE.LOCAL),
        complementaryStyleScheme: select(
          'Container bottom border',
          complementaryStyleSchemes,
          complementaryStyleSchemes['With border']
        ),
      }),
    },
    propsSet: {
      default: {
        ContentBlockSegmented: {
          blockHeading: 'Lorem ipsum dolor sit amet.',
          heading: 'Tutorials',
          totalLinks: 2,
          copy:
            'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. ' +
            'Phasellus at elit sollicitudin, sodales nulla quis, consequat libero. ' +
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.' +
            ' Mauris iaculis eget dolor nec hendrerit.',
          ctaStyle: null,
          ctaType: CTA_TYPE.LOCAL,
          complementaryStyleScheme: 'with-border',
        },
      },
    },
  },
};

export default {
  title: 'Components/Content block segmented',
  decorators: [
    (story, { parameters }) => html`
      <div class="cds--grid">
        <div class="cds--row">
          <div class="cds--no-gutter ${parameters.gridContentClasses}">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    percy: {
      skip: true,
    },
    ...readme.parameters,
    gridContentClasses: 'cds--col-lg-8',
    hasStoryPadding: true,
    knobs: {
      ContentBlockSegmented: () => ({
        heading: textNullable(
          'Heading (required)',
          'Lorem ipsum dolor sit amet.'
        ),
        copy:
          'Lorem ipsum dolor sit amet, consectetur ' +
          'adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. ' +
          'Phasellus at elit sollicitudin, sodales nulla quis, consequat libero. ' +
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.' +
          ' Mauris iaculis eget dolor nec hendrerit.',
        ctaStyle: select('CTA style (cta-style)', ctaStyles, null),
        ctaType: select('CTA type (cta-type)', ctaTypes, CTA_TYPE.LOCAL),
        complementaryStyleScheme: select(
          'Container bottom border',
          complementaryStyleSchemes,
          complementaryStyleSchemes['With border']
        ),
      }),
    },
    propsSet: {
      default: {
        ContentBlockSegmented: {
          heading: 'Lorem ipsum dolor sit amet.',
          copy:
            'Lorem ipsum dolor sit amet, consectetur ' +
            'adipiscing elit. Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. ' +
            'Phasellus at elit sollicitudin, sodales nulla quis, consequat libero. ' +
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et ultricies est.' +
            ' Mauris iaculis eget dolor nec hendrerit.',
          ctaStyle: null,
          ctaType: CTA_TYPE.LOCAL,
        },
      },
    },
  },
};
