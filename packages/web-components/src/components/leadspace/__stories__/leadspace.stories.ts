/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { text, select, boolean, number } from '@storybook/addon-knobs';
import { html } from 'lit-element';
import ArrowRight20 from 'carbon-web-components/es/icons/arrow--right/20.js';
import ArrowDown20 from 'carbon-web-components/es/icons/arrow--down/20.js';
import Pdf20 from 'carbon-web-components/es/icons/PDF/20.js';
import ifNonNull from 'carbon-web-components/es/globals/directives/if-non-null.js';
/* eslint-disable import/no-duplicates */
import { LEADSPACE_GRADIENT_STYLE_SCHEME } from '../leadspace';

// Above import is interface-only ref and thus code won't be brought into the build
import '../leadspace';
/* eslint-enable import/no-duplicates */
import '../leadspace-heading';

import '../../image/image';
import '../../button-group/button-group';
import '../../button-group/button-group-item';
import textNullable from '../../../../.storybook/knob-text-nullable';
import readme from './README.stories.mdx';

import leadspaceImg from '../../../../../storybook-images/assets/leadspace/fpo--leadspace--1584x560--002.jpg';
import { LEADSPACE_SIZE } from '../defs';

const gradientStyleSchemes = {
  [`Without gradient (${LEADSPACE_GRADIENT_STYLE_SCHEME.NONE})`]: LEADSPACE_GRADIENT_STYLE_SCHEME.NONE,
  [`With gradient (${LEADSPACE_GRADIENT_STYLE_SCHEME.WITH_GRADIENT})`]: LEADSPACE_GRADIENT_STYLE_SCHEME.WITH_GRADIENT,
};

const sizes = {
  [`Tall`]: LEADSPACE_SIZE.NONE,
  [`Medium`]: LEADSPACE_SIZE.MEDIUM,
};

export const DefaultWithNoImage = ({ parameters }) => {
  const { alt, defaultSrc, title, copy, buttons, size } = parameters?.props?.LeadSpace ?? {};
  return html`
    <dds-leadspace size="${size}" alt="${ifNonNull(alt)}" default-src="${ifNonNull(defaultSrc)}">
      <dds-leadspace-heading>${ifNonNull(title)}</dds-leadspace-heading>
      ${ifNonNull(copy)}
      <dds-button-group slot="action">
        ${buttons.map(elem => {
          return html`
            <dds-button-group-item aria-label="${elem.label}" href="${elem.href}"
              >${elem.copy}${elem.renderIcon}</dds-button-group-item
            >
          `;
        })}
      </dds-button-group>
    </dds-leadspace>
  `;
};

export const DefaultWithImage = ({ parameters }) => {
  const { alt, defaultSrc, gradientStyleScheme, title, copy, buttons, size } = parameters?.props?.LeadSpace ?? {};
  return html`
    <dds-leadspace
      size="${size}"
      gradient-style-scheme="${ifNonNull(gradientStyleScheme)}"
      alt="${ifNonNull(alt)}"
      default-src="${ifNonNull(defaultSrc)}"
    >
      <dds-leadspace-heading>${ifNonNull(title)}</dds-leadspace-heading>
      ${ifNonNull(copy)}
      <dds-button-group slot="action">
        ${buttons.map(elem => {
          return html`
            <dds-button-group-item aria-label="${elem.label}" href="${elem.href}"
              >${elem.copy}${elem.renderIcon}</dds-button-group-item
            >
          `;
        })}
      </dds-button-group>
      <dds-image slot="image" class="bx--image" alt="${ifNonNull(alt)}" default-src="${leadspaceImg}">
        <dds-image-item media="(min-width: 672px)" srcset="${leadspaceImg}"></dds-image-item>
        <dds-image-item media="(min-width: 0)" srcset="${leadspaceImg}"></dds-image-item>
      </dds-image>
    </dds-leadspace>
  `;
};

export const Centered = ({ parameters }) => {
  const { title, copy, buttons, size } = parameters?.props?.LeadSpace ?? {};
  return html`
    <dds-leadspace size="${size}" type="centered">
      <dds-leadspace-heading>${ifNonNull(title)}</dds-leadspace-heading>
      ${ifNonNull(copy)}
      <dds-button-group slot="action">
        ${buttons.map(elem => {
          return html`
            <dds-button-group-item aria-label="${elem.label}" href="${elem.href}"
              >${elem.copy}${elem.renderIcon}</dds-button-group-item
            >
          `;
        })}
      </dds-button-group>
    </dds-leadspace>
  `;
};

