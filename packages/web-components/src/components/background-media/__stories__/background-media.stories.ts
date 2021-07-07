/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../index';
import { html } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import { text, select } from '@storybook/addon-knobs';
import imgMax from '../../../../../storybook-images/assets/leadspace/leadspaceMax.jpg';
import imgLg16x9 from '../../../../../storybook-images/assets/leadspace/fpo--leadspace--16x9--1594x891--005.jpg';
import imgSm4x3 from '../../../../../storybook-images/assets/leadspace/fpo--leadspace--4x3--480x360--005.jpg';
import { GRADIENT_DIRECTION } from '../defs';
import { BASIC_COLOR_SCHEME } from '../../../globals/defs';
import readme from './README.stories.mdx';

const gradientDirections = {
  [`Left to Right`]: GRADIENT_DIRECTION.LEFT_TO_RIGHT,
  [`Top to Bottom`]: GRADIENT_DIRECTION.TOP_TO_BOTTOM,
};

const colorSchemes = {
  [`light`]: BASIC_COLOR_SCHEME.REGULAR,
  [`inverse`]: BASIC_COLOR_SCHEME.INVERSE,
};

export const Default = ({ parameters }) => {
  const { alt, gradientDirection, colorScheme } = parameters?.props?.['dds-background-media'] ?? {};
  return html`
    <dds-background-media
      gradient-direction="${ifNonNull(gradientDirection)}"
      mobile-position="bottom"
      alt="${ifNonNull(alt)}"
      default-src="${imgMax}"
      color-scheme="${ifNonNull(colorScheme)}"
    >
      <dds-image-item media="(min-width: 1584px)" srcset="${imgMax}"> </dds-image-item>
      <dds-image-item media="(min-width: 1312px)" srcset="${imgLg16x9}"> </dds-image-item>
      <dds-image-item media="(min-width: 672px)" srcset="${imgLg16x9}"> </dds-image-item>
      <dds-image-item media="(min-width: 320px)" srcset="${imgSm4x3}"> </dds-image-item>
      <dds-image-item media="(min-width: 0px)" srcset="${imgSm4x3}"> </dds-image-item>
    </dds-background-media>
  `;
};

export default {
  title: 'Components/Background media',
  decorators: [
    story => html`
      <div class="bx--grid bx--grid--condensed">
        <div class="bx--row">
          ${story()}
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasGrid: true,
    hasVerticalSpacingInComponent: true,
    knobs: {
      'dds-background-media': ({ groupId }) => ({
        gradientDirection: select(
          'Gradient Direction (gradient-direction):',
          gradientDirections,
          GRADIENT_DIRECTION.LEFT_TO_RIGHT,
          groupId
        ),
        colorScheme: select('Color Scheme (color-scheme):', colorSchemes, BASIC_COLOR_SCHEME.REGULAR, groupId),
        alt: text('Image alt text (alt):', 'Image alt text', groupId),
        defaultSrc: text('Default image (default-src)', imgMax, groupId),
      }),
    },
  },
};
