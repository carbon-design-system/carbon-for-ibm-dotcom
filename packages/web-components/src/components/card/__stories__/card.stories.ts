/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '../../image/image';
import '../../tag-group/tag-group';
import '@carbon/web-components/es/components/tag/tag.js';
import '../index';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20';
import { html } from 'lit-element';
import ifNonNull from '@carbon/web-components/es/globals/directives/if-non-null.js';
import imgXlg4x3 from '../../../../../storybook-images/assets/1312/fpo--4x3--1312x984--003.jpg';
import logoMicrosoft2x1 from '../../../../../storybook-images/assets/logos/logo-microsoft--2x1.png';
import { PICTOGRAM_PLACEMENT } from '../defs';
import readme from './README.stories.mdx';

const cardStylesList = ['Outlined card', 'Inverse card', 'none'];

const tagGroupContent = html`
  <dds-tag-group>
    <bx-tag> Most popular </bx-tag>
    <bx-tag type="purple"> Enterprise </bx-tag>
  </dds-tag-group>
`;

export const Default = args => {
  const { image, alt, heading, eyebrow, tagGroup, copy, footer, cardStyles } = args;
  /* eslint-disable no-nested-ternary */
  return html`
    <dds-card
      color-scheme=${cardStyles === 'Inverse card'
        ? 'inverse'
        : cardStyles === 'Outlined card'
        ? 'light'
        : ''}
      ?border=${cardStyles === 'Outlined card'}
      href=${'https://example.com' || undefined}
    >
      ${image
        ? html`
            <dds-image slot="image" alt="${ifNonNull(alt)}" default-src="${imgXlg4x3}"></dds-image>
          `
        : ``}
      <dds-card-eyebrow>${eyebrow}</dds-card-eyebrow>
      <dds-card-heading>${heading}</dds-card-heading>
      ${copy
        ? html`
            ${copy}
          `
        : ``}
      ${tagGroup
        ? html`
            ${tagGroupContent}
          `
        : ``}
      <dds-card-footer>
        ${footer}${ArrowRight20({ slot: 'icon' })}
      </dds-card-footer>
    </dds-card>
  `;
};

Default.story = {
  argTypes: {
    image: {
      control: 'boolean',
    },
    eyebrow: {
      control: { type: 'text' },
      defaultValue: 'Industry',
    },
    heading: {
      control: { type: 'text' },
      defaultValue: 'Aerospace and defence',
    },
    copy: {
      control: { type: 'text' },
      defaultValue: '',
    },
    alt: {
      control: { type: 'text' },
      defaultValue: 'Image alt text',
    },
    tagGroup: {
      control: 'boolean',
    },
    footer: {
      control: { type: 'text' },
      defaultValue: 'Learn more',
    },
    cardStyles: {
      options: cardStylesList,
      control: { type: 'select' },
      defaultValue: 'none',
    },
    pictogramPlacement: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    ...readme.parameters,
    propsSet: {
      default: {
        Card: {
          image: false,
          eyebrow: 'Industry',
          heading: 'Aerospace and defence',
          copy: '',
          alt: 'Image alt text',
          tagGroup: false,
          footer: 'Learn more',
          cardStyles: 'none',
        },
      },
    },
  },
};

const pictogramPlacements = {
  [PICTOGRAM_PLACEMENT.TOP]: PICTOGRAM_PLACEMENT.TOP,
  [PICTOGRAM_PLACEMENT.BOTTOM]: PICTOGRAM_PLACEMENT.BOTTOM,
};

