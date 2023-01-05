/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../../image/image';
import '../../tag-group/tag-group';
import 'carbon-web-components/es/components/tag/tag.js';
import '../index';
import { boolean, select } from '@storybook/addon-knobs';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import imgXlg4x3 from '../../../../../storybook-images/assets/1312/fpo--4x3--1312x984--003.jpg';
import logoMicrosoft2x1 from '../../../../../storybook-images/assets/logos/logo-microsoft--2x1.png';
import { PICTOGRAM_PLACEMENT } from '../defs';
import readme from './README.stories.mdx';
import textNullable from '../../../../.storybook/knob-text-nullable';

const tagGroupContent = html`
  <dds-tag-group>
    <bx-tag> Most popular </bx-tag>
    <bx-tag type="purple"> Enterprise </bx-tag>
  </dds-tag-group>
`;

export const Default = (args) => {
  const {
    image,
    href,
    alt,
    defaultSrc,
    heading,
    eyebrow,
    tagGroup,
    copy,
    footer,
    cardStyles,
  } = args?.Card ?? {};
  /* eslint-disable no-nested-ternary */
  return html`
    <dds-card
      color-scheme=${cardStyles === 'Inverse card'
        ? 'inverse'
        : cardStyles === 'Outlined card'
        ? 'light'
        : ''}
      ?border=${cardStyles === 'Outlined card'}
      href=${ifDefined(href || undefined)}>
      ${image
        ? html`
            <dds-image
              slot="image"
              alt="${ifDefined(alt)}"
              default-src="${ifDefined(defaultSrc)}"></dds-image>
          `
        : ``}
      <dds-card-eyebrow>${eyebrow}</dds-card-eyebrow>
      <dds-card-heading>${heading}</dds-card-heading>
      ${copy ? html` <p>${copy}</p> ` : ``}
      ${tagGroup ? html` ${tagGroupContent} ` : ``}
      <dds-card-footer>
        ${footer}${ArrowRight20({ slot: 'icon' })}
      </dds-card-footer>
    </dds-card>
  `;
};

const pictogramPlacements = {
  [PICTOGRAM_PLACEMENT.TOP]: PICTOGRAM_PLACEMENT.TOP,
  [PICTOGRAM_PLACEMENT.BOTTOM]: PICTOGRAM_PLACEMENT.BOTTOM,
};

Default.story = {
  parameters: {
    ...readme.parameters,
    knobs: {
      Card: () => ({
        image: boolean('Add image:', false, 'Default'),
        eyebrow: textNullable('Eyebrow:', 'Industry', 'Default'),
        heading: textNullable('Heading:', 'Aerospace and defence', 'Default'),
        copy: textNullable('Body copy:', '', 'Default'),
        alt: 'Image alt text',
        defaultSrc: imgXlg4x3,
        tagGroup: boolean('Add tags:', false, 'Default'),
        href: 'https://example.com',
        footer: textNullable('CTA:', 'Learn more', 'Default'),
        cardStyles: select(
          'Card style:',
          ['Outlined card', 'Inverse card', 'none'],
          'none',
          'Default'
        ),
      }),
    },
    propsSet: {
      default: {
        Card: {
          image: false,
          eyebrow: 'Industry',
          heading: 'Aerospace and defence',
          copy: '',
          alt: 'Image alt text',
          defaultSrc: imgXlg4x3,
          tagGroup: false,
          href: 'https://example.com',
          footer: 'Learn more',
          cardStyles: 'none',
        },
      },
    },
  },
};

export const Pictogram = (args) => {
  const { href, heading, copy, tagGroup, pictogramPlacement, cardStyles } =
    args?.PictogramCard ?? {};
  return html`
    <dds-card
      pictogram-placement="${pictogramPlacement}"
      href=${ifDefined(href || undefined)}
      color-scheme=${cardStyles === 'Inverse card'
        ? 'inverse'
        : cardStyles === 'Outlined card'
        ? 'light'
        : ''}
      ?border=${cardStyles === 'Outlined card'}>
      <dds-card-heading>${heading}</dds-card-heading>
      ${copy ? html` <p>${copy}</p> ` : ``}
      ${tagGroup ? html` ${tagGroupContent} ` : ``}
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
        class="bx--card__pictogram">
        <path
          id="desktop_1_"
          d="M23,29.36H9v-0.72h6.64v-4.28H3c-1.301,0-2.36-1.059-2.36-2.36V5c0-1.301,1.059-2.36,2.36-2.36h26
          c1.302,0,2.36,1.059,2.36,2.36v17c0,1.302-1.059,2.36-2.36,2.36H16.36v4.279H23V29.36z M1.36,19.36V22c0,
          0.904,0.736,1.64,1.64,1.64h26c0.904,0,1.64-0.735,1.64-1.64v-2.64H1.36z M1.36,
          18.64h29.28V5c0-0.904-0.735-1.64-1.64-1.64H3C2.096,3.36,1.36,4.096,1.36,5V18.64z" />
      </svg>
    </dds-card>
  `;
};

