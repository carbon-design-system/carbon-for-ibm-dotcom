/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../image';
import { html } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import { select, boolean } from '@storybook/addon-knobs';
// eslint-disable-next-line sort-imports
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--005.jpg';
import imgLg2x1 from '../../../../../storybook-images/assets/720/fpo--2x1--720x360--005.jpg';
import imgMd16x9 from '../../../../../storybook-images/assets/480/fpo--16x9--480x270--005.jpg';
import imgMd2x1 from '../../../../../storybook-images/assets/480/fpo--2x1--480x240--005.jpg';
import imgSm16x9 from '../../../../../storybook-images/assets/320/fpo--16x9--320x180--005.jpg';
import imgSm2x1 from '../../../../../storybook-images/assets/320/fpo--2x1--320x160--005.jpg';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

const images = {
  '2:1': imgLg2x1,
  '16:9': imgLg16x9,
};

const srcsets = {
  '2:1': [imgSm2x1, imgMd2x1, imgLg2x1],
  '16:9': [imgSm16x9, imgMd16x9, imgLg16x9],
};

export const Default = args => {
  const { alt, defaultSrc, heading, copy, border, lightbox } = args?.['dds-image'] ?? {};
  // TODO: See if we can fix unwanted `&` to `&amp` conversion upon changing the select knob
  const srcset = srcsets[defaultSrc?.replace(/&amp;/, '&')];
  return html`
    <dds-image
      alt="${ifNonNull(alt)}"
      heading="${ifNonNull(heading)}"
      default-src="${ifNonNull(defaultSrc)}"
      ?border=${border}
      ?lightbox="${lightbox}"
      copy="${ifNonNull(copy)}"
    >
      ${!srcset
        ? undefined
        : html`
            <dds-image-item media="(min-width: 672px)" srcset="${srcset[2]}"> </dds-image-item>
            <dds-image-item media="(min-width: 400px)" srcset="${srcset[1]}"> </dds-image-item>
            <dds-image-item media="(min-width: 320px)" srcset="${srcset[0]}"> </dds-image-item>
          `}
    </dds-image>
  `;
};

export default {
  title: 'Components/Image',
  decorators: [
    story =>
      html`
        <div class="bx--grid">
          <div class="bx--row">
            <div class="bx--col-sm-4 bx--col-lg-8">
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
      'dds-image': () => ({
        alt: textNullable('Alt text', 'Image alt text'),
        defaultSrc: select('Default image (default-src)', images, imgLg2x1),
        lightbox: boolean('Lightbox (lightbox)', false),
        border: boolean('Border', false),
        copy: textNullable('Copy (copy)', 'Lorem ipsum dolor sit amet'),
        heading: textNullable('Heading (heading)', 'This is a caption'),
      }),
    },
    propsSet: {
      default: {
        'dds-image': {
          alt: 'Image alt text',
          defaultSrc: imgLg2x1,
          border: false,
          lightbox: false,
          copy: 'Lorem ipsum dolor sit amet',
          heading: 'This is a caption',
        },
      },
    },
  },
};
