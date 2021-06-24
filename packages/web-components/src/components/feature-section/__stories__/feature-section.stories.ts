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
import { select } from '@storybook/addon-knobs';

import imgXlg1x1 from '../../../../../storybook-images/assets/1584/fpo--1x1--1584x1584--002.jpg';
import imgLg1x1 from '../../../../../storybook-images/assets/1312/fpo--1x1--1312x1312--002.jpg';
import imgMd4x3 from '../../../../../storybook-images/assets/960/fpo--4x3--960x720--002.jpg';
import imgSm1x1 from '../../../../../storybook-images/assets/720/fpo--1x1--720x720--002.jpg';
import imgXs1x1 from '../../../../../storybook-images/assets/320/fpo--1x1--320x320--002.jpg';
import { MEDIA_ALIGNMENT } from '../defs';

import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

const mediaAlignment = {
  [`Left`]: MEDIA_ALIGNMENT.LEFT,
  [`Right`]: MEDIA_ALIGNMENT.RIGHT,
};

export const Default = ({ parameters }) => {
  const { alt, mediaAlign, eyebrow, heading, copy, href } = parameters?.props?.['dds-feature-section'] ?? {};
  return html`
    <dds-feature-section media-alignment="${mediaAlign}">
      <dds-image slot="image" default-src="${ifNonNull(imgLg1x1)}" alt="${alt}">
        <dds-image-item media="(min-width: 1584px)" srcset="${imgXlg1x1}"> </dds-image-item>
        <dds-image-item media="(min-width: 1056px)" srcset="${imgLg1x1}"> </dds-image-item>
        <dds-image-item media="(min-width: 672px)" srcset="${imgMd4x3}"> </dds-image-item>
        <dds-image-item media="(min-width: 320px)" srcset="${imgSm1x1}"> </dds-image-item>
        <dds-image-item media="(min-width: 0px)" srcset="${imgXs1x1}"> </dds-image-item>
      </dds-image>
      <dds-card-eyebrow>${eyebrow}</dds-card-eyebrow>
      <dds-content-block-heading>${heading}</dds-content-block-heading>
      <dds-content-item-paragraph slot="copy">${copy}</dds-content-item-paragraph>

      <dds-feature-section-card-link slot="footer" href="${href}" type="local" color-scheme="inverse">
        Try a free virtual business framing session with IBM Garage
        <dds-card-footer color-scheme="inverse">
          <svg
            slot="icon"
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <path d="M11.8 2.8L10.8 3.8 16.2 9.3 1 9.3 1 10.7 16.2 10.7 10.8 16.2 11.8 17.2 19 10z"></path>
          </svg>
        </dds-card-footer>
      </dds-feature-section-card-link>
    </dds-feature-section>
  `;
};

export default {
  title: 'Components/Feature section',
  decorators: [
    story => html`
      ${story()}
    `,
  ],
  parameters: {
    ...readme.parameters,
    useRawContainer: true,
    hasGrid: true,
    knobs: {
      'dds-feature-section': ({ groupId }) => ({
        mediaAlign: select('Media Alignment', mediaAlignment, MEDIA_ALIGNMENT.RIGHT, groupId),
        eyebrow: textNullable('Card Eyebrow (optional)(eyebrow):', '5 min activity', groupId),
        heading: textNullable('Card Heading (required)(heading):', 'Ready when you are', groupId),
        copy: textNullable(
          'Card copy (optional)(copy):',
          `Were flexible. We can work with you on a wide variety of engagements on a project 
          or consulting basis. And were technology agnostic. Our experts work with any vendors technology, not just IBMs. 
          You decide how you want to work and where to focus our expertise.`,
          groupId
        ),
        alt: textNullable('Image Alt Text (alt):', 'Image alt text', groupId),
        href: textNullable('Card Href (href):', 'https://example.com', groupId),
      }),
    },
  },
};