Pictogram.story = {
  parameters: {
    ...readme.parameters,
    knobs: {
      PictogramCard: () => {
        const pictogramPlacement = select(
          'Pictogram position:',
          pictogramPlacements,
          pictogramPlacements.top,
          'pictogram'
        );
        const copy = textNullable(
          'Body copy:',
          `Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
           Ut enim ad minim veniam, quis nostrud exercitation.`,
          'pictogram'
        );
        return {
          pictogramPlacement,
          heading: textNullable(
            'Heading:',
            'Aerospace and defence',
            'pictogram'
          ),
          copy,
          href: 'https://example.com',
          cardStyles: select(
            'Card style:',
            ['Outlined card', 'Inverse card', 'none'],
            'none',
            'pictogram'
          ),
        };
      },
    },
    propsSet: {
      default: {
        PictogramCard: {
          pictogramPlacement: 'top',
          heading: 'Aerospace and defence',
          copy: `Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
           Ut enim ad minim veniam, quis nostrud exercitation.`,
          href: 'https://example.com',
          cardStyles: 'none',
        },
      },
    },
  },
};

export const Static = (args) => {
  const {
    image,
    alt,
    defaultSrc,
    outlinedCard,
    eyebrow,
    heading,
    copy,
    tagGroup,
    cta,
    ctaCopy,
  } = args?.Card ?? {};
  return html`
    <dds-card
      color-scheme=${outlinedCard ? 'light' : ''}
      ?border=${outlinedCard}>
      ${image
        ? html`
            <dds-image
              slot="image"
              alt="${ifDefined(alt)}"
              default-src="${ifDefined(defaultSrc)}"></dds-image>
          `
        : ``}
      ${eyebrow ? html` <dds-card-eyebrow>${eyebrow}</dds-card-eyebrow> ` : ``}
      <dds-card-heading>${heading}</dds-card-heading>
      ${copy ? html` <p>${copy}</p> ` : ``}
      ${tagGroup ? html` ${tagGroupContent} ` : ``}
      ${cta
        ? html`
            <dds-card-footer href="https://www.example.com">
              ${ctaCopy}${ArrowRight20({ slot: 'icon' })}
            </dds-card-footer>
          `
        : ``}
    </dds-card>
  `;
};

Static.story = {
  parameters: {
    ...readme.parameters,
    knobs: {
      Card: () => {
        const image = boolean('Add image:', false, 'static');
        const eyebrow = textNullable('Eyebrow:', 'SPSS Statistics', 'static');
        const heading = textNullable('Heading:', 'Free trial', 'static');
        const copy = textNullable(
          'Body copy:',
          'Enjoy full SPSS Statistics capabilities including all add-ons. ' +
            'All trial registrants are restricted to one free trial per computer per user.',
          'static'
        );
        const tagGroup = boolean('Add tags:', false, 'static');
        const cta = boolean('Add CTA:', false, 'static');
        const ctaCopy = cta
          ? textNullable('CTA copy:', 'Sign up for the trial', 'static')
          : '';
        const outlinedCard = boolean('Outlined card:', true, 'static');
        return {
          alt: 'Image alt text',
          defaultSrc: imgXlg4x3,
          image,
          eyebrow,
          heading,
          copy,
          tagGroup,
          cta,
          ctaCopy,
          outlinedCard,
        };
      },
    },
    propsSet: {
      default: {
        Card: {
          image: false,
          eyebrow: 'Industry',
          heading: 'Aerospace and defence',
          copy: '',
          alt: 'Image alt text',
          defaultSrc: imgXlg4x3,
          tagGroup: false,
          cta: false,
          ctaCopy: 'Sign up for the trial',
          outlinedCard: 'true',
        },
      },
    },
  },
};

export const Logo = (args) => {
  const { alt, defaultSrc, eyebrow, heading, href, copy, tagGroup } =
    args?.Card ?? {};
  return html`
    <dds-card border logo href=${ifDefined(href || undefined)}>
      <dds-image-logo
        slot="image"
        alt="${ifDefined(alt)}"
        default-src="${ifDefined(defaultSrc)}"></dds-image-logo>
      ${eyebrow ? html` <dds-card-eyebrow>${eyebrow}</dds-card-eyebrow> ` : ``}
      ${heading ? html` <dds-card-heading>${heading}</dds-card-heading> ` : ``}
      ${copy ? html` <p>${copy}</p> ` : ``}
      ${tagGroup ? html` ${tagGroupContent} ` : ``}

      <dds-card-footer></dds-card-footer>
    </dds-card>
  `;
};

Logo.story = {
  parameters: {
    ...readme.parameters,
    knobs: {
      Card: () => ({
        alt: 'Image alt text',
        defaultSrc: logoMicrosoft2x1,
        tagGroup: boolean('Add tags', true, 'logo'),
        eyebrow: textNullable('Card Eyebrow:', 'Microsoft', 'logo'),
        heading: textNullable('Card Heading (optional):', '', 'logo'),
        copy: textNullable(
          'Card body copy:',
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          'logo'
        ),
        href: 'https://example.com',
      }),
    },
    propsSet: {
      default: {
        Card: {
          image: false,
          eyebrow: 'Microsoft',
          heading: '',
          copy: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          alt: 'Image alt text',
          defaultSrc: imgXlg4x3,
          tagGroup: false,
          href: 'https://example.com',
        },
      },
    },
  },
};

export default {
  title: 'Components/Card',
  decorators: [
    (story) => html`
      <div class="bx--grid">
        <div class="bx--row">
          <div
            class="bx--col-sm-4 bx--col-md-3 bx--col-lg-6 bx--col-xlg-4 bx--no-gutter">
            ${story()}
          </div>
        </div>
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    hasStoryPadding: true,
  },
};
