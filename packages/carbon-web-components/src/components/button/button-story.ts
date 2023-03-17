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
import { boolean, select, text } from '@storybook/addon-knobs';
// Below path will be there when an application installs `carbon-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import Add16 from '@carbon/web-components/es/icons/add/16';
import { prefix } from '../../globals/settings';
import {
  BUTTON_TYPE,
  BUTTON_SIZE,
  BUTTON_TOOLTIP_ALIGNMENT,
  BUTTON_TOOLTIP_POSITION,
} from './button';
import './button-skeleton';
import textNullable from '../../../.storybook/knob-text-nullable';
import storyDocs from './button-story.mdx';
import { ifDefined } from 'lit/directives/if-defined';

const types = {
  [`Primary button (${BUTTON_TYPE.PRIMARY})`]: BUTTON_TYPE.PRIMARY,
  [`Secondary button (${BUTTON_TYPE.SECONDARY})`]: BUTTON_TYPE.SECONDARY,
  [`Tertiary button (${BUTTON_TYPE.TERTIARY})`]: BUTTON_TYPE.TERTIARY,
  [`Danger button (${BUTTON_TYPE.DANGER})`]: BUTTON_TYPE.DANGER,
  [`Danger tertiary button (${BUTTON_TYPE.DANGER_TERTIARY})`]:
    BUTTON_TYPE.DANGER_TERTIARY,
  [`Danger ghost button (${BUTTON_TYPE.DANGER_GHOST})`]:
    BUTTON_TYPE.DANGER_GHOST,
  [`Ghost button (${BUTTON_TYPE.GHOST})`]: BUTTON_TYPE.GHOST,
};

const alignmentOptions = {
  ['Start']: BUTTON_TOOLTIP_ALIGNMENT.START,
  ['Center']: BUTTON_TOOLTIP_ALIGNMENT.CENTER,
  ['End']: BUTTON_TOOLTIP_ALIGNMENT.END,
};

const positionOptions = {
  ['Top']: BUTTON_TOOLTIP_POSITION.TOP,
  ['Right']: BUTTON_TOOLTIP_POSITION.RIGHT,
  ['Bottom']: BUTTON_TOOLTIP_POSITION.BOTTOM,
  ['Left']: BUTTON_TOOLTIP_POSITION.LEFT,
};

const sizes = {
  [`Small size (${BUTTON_SIZE.SMALL})`]: BUTTON_SIZE.SMALL,
  [`Medium size (${BUTTON_SIZE.MEDIUM})`]: BUTTON_SIZE.MEDIUM,
  [`Large size (${BUTTON_SIZE.LARGE})`]: BUTTON_SIZE.LARGE,
  [`XL size (${BUTTON_SIZE.EXTRA_LARGE})`]: BUTTON_SIZE.EXTRA_LARGE,
  [`2XL size (${BUTTON_SIZE.EXTRA_EXTRA_LARGE})`]:
    BUTTON_SIZE.EXTRA_EXTRA_LARGE,
};

export const Default = (args) => {
  const {
    disabled,
    href,
    size,
    tooltipAlignment,
    tooltipPosition,
    tooltipText,
    type,
    onClick,
  } = args?.[`${prefix}-btn`] ?? {};

  return html`
    <cds-btn
      type="${ifDefined(type)}"
      ?disabled="${disabled}"
      href="${ifDefined(href)}"
      size="${ifDefined(size)}"
      @click=${onClick}
      tooltip-text="${tooltipText}"
      tooltip-alignment="${tooltipAlignment}"
      tooltip-position="${tooltipPosition}">
      Button
    </cds-btn>
  `;
};

export const Danger = (args) => {
  const {
    disabled,
    href,
    size,
    tooltipAlignment,
    tooltipPosition,
    tooltipText,
    onClick,
  } = args?.[`${prefix}-btn`] ?? {};
  return html`
    <cds-btn
      type="danger"
      ?disabled="${disabled}"
      href="${ifDefined(href)}"
      size="${ifDefined(size)}"
      @click=${onClick}
      tooltip-text="${tooltipText}"
      tooltip-alignment="${tooltipAlignment}"
      tooltip-position="${tooltipPosition}">
      Button
    </cds-btn>
    <cds-btn
      type="danger--tertiary"
      ?disabled="${disabled}"
      href="${ifDefined(href)}"
      size="${ifDefined(size)}"
      @click=${onClick}
      tooltip-text="${tooltipText}"
      tooltip-alignment="${tooltipAlignment}"
      tooltip-position="${tooltipPosition}">
      Tertiary Danger Button
    </cds-btn>
    <cds-btn
      type="danger--ghost"
      ?disabled="${disabled}"
      href="${ifDefined(href)}"
      size="${ifDefined(size)}"
      @click=${onClick}
      tooltip-text="${tooltipText}"
      tooltip-alignment="${tooltipAlignment}"
      tooltip-position="${tooltipPosition}">
      Ghost Danger Button
    </cds-btn>
  `;
};

