/**
 * @license
 *
 * Copyright IBM Corp. 2020
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
import styles from './leadspace.stories.scss';
import '../leadspace';
import '../leadspace-centered';
import '../../image/image';
import '../../button-group/button-group';
import '../../button-group/button-group-item';
import textNullable from '../../../../.storybook/knob-text-nullable';
import readme from './README.stories.mdx';

export const DefaultWithNoImage = ({ parameters }) => {
  const { alt, defaultSrc, theme, gradient, title, copy, buttons } = parameters?.props?.LeadSpace ?? {};
  return html`
    <dds-leadspace
      theme="${ifNonNull(theme)}"
      gradient="${ifNonNull(gradient)}"
      alt="${ifNonNull(alt)}"
      default-src="${ifNonNull(defaultSrc)}"
    >
      <span slot="title">${ifNonNull(title)}</span>
      <span slot="copy">${ifNonNull(copy)}</span>
      <dds-button-group slot="buttons">
        ${buttons.map(
          elem => html`
            <dds-button-group-item href="${elem.href}">${elem.copy}${elem.renderIcon}</dds-button-group-item>
          `
        )}
      </dds-button-group>
    </dds-leadspace>
  `;
};

export const DefaultWithImage = ({ parameters }) => {
  const { alt, defaultSrc, theme, gradient, title, copy, buttons } = parameters?.props?.LeadSpace ?? {};
  return html`
    <dds-leadspace
      theme="${ifNonNull(theme)}"
      gradient="${ifNonNull(gradient)}"
      alt="${ifNonNull(alt)}"
      default-src="${ifNonNull(defaultSrc)}"
    >
      <span slot="title">${ifNonNull(title)}</span>
      <span slot="copy">${ifNonNull(copy)}</span>
      <dds-button-group slot="buttons">
        ${buttons.map(
          elem => html`
            <dds-button-group-item href="${elem.href}">${elem.copy}${elem.renderIcon}</dds-button-group-item>
          `
        )}
      </dds-button-group>
      <dds-image slot="image" class="bx--image" alt="${ifNonNull(alt)}" default-src="https://picsum.photos/id/1076/1056/480">
        <dds-image-item media="(min-width: 672px)" srcset="https://picsum.photos/id/1076/672/400"></dds-image-item>
        <dds-image-item media="(min-width: 0)" srcset="https://picsum.photos/id/1076/320/370"></dds-image-item>
      </dds-image>
    </dds-leadspace>
  `;
};

export const Centered = ({ parameters }) => {
  const { theme, gradient, title, copy, buttons } = parameters?.props?.LeadSpace ?? {};
  return html`
    <dds-leadspace-centered theme="${ifNonNull(theme)}" gradient="${ifNonNull(gradient)}" type="centered">
      <span slot="title">${ifNonNull(title)}</span>
      <span slot="copy">${ifNonNull(copy)}</span>
      <dds-button-group slot="buttons">
        ${buttons.map(
          elem => html`
            <dds-button-group-item href="${elem.href}">${elem.copy}${elem.renderIcon}</dds-button-group-item>
          `
        )}
      </dds-button-group>
    </dds-leadspace-centered>
  `;
};

export const CenteredWithImage = ({ parameters }) => {
  const { alt, defaultSrc, theme, gradient, title, copy, buttons } = parameters?.props?.LeadSpace ?? {};
  return html`
    <dds-leadspace-centered
      theme="${ifNonNull(theme)}"
      gradient="${ifNonNull(gradient)}"
      alt="${ifNonNull(alt)}"
      default-src="${ifNonNull(defaultSrc)}"
      type="centered"
    >
      <span slot="title">${ifNonNull(title)}</span>
      <span slot="copy">${ifNonNull(copy)}</span>
      <dds-button-group slot="buttons">
        ${buttons.map(
          elem => html`
            <dds-button-group-item href="${elem.href}">${elem.copy}${elem.renderIcon}</dds-button-group-item>
          `
        )}
      </dds-button-group>
      <dds-image slot="image" class="bx--image" alt="${ifNonNull(alt)}" default-src="https://picsum.photos/id/1076/1056/480">
        <dds-image-item media="(min-width: 672px)" srcset="https://picsum.photos/id/1076/672/400"></dds-image-item>
        <dds-image-item media="(min-width: 0)" srcset="https://picsum.photos/id/1076/320/370"></dds-image-item>
      </dds-image>
    </dds-leadspace-centered>
  `;
};

export const Small = ({ parameters }) => {
  const { alt, defaultSrc, theme, gradient, title, copy, buttons } = parameters?.props?.LeadSpace ?? {};
  return html`
    <dds-leadspace
      theme="${ifNonNull(theme)}"
      gradient="${ifNonNull(gradient)}"
      alt="${ifNonNull(alt)}"
      default-src="${ifNonNull(defaultSrc)}"
      type="small"
    >
      <span slot="title">${ifNonNull(title)}</span>
      <span slot="copy">${ifNonNull(copy)}</span>
      <dds-button-group slot="buttons">
        ${buttons.map(
          elem => html`
            <dds-button-group-item href="${elem.href}">${elem.copy}${elem.renderIcon}</dds-button-group-item>
          `
        )}
      </dds-button-group>
    </dds-leadspace>
  `;
};

export const SmallWithImage = ({ parameters }) => {
  const { alt, defaultSrc, theme, gradient, title, copy, buttons } = parameters?.props?.LeadSpace ?? {};
  return html`
    <dds-leadspace
      theme="${ifNonNull(theme)}"
      gradient="${ifNonNull(gradient)}"
      alt="${ifNonNull(alt)}"
      default-src="${ifNonNull(defaultSrc)}"
      type="small"
    >
      <span slot="title">${ifNonNull(title)}</span>
      <span slot="copy">${ifNonNull(copy)}</span>
      <dds-button-group slot="buttons">
        ${buttons.map(
          elem => html`
            <dds-button-group-item href="${elem.href}">${elem.copy}${elem.renderIcon}</dds-button-group-item>
          `
        )}
      </dds-button-group>
      <dds-image slot="image" class="bx--image" alt="${ifNonNull(alt)}" default-src="https://picsum.photos/id/1076/1056/480">
        <dds-image-item media="(min-width: 672px)" srcset="https://picsum.photos/id/1076/672/400"></dds-image-item>
        <dds-image-item media="(min-width: 0)" srcset="https://picsum.photos/id/1076/320/370"></dds-image-item>
      </dds-image>
    </dds-leadspace>
  `;
};

const themes = {
  white: 'white',
  g100: 'g100',
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
      <style>
        ${styles}
      </style>
      <div class="bx--grid bx--no-gutter" style="width: 100%">
        ${story()}
      </div>
    `,
  ],
  parameters: {
    ...readme.parameters,
    knobs: {
      LeadSpace: ({ groupId }) => ({
        theme: select('theme (theme):', themes, themes.white, groupId),
        title: text('title (title):', 'Lead space title', groupId),
        copy: text('copy (copy):', 'Use this area for a short line of copy to support the title', groupId),
        gradient: boolean('gradient overlay (gradient)', true, groupId),
        buttons: Array.from({
          length: number('Number of buttons', 2, {}, groupId),
        }).map((_, i) => ({
          href: textNullable(`Link ${i + 1}`, `https://example.com`, groupId),
          copy: text(`Button ${i + 1}`, `Button ${i + 1}`, groupId),
          renderIcon: iconMap[select(`Icon ${i + 1}`, iconOptions, iconOptions['Arrow Right'], groupId) ?? 0],
        })),
        image: [
          {
            src: 'https://dummyimage.com/320x160/ee5396/161616&text=2x1',
            breakpoint: 'sm',
          },
          {
            src: 'https://dummyimage.com/400x200/ee5396/161616&text=2x1',
            breakpoint: 'md',
          },
          {
            src: 'https://dummyimage.com/672x336/ee5396/161616&text=2x1',
            breakpoint: 'lg',
          },
        ],
        alt: text('Image alt text (alt):', 'Image alt text', groupId),
        defaultSrc: text('Default image (defaultSrc):', 'https://dummyimage.com/1056x480/ee5396/ee5396', groupId),
      }),
    },
  },
};
