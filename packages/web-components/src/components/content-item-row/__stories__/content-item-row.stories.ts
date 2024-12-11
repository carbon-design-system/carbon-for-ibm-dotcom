/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { select } from '@storybook/addon-knobs';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../index';
import '../content-item-row-media-video';
import '../../image/image';
import { MEDIA_ALIGN, MEDIA_TYPE } from '../defs';
import imgLg16x9 from '../../../../.storybook/storybook-images/assets/720/fpo--16x9--720x405--001.jpg';
import imgMd4x3 from '../../../../.storybook/storybook-images/assets/480/fpo--4x3--480x360--004.jpg';

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
Aenean et ultricies est.
`;

const shortBodyCopy = `Lorem ipsum *dolor* sit amet, [consectetur adipiscing](https://www.ibm.com) elit.
Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit.`;

const bodyCopyWithFeaturedMedia = `Lorem ipsum *dolor* sit amet, [consectetur adipiscing](https://www.ibm.com) elit.
Aenean et ultricies est. Mauris iaculis eget dolor nec hendrerit. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
id est laborum.`;

export const Default = (args) => {
  const { eyebrow, heading, copy, withMedia } = args?.ContentItemRow ?? {};
  return html`
    <c4d-content-item-row>
      <c4d-content-item-row-eyebrow>${eyebrow}</c4d-content-item-row-eyebrow>
      <c4d-content-item-heading>${heading}</c4d-content-item-heading>
      <c4d-content-item-row-copy>${copy}</c4d-content-item-row-copy>
      <c4d-text-cta slot="footer" href="https://www.ibm.com" cta-type="local"
        >Learn more</c4d-text-cta
      >

      ${withMedia === MEDIA_TYPE.IMAGE
        ? html`
            <c4d-image
              slot="media"
              alt="image alt text"
              default-src="${imgLg16x9}"></c4d-image>
          `
        : null}
      ${withMedia === MEDIA_TYPE.VIDEO
        ? html`
            <c4d-content-item-row-media-video
              video-id="0_ibuqxqbe"></c4d-content-item-row-media-video>
          `
        : null}
    </c4d-content-item-row>
  `;
};

export const WithThumbnail = (args) => {
  const { alt, heading, copy } = args?.ContentItemRow ?? {};
  return html`
    <c4d-content-item-row thumbnail>
      <c4d-content-item-heading>${heading}</c4d-content-item-heading>
      <c4d-content-item-row-thumbnail-copy
        >${copy}</c4d-content-item-row-thumbnail-copy
      >
      <c4d-text-cta slot="footer" href="https://www.ibm.com" cta-type="local"
        >Learn more</c4d-text-cta
      >
      <c4d-image
        slot="thumbnail"
        alt="${ifDefined(alt)}"
        default-src="${imgMd4x3}"></c4d-image>
    </c4d-content-item-row>
  `;
};

export const WithMedia = (args) => {
  const { align, type, alt, heading, eyebrow, copy } =
    args?.ContentItemRow ?? {};
  return html`
    <c4d-content-item-row-media align="${align}">
      ${type === MEDIA_TYPE.IMAGE
        ? html`
            <c4d-image
              slot="media"
              alt="${ifDefined(alt)}"
              default-src="${imgLg16x9}"></c4d-image>
          `
        : null}
      ${type === MEDIA_TYPE.VIDEO
        ? html`
            <c4d-content-item-row-media-video
              video-id="0_ibuqxqbe"></c4d-content-item-row-media-video>
          `
        : null}
      <c4d-content-item-row-eyebrow>${eyebrow}</c4d-content-item-row-eyebrow>
      <c4d-content-item-heading>${heading}</c4d-content-item-heading>
      <c4d-content-item-row-media-copy>${copy}</c4d-content-item-row-media-copy>
      <c4d-text-cta slot="footer" href="https://www.ibm.com" cta-type="local"
        >Learn more</c4d-text-cta
      >
    </c4d-content-item-row-media>
  `;
};

export const WithMediaFeatured = (args) => {
  const { type, heading, eyebrow, copy } = args?.ContentItemRow ?? {};
  return html`
    <c4d-content-item-row-media-featured>
      ${type === MEDIA_TYPE.IMAGE
        ? html`
            <c4d-image
              slot="media"
              alt="Image alt text"
              default-src="${imgLg16x9}"
              heading="Lorem ipsum dolor sit amet">
            </c4d-image>
          `
        : null}
      ${type === MEDIA_TYPE.VIDEO
        ? html`
            <c4d-content-item-row-media-video
              video-id="0_ibuqxqbe"></c4d-content-item-row-media-video>
          `
        : null}
      <c4d-content-item-row-eyebrow>${eyebrow}</c4d-content-item-row-eyebrow>
      <c4d-content-item-heading>${heading}</c4d-content-item-heading>
      <c4d-content-item-row-media-copy>${copy}</c4d-content-item-row-media-copy>
      <c4d-text-cta slot="footer" href="https://www.ibm.com" cta-type="local"
        >Learn more</c4d-text-cta
      >
    </c4d-content-item-row-media-featured>
  `;
};

Default.story = {
  parameters: {
    percy: {
      skip: true,
    },
    gridContentClasses: 'cds--col-lg-12',
  },
};

WithThumbnail.story = {
  name: 'With thumbnail',
  parameters: {
    percy: {
      skip: true,
    },
    gridContentClasses: 'cds--col-lg-12',
    knobs: {
      ContentItemRow: () => ({
        heading: textNullable('Heading (heading):', 'Aliquam condimentum'),
        copy: shortBodyCopy,
      }),
    },
    propsSet: {
      default: {
        ContentItemRow: {
          heading: 'Aliquam condimentum',
          copy: shortBodyCopy,
        },
      },
    },
  },
};

WithMedia.story = {
  name: 'With media',
  parameters: {
    percy: {
      skip: true,
    },
    gridContentClasses: 'cds--col-lg-12',
    knobs: {
      ContentItemRow: () => ({
        align: select('Alignment', mediaAlign, MEDIA_ALIGN.RIGHT),
        type: select('Media type', mediaType, MEDIA_TYPE.IMAGE),
        heading: textNullable('Heading (heading):', 'Aliquam condimentum'),
        eyebrow: textNullable('Eyebrow label:', 'Lorem Ipsum'),
        copy: shortBodyCopy,
      }),
    },
    propsSet: {
      default: {
        ContentItemRow: {
          align: 'right',
          type: 'image',
          alt: 'Image alt text',
          heading: 'Aliquam condimentum',
          eyebrow: 'Lorem Ipsum',
          copy: shortBodyCopy,
        },
      },
    },
  },
};

WithMediaFeatured.story = {
  name: 'With featured media',
  parameters: {
    percy: {
      skip: true,
    },
    gridContentClasses: 'cds--col-lg-12',
    knobs: {
      ContentItemRow: () => ({
        type: select('Media type', mediaType, MEDIA_TYPE.IMAGE),
        eyebrow: textNullable('Eyebrow:', 'Lorem Ipsum'),
        heading: textNullable('Heading:', 'Aliquam condimentum'),
        copy: bodyCopyWithFeaturedMedia,
      }),
    },
    propsSet: {
      default: {
        ContentItemRow: {
          type: 'image',
          alt: 'Image alt text',
          heading: 'Aliquam condimentum',
          eyebrow: 'Lorem Ipsum',
          copy: bodyCopyWithFeaturedMedia,
        },
      },
    },
  },
};

export default {
  title: 'Components/Content item row',
  decorators: [
    (story, { parameters }) => html`
      <div class="cds--grid">
        <div class="cds--row">
          <div class="${parameters.gridContentClasses}">${story()}</div>
        </div>
      </div>
    `,
  ],
  parameters: {
    percy: {
      skip: true,
    },
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      ContentItemRow: () => ({
        eyebrow: textNullable('Eyebrow (eyebrow):', 'Lorem ipsum'),
        heading: textNullable('Heading (heading):', 'Aliquam condimentum'),
        withMedia: select('Media type', { ...mediaType, None: null }, null),
        copy: bodyCopy,
      }),
    },
    propsSet: {
      default: {
        ContentItemRow: {
          eyebrow: 'Lorem ipsum',
          heading: 'Aliquam condimentum',
          copy: bodyCopy,
        },
      },
    },
  },
};
