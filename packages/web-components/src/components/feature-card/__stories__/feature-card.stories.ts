/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../../card/index';
import '../../image/image';
import '../index';

import ArrowRight20 from '../../../internal/vendor/@carbon/web-components/icons/arrow--right/20.js';
import { html } from 'lit';
import { boolean, select } from '@storybook/addon-knobs';
import { ifDefined } from 'lit/directives/if-defined.js';
import mediumImgLg1x1 from '../../../../../storybook-images/assets/720/fpo--1x1--720x720--004.jpg';

import imgLg1x1 from '../../../../../storybook-images/assets/720/fpo--1x1--720x720--002.jpg';
import imgLg2x1 from '../../../../../storybook-images/assets/720/fpo--2x1--720x360--002.jpg';
import imgMax2x1 from '../../../../../storybook-images/assets/1584/fpo--2x1--1312x656--002.jpg';
import imgSm2x1 from '../../../../../storybook-images/assets/320/fpo--2x1--320x160--002.jpg';
import imgXlg2x1 from '../../../../../storybook-images/assets/1312/fpo--2x1--1312x656--002.jpg';

import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

import { CTA_TYPE } from '../../cta/defs';

import {
  hrefsForType,
  knobNamesForType,
  typeOptions,
  types,
} from '../../cta/__stories__/ctaTypeConfig';

export const Medium = (args) => {
  const { ctaType, heading, href, customVideoTitle, noPoster } =
    args?.['dds-feature-card'] ?? {};
  let videoCopy;

  if (ctaType === CTA_TYPE.VIDEO) {
    const card = document.querySelector('dds-feature-card') as any;
    const duration = card?.videoTitle?.match(/\((.*)\)/)?.pop();

    if (!customVideoTitle) {
      videoCopy = card?.videoTitle;
    } else {
      videoCopy = duration
        ? `${customVideoTitle} (${duration})`
        : customVideoTitle;
    }
  }

  return html`
    <dds-video-cta-container>
      <dds-feature-card
        ?no-poster=${noPoster}
        cta-type="${ctaType}"
        href=${ifDefined(href || undefined)}>
        ${ctaType !== CTA_TYPE.VIDEO
          ? html`<dds-image
              slot="image"
              alt="Image alt text"
              default-src="${mediumImgLg1x1}"></dds-image>`
          : ``}
        <dds-card-heading>${videoCopy ?? heading}</dds-card-heading>
        <dds-feature-card-footer> </dds-feature-card-footer>
      </dds-feature-card>
    </dds-video-cta-container>
  `;
};

export const Large = (args) => {
  const { eyebrow, heading, copy, href } = args?.['dds-feature-card'] ?? {};
  return html`
    <dds-feature-card size="large" href=${ifDefined(href || undefined)}>
      <dds-image slot="image" default-src="${ifDefined(imgLg1x1)}">
        <dds-image-item media="(min-width: 1312px)" srcset="${imgMax2x1}">
        </dds-image-item>
        <dds-image-item media="(min-width: 1056px)" srcset="${imgXlg2x1}">
        </dds-image-item>
        <dds-image-item media="(min-width: 991px)" srcset="${imgXlg2x1}">
        </dds-image-item>
        <dds-image-item media="(min-width: 672px)" srcset="${imgLg2x1}">
        </dds-image-item>
        <dds-image-item media="(min-width: 0px)" srcset="${imgSm2x1}">
        </dds-image-item>
      </dds-image>
      <dds-card-eyebrow>${eyebrow}</dds-card-eyebrow>
      <dds-card-heading>${heading}</dds-card-heading>
      <p>${copy}</p>
      <dds-feature-card-footer>
        ${ArrowRight20({ slot: 'icon' })}
      </dds-feature-card-footer>
    </dds-feature-card>
  `;
};

Large.story = {
  parameters: {
    storyGrid: 'cds--col-lg-12',
    knobs: {
      'dds-feature-card': () => ({
        eyebrow: textNullable(
          'Card Eyebrow (required) (eyebrow):',
          'This is an eyebrow'
        ),
        heading: textNullable(
          'Card Heading (heading):',
          'Explore AI use cases in all industries'
        ),
        copy: textNullable(
          'Card copy (copy):',
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua.`
        ),
        href: textNullable('Card Href (href):', 'https://example.com'),
      }),
    },
    propsSet: {
      default: {
        'dds-feature-card': {
          eyebrow: 'This is an eyebrow',
          heading: 'Explore AI use cases in all industries',
          copy: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna aliqua.`,
          href: 'https://example.com',
        },
      },
    },
  },
};

export default {
  title: 'Components/Feature card',
  decorators: [
    (story, { parameters }) => html`
      <div class="cds--grid">
        <div class="cds--row">
          <div class="cds--col-sm-4 ${parameters.storyGrid}">${story()}</div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    storyGrid: 'cds--col-lg-8 cds--no-gutter"',
    hasStoryPadding: true,
    knobs: {
      'dds-feature-card': () => {
        const ctaType = select(
          'CTA type (cta-type)',
          typeOptions,
          types[CTA_TYPE.LOCAL]
        );

        const heading =
          ctaType === CTA_TYPE.VIDEO
            ? undefined
            : textNullable('Heading:', 'Aerospace and defence');

        const customVideoTitle =
          ctaType === CTA_TYPE.VIDEO
            ? textNullable('Custom video title', 'Custom video title')
            : null;

        const noPoster =
          ctaType === CTA_TYPE.VIDEO ? boolean('No poster:', false) : null;
        return {
          ctaType,
          heading,
          customVideoTitle,
          noPoster,
          href: textNullable(
            knobNamesForType[ctaType ?? CTA_TYPE.REGULAR],
            hrefsForType[ctaType ?? CTA_TYPE.REGULAR]
          ),
        };
      },
    },
    propsSet: {
      default: {
        'dds-feature-card': {
          heading: 'Explore AI use cases in all industries',
          href: 'https://example.com',
        },
      },
    },
  },
};
