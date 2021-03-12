/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../../image/image';
import '../card';
import '../card-eyebrow';
import '../card-footer';
import '../card-heading';
import { boolean, select } from '@storybook/addon-knobs';

import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import { html } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null';
import imgLg2x1 from '../../../../../storybook-images/assets/720/fpo--2x1--720x360--003.jpg';
import { PICTOGRAM_PLACEMENT } from '../defs';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

export const Default = ({ parameters }) => {
  const { image, href, alt, defaultSrc, eyebrow, heading, copy, inverse, footer, iconPlacement } = parameters?.props?.Card ?? {};
  return html`
    <dds-card color-scheme=${inverse ? 'inverse' : ''} href=${ifNonNull(href || undefined)}>
      ${image
        ? html`
            <dds-image slot="image" alt="${ifNonNull(alt)}" default-src="${ifNonNull(defaultSrc)}"></dds-image>
          `
        : ``}
      <dds-card-eyebrow>${eyebrow}</dds-card-eyebrow>
      <dds-card-heading>${heading}</dds-card-heading>
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

const pictogramPlacements = {
  [PICTOGRAM_PLACEMENT.TOP]: PICTOGRAM_PLACEMENT.TOP,
  [PICTOGRAM_PLACEMENT.BOTTOM]: PICTOGRAM_PLACEMENT.BOTTOM,
};

export const Pictogram = ({ parameters }) => {
  const { href, heading, copy, pictogramPlacement, eyebrow, inverse } = parameters?.props?.PictogramCard ?? {};
  return html`
    <dds-card
      color-scheme=${inverse ? 'inverse' : ''}
      pictogram-placement="${pictogramPlacement}"
      href=${ifNonNull(href || undefined)}
    >
      <dds-card-eyebrow>${eyebrow}</dds-card-eyebrow>
      <dds-card-heading>${heading}</dds-card-heading>
      ${copy
        ? html`
            <p>${copy}</p>
          `
        : ``}
      <svg
        slot="pictogram"
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
        data-autoid="dds--card__pictogram"
        aria-label="Pictogram description"
        width="48"
        height="48"
        viewBox="0 0 48 48"
        role="img"
        class="bx--card__pictogram"
      >
        <path
          fill="none"
          stroke-linejoin="round"
          stroke-miterlimit="10"
          stroke-width=".72"
          d="M37,32 H11c-1.1,0-2-0.9-2-2V13c0-1.1,0.9-2,2-2h26c1.1,
        0,2,0.9,2,2v17C39,31.1,38.1,32,37,32z M17,37h14 M24,32v5 M9,27h30"
        ></path>
      </svg>
    </dds-card>
  `;
};

export default {
  title: 'Components/Card',
  decorators: [
    story => html`
      <div class="dds-ce-demo-devenv--simple-grid dds-ce-demo-devenv--simple-grid--card">
        ${story()}
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasGrid: true,
    knobs: {
      Card: ({ groupId }) => ({
        alt: 'Image alt text',
        defaultSrc: imgLg2x1,
        image: boolean('image', false, groupId),
        eyebrow: textNullable('Card Eyebrow (eyebrow):', 'Eyebrow text', groupId),
        heading: textNullable('Card Heading (heading):', 'Lorem ipsum dolor sit amet', groupId),
        copy: textNullable('Card Copy (copy):', '', groupId),
        inverse: boolean('inverse', false, groupId),
        href: textNullable('Card Href (href):', 'https://example.com', groupId),
        footer: textNullable('Footer copy text (footer.copy)', 'Card CTA text', groupId),
        iconPlacement: select('Footer icon placement (footer.iconPlacement)', iconPlacement, iconPlacement.right, groupId),
      }),
      PictogramCard: ({ groupId }) => ({
        href: textNullable('Card Href (href):', 'https://example.com', groupId),
        heading: textNullable('Card Heading (heading):', 'Lorem ipsum dolor sit amet', groupId),
        eyebrow: textNullable('Card Eyebrow (eyebrow):', 'Eyebrow text', groupId),
        copy: textNullable(
          'Card Copy (copy):',
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          groupId
        ),
        pictogramPlacement: select(
          'Card pictogram placement (card.pictogramPlacement)',
          pictogramPlacements,
          pictogramPlacements.top,
          groupId
        ),
        inverse: boolean('inverse', false, groupId),
      }),
    },
  },
};
