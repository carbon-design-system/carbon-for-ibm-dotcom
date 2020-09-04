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
import styles from './feature-card.stories.scss';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../feature-card';

export const Default = ({ parameters }) => {
  const { heading, defaultSrc, alt, href } = parameters?.props?.['dds-feature-card'] ?? {};
  return html`
    <dds-feature-card href=${ifNonNull(href || undefined)}>
      <img slot="image" src=${defaultSrc} alt=${alt} />
      <slot slot="heading">${heading}</slot>
      ${ArrowRight20({ slot: 'footer' })}
    </dds-feature-card>
  `;
};

export default {
  title: 'Components/Feature Card',
  decorators: [
    story => html`
      <style>
        ${styles}
      </style>
      <div class="bx--grid" style="width: 100%">
        <div class="bx--row">
          <div class="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-4" style="padding-top: 20px">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    knobs: {
      'dds-feature-card': () => ({
        heading: textNullable('Card Heading (heading):', 'Explore AI use cases in all industries'),
        defaultSrc: textNullable('Image src (defaultSrc):', 'https://dummyimage.com/672x672/ee5396/161616&text=1x1'),
        alt: textNullable('Image alt text (alt):', 'Image alt text'),
        href: textNullable('Card Href (href):', 'https://example.com'),
      }),
    },
  },
};
