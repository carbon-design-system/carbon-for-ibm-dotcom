/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import { select } from '@storybook/addon-knobs';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../index';
import '../content-item-horizontal-media-video';
import '../../image/image';
import { ICON_PLACEMENT } from '../../link-with-icon/link-with-icon';
import { CTA_TYPE } from '../../cta/defs';
import { MEDIA_ALIGN, MEDIA_TYPE } from '../defs';
// import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--001.jpg';
// import imgMd4x3 from '../../../../../storybook-images/assets/480/fpo--4x3--480x360--004.jpg';

const types = {
  [`Local (${CTA_TYPE.LOCAL})`]: CTA_TYPE.LOCAL,
  [`External (${CTA_TYPE.EXTERNAL})`]: CTA_TYPE.EXTERNAL,
};

const mediaAlign = {
  [`Left`]: MEDIA_ALIGN.LEFT,
  [`Right`]: MEDIA_ALIGN.RIGHT,
};

const mediaType = {
  [`Image`]: MEDIA_TYPE.IMAGE,
  [`Video`]: MEDIA_TYPE.VIDEO,
};

const bodyCopy = `Lorem ipsum *dolor* sit amet, [consectetur adipiscing](https://www.ibm.com) elit.
Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.
Phasellus at elit sollicitudin, sodales nulla quis, consequat libero.
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Aenean et ultricies est.\n
- [list item](https://www.ibm.com)
  - list item 1a
1. list item 2
   1. list item 2a
`;

const bodyCopyWithFeaturedMedia = `Lorem ipsum *dolor* sit amet, [consectetur
  adipiscing](https://www.ibm.com) elit. Aenean et ultricies est. Mauris
  iaculis eget dolor nec hendrerit. Phasellus at elit sollicitudin, sodales
  nulla quis,consequat libero.`;

export const Default = args => {
  const { eyebrow, heading, copy, ctaType1, ctaCopy1, href1, ctaType2, ctaCopy2, href2 } = args?.ContentItemHorizontal ?? {};
  return html`
    <dds-content-item-horizontal>
      <dds-content-item-horizontal-eyebrow>${eyebrow}</dds-content-item-horizontal-eyebrow>
      <dds-content-item-heading>${heading}</dds-content-item-heading>
      <dds-content-item-horizontal-copy>${copy}</dds-content-item-horizontal-copy>
      <dds-link-list slot="footer" type="vertical">
        <dds-link-list-item-cta
          icon-placement="${ICON_PLACEMENT.RIGHT}"
          href="${ifNonNull(href1)}"
          cta-type="${ifNonNull(ctaType1)}"
        >
          ${ctaCopy1}
        </dds-link-list-item-cta>
        <dds-link-list-item-cta
          icon-placement="${ICON_PLACEMENT.RIGHT}"
          href="${ifNonNull(href2)}"
          cta-type="${ifNonNull(ctaType2)}"
        >
          ${ctaCopy2}
        </dds-link-list-item-cta>
      </dds-link-list>
    </dds-content-item-horizontal>
  `;
};

export const WithThumbnail = args => {
  const { alt, heading, copy, ctaType1, ctaCopy1, href1, ctaType2, ctaCopy2, href2 } = args?.ContentItemHorizontal ?? {};
  return html`
    <dds-content-item-horizontal thumbnail>
      <dds-content-item-heading>${heading}</dds-content-item-heading>
      <dds-content-item-horizontal-thumbnail-copy>${copy}</dds-content-item-horizontal-thumbnail-copy>
      <dds-link-list slot="footer" type="vertical">
        <dds-link-list-item-cta
          icon-placement="${ICON_PLACEMENT.RIGHT}"
          href="${ifNonNull(href1)}"
          cta-type="${ifNonNull(ctaType1)}"
        >
          ${ctaCopy1}
        </dds-link-list-item-cta>
        <dds-link-list-item-cta
          icon-placement="${ICON_PLACEMENT.RIGHT}"
          href="${ifNonNull(href2)}"
          cta-type="${ifNonNull(ctaType2)}"
        >
          ${ctaCopy2}
        </dds-link-list-item-cta>
      </dds-link-list>
      <dds-image slot="thumbnail" alt="${ifNonNull(alt)}" default-src="https://dummyimage.com/600x400/000/fff"></dds-image>
    </dds-content-item-horizontal>
  `;
};

