/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../../card/index';
import '../../image/image';
import '../index';

import ArrowRight20 from '@carbon/carbon-web-components/es/icons/arrow--right/20.js';
import { html } from 'lit-element';
import ifNonNull from '@carbon/carbon-web-components/es/globals/directives/if-non-null.js';
import mediumImgLg1x1 from '../../../../../storybook-images/assets/720/fpo--1x1--720x720--004.jpg';

import imgLg1x1 from '../../../../../storybook-images/assets/720/fpo--1x1--720x720--002.jpg';
import imgLg2x1 from '../../../../../storybook-images/assets/720/fpo--2x1--720x360--002.jpg';
import imgMax2x1 from '../../../../../storybook-images/assets/1584/fpo--2x1--1312x656--002.jpg';
import imgSm2x1 from '../../../../../storybook-images/assets/320/fpo--2x1--320x160--002.jpg';
import imgXlg2x1 from '../../../../../storybook-images/assets/1312/fpo--2x1--1312x656--002.jpg';

import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

export const Medium = (args) => {
  const { heading, href } = args?.['dds-feature-card'] ?? {};
  return html`
    <dds-feature-card href=${ifNonNull(href || undefined)}>
      <dds-image
        slot="image"
        alt="Image alt text"
        default-src="${mediumImgLg1x1}"
      ></dds-image>
      <dds-card-heading>${heading}</dds-card-heading>
      <dds-feature-card-footer>
        ${ArrowRight20({ slot: 'icon' })}
      </dds-feature-card-footer>
    </dds-feature-card>
  `;
};

export const Large = (args) => {
  const { eyebrow, heading, copy, href } = args?.['dds-feature-card'] ?? {};
  return html`
    <dds-feature-card size="large" href=${ifNonNull(href || undefined)}>
      <dds-image slot="image" default-src="${ifNonNull(imgLg1x1)}">
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
    storyGrid: 'bx--col-lg-12',
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
      <div class="bx--grid">
        <div class="bx--row">
          <div class="bx--col-sm-4 ${parameters.storyGrid}">${story()}</div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    storyGrid: 'bx--col-lg-8 bx--no-gutter"',
    hasStoryPadding: true,
    knobs: {
      'dds-feature-card': () => ({
        heading: textNullable(
          'Card Heading (heading):',
          'Explore AI use cases in all industries'
        ),
        href: textNullable('Card Href (href):', 'https://example.com'),
      }),
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