export const CenteredWithImage = ({ parameters }) => {
  const { alt, defaultSrc, gradient, title, copy, buttons, size } = parameters?.props?.LeadSpace ?? {};
  return html`
    <dds-leadspace
      size="${size}"
      ?gradient="${ifNonNull(gradient)}"
      alt="${ifNonNull(alt)}"
      default-src="${ifNonNull(defaultSrc)}"
      type="centered"
    >
      <dds-leadspace-heading>${ifNonNull(title)}</dds-leadspace-heading>
      ${ifNonNull(copy)}
      <dds-button-group slot="action">
        ${buttons.map(elem => {
          return html`
            <dds-button-group-item aria-label="${elem.label}" href="${elem.href}"
              >${elem.copy}${elem.renderIcon}</dds-button-group-item
            >
          `;
        })}
      </dds-button-group>
      <dds-image slot="image" class="bx--image" alt="${ifNonNull(alt)}" default-src="${leadspaceImg}">
        <dds-image-item media="(min-width: 672px)" srcset="${leadspaceImg}"></dds-image-item>
        <dds-image-item media="(min-width: 0)" srcset="${leadspaceImg}"></dds-image-item>
      </dds-image>
    </dds-leadspace>
  `;
};

export const Small = ({ parameters }) => {
  const { alt, defaultSrc, title, copy, buttons, size } = parameters?.props?.LeadSpace ?? {};
  return html`
    <dds-leadspace size="${size}" alt="${ifNonNull(alt)}" default-src="${ifNonNull(defaultSrc)}" type="small">
      <dds-leadspace-heading>${ifNonNull(title)}</dds-leadspace-heading>
      ${ifNonNull(copy)}
      <dds-button-group slot="action">
        ${buttons.map(elem => {
          return html`
            <dds-button-group-item aria-label="${elem.label}" href="${elem.href}"
              >${elem.copy}${elem.renderIcon}</dds-button-group-item
            >
          `;
        })}
      </dds-button-group>
    </dds-leadspace>
  `;
};

export const SmallWithImage = ({ parameters }) => {
  const { alt, defaultSrc, gradient, title, copy, buttons, size } = parameters?.props?.LeadSpace ?? {};
  return html`
    <dds-leadspace
      size="${size}"
      ?gradient="${ifNonNull(gradient)}"
      alt="${ifNonNull(alt)}"
      default-src="${ifNonNull(defaultSrc)}"
      type="small"
    >
      <dds-leadspace-heading>${ifNonNull(title)}</dds-leadspace-heading>
      ${ifNonNull(copy)}
      <dds-button-group slot="action">
        ${buttons.map(elem => {
          return html`
            <dds-button-group-item aria-label="${elem.label}" href="${elem.href}"
              >${elem.copy}${elem.renderIcon}</dds-button-group-item
            >
          `;
        })}
      </dds-button-group>
      <dds-image slot="image" class="bx--image" alt="${ifNonNull(alt)}" default-src="${leadspaceImg}">
        <dds-image-item media="(min-width: 672px)" srcset="${leadspaceImg}"></dds-image-item>
        <dds-image-item media="(min-width: 0)" srcset="${leadspaceImg}"></dds-image-item>
      </dds-image>
    </dds-leadspace>
  `;
};

const getAriaLabel = type => {
  switch (type) {
    case 'ArrowDown20':
      return 'anchor link';
    case 'Pdf20':
      return 'pdf link';
    default:
      return '';
  }
};

const iconMap = {
  ArrowRight20: ArrowRight20({ slot: 'icon' }),
  ArrowDown20: ArrowDown20({ slot: 'icon' }),
  Pdf20: Pdf20({ slot: 'icon' }),
};

const iconOptions = {
  None: null,
  'Arrow Right': 'ArrowRight20',
  'Arrow Down': 'ArrowDown20',
  PDF: 'Pdf20',
};

export default {
  title: 'Components/LeadSpace',
  decorators: [
    story => html`
      <div class="bx--grid bx--no-gutter dds-ce-demo-devenv--grid--stretch">
        ${story()}
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    'carbon-theme': { preventReload: true },
    hasGrid: true,
    hasVerticalSpacingInComponent: true,
    knobs: {
      LeadSpace: ({ groupId }) => ({
        title: text('title (title):', 'Lead space title', groupId),
        copy: text('copy (copy):', 'Use this area for a short line of copy to support the title', groupId),
        gradient: boolean('gradient overlay (gradient)', true, groupId),
        gradientStyleScheme: select(
          'Gradient style scheme (gradient-style-scheme)',
          gradientStyleSchemes,
          LEADSPACE_GRADIENT_STYLE_SCHEME.WITH_GRADIENT,
          groupId
        ),
        buttons: Array.from({
          length: number('Number of buttons', 2, {}, groupId),
        }).map((_, i) => {
          const icon = select(`Icon ${i + 1}`, iconOptions, iconOptions['Arrow Right'], groupId) ?? 0;
          return {
            href: textNullable(`Link ${i + 1}`, `https://example.com`, groupId),
            copy: text(`Button ${i + 1}`, `Button ${i + 1}`, groupId),
            renderIcon: iconMap[icon],
            label: getAriaLabel(icon),
          };
        }),
        image: [
          {
            src: leadspaceImg,
            breakpoint: 'sm',
          },
          {
            src: leadspaceImg,
            breakpoint: 'md',
          },
          {
            src: leadspaceImg,
            breakpoint: 'lg',
          },
        ],
        alt: text('Image alt text (alt):', 'Image alt text', groupId),
        defaultSrc: text('Default image (defaultSrc):', leadspaceImg, groupId),
        size: select('Size', sizes, LEADSPACE_SIZE.NONE, groupId),
      }),
    },
  },
};
