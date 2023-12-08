/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../image';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { select, boolean } from '@storybook/addon-knobs';
// eslint-disable-next-line sort-imports
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--005.jpg';
import imgLg2x1 from '../../../../../storybook-images/assets/720/fpo--2x1--720x360--005.jpg';
import imgLg3x2 from '../../../../../storybook-images/assets/720/fpo--3x2--720x480--005.jpg';
import imgLg4x3 from '../../../../../storybook-images/assets/720/fpo--4x3--720x540--005.jpg';
import imgLg1x1 from '../../../../../storybook-images/assets/720/fpo--1x1--720x720--005.jpg';
import imgMd16x9 from '../../../../../storybook-images/assets/480/fpo--16x9--480x270--005.jpg';
import imgMd2x1 from '../../../../../storybook-images/assets/480/fpo--2x1--480x240--005.jpg';
import imgMd3x2 from '../../../../../storybook-images/assets/480/fpo--3x2--480x320--005.jpg';
import imgMd4x3 from '../../../../../storybook-images/assets/480/fpo--4x3--480x360--005.jpg';
import imgMd1x1 from '../../../../../storybook-images/assets/480/fpo--1x1--480x480--005.jpg';
import imgSm16x9 from '../../../../../storybook-images/assets/320/fpo--16x9--320x180--005.jpg';
import imgSm2x1 from '../../../../../storybook-images/assets/320/fpo--2x1--320x160--005.jpg';
import imgSm3x2 from '../../../../../storybook-images/assets/320/fpo--3x2--320x213--005.jpg';
import imgSm4x3 from '../../../../../storybook-images/assets/320/fpo--4x3--320x160--004.jpg';
import imgSm1x1 from '../../../../../storybook-images/assets/320/fpo--1x1--320x320--005.jpg';
import chartSvg from './chart-svg.js';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';
import { LIGHTBOX_CONTRAST } from '../image';

const contrasts = {
  light: LIGHTBOX_CONTRAST.LIGHT,
  dark: LIGHTBOX_CONTRAST.DARK,
};

const images = {
  '2:1': imgLg2x1,
  '16:9': imgLg16x9,
  '3:2': imgLg3x2,
  '4:3': imgLg4x3,
  '1:1': imgLg1x1,
  'SVG (transparent background)': chartSvg,
};

const srcsets = {
  '2:1': [imgSm2x1, imgMd2x1, imgLg2x1],
  '16:9': [imgSm16x9, imgMd16x9, imgLg16x9],
  '3:2': [imgSm3x2, imgMd3x2, imgLg3x2],
  '4x3': [imgSm4x3, imgMd4x3, imgLg4x3],
  '1x1': [imgSm1x1, imgMd1x1, imgLg1x1],
};

export const Default = (args) => {
  const {
    alt,
    defaultSrc,
    heading,
    copy,
    border,
    lightbox,
    lightboxContrast,
    longDescription,
  } = args?.['c4d-image'] ?? {};
  // TODO: See if we can fix unwanted `&` to `&amp` conversion upon changing the select knob
  const srcset = srcsets[defaultSrc?.replace(/&amp;/, '&')];
  return html`
    <c4d-image
      alt="${ifDefined(alt)}"
      heading="${ifDefined(heading)}"
      default-src="${ifDefined(defaultSrc)}"
      ?border=${border}
      ?lightbox="${lightbox}"
      lightbox-contrast="${lightboxContrast}"
      copy="${ifDefined(copy)}">
      ${!longDescription
        ? undefined
        : html` <div slot="long-description">${longDescription}</div> `}
      ${!srcset
        ? undefined
        : html`
            <c4d-image-item media="(min-width: 672px)" srcset="${srcset[2]}">
            </c4d-image-item>
            <c4d-image-item media="(min-width: 400px)" srcset="${srcset[1]}">
            </c4d-image-item>
            <c4d-image-item media="(min-width: 320px)" srcset="${srcset[0]}">
            </c4d-image-item>
          `}
    </c4d-image>
  `;
};

export default {
  title: 'Components/Image',
  decorators: [
    (story) =>
      html`
        <div class="cds--grid">
          <div class="cds--row">
            <div class="cds--col-sm-4 cds--col-lg-8">${story()}</div>
          </div>
        </div>
      `,
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      'c4d-image': () => {
        const alt = textNullable('Alt text', 'Image alt text');
        const defaultSrc = select(
          'Default image (default-src)',
          images,
          imgLg2x1
        );
        const border = boolean('Border', false);
        const copy = textNullable('Copy (copy)', 'Lorem ipsum dolor sit amet');
        const heading = textNullable('Heading (heading)', 'This is a caption');
        const longDescription = textNullable(
          'Long Description',
          'Optional long descriptive text that is visually hidden to help screen reader users.'
        );
        const lightbox = boolean('Lightbox (lightbox)', false);
        const lightboxContrast = lightbox
          ? select('Lightbox contrast', contrasts, LIGHTBOX_CONTRAST.LIGHT)
          : '';
        return {
          alt,
          defaultSrc,
          border,
          copy,
          heading,
          longDescription,
          lightbox,
          lightboxContrast,
        };
      },
    },
    propsSet: {
      default: {
        'c4d-image': {
          alt: 'Image alt text',
          defaultSrc: imgLg2x1,
          border: false,
          lightbox: false,
          copy: 'Lorem ipsum dolor sit amet',
          heading: 'This is a caption',
          longDescription:
            'Optional long descriptive text that is visually hidden to help screen reader users.',
        },
      },
    },
  },
};
