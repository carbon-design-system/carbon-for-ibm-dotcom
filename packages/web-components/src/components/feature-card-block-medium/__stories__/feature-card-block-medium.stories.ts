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
import '../../image/image';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../../card/card-eyebrow';
import '../../card/card-heading';
import '../feature-card-block-medium';

export const Default = ({ parameters }) => {
  const { copy, eyebrow, heading, defaultSrc, alt, href } = parameters?.props?.['dds-feature-card-block-medium'] ?? {};
  return html`
    <dds-feature-card-block-medium href=${ifNonNull(href || undefined)}>
      <dds-card-heading>${heading}</dds-card-heading>
      <dds-card-eyebrow>${eyebrow}</dds-card-eyebrow>
      <dds-image slot="image" alt="${ifNonNull(alt)}" default-src="${ifNonNull(defaultSrc)}"></dds-image>
      ${copy}
      <dds-feature-card-footer>
        ${ArrowRight20({ slot: 'icon' })}
      </dds-feature-card-footer>
    </dds-feature-card-block-medium>
  `;
};

export default {
  title: 'Components/Feature Card Block Medium',
  decorators: [
    story => html`
      <div class="bx--grid dds-ce-demo-devenv--grid--stretch">
        <div class="bx--row dds-ce-demo-devenv--grid-row">
          <div class="bx--col-sm-4 bx--col-lg-8 bx--offset-lg-2" style="padding-top: 20px">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasGrid: true,
    hasVerticalSpacingInComponent: true,
    knobs: {
      'dds-feature-card-block-medium': () => ({
        heading: textNullable('Block Heading (blockHeading):', 'How is artificial intelligence used today in your industry?'),
        copy: textNullable('Card copy (copy):', 'Explore AI use cases in all industries'),
        defaultSrc: textNullable(
          'Image src (defaultSrc):',
          'https://fpoimg.com/672x672?text=1:1&amp;bg_color=ee5396&amp;text_color=161616'
        ),
        eyebrow: textNullable('Card eyebrow (eyebrow):', 'Explore AI use cases in all industries'),
        alt: textNullable('Image alt text (alt):', 'Image alt text'),
        href: textNullable('Card Href (href):', 'https://example.com'),
      }),
    },
  },
};
