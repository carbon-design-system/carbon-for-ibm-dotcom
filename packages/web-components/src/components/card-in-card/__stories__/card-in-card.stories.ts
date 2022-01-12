/**
 * @license
 *
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../../card/index';
import '../../image/image';
import '../index';
import '../../cta/card-cta-footer';
import '../../cta/video-cta-container';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20.js';
import { html } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import { boolean } from '@storybook/addon-knobs';

import imgXlg16x9 from '../../../../../storybook-images/assets/1312/fpo--16x9--1312x738--005.jpg';
import imgMd16x9 from '../../../../../storybook-images/assets/960/fpo--16x9--960x540--005.jpg';
import imgSm4x3 from '../../../../../storybook-images/assets/480/fpo--4x3--480x360--005.jpg';

import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

export const Default = ({ parameters }) => {
  const { video, eyebrow, heading, defaultSrc, alt, href } = parameters?.props?.['dds-card-in-card'] ?? {};
  if (video) {
    return html`
      <dds-video-cta-container>
        <dds-card-in-card href="1_9h94wo6b" cta-type="video">
          <dds-card-eyebrow>${eyebrow}</dds-card-eyebrow>
          <dds-card-cta-footer cta-type="video" href="1_9h94wo6b"></dds-card-cta-footer>
        </dds-card-in-card>
      </dds-video-cta-container>
    `;
  }
  return html`
    <dds-card-in-card href=${ifNonNull(href || undefined)}>
      <dds-card-in-card-image slot="image" alt="${ifNonNull(alt)}" default-src="${ifNonNull(defaultSrc)}">
        <dds-image-item media="(min-width: 1312px)" srcset="${imgXlg16x9}"> </dds-image-item>
        <dds-image-item media="(min-width: 672px)" srcset="${imgMd16x9}"> </dds-image-item>
        <dds-image-item media="(min-width: 320px)" srcset="${imgSm4x3}"> </dds-image-item>
      </dds-card-in-card-image>
      <dds-card-eyebrow>${eyebrow}</dds-card-eyebrow>
      <dds-card-heading>${heading}</dds-card-heading>
      <dds-card-cta-footer>
        ${ArrowRight20({ slot: 'icon' })}
      </dds-card-cta-footer>
    </dds-card-in-card>
  `;
};

export default {
  title: 'Components/Card in card',
  decorators: [
    story => html`
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-lg-12 bx--no-gutter">
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
      'dds-card-in-card': () => {
        const video = boolean('video', false);
        const alt = video ? undefined : textNullable('Image alt text (alt):', 'Image alt text');
        const defaultSrc = video ? undefined : textNullable('Image src (defaultSrc):', imgSm4x3);
        const heading = video
          ? undefined
          : textNullable('Card Heading (heading):', 'Standard Bank Group prepares to embrace Africa’s AI opportunity');
        const href = video ? undefined : textNullable('Card Href (href):', 'https://example.com');
        return {
          video,
          alt,
          defaultSrc,
          heading,
          href,
          eyebrow: textNullable('Card Eyebrow (eyebrow):', 'Label'),
        };
      },
    },
    propsSet: {
      default: {
        'dds-card-in-card': {
          video: false,
          alt: 'Image alt text',
          defaultSrc: imgSm4x3,
          heading: 'Standard Bank Group prepares to embrace Africa’s AI opportunity',
          href: 'https://example.com',
          eyebrow: 'Label',
        },
      },
    },
  },
};
