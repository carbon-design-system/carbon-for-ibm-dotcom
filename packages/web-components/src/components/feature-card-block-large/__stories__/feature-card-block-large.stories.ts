/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20.js';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import readme from './README.stories.mdx';
import styles from './feature-card-block-large.stories.scss';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../feature-card-block-large';

export const Default = ({ parameters }) => {
  const { eyebrow, heading, copy, defaultSrc, alt, href } = parameters?.props?.['dds-feature-card-block-large'] ?? {};
  return html`
    <dds-feature-card-block-large href=${ifNonNull(href || undefined)}>
      <dds-image slot="image" alt="${ifNonNull(alt)}" default-src="${ifNonNull(defaultSrc)}">
        <dds-image-item media="(min-width: 1312px)" srcset="https://dummyimage.com/672x672/ee5396/161616&text=1:1">
        </dds-image-item>
        <dds-image-item media="(min-width: 1056px)" srcset="https://dummyimage.com/600x300/ee5396/161616&text=2:1">
        </dds-image-item>
        <dds-image-item media="(min-width: 991px)" srcset="https://dummyimage.com/600x600/ee5396/161616&text=1:1">
        </dds-image-item>
        <dds-image-item media="(min-width: 672px)" srcset="https://dummyimage.com/400x200/ee5396/161616&text=2:1">
        </dds-image-item>
        <dds-image-item media="(min-width: 320px)" srcset="https://dummyimage.com/320x160/ee5396/161616&text=2:1">
        </dds-image-item>
      </dds-image>
      <slot slot="eyebrow">${eyebrow}</slot>
      <slot slot="heading">${heading}</slot>
      <p>${copy}</p>
      ${ArrowRight20({ slot: 'footer' })}
    </dds-feature-card-block-large>
  `;
};

export default {
  title: 'Components/Feature Card Block Large',
  decorators: [
    story => html`
      <style>
        ${styles}
      </style>
      <div class="bx--grid" style="width: 100%">
        <div class="bx--row">
          <div class="bx--col-sm-4 bx--col-lg-9 bx--offset-lg-2">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    knobs: {
      'dds-feature-card-block-large': () => ({
        eyebrow: textNullable('Card Eyebrow (eyebrow):', 'This is an eyebrow'),
        heading: textNullable('Card Heading (heading):', 'Explore AI use cases in all industries'),
        copy: textNullable(
          'Card Copy (copy):',
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
            'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        ),
        defaultSrc: textNullable('Image src (defaultSrc):', 'https://dummyimage.com/672x672/ee5396/161616&text=1:1'),
        alt: textNullable('Image alt text (alt):', 'Image alt text'),
        href: textNullable('Card Href (href):', 'https://example.com'),
      }),
    },
  },
};
