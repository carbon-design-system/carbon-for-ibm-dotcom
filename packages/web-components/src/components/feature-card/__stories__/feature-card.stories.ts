/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../../card/index';
import '../../image/image';
import '../index';
import { BASIC_COLOR_SCHEME } from '../../../globals/defs';
import { html } from 'lit';
import { select } from '@storybook/addon-knobs';
import { ifDefined } from 'lit/directives/if-defined.js';
import mediumImgSm4x3 from '../../../../.storybook/storybook-images/assets/320/fpo--4x3--320x160--004.jpg';
import imgSm4x3 from '../../../../.storybook/storybook-images/assets/480/fpo--4x3--480x360--005.jpg';
import imgMd1x1 from '../../../../.storybook/storybook-images/assets/480/fpo--1x1--480x480--005.jpg';
import imgLg1x1 from '../../../../.storybook/storybook-images/assets/720/fpo--1x1--720x720--002.jpg';
import imgXlg1x1 from '../../../../.storybook/storybook-images/assets/1312/fpo--1x1--1312x1312--002.jpg';
import imgMax1x1 from '../../../../.storybook/storybook-images/assets/1584/fpo--1x1--1584x1584--002.jpg';
import settings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';

const { stablePrefix: c4dPrefix, prefix } = settings;

import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

const colorSchemeMap = {
  Regular: BASIC_COLOR_SCHEME.REGULAR,
  Inverse: BASIC_COLOR_SCHEME.INVERSE,
};

export const Medium = (args) => {
  const { heading, href, colorScheme } =
    args?.[`${c4dPrefix}-feature-card`] ?? {};
  return html`
    <c4d-feature-card
      href=${ifDefined(href || undefined)}
      color-scheme=${colorSchemeMap[colorScheme]}
      cta-type="local">
      <c4d-image slot="image" alt="Image alt text" default-src="${imgMax1x1}">
        <c4d-image-item media="(min-width: 1312px)" srcset="${imgXlg1x1}">
        </c4d-image-item>
        <c4d-image-item media="(min-width: 1056px)" srcset="${imgXlg1x1}">
        </c4d-image-item>
        <c4d-image-item media="(min-width: 991px)" srcset="${imgLg1x1}">
        </c4d-image-item>
        <c4d-image-item media="(min-width: 672px)" srcset="${imgMd1x1}">
        </c4d-image-item>
        <c4d-image-item media="(min-width: 0px)" srcset="${mediumImgSm4x3}">
        </c4d-image-item>
      </c4d-image>
      <c4d-card-heading>${heading}</c4d-card-heading>
      <c4d-feature-card-footer></c4d-feature-card-footer>
    </c4d-feature-card>
  `;
};

Medium.story = {
  parameters: {
    percy: {
      skip: true,
    },
  },
};

export const Large = (args) => {
  const { eyebrow, heading, copy, href, colorScheme } =
    args?.[`${c4dPrefix}-feature-card`] ?? {};

  const copyComponent = document
    .querySelector(`${c4dPrefix}-feature-card`)
    ?.querySelector('p');
  if (copyComponent) {
    copyComponent!.innerHTML = copy;
  }
  return html`
    <c4d-feature-card
      size="large"
      href=${ifDefined(href || undefined)}
      color-scheme=${colorSchemeMap[colorScheme]}
      cta-type="local">
      <c4d-image slot="image" default-src="${ifDefined(imgLg1x1)}">
        <c4d-image-item media="(min-width: 1312px)" srcset="${imgXlg1x1}">
        </c4d-image-item>
        <c4d-image-item media="(min-width: 1056px)" srcset="${imgXlg1x1}">
        </c4d-image-item>
        <c4d-image-item media="(min-width: 991px)" srcset="${imgLg1x1}">
        </c4d-image-item>
        <c4d-image-item media="(min-width: 672px)" srcset="${imgMd1x1}">
        </c4d-image-item>
        <c4d-image-item media="(min-width: 0px)" srcset="${imgSm4x3}">
        </c4d-image-item>
      </c4d-image>
      <c4d-card-eyebrow>${eyebrow}</c4d-card-eyebrow>
      <c4d-card-heading>${heading}</c4d-card-heading>
      ${copy && html`<p></p>`}
      <c4d-feature-card-footer> </c4d-feature-card-footer>
    </c4d-feature-card>
  `;
};

Large.story = {
  parameters: {
    percy: {
      skip: true,
    },
    storyGrid: `${prefix}--col-lg-12`,
    knobs: {
      [`${c4dPrefix}-feature-card`]: () => ({
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
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.`
        ),
        href: textNullable('Card Href (href):', 'https://example.com'),
        colorScheme: select('Color scheme:', ['Regular', 'Inverse'], 'Regular'),
      }),
    },
    propsSet: {
      default: {
        [`${c4dPrefix}-feature-card`]: {
          eyebrow: 'This is an eyebrow',
          heading: 'Explore AI use cases in all industries',
          copy: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.`,
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
      [`${c4dPrefix}-feature-card`]: () => ({
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
        [`${c4dPrefix}-feature-card`]: {
          heading: 'Explore AI use cases in all industries',
          href: 'https://example.com',
        },
      },
    },
  },
};
