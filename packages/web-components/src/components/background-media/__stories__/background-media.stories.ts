/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../index';
import { html } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import { text, select, number } from '@storybook/addon-knobs';
import imgMax from '../../../../../storybook-images/assets/leadspace/leadspaceMax.jpg';
import imgLg16x9 from '../../../../../storybook-images/assets/leadspace/fpo--leadspace--16x9--1594x891--005.jpg';
import imgSm4x3 from '../../../../../storybook-images/assets/leadspace/fpo--leadspace--4x3--480x360--005.jpg';
import { GRADIENT_DIRECTION } from '../defs';
import readme from './README.stories.mdx';

const gradientDirections = {
  [`Left to Right`]: GRADIENT_DIRECTION.LEFT_TO_RIGHT,
  [`Top to Bottom`]: GRADIENT_DIRECTION.TOP_TO_BOTTOM,
};

export const Default = args => {
  const { alt, gradientDirection, backgroundOpacity } = args?.['dds-background-media'] ?? {};
  return html`
    <dds-background-media
      gradient-direction="${ifNonNull(gradientDirection)}"
      mobile-position="bottom"
      alt="${ifNonNull(alt)}"
      default-src="${imgMax}"
      opacity="${ifNonNull(backgroundOpacity)}"
    >
      <dds-image-item media="(min-width: 1584px)" srcset="${imgMax}"> </dds-image-item>
      <dds-image-item media="(min-width: 1312px)" srcset="${imgLg16x9}"> </dds-image-item>
      <dds-image-item media="(min-width: 672px)" srcset="${imgLg16x9}"> </dds-image-item>
      <dds-image-item media="(min-width: 320px)" srcset="${imgSm4x3}"> </dds-image-item>
      <dds-image-item media="(min-width: 0px)" srcset="${imgSm4x3}"> </dds-image-item>
    </dds-background-media>
  `;
};

export const WithVideo = args => {
  const { gradientDirection, backgroundOpacity } = args?.['dds-background-media'] ?? {};
  return html`
    <div style="height: 70vh;">
      <dds-background-media
        gradient-direction="${ifNonNull(gradientDirection)}"
        mobile-position="bottom"
        opacity="${ifNonNull(backgroundOpacity)}"
      >
        <dds-video-player-container video-id="1_9h94wo6b" background-mode="true"></dds-video-player-container>
      </dds-background-media>
    </div>
  `;
};

export const WithDefaultSource = args => {
  const { alt, gradientDirection, backgroundOpacity } = args?.['dds-background-media'] ?? {};
  return html`
    <dds-background-media
      gradient-direction="${ifNonNull(gradientDirection)}"
      mobile-position="bottom"
      alt="${ifNonNull(alt)}"
      default-src="${imgMax}"
      opacity="${ifNonNull(backgroundOpacity)}"
    >
    </dds-background-media>
  `;
};

export default {
  title: 'Components/Background media',
  decorators: [
    story => html`
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-sm-4 bx--no-gutter">
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
      'dds-background-media': () => ({
        gradientDirection: select(
          'Gradient Direction (gradient-direction):',
          gradientDirections,
          GRADIENT_DIRECTION.LEFT_TO_RIGHT
        ),
        alt: text('Image alt text (alt):', 'Image alt text'),
        defaultSrc: text('Default image (default-src)', imgMax),
        backgroundOpacity: number('Background Opacity', 100, { range: true, min: 0, max: 100 }),
      }),
    },
    propsSet: {
      default: {
        'dds-background-media': {
          gradientDirection: 'left-to-right',
          alt: 'Image alt text',
          defaultSrc: imgMax,
          backgroundOpacity: '100',
        },
      },
    },
  },
};
