/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { boolean, select } from '@storybook/addon-knobs';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import imgSm16x9 from '../../../../../storybook-images/assets/320/fpo--16x9--320x180--002.jpg';
import imgSm2x1 from '../../../../../storybook-images/assets/320/fpo--2x1--320x160--002.jpg';
import imgMd16x9 from '../../../../../storybook-images/assets/480/fpo--16x9--480x270--002.jpg';
import imgMd2x1 from '../../../../../storybook-images/assets/480/fpo--2x1--480x240--002.jpg';
import imgLg16x9 from '../../../../../storybook-images/assets/720/fpo--16x9--720x405--002.jpg';
import imgLg2x1 from '../../../../../storybook-images/assets/720/fpo--2x1--720x360--002.jpg';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../image-with-caption';
import readme from './README.stories.mdx';

const images = {
  '2:1': imgLg2x1,
  '16:9': imgLg16x9,
};

const srcsets = {
  '2:1': [imgSm2x1, imgMd2x1, imgLg2x1],
  '16:9': [imgSm16x9, imgMd16x9, imgLg16x9],
};

export const Default = ({ parameters }) => {
  const { alt, defaultSrc, heading, copy, lightbox } = parameters?.props?.['dds-image-with-caption'] ?? {};
  // TODO: See if we can fix unwanted `&` to `&amp` conversion upon changing the select knob
  const srcset = srcsets[defaultSrc?.replace(/&amp;/, '&')];
  return html`
    <dds-image-with-caption
      alt="${ifNonNull(alt)}"
      default-src="${ifNonNull(defaultSrc)}"
      heading="${ifNonNull(heading)}"
      copy="${ifNonNull(copy)}"
      ?lightbox="${lightbox}"
    >
      ${!srcset
        ? undefined
        : html`
            <dds-image-item media="(min-width: 672px)" srcset="${srcset[2]}"> </dds-image-item>
            <dds-image-item media="(min-width: 400px)" srcset="${srcset[1]}"> </dds-image-item>
            <dds-image-item media="(min-width: 320px)" srcset="${srcset[0]}"> </dds-image-item>
          `}
    </dds-image-with-caption>
  `;
};

export default {
  title: 'Components/Image with caption',
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
      'dds-image-with-caption': ({ groupId }) => ({
        alt: textNullable('Alt text (alt)', 'Image alt text', groupId),
        defaultSrc: select('Default image (default-src)', images, imgLg2x1, groupId),
        lightbox: boolean('Lightbox (lightbox)', true, groupId),
        copy: textNullable('Copy (copy)', 'Lorem ipsum dolor sit amet', groupId),
        heading: textNullable('Heading (heading)', 'This is a caption', groupId),
      }),
    },
    propsSet: {
      default: {
        'dds-image-with-caption': {
          alt: 'Image alt text',
          defaultSrc: imgLg2x1,
          lightbox: true,
          copy: 'Lorem ipsum dolor sit amet',
          heading: 'This is a caption',
        },
      },
    },
  },
};
