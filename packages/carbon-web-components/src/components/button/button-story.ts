/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import { ifDefined } from 'lit/directives/if-defined.js';
// Below path will be there when an application installs `carbon-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import Add16 from '@carbon/web-components/es/icons/add/16';
import { prefix } from '../../globals/settings';
import { BUTTON_KIND, BUTTON_SIZE, BUTTON_ICON_LAYOUT } from './button';
import './button-skeleton';
import textNullable from '../../../.storybook/knob-text-nullable';
import storyDocs from './button-story.mdx';

const kinds = {
  [`Primary button (${BUTTON_KIND.PRIMARY})`]: BUTTON_KIND.PRIMARY,
  [`Secondary button (${BUTTON_KIND.SECONDARY})`]: BUTTON_KIND.SECONDARY,
  [`Tertiary button (${BUTTON_KIND.TERTIARY})`]: BUTTON_KIND.TERTIARY,
  [`Danger button (${BUTTON_KIND.DANGER})`]: BUTTON_KIND.DANGER,
  [`Danger tertiary button (${BUTTON_KIND.DANGER_TERTIARY})`]:
    BUTTON_KIND.DANGER_TERTIARY,
  [`Danger ghost button (${BUTTON_KIND.DANGER_GHOST})`]:
    BUTTON_KIND.DANGER_GHOST,
  [`Ghost button (${BUTTON_KIND.GHOST})`]: BUTTON_KIND.GHOST,
};

const sizes = {
  'Regular size': null,
  [`Small size (${BUTTON_SIZE.SMALL})`]: BUTTON_SIZE.SMALL,
  [`XL size (${BUTTON_SIZE.EXTRA_LARGE})`]: BUTTON_SIZE.EXTRA_LARGE,
  [`Size for form field (${BUTTON_SIZE.FIELD})`]: BUTTON_SIZE.FIELD,
};

const iconLayouts = {
  Regular: null,
  [`Condensed (${BUTTON_ICON_LAYOUT.CONDENSED})`]: BUTTON_ICON_LAYOUT.CONDENSED,
};

export const Default = (args) => {
  const { onClick } = args?.[`${prefix}-btn`] ?? {};
  return html` <cds-btn @click=${onClick}> Button </cds-btn> `;
};

export const Danger = (args) => {
  const { onClick } = args?.[`${prefix}-btn`] ?? {};
  return html`
    <cds-btn kind="danger" @click=${onClick}> Button </cds-btn>
    <cds-btn kind="danger--tertiary" @click=${onClick}>
      Tertiary Danger Button
    </cds-btn>
    <cds-btn kind="danger--ghost" @click=${onClick}>
      Ghost Danger Button
    </cds-btn>
  `;
};

export const Ghost = (args) => {
  const { onClick } = args?.[`${prefix}-btn`] ?? {};
  return html` <cds-btn kind="ghost" @click=${onClick}> Ghost </cds-btn> `;
};

Default.parameters = {
  knobs: {
    [`${prefix}-btn`]: () => ({
      kind: select('Button kind (kind)', kinds, BUTTON_KIND.PRIMARY),
      disabled: boolean('Disabled (disabled)', false),
      size: select('Button size (size)', sizes, null),
      href: textNullable('Link href (href)', ''),
      onClick: action('click'),
      isExpressive: boolean('expressive (isExpressive)', false),
    }),
  },
};

export const IconButton = (args) => {
  const { onClick } = args?.[`${prefix}-btn`] ?? {};
  return html`
    <cds-btn @click=${onClick}> ${Add16({ slot: 'icon' })} </cds-btn>
  `;
};

export const Secondary = (args) => {
  const { onClick } = args?.[`${prefix}-btn`] ?? {};
  return html` <cds-btn kind="secondary" @click=${onClick}> Button </cds-btn> `;
};

export const SetOfButtons = (args) => {
  const { onClick } = args?.[`${prefix}-btn`] ?? {};

  // maybe just link to Carbon for IBM.com Button Group??
  return html`
    <cds-btn kind="secondary" @click=${onClick}> Secondary button </cds-btn>
    <cds-btn kind="primary" @click=${onClick}> Secondary button </cds-btn>
  `;
};

export const skeleton = () => {
  return html` <cds-btn-skeleton> </cds-btn-skeleton> `;
};

export const Tertiary = (args) => {
  const { onClick } = args?.[`${prefix}-btn`] ?? {};
  return html` <cds-btn kind="tertiary" @click=${onClick}> Button </cds-btn> `;
};

export default {
  title: 'Components/Button',
  parameters: {
    ...storyDocs.parameters,
  },
};