export const WithMedia = args => {
  const { align, type, alt, heading, eyebrow, copy, ctaType1, ctaCopy1, href1, ctaType2, ctaCopy2, href2 } =
    args?.ContentItemHorizontal ?? {};
  return html`
    <dds-content-item-horizontal-media align="${align}">
      ${type === MEDIA_TYPE.IMAGE
        ? html`
            <dds-image slot="media" alt="${ifNonNull(alt)}" default-src="https://dummyimage.com/600x400/000/fff"></dds-image>
          `
        : null}
      ${type === MEDIA_TYPE.VIDEO
        ? html`
            <dds-content-item-horizontal-media-video video-id="1_9h94wo6b"></dds-content-item-horizontal-media-video>
          `
        : null}
      <dds-content-item-horizontal-eyebrow>${eyebrow}</dds-content-item-horizontal-eyebrow>
      <dds-content-item-heading>${heading}</dds-content-item-heading>
      <dds-content-item-horizontal-media-copy>${copy}</dds-content-item-horizontal-media-copy>
      <dds-link-list slot="footer" type="vertical">
        <dds-link-list-item-cta
          icon-placement="${ICON_PLACEMENT.RIGHT}"
          href="${ifNonNull(href1)}"
          cta-type="${ifNonNull(ctaType1)}"
        >
          ${ctaCopy1}
        </dds-link-list-item-cta>
        <dds-link-list-item-cta
          icon-placement="${ICON_PLACEMENT.RIGHT}"
          href="${ifNonNull(href2)}"
          cta-type="${ifNonNull(ctaType2)}"
        >
          ${ctaCopy2}
        </dds-link-list-item-cta>
      </dds-link-list>
    </dds-content-item-horizontal-media>
  `;
};

export const WithMediaFeatured = args => {
  const { type, heading, eyebrow, copy, ctaCopy1, ctaCopy2 } = args?.ContentItemHorizontal ?? {};
  return html`
    <dds-content-item-horizontal-media-featured>
      ${type === MEDIA_TYPE.IMAGE
        ? html`
            <dds-image
              slot="media"
              alt="Image alt text"
              default-src="https://dummyimage.com/600x400/000/fff"
              heading="Lorem ipsum dolor sit amet"
            >
            </dds-image>
          `
        : null}
      ${type === MEDIA_TYPE.VIDEO
        ? html`
            <dds-content-item-horizontal-media-video video-id="1_9h94wo6b"></dds-content-item-horizontal-media-video>
          `
        : null}
      <dds-content-item-horizontal-eyebrow>${eyebrow}</dds-content-item-horizontal-eyebrow>
      <dds-content-item-heading>${heading}</dds-content-item-heading>
      <dds-content-item-horizontal-media-copy>${copy}</dds-content-item-horizontal-media-copy>
      <dds-link-list slot="footer" type="vertical">
        <dds-link-list-item-cta icon-placement="${ICON_PLACEMENT.RIGHT}" href="https://www.ibm.com" cta-type="${CTA_TYPE.LOCAL}">
          ${ctaCopy1}
        </dds-link-list-item-cta>
        <dds-link-list-item-cta
          icon-placement="${ICON_PLACEMENT.RIGHT}"
          href="https://www.ibm.com"
          cta-type="${CTA_TYPE.EXTERNAL}"
        >
          ${ctaCopy2}
        </dds-link-list-item-cta>
      </dds-link-list>
    </dds-content-item-horizontal-media-featured>
  `;
};

Default.story = {
  parameters: {
    gridContentClasses: 'bx--col-lg-10 bx--no-gutter',
  },
};

WithThumbnail.story = {
  name: 'With thumbnail',
  parameters: {
    gridContentClasses: 'bx--col-lg-12 bx--no-gutter',
    knobs: {
      ContentItemHorizontal: () => ({
        heading: textNullable('Heading (heading):', 'Aliquam condimentum'),
        copy: bodyCopy,
        ctaType1: select('CTA 1 type (cta-type)', types, CTA_TYPE.LOCAL),
        ctaCopy1: textNullable('CTA 1 copy (cta-copy):', 'Learn more'),
        href1: textNullable('CTA 1 href (cta-href):', 'https://www.ibm.com'),
        ctaType2: select('CTA 2 type (cta-type)', types, CTA_TYPE.EXTERNAL),
        ctaCopy2: textNullable('CTA 2 copy (cta-copy):', 'Microservices and containers'),
        href2: textNullable('CTA 2 href (cta-href):', 'https://www.ibm.com'),
      }),
    },
    propsSet: {
      default: {
        ContentItemHorizontal: {
          heading: 'Aliquam condimentum',
          copy: bodyCopy,
        },
      },
    },
  },
};

