/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { boolean, select } from '@storybook/addon-knobs';
import { html } from 'lit-element';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import '../card-footer';
import '../../image/image';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../card';

export const Default = ({ parameters }) => {
  const { image, href, alt, defaultSrc, eyebrow, heading, copy, inverse, footer, iconPlacement } = parameters?.props?.Card ?? {};
  return html`
    <dds-card color-scheme=${inverse ? 'inverse' : ''} href=${ifNonNull(href || undefined)}>
      ${image
        ? html`
            <dds-image slot="image" alt="${ifNonNull(alt)}" default-src="${ifNonNull(defaultSrc)}"></dds-image>
          `
        : ``}
      <span slot="eyebrow">${eyebrow}</span>
      <span slot="heading">${heading}</span>
      ${copy
        ? html`
            <p>${copy}</p>
          `
        : ``}
      <dds-card-footer icon-placement="${iconPlacement}">
        ${footer}${ArrowRight20({ slot: 'icon' })}
      </dds-card-footer>
    </dds-card>
  `;
};

const iconPlacement = {
  left: 'left',
  right: 'right',
};

export default {
  title: 'Components/Card',
  decorators: [
    story => html`
      <div class="bx--grid dds-ce-demo-devenv--grid--stretch">
        <div class="bx--row dds-ce-demo-devenv--grid-row">
          <div class="bx--col-sm-4 bx--col-md-3 bx--col-lg-6 bx--col-xlg-4 bx--no-gutter">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasGrid: true,
    knobs: {
      Card: ({ groupId }) => ({
        alt: 'Image alt text',
        defaultSrc: 'https://fpoimg.com/672x336?text=2:1&bg_color=ee5396&text_color=161616',
        image: boolean('image', false, groupId),
        eyebrow: textNullable('Card Eyebrow (eyebrow):', 'eyebrow text', groupId),
        heading: textNullable('Card Heading (heading):', 'Lorem ipsum dolor sit amet', groupId),
        copy: textNullable('Card Copy (copy):', '', groupId),
        inverse: boolean('inverse', false, groupId),
        href: textNullable('Card Href (href):', 'https://example.com', groupId),
        footer: textNullable('Footer copy text (footer.copy)', 'Card cta text', groupId),
        iconPlacement: select('Footer icon placement (footer.iconPlacement)', iconPlacement, iconPlacement.right, groupId),
      }),
    },
  },
};