export const Ghost = (args) => {
  const {
    disabled,
    href,
    size,
    tooltipAlignment,
    tooltipPosition,
    tooltipText,
    onClick,
  } = args?.[`${prefix}-btn`] ?? {};
  return html`
    <cds-btn
      type="ghost"
      ?disabled="${disabled}"
      href="${ifDefined(href)}"
      size="${ifDefined(size)}"
      @click=${onClick}
      tooltip-text="${tooltipText}"
      tooltip-alignment="${tooltipAlignment}"
      tooltip-position="${tooltipPosition}">
      Ghost
    </cds-btn>
  `;
};

export const IconButton = (args) => {
  const {
    disabled,
    href,
    size,
    tooltipAlignment,
    tooltipPosition,
    tooltipText,
    type,
    onClick,
  } = args?.[`${prefix}-btn`] ?? {};
  return html`
    <cds-btn
      ?disabled="${disabled}"
      href="${ifDefined(href)}"
      type="${ifDefined(type)}"
      size="${ifDefined(size)}"
      @click=${onClick}
      tooltip-text="${tooltipText}"
      tooltip-alignment="${tooltipAlignment}"
      tooltip-position="${tooltipPosition}">
      ${Add16({ slot: 'icon' })}
    </cds-btn>
  `;
};

IconButton.parameters = {
  knobs: {
    [`${prefix}-btn`]: () => ({
      type: select('Button type (type)', types, BUTTON_TYPE.PRIMARY),
      tooltipAlignment: select(
        'Tooltip alignment',
        alignmentOptions,
        BUTTON_TOOLTIP_ALIGNMENT.CENTER
      ),
      tooltipPosition: select(
        'Tooltip position',
        positionOptions,
        BUTTON_TOOLTIP_POSITION.TOP
      ),
      tooltipText: text('Tooltip text', 'Icon description'),
      disabled: boolean('Disabled (disabled)', false),
      size: select('Button size (size)', sizes, null),
      href: textNullable('Link href (href)', ''),
      onClick: action('click'),
    }),
  },
};

export const Secondary = (args) => {
  const {
    disabled,
    href,
    size,
    tooltipAlignment,
    tooltipPosition,
    tooltipText,
    onClick,
  } = args?.[`${prefix}-btn`] ?? {};
  return html`
    <cds-btn
      type="secondary"
      ?disabled="${disabled}"
      href="${ifDefined(href)}"
      size="${ifDefined(size)}"
      @click=${onClick}
      tooltip-text="${tooltipText}"
      tooltip-alignment="${tooltipAlignment}"
      tooltip-position="${tooltipPosition}">
      Button
    </cds-btn>
  `;
};

export const SetOfButtons = (args) => {
  const {
    disabled,
    href,
    size,
    tooltipAlignment,
    tooltipPosition,
    tooltipText,
    onClick,
  } = args?.[`${prefix}-btn`] ?? {};
  return html`
    <cds-btn-set>
      <cds-btn
        type="secondary"
        ?disabled="${disabled}"
        href="${ifDefined(href)}"
        size="${ifDefined(size)}"
        @click=${onClick}
        tooltip-text="${tooltipText}"
        tooltip-alignment="${tooltipAlignment}"
        tooltip-position="${tooltipPosition}">
        Secondary button
      </cds-btn>
      <cds-btn
        type="primary"
        ?disabled="${disabled}"
        href="${ifDefined(href)}"
        size="${ifDefined(size)}"
        @click=${onClick}
        tooltip-text="${tooltipText}"
        tooltip-alignment="${tooltipAlignment}"
        tooltip-position="${tooltipPosition}">
        Primary button
      </cds-btn>
    </cds-btn-set>
  `;
};

export const skeleton = () => {
  return html` <cds-btn-skeleton> </cds-btn-skeleton> `;
};

export const Tertiary = (args) => {
  const {
    disabled,
    href,
    size,
    tooltipAlignment,
    tooltipPosition,
    tooltipText,
    onClick,
  } = args?.[`${prefix}-btn`] ?? {};
  return html`
    <cds-btn
      type="tertiary"
      ?disabled="${disabled}"
      href="${ifDefined(href)}"
      size="${ifDefined(size)}"
      @click=${onClick}
      tooltip-text="${tooltipText}"
      tooltip-alignment="${tooltipAlignment}"
      tooltip-position="${tooltipPosition}">
      Button
    </cds-btn>
  `;
};

export default {
  title: 'Components/Button',
  parameters: {
    ...storyDocs.parameters,
    knobs: {
      [`${prefix}-btn`]: () => ({
        type: select('Button type (type)', types, BUTTON_TYPE.PRIMARY),
        tooltipAlignment: select(
          'Tooltip alignment',
          alignmentOptions,
          BUTTON_TOOLTIP_ALIGNMENT.CENTER
        ),
        tooltipPosition: select(
          'Tooltip position',
          positionOptions,
          BUTTON_TOOLTIP_POSITION.TOP
        ),
        tooltipText: text('Tooltip text', ''),
        disabled: boolean('Disabled (disabled)', false),
        size: select('Button size (size)', sizes, null),
        href: textNullable('Link href (href)', ''),
        onClick: action('click'),
      }),
    },
  },
};
