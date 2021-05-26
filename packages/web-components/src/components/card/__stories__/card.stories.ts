/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../../image/image';
import '../../tag-group/tag-group';
import 'carbon-web-components/es/components/tag/tag';
import '../index';
import { boolean, select } from '@storybook/addon-knobs';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import { html } from 'lit-element';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null';
import imgLg2x1 from '../../../../../storybook-images/assets/720/fpo--2x1--720x360--003.jpg';
import { PICTOGRAM_PLACEMENT } from '../defs';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

export const Default = ({ parameters }) => {
  const { image, href, alt, defaultSrc, heading, tagGroup, copy, inverse, footer, iconPlacement } = parameters?.props?.Card ?? {};
  return html`
    <dds-card color-scheme=${inverse ? 'inverse' : ''} href=${ifNonNull(href || undefined)}>
      ${image
        ? html`
            <dds-image slot="image" alt="${ifNonNull(alt)}" default-src="${ifNonNull(defaultSrc)}"></dds-image>
          `
        : ``}
      <dds-card-eyebrow>Eyebrow</dds-card-eyebrow>
      <dds-card-heading>${heading}</dds-card-heading>
      ${tagGroup
        ? html`
            <dds-tag-group>
              <bx-tag>
                Most popular
              </bx-tag>
              <bx-tag type="purple">
                Enterprise
              </bx-tag>
            </dds-tag-group>
          `
        : ''}
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

Default.story = {
  parameters: {
    ...readme.parameters,
    hasGrid: true,
    knobs: {
      Card: ({ groupId }) => ({
        alt: 'Image alt text',
        defaultSrc: imgLg2x1,
        tagGroup: boolean('Add tags', false, groupId),
        heading: textNullable('Card Heading:', 'Lorem ipsum dolor sit amet', groupId),
        copy: textNullable('Card body copy:', '', groupId),
        href: 'https://example.com',
        footer: 'Card CTA text',
        iconPlacement: iconPlacement.right,
      }),
    },
  },
};

export const Pictogram = ({ parameters }) => {
  const { href, heading, copy, tagGroup, pictogramPlacement } = parameters?.props?.PictogramCard ?? {};
  return html`
    <dds-card pictogram-placement="${pictogramPlacement}" href=${ifNonNull(href || undefined)}>
      <dds-card-heading>${heading}</dds-card-heading>
      ${tagGroup
        ? html`
            <dds-tag-group>
              <bx-tag>
                Most popular
              </bx-tag>
              <bx-tag type="purple">
                Enterprise
              </bx-tag>
            </dds-tag-group>
          `
        : ''}
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
        data-autoid="dds--card__pictogram"
        aria-label="Pictogram description"
        width="48"
        height="48"
        viewBox="0 0 32 32"
        role="img"
        class="bx--card__pictogram"
      >
        <path
          id="desktop_1_"
          d="M23,29.36H9v-0.72h6.64v-4.28H3c-1.301,0-2.36-1.059-2.36-2.36V5c0-1.301,1.059-2.36,2.36-2.36h26
          c1.302,0,2.36,1.059,2.36,2.36v17c0,1.302-1.059,2.36-2.36,2.36H16.36v4.279H23V29.36z M1.36,19.36V22c0,
          0.904,0.736,1.64,1.64,1.64h26c0.904,0,1.64-0.735,1.64-1.64v-2.64H1.36z M1.36,
          18.64h29.28V5c0-0.904-0.735-1.64-1.64-1.64H3C2.096,3.36,1.36,4.096,1.36,5V18.64z"
        />
      </svg>
    </dds-card>
  `;
};

Pictogram.story = {
  parameters: {
    ...readme.parameters,
    knobs: {
      PictogramCard: ({ groupId }) => ({
        alt: 'Image alt text',
        defaultSrc: imgLg2x1,
        pictogramPlacement: select('Pictogram placement', pictogramPlacements, pictogramPlacements.top, groupId),
        tagGroup: boolean('Add tags', false, groupId),
        heading: textNullable('Card Heading:', 'Lorem ipsum dolor sit amet', groupId),
        copy: textNullable(
          'Card body copy:',
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          groupId
        ),
        href: 'https://example.com',
        footer: 'Card CTA text',
        iconPlacement: iconPlacement.right,
      }),
    },
  },
};

export const Static = ({ parameters }) => {
  const { image, alt, defaultSrc, outlinedCard, eyebrow, heading, href, copy, tagGroup, footer } = parameters?.props?.Card ?? {};
  return html`
    <dds-card color-scheme=${outlinedCard ? 'light' : ''} ?border=${outlinedCard}>
      ${image
        ? html`
            <dds-image slot="image" alt="${ifNonNull(alt)}" default-src="${ifNonNull(defaultSrc)}"></dds-image>
          `
        : ``}
      ${eyebrow
        ? html`
            <dds-card-eyebrow>${eyebrow}</dds-card-eyebrow>
          `
        : ``}
      <dds-card-heading>${heading}</dds-card-heading>
      ${tagGroup
        ? html`
            <dds-tag-group>
              <bx-tag>
                Most popular
              </bx-tag>
              <bx-tag type="purple">
                Enterprise
              </bx-tag>
            </dds-tag-group>
          `
        : ''}
      ${copy
        ? html`
            <p>${copy}</p>
          `
        : ``}
      <dds-card-footer href="${href}" icon-placement="${iconPlacement}">
        ${footer}${ArrowRight20({ slot: 'icon' })}
      </dds-card-footer>
    </dds-card>
  `;
};

Static.story = {
  parameters: {
    ...readme.parameters,
    knobs: {
      Card: ({ groupId }) => ({
        alt: 'Image alt text',
        defaultSrc: imgLg2x1,
        outlinedCard: boolean('Outlined card', true, groupId),
        tagGroup: boolean('Add tags', true, groupId),
        image: boolean('Add image', false, groupId),
        eyebrow: textNullable('Card Eyebrow:', 'Eyebrow', groupId),
        heading: textNullable('Card Heading:', 'Lorem ipsum dolor sit amet', groupId),
        copy: textNullable(
          'Card body copy:',
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          groupId
        ),
        href: 'https://example.com',
        footer: textNullable('CTA copy', 'Card CTA text', groupId),
      }),
    },
  },
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
  },
};
