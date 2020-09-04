/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean } from '@storybook/addon-knobs';
import { html } from 'lit-element';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import '../card-footer';
import '../../image/image';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null';
import readme from './README.stories.mdx';
import styles from './card.stories.scss';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../card';

export const Default = ({ parameters }) => {
  const { image, href, alt, defaultSrc, eyebrow, heading, copy, inverse, footer } = parameters?.props?.Card ?? {};
  return html`
    <dds-card color-scheme=${inverse ? 'inverse' : ''} href=${ifNonNull(href || undefined)}>
      ${image
        ? html`
            <dds-image slot="image" alt="${ifNonNull(alt)}" default-src="${ifNonNull(defaultSrc)}"></dds-image>
          `
        : html``}
      <slot slot="eyebrow">${eyebrow}</slot>
      <slot slot="heading">${heading}</slot>
      ${copy
        ? html`
            <p>${copy}</p>
          `
        : html``}
      <dds-card-footer slot="footer">
        ${footer}${ArrowRight20({ slot: 'icon' })}
      </dds-card-footer>
    </dds-card>
  `;
};

export default {
  title: 'Components/Card',
  decorators: [
    story => html`
      <style>
        ${styles}
      </style>
      <div class="bx--grid" style="width: 100%">
        <div class="bx--row">
          <div class="bx--col-sm-4 bx--col-md-3 bx--no-gutter">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    knobs: {
      Card: ({ groupId }) => ({
        alt: 'Image alt text',
        defaultSrc: 'https://dummyimage.com/672x336/ee5396/161616&text=2:1',
        image: boolean('image', false, groupId),
        eyebrow: textNullable('Card Eyebrow (eyebrow):', 'eyebrow text', groupId),
        heading: textNullable('Card Heading (heading):', 'Lorem ipsum dolor sit amet', groupId),
        copy: textNullable('Card Copy (copy):', '', groupId),
        inverse: boolean('inverse', false, groupId),
        href: textNullable('Card Href (href):', 'https://example.com', groupId),
        footer: textNullable('Card Footer (footer)', 'Card cta text', groupId),
      }),
    },
  },
};
