/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../index';

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { select } from '@storybook/addon-knobs';

import imgXlg1x1 from '../../../../../storybook-images/assets/1584/fpo--1x1--1584x1584--002.jpg';
import imgLg1x1 from '../../../../../storybook-images/assets/1312/fpo--1x1--1312x1312--002.jpg';
import imgMd4x3 from '../../../../../storybook-images/assets/960/fpo--4x3--960x720--002.jpg';
import imgSm1x1 from '../../../../../storybook-images/assets/720/fpo--1x1--720x720--002.jpg';
import imgXs1x1 from '../../../../../storybook-images/assets/320/fpo--1x1--320x320--002.jpg';
import { MEDIA_ALIGNMENT } from '../defs';
import { CTA_TYPE } from '../../cta/defs';

import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

const mediaAlignment = {
  [`Left`]: MEDIA_ALIGNMENT.LEFT,
  [`Right`]: MEDIA_ALIGNMENT.RIGHT,
};

const types = {
  [`Local (${CTA_TYPE.LOCAL})`]: CTA_TYPE.LOCAL,
  [`External (${CTA_TYPE.EXTERNAL})`]: CTA_TYPE.EXTERNAL,
};

export const Default = (args) => {
  const { alt, mediaAlign, eyebrow, heading, copy, href, ctaType } =
    args?.['c4d-feature-section'] ?? {};
  return html`
    <c4d-feature-section media-alignment="${mediaAlign}">
      <c4d-image slot="image" default-src="${ifDefined(imgLg1x1)}" alt="${alt}">
        <c4d-image-item media="(min-width: 1584px)" srcset="${imgXlg1x1}">
        </c4d-image-item>
        <c4d-image-item media="(min-width: 1056px)" srcset="${imgLg1x1}">
        </c4d-image-item>
        <c4d-image-item media="(min-width: 672px)" srcset="${imgMd4x3}">
        </c4d-image-item>
        <c4d-image-item media="(min-width: 320px)" srcset="${imgSm1x1}">
        </c4d-image-item>
        <c4d-image-item media="(min-width: 0px)" srcset="${imgXs1x1}">
        </c4d-image-item>
      </c4d-image>
      <c4d-card-eyebrow>${eyebrow}</c4d-card-eyebrow>
      <c4d-content-block-heading>${heading}</c4d-content-block-heading>
      <c4d-content-item-paragraph slot="copy"
        >${copy}</c4d-content-item-paragraph
      >

      <c4d-feature-section-card-link
        slot="footer"
        href="${href}"
        cta-type="${ifDefined(ctaType)}"
        color-scheme="inverse">
        <c4d-card-link-heading
          >Try a free virtual business framing session with IBM
          Garage</c4d-card-link-heading
        >
        <c4d-card-cta-footer color-scheme="inverse"> </c4d-card-cta-footer>
      </c4d-feature-section-card-link>
    </c4d-feature-section>
  `;
};

export default {
  title: 'Components/Feature section',
  decorators: [(story) => html` ${story()} `],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
    knobs: {
      'c4d-feature-section': () => ({
        mediaAlign: select(
          'Media Alignment',
          mediaAlignment,
          MEDIA_ALIGNMENT.RIGHT
        ),
        eyebrow: textNullable(
          'Card Eyebrow (optional)(eyebrow):',
          '5 min activity'
        ),
        heading: textNullable(
          'Card Heading (required)(heading):',
          'Ready when you are'
        ),
        copy: textNullable(
          'Card copy (optional)(copy):',
          `Were flexible. We can work with you on a wide variety of engagements on a project
          or consulting basis. And were technology agnostic. Our experts work with any vendors technology, not just IBMs.
          You decide how you want to work and where to focus our expertise.`
        ),
        alt: textNullable('Image Alt Text (alt):', 'Image alt text'),
        ctaType: select('CTA type (cta-type)', types, CTA_TYPE.LOCAL),
        href: textNullable('CTA Href (href):', 'https://example.com'),
      }),
    },
    propsSet: {
      default: {
        'c4d-feature-section': {
          mediaAlign: 'right',
          eyebrow: '5 min activity',
          heading: 'Ready when you are',
          copy: `Were flexible. We can work with you on a wide variety of engagements on a project
          or consulting basis. And were technology agnostic. Our experts work with any vendors technology, not just IBMs.
          You decide how you want to work and where to focus our expertise.`,
          alt: 'Image alt text',
          ctaType: 'local',
          href: 'https://example.com',
        },
      },
    },
  },
};
