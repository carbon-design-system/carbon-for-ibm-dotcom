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
import { select } from '@storybook/addon-knobs';
import { BASIC_COLOR_SCHEME } from '../../../globals/defs';
import ArrowRight20 from '../../../internal/vendor/@carbon/web-components/icons/arrow--right/20.js';
import { html } from 'lit';
import { boolean, select } from '@storybook/addon-knobs';
import { ifDefined } from 'lit/directives/if-defined.js';
import mediumImgLg1x1 from '../../../../../storybook-images/assets/720/fpo--1x1--720x720--004.jpg';
import imgSm2x1 from '../../../../../storybook-images/assets/320/fpo--2x1--320x160--002.jpg';
import imgMd1x1 from '../../../../../storybook-images/assets/480/fpo--1x1--480x480--005.jpg';
import imgLg1x1 from '../../../../../storybook-images/assets/720/fpo--1x1--720x720--002.jpg';
import imgXlg1x1 from '../../../../../storybook-images/assets/1584/fpo--1x1--1584x1584--002.jpg';
import settings from '../../../internal/vendor/@carbon/ibmdotcom-utilities/utilities/settings/settings';

const { stablePrefix: ddsPrefix, prefix } = settings;

import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

const colorSchemeMap = {
  Regular: BASIC_COLOR_SCHEME.REGULAR,
  Inverse: BASIC_COLOR_SCHEME.INVERSE,
};

export const Medium = (args) => {
  const { heading, href, colorScheme } =
    args?.[`${ddsPrefix}-feature-card`] ?? {};
  return html`
    <dds-feature-card
      href=${ifDefined(href || undefined)}
      color-scheme=${colorSchemeMap[colorScheme]}>
      <dds-image
        slot="image"
        alt="Image alt text"
        default-src="${mediumImgLg1x1}"></dds-image>
      <dds-card-heading>${heading}</dds-card-heading>
      <dds-feature-card-footer>
        ${ArrowRight20({ slot: 'icon' })}
      </dds-feature-card-footer>
    </dds-feature-card>
  `;
};

export const Large = (args) => {
  const { eyebrow, heading, copy, href, colorScheme } =
    args?.[`${ddsPrefix}-feature-card`] ?? {};
  return html`
    <dds-feature-card
      size="large"
      href=${ifDefined(href || undefined)}
      color-scheme=${colorSchemeMap[colorScheme]}>
      <dds-image slot="image" default-src="${ifDefined(imgLg1x1)}">
        <dds-image-item media="(min-width: 1312px)" srcset="${imgXlg1x1}">
        </dds-image-item>
        <dds-image-item media="(min-width: 1056px)" srcset="${imgXlg1x1}">
        </dds-image-item>
        <dds-image-item media="(min-width: 991px)" srcset="${imgLg1x1}">
        </dds-image-item>
        <dds-image-item media="(min-width: 672px)" srcset="${imgMd1x1}">
        </dds-image-item>
        <dds-image-item media="(min-width: 0px)" srcset="${imgSm2x1}">
        </dds-image-item>
      </dds-image>
      <dds-card-eyebrow>${eyebrow}</dds-card-eyebrow>
      <dds-card-heading>${heading}</dds-card-heading>
      <p>${copy}</p>
      <c4d-feature-card-footer>
        ${ArrowRight20({ slot: 'icon' })}
      </c4d-feature-card-footer>
    </c4d-feature-card>
  `;
};

Large.story = {
  parameters: {
    storyGrid: `${prefix}--col-lg-12`,
    knobs: {
      [`${ddsPrefix}-feature-card`]: () => ({
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
        colorScheme: select('Color scheme:', ['Regular', 'Inverse'], 'Regular'),
      }),
    },
    propsSet: {
      default: {
        [`${ddsPrefix}-feature-card`]: {
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
      <div class="${prefix}--grid">
        <div class="${prefix}--row">
          <div class="${prefix}--col-sm-4 ${parameters.storyGrid}">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    storyGrid: `${prefix}--col-lg-8`,
    hasStoryPadding: true,
    knobs: {
      [`${ddsPrefix}-feature-card`]: () => ({
        heading: textNullable(
          'Card Heading (heading):',
          'Explore AI use cases in all industries'
        ),
        href: textNullable('Card Href (href):', 'https://example.com'),
        colorScheme: select('Color scheme:', ['Regular', 'Inverse'], 'Regular'),
      }),
    },
    propsSet: {
      default: {
        [`${ddsPrefix}-feature-card`]: {
          heading: 'Explore AI use cases in all industries',
          href: 'https://example.com',
        },
      },
    },
  },
};