export const Pictogram = args => {
  const { heading, copy, tagGroup, pictogramPlacement, cardStyles } = args;
  return html`
    <dds-card
      pictogram-placement="${pictogramPlacement}"
      href=${'https://example.com' || undefined}
      color-scheme=${cardStyles === 'Inverse card' ? 'inverse' : cardStyles === 'Outlined card' ? 'light' : ''}
      ?border=${cardStyles === 'Outlined card'}
    >
      <dds-card-heading>${heading}</dds-card-heading>
      ${copy
        ? html`
            ${copy}
          `
        : ``}
      ${tagGroup
        ? html`
            ${tagGroupContent}
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
  argTypes: {
    pictogramPlacement: {
      options: pictogramPlacements,
      control: { type: 'select' },
      defaultValue: PICTOGRAM_PLACEMENT.TOP,
    },
    copy: {
      control: { type: 'text' },
      defaultValue: `Enjoy full SPSS Statistics capabilities including all add-ons. 
        All trial registrants are restricted to one free trial per computer per user.`,
    },
    heading: {
      control: { type: 'text' },
      defaultValue: 'Free trials',
    },
    cardStyles: {
      options: cardStylesList,
      control: { type: 'select' },
      defaultValue: 'none',
    },
    footer: {
      table: {
        disable: true,
      },
    },
    image: {
      table: {
        disable: true,
      },
    },
    eyebrow: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    ...readme.parameters,
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

export const Static = args => {
  const { image, alt, outlinedCard, eyebrow, heading, copy, tagGroup, cta, ctaCopy } = args;
  return html`
    <dds-card
      color-scheme=${outlinedCard ? 'light' : ''}
      ?border=${outlinedCard}>
      ${image
        ? html`
            <dds-image slot="image" alt="${ifNonNull(alt)}" default-src="${imgXlg4x3}"></dds-image>
          `
        : ``}
      ${eyebrow
        ? html`
            <dds-card-eyebrow>${eyebrow}</dds-card-eyebrow>
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
  argTypes: {
    image: {
      control: 'boolean',
    },
    eyebrow: {
      control: { type: 'text' },
      defaultValue: 'Industry',
    },
    heading: {
      control: { type: 'text' },
      defaultValue: 'Aerospace and defence',
    },
    copy: {
      control: { type: 'text' },
      defaultValue: `Enjoy full SPSS Statistics capabilities including all add-ons. 
        All trial registrants are restricted to one free trial per computer per user.`,
    },
    alt: {
      control: { type: 'text' },
      defaultValue: 'Image alt text',
    },
    tagGroup: {
      control: 'boolean',
    },
    cta: {
      control: 'boolean',
      defaultValue: false,
    },
    ctaCopy: {
      control: { type: 'text' },
      defaultValue: 'Sign up for the trial',
      if: {
        arg: 'cta',
      },
    },
    outlinedCard: {
      control: 'boolean',
      defaultValue: true,
    },
    pictogramPlacement: {
      table: {
        disable: true,
      },
    },
    footer: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    ...readme.parameters,
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

export const Logo = args => {
  const { alt, eyebrow, heading, copy, tagGroup } = args;
  return html`
    <dds-card border logo href="https://example.com">
      <dds-image-logo slot="image" alt="${ifNonNull(alt)}" default-src="${logoMicrosoft2x1}"></dds-image-logo>
      ${eyebrow
        ? html`
            <dds-card-eyebrow>${eyebrow}</dds-card-eyebrow>
          `
        : ``}
      ${heading
        ? html`
            <dds-card-heading>${heading}</dds-card-heading>
          `
        : ``}
      ${copy
        ? html`
            ${copy}
          `
        : ``}
      ${tagGroup
        ? html`
            ${tagGroupContent}
          `
        : ``}
      <dds-card-footer></dds-card-footer>
    </dds-card>
  `;
};

Logo.story = {
  argTypes: {
    tagGroup: {
      control: 'boolean',
    },
    eyebrow: {
      control: { type: 'text' },
      defaultValue: 'Microsoft',
    },
    heading: {
      control: { type: 'text' },
      defaultValue: '',
    },
    copy: {
      control: { type: 'text' },
      defaultValue: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    alt: {
      table: {
        disable: true,
      },
    },
    footer: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    ...readme.parameters,
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
  component: 'dds-card',
  argTypes: {
    hreflang: {
      table: {
        disable: true,
      },
    },
    ping: {
      table: {
        disable: true,
      },
    },
    rel: {
      table: {
        disable: true,
      },
    },
    target: {
      table: {
        disable: true,
      },
    },
    linkRole: {
      table: {
        disable: true,
      },
    },
    styles: {
      table: {
        disable: true,
      },
    },
    'link-role': {
      table: {
        disable: true,
      },
    },
    border: {
      table: {
        disable: true,
      },
    },
    'color-scheme': {
      table: {
        disable: true,
      },
    },
    'pictogram-placement': {
      table: {
        disable: true,
      },
    },
    download: {
      table: {
        disable: true,
      },
    },
    logo: {
      table: {
        disable: true,
      },
    },
    size: {
      table: {
        disable: true,
      },
    },
    type: {
      table: {
        disable: true,
      },
    },
    href: {
      table: {
        disable: true,
      },
    },
    colorScheme: {
      table: {
        disable: true,
      },
    },
    disabled: {
      table: {
        disable: true,
      },
    },
  },
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
