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
import '../feature-card-block-large';
import '../feature-card-block-large-footer';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20.js';
import { html } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import imgLg1x1 from '../../../../../storybook-images/assets/720/fpo--1x1--720x720--002.jpg';
import imgLg2x1 from '../../../../../storybook-images/assets/720/fpo--2x1--720x360--002.jpg';
import imgMax2x1 from '../../../../../storybook-images/assets/1584/fpo--2x1--1312x656--002.jpg';
import imgSm2x1 from '../../../../../storybook-images/assets/320/fpo--2x1--320x160--002.jpg';
import imgXlg2x1 from '../../../../../storybook-images/assets/1312/fpo--2x1--1312x656--002.jpg';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

export const Default = ({ parameters }) => {
  const { eyebrow, heading, copy, defaultSrc, alt, href } = parameters?.props?.['dds-feature-card-block-large'] ?? {};
  return html`
    <dds-feature-card-block-large href=${ifNonNull(href || undefined)}>
      <dds-image slot="image" alt="${ifNonNull(alt)}" default-src="${ifNonNull(defaultSrc)}">
        <dds-image-item media="(min-width: 1312px)" srcset="${imgMax2x1}"> </dds-image-item>
        <dds-image-item media="(min-width: 1056px)" srcset="${imgXlg2x1}"> </dds-image-item>
        <dds-image-item media="(min-width: 991px)" srcset="${imgXlg2x1}"> </dds-image-item>
        <dds-image-item media="(min-width: 672px)" srcset="${imgLg2x1}"> </dds-image-item>
        <dds-image-item media="(min-width: 320px)" srcset="${imgSm2x1}"> </dds-image-item>
      </dds-image>
      <dds-card-eyebrow>${eyebrow}</dds-card-eyebrow>
      <dds-card-heading>${heading}</dds-card-heading>
      <p>${copy}</p>
      <dds-feature-card-block-large-footer>
        ${ArrowRight20({ slot: 'icon' })}
      </dds-feature-card-block-large-footer>
    </dds-feature-card-block-large>
  `;
};

export default {
  title: 'Components/Feature Card Block Large',
  decorators: [
    story => html`
      <div class="bx--grid dds-ce-demo-devenv--grid--stretch">
        <div class="bx--row dds-ce-demo-devenv--grid-row">
          <div class="bx--col-sm-4 bx--col-lg-9 bx--offset-lg-2">
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
      'dds-feature-card-block-large': () => ({
        eyebrow: textNullable('Card Eyebrow (eyebrow):', 'This is an eyebrow'),
        heading: textNullable('Card Heading (heading):', 'Explore AI use cases in all industries'),
        copy: textNullable(
          'Card Copy (copy):',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
            'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        ),
        defaultSrc: textNullable('Image src (defaultSrc):', imgLg1x1),
        alt: textNullable('Image alt text (alt):', 'Image alt text'),
        href: textNullable('Card Href (href):', 'https://example.com'),
      }),
    },
  },
};
