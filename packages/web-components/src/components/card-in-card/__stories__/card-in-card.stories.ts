/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../../card/card-eyebrow';
import '../../card/card-heading';
import '../../image/image';
import '../card-in-card';
import '../card-in-card-footer';
import '../card-in-card-image';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20.js';
import { html } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';

import imgXlg16x9 from '../../../../../storybook-images/assets/1312/fpo--16x9--1312x738--005.jpg';
import imgMd16x9 from '../../../../../storybook-images/assets/960/fpo--16x9--960x540--005.jpg';
import imgSm4x3 from '../../../../../storybook-images/assets/480/fpo--4x3--480x360--005.jpg';

import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

export const Default = ({ parameters }) => {
  const { eyebrow, heading, copy, defaultSrc, alt, href } = parameters?.props?.['dds-card-in-card'] ?? {};
  return html`
    <dds-card-in-card href=${ifNonNull(href || undefined)}>
      <dds-card-in-card-image slot="image" alt="${ifNonNull(alt)}" default-src="${ifNonNull(defaultSrc)}">
        <dds-image-item media="(min-width: 1312px)" srcset="${imgXlg16x9}"> </dds-image-item>
        <dds-image-item media="(min-width: 672px)" srcset="${imgMd16x9}"> </dds-image-item>
        <dds-image-item media="(min-width: 320px)" srcset="${imgSm4x3}"> </dds-image-item>
      </dds-card-in-card-image>
      <dds-card-eyebrow>${eyebrow}</dds-card-eyebrow>
      <dds-card-heading>${heading}</dds-card-heading>
      <dds-card-in-card-footer>
        ${ArrowRight20({ slot: 'icon' })}
      </dds-card-in-card-footer>
    </dds-card-in-card>
  `;
};

export default {
  title: 'Components/Card in Card',
  decorators: [
    story => html`
      <div class="bx--grid dds-ce-demo-devenv--grid--stretch">
        <div class="bx--row dds-ce-demo-devenv--grid-row">
          <div class="bx--col-sm-4 bx--col-lg-12 bx--offset-lg-2">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasGrid: true,
    knobs: {
      'dds-card-in-card': () => ({
        eyebrow: textNullable('Card Eyebrow (eyebrow):', 'Label'),
        heading: textNullable('Card Heading (heading):', 'Standard Bank Group prepares to embrace Africa’s AI opportunity'),
        defaultSrc: textNullable('Image src (defaultSrc):', imgXlg16x9),
        alt: textNullable('Image alt text (alt):', 'Image alt text'),
        href: textNullable('Card Href (href):', 'https://example.com'),
      }),
    },
  },
};