WithMedia.story = {
  name: 'With media',
  parameters: {
    gridContentClasses: 'bx--col-lg-10',
    knobs: {
      ContentItemHorizontal: () => ({
        align: select('Alignment', mediaAlign, MEDIA_ALIGN.RIGHT),
        type: select('Media type', mediaType, MEDIA_TYPE.IMAGE),
        alt: textNullable('Image alt text', 'Image alt text'),
        heading: textNullable('Heading (heading):', 'Aliquam condimentum'),
        eyebrow: textNullable('Eyebrow label:', 'Lorem Ipsum'),
        copy: bodyCopy,
        ctaType1: select('CTA 1 type (cta-type):', types, CTA_TYPE.LOCAL),
        ctaCopy1: textNullable('CTA 1 copy (cta-copy):', 'Learn more'),
        href1: textNullable('CTA 1 href (cta-href):', 'https://www.ibm.com'),
        ctaType2: select('CTA 2 type (cta-type):', types, CTA_TYPE.EXTERNAL),
        ctaCopy2: textNullable('CTA 2 copy (cta-copy):', 'Microservices and containers'),
        href2: textNullable('CTA 2 href (cta-href):', 'https://www.ibm.com'),
      }),
    },
    propsSet: {
      default: {
        ContentItemHorizontal: {
          align: 'right',
          type: 'image',
          alt: 'Image alt text',
          heading: 'Aliquam condimentum',
          eyebrow: 'Lorem Ipsum',
          copy: bodyCopy,
          ctaType1: 'local',
          ctaCopy1: 'Learn more',
          href1: 'https://www.ibm.com',
          ctaType2: 'external',
          ctaCopy2: 'Microservices and containers',
          href2: 'https://www.ibm.com',
        },
      },
    },
  },
};

WithMediaFeatured.story = {
  name: 'With featured media',
  parameters: {
    gridContentClasses: 'bx--col-lg-10',
    knobs: {
      ContentItemHorizontal: () => ({
        type: select('Media type', mediaType, MEDIA_TYPE.IMAGE),
        eyebrow: textNullable('Eyebrow:', 'Lorem Ipsum'),
        heading: textNullable('Heading:', 'Aliquam condimentum'),
        copy: bodyCopyWithFeaturedMedia,
        ctaCopy1: textNullable('CTA 1 copy:', 'Learn more'),
        ctaCopy2: textNullable('CTA 2 copy:', 'Microservices and containers'),
      }),
    },
    propsSet: {
      default: {
        ContentItemHorizontal: {
          type: 'image',
          alt: 'Image alt text',
          heading: 'Aliquam condimentum',
          eyebrow: 'Lorem Ipsum',
          copy: bodyCopyWithFeaturedMedia,
          ctaCopy1: 'Learn more',
          ctaCopy2: 'Microservices and containers',
        },
      },
    },
  },
};

export default {
  title: 'Components/Content item horizontal',
  decorators: [
    (story, { parameters }) => html`
      <div class="bx--grid">
        <div class="bx--row">
          <div class="${parameters.gridContentClasses}">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      ContentItemHorizontal: () => ({
        eyebrow: textNullable('Eyebrow (eyebrow):', 'Lorem ipsum'),
        heading: textNullable('Heading (heading):', 'Aliquam condimentum'),
        copy: bodyCopy,
        ctaType1: select('CTA 1 type (cta-type)', types, CTA_TYPE.LOCAL),
        ctaCopy1: textNullable('CTA 1 copy (cta-copy):', 'Learn more'),
        href1: textNullable('CTA 1 href (cta-href):', 'https://www.ibm.com'),
        ctaType2: select('CTA 2 type (cta-type)', types, CTA_TYPE.EXTERNAL),
        ctaCopy2: textNullable('CTA 2 copy (cta-copy):', 'Microservices and containers'),
        href2: textNullable('CTA 2 href (cta-href):', 'https://www.ibm.com'),
      }),
    },
    propsSet: {
      default: {
        ContentItemHorizontal: {
          eyebrow: 'Lorem ipsum',
          heading: 'Aliquam condimentum',
          copy: bodyCopy,
          ctaType1: 'local',
          ctaCopy1: 'Learn more',
          href1: 'https://www.ibm.com',
          ctaType2: 'external',
          ctaCopy2: 'Microservices and containers',
          href2: 'https://www.ibm.com',
        },
      },
    },
  },
};
