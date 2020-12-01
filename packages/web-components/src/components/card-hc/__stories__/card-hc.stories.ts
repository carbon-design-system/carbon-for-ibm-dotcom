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
import DocumentPDF20 from 'carbon-web-components/es/icons/document--pdf/20';
import '../card-hc-footer';
import '../../image/image';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';
import '../card-hc';

export const Default = ({ parameters }) => {
  const { image, href, alt, defaultSrc, eyebrow, heading, copy, inverse, footer, iconPlacement } = parameters?.props?.Card ?? {};
  return html`
    <dds-card-hc color-scheme=${inverse ? 'inverse' : ''} href=${ifNonNull(href || undefined)}>
      ${image
        ? html`
            <dds-image slot="image" alt="${ifNonNull(alt)}" default-src="${ifNonNull(defaultSrc)}"></dds-image>
          `
        : ``}
      <span slot="eyebrow">${eyebrow}</span>
      <span slot="heading">${heading}</span>
      <span slot="copy">${copy}</span>
      <dds-card-hc-footer icon-placement="${iconPlacement}">
        ${footer}${DocumentPDF20({ slot: 'icon' })}
      </dds-card-hc-footer>
    </dds-card-hc>
  `;
};

const iconPlacement = {
  left: 'left',
  right: 'right',
};

export default {
  title: 'Components/Card-HC',
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
        eyebrow: textNullable('Card Eyebrow (eyebrow):', 'Training', groupId),
        heading: textNullable('Card Heading (heading):', 'Learn more with less data', groupId),
        copy: textNullable('Card Copy (copy):', 'Not every business challenge has huge amounts of data behind it. This is why Watson can learn from small data sets. Its about the quality of your data, not the quantity. (549 KB)', groupId),
        inverse: boolean('inverse', false, groupId),
        href: textNullable('Card Href (href):', 'https://example.com', groupId),
        footer: textNullable('Footer copy text (footer.copy)', '', groupId),
        iconPlacement: select('Footer icon placement (footer.iconPlacement)', iconPlacement, iconPlacement.right, groupId),
      }),
    },
  },
};
