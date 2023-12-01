/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../index';
import '../../video-player/video-player-container';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { text, select, number } from '@storybook/addon-knobs';
import imgMax from '../../../../.storybook/storybook-images/assets/leadspace/leadspaceMax.jpg';
import imgLg16x9 from '../../../../.storybook/storybook-images/assets/leadspace/fpo--leadspace--16x9--1594x891--005.jpg';
import imgSm4x3 from '../../../../.storybook/storybook-images/assets/leadspace/fpo--leadspace--4x3--480x360--005.jpg';
import { GRADIENT_DIRECTION } from '../defs';
import readme from './README.stories.mdx';

const gradientDirections = {
  [`Left to Right`]: GRADIENT_DIRECTION.LEFT_TO_RIGHT,
  [`Top to Bottom`]: GRADIENT_DIRECTION.TOP_TO_BOTTOM,
};

export const Default = (args) => {
  const { alt, gradientDirection, backgroundOpacity } =
    args?.['c4d-background-media'] ?? {};
  return html`
    <c4d-background-media
      gradient-direction="${ifDefined(gradientDirection)}"
      alt="${ifDefined(alt)}"
      default-src="${imgMax}"
      opacity="${ifDefined(backgroundOpacity)}">
      <c4d-image-item media="(min-width: 1584px)" srcset="${imgMax}">
      </c4d-image-item>
      <c4d-image-item media="(min-width: 1312px)" srcset="${imgLg16x9}">
      </c4d-image-item>
      <c4d-image-item media="(min-width: 672px)" srcset="${imgLg16x9}">
      </c4d-image-item>
      <c4d-image-item media="(min-width: 320px)" srcset="${imgSm4x3}">
      </c4d-image-item>
      <c4d-image-item media="(min-width: 0px)" srcset="${imgSm4x3}">
      </c4d-image-item>
    </c4d-background-media>
  `;
};

export const WithVideo = (args) => {
  const { gradientDirection, backgroundOpacity } =
    args?.['c4d-background-media'] ?? {};
  return html`
    <div style="height: 70vh;">
      <c4d-background-media
        gradient-direction="${ifDefined(gradientDirection)}"
        opacity="${ifDefined(backgroundOpacity)}">
        <c4d-video-player-container
          video-id="0_ibuqxqbe"
          background-mode="true"></c4d-video-player-container>
      </c4d-background-media>
    </div>
  `;
};

export const WithDefaultSource = (args) => {
  const { alt, gradientDirection, backgroundOpacity } =
    args?.['c4d-background-media'] ?? {};
  return html`
    <c4d-background-media
      gradient-direction="${ifDefined(gradientDirection)}"
      alt="${ifDefined(alt)}"
      default-src="${imgMax}"
      opacity="${ifDefined(backgroundOpacity)}">
    </c4d-background-media>
  `;
};

export default {
  title: 'Components/Background media',
  decorators: [
    (story) => html`
      <div class="cds--grid">
        <div class="cds--row">
          <div class="cds--col-sm-4 cds--no-gutter">${story()}</div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      'c4d-background-media': () => ({
        gradientDirection: select(
          'Gradient Direction (gradient-direction):',
          gradientDirections,
          GRADIENT_DIRECTION.LEFT_TO_RIGHT
        ),
        alt: text('Image alt text (alt):', 'Image alt text'),
        defaultSrc: text('Default image (default-src)', imgMax),
        backgroundOpacity: number('Background Opacity', 100, {
          range: true,
          min: 0,
          max: 100,
        }),
      }),
    },
    propsSet: {
      default: {
        'c4d-background-media': {
          gradientDirection: 'left-to-right',
          alt: 'Image alt text',
          defaultSrc: imgMax,
          backgroundOpacity: '100',
        },
      },
    },
  },
};
