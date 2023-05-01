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
import textNullable from '../../../.storybook/knob-text-nullable';
import { prefix } from '../../globals/settings';
import {
  DROPDOWN_SIZE,
  DROPDOWN_TYPE,
  DROPDOWN_DIRECTION,
} from './multi-select';
import './multi-select-item';
import '../../../.storybook/templates/with-layer';
import storyDocs from './multi-select-story.mdx';

const sizes = {
  [`Small size (${DROPDOWN_SIZE.SMALL})`]: DROPDOWN_SIZE.SMALL,
  [`Medium size (${DROPDOWN_SIZE.MEDIUM})`]: DROPDOWN_SIZE.MEDIUM,
  [`Large size (${DROPDOWN_SIZE.LARGE})`]: DROPDOWN_SIZE.LARGE,
};

const directionOptions = {
  [`Top`]: DROPDOWN_DIRECTION.TOP,
  [`Bottom`]: DROPDOWN_DIRECTION.BOTTOM,
};

const types = {
  Default: null,
  [`Inline (${DROPDOWN_TYPE.INLINE})`]: DROPDOWN_TYPE.INLINE,
};

export const Default = () => {
  return html`
    <cds-multi-select
      title-text="Multiselect title"
      label="Multiselect label"
      helper-text="This is helper text">
      <cds-multi-select-item value="example"
        >An example option that is really long to show what should be done to
        handle long text</cds-multi-select-item
      >
      <cds-multi-select-item value="all">Option 1</cds-multi-select-item>
      <cds-multi-select-item value="cloudFoundry"
        >Option 2</cds-multi-select-item
      >
      <cds-multi-select-item disabled value="staging"
        >Option 3 - a disabled item</cds-multi-select-item
      >
      <cds-multi-select-item value="dea">Option 4</cds-multi-select-item>
      <cds-multi-select-item value="router">Option 5</cds-multi-select-item>
    </cds-multi-select>
  `;
};

Default.decorators = [
  (story) => html` <div style="width:300px">${story()}</div> `,
];

export const Filterable = () => {
  return html`
    <cds-multi-select
      filterable="true"
      title-text="Multiselect title"
      helper-text="This is helper text">
      <cds-multi-select-item value="example"
        >An example option that is really long to show what should be done to
        handle long text</cds-multi-select-item
      >
      <cds-multi-select-item value="all">Option 1</cds-multi-select-item>
      <cds-multi-select-item value="cloudFoundry"
        >Option 2</cds-multi-select-item
      >
      <cds-multi-select-item disabled value="staging"
        >Option 3 - a disabled item</cds-multi-select-item
      >
      <cds-multi-select-item value="dea">Option 4</cds-multi-select-item>
      <cds-multi-select-item value="router">Option 5</cds-multi-select-item>
    </cds-multi-select>
  `;
};

Filterable.decorators = [
  (story) => html` <div style="width:300px">${story()}</div> `,
];

export const FilterableWithLayer = () => {
  return html`
    <sb-template-layers>
      <div style="width:300px">
        <cds-multi-select
          filterable="true"
          title-text="Multiselect title"
          helper-text="This is helper text">
          <cds-multi-select-item value="example"
            >An example option that is really long to show what should be done
            to handle long text</cds-multi-select-item
          >
          <cds-multi-select-item value="all">Option 1</cds-multi-select-item>
          <cds-multi-select-item value="cloudFoundry"
            >Option 2</cds-multi-select-item
          >
          <cds-multi-select-item disabled value="staging"
            >Option 3 - a disabled item</cds-multi-select-item
          >
          <cds-multi-select-item value="dea">Option 4</cds-multi-select-item>
          <cds-multi-select-item value="router">Option 5</cds-multi-select-item>
        </cds-multi-select>
      </div>
    </sb-template-layers>
  `;
};

export const WithInitialSelectedItems = () => {
  return html`
    <cds-multi-select
      title-text="Multiselect title"
      label="Multiselect label"
      helper-text="This is helper text">
      <cds-multi-select-item value="example"
        >An example option that is really long to show what should be done to
        handle long text</cds-multi-select-item
      >
      <cds-multi-select-item selected value="all"
        >Option 1</cds-multi-select-item
      >
      <cds-multi-select-item selected value="cloudFoundry"
        >Option 2</cds-multi-select-item
      >
      <cds-multi-select-item disabled value="staging"
        >Option 3 - a disabled item</cds-multi-select-item
      >
      <cds-multi-select-item value="dea">Option 4</cds-multi-select-item>
      <cds-multi-select-item value="router">Option 5</cds-multi-select-item>
    </cds-multi-select>
  `;
};

WithInitialSelectedItems.decorators = [
  (story) => html` <div style="width:300px">${story()}</div> `,
];

export const WithLayer = () => {
  return html`
    <sb-template-layers>
      <div style="width:300px">
        <cds-multi-select
          title-text="Multiselect title"
          label="Multiselect label"
          helper-text="This is helper text">
          <cds-multi-select-item value="example"
            >An example option that is really long to show what should be done
            to handle long text</cds-multi-select-item
          >
          <cds-multi-select-item value="all">Option 1</cds-multi-select-item>
          <cds-multi-select-item value="cloudFoundry"
            >Option 2</cds-multi-select-item
          >
          <cds-multi-select-item disabled value="staging"
            >Option 3 - a disabled item</cds-multi-select-item
          >
          <cds-multi-select-item value="dea">Option 4</cds-multi-select-item>
          <cds-multi-select-item value="router">Option 5</cds-multi-select-item>
        </cds-multi-select>
      </div>
    </sb-template-layers>
  `;
};

export const Playground = (args) => {
  const {
    clearSelectionLabel,
    direction,
    disabled,
    helperText,
    hideLabel,
    invalid,
    invalidText,
    titleText,
    size,
    toggleLabelClosed,
    toggleLabelOpen,
    label,
    type,
    value,
    warn,
    warnText,
    disableSelection,
    disableToggle,
    onBeforeSelect,
    onBeforeToggle,
    onSelect,
    onToggle,
  } = args?.[`${prefix}-multi-select`] ?? {};
  const handleBeforeSelect = (event: CustomEvent) => {
    if (onBeforeSelect) {
      onBeforeSelect(event);
    }
    if (disableSelection) {
      event.preventDefault();
    }
  };
  const handleBeforeToggle = (event: CustomEvent) => {
    if (onBeforeToggle) {
      onBeforeToggle(event);
    }
    if (disableToggle) {
      event.preventDefault();
    }
  };
  return html`
    <cds-multi-select
      direction=${ifDefined(direction)}
      ?disabled=${disabled}
      ?invalid=${invalid}
      invalid-text=${ifDefined(invalidText)}
      clear-selection-label=${ifDefined(clearSelectionLabel)}
      helper-text=${ifDefined(helperText)}
      ?hide-label=${hideLabel}
      title-text=${ifDefined(titleText)}
      size=${ifDefined(size)}
      ?warn=${warn}
      warn-text=${ifDefined(warnText)}
      toggle-label-closed=${ifDefined(toggleLabelClosed)}
      toggle-label-open=${ifDefined(toggleLabelOpen)}
      label=${ifDefined(label)}
      type=${ifDefined(type)}
      value="${ifDefined(value)}"
      @cds-multi-select-beingselected=${handleBeforeSelect}
      @cds-multi-select-beingtoggled=${handleBeforeToggle}
      @cds-multi-select-selected=${onSelect}
      @cds-multi-select-toggled=${onToggle}>
      <cds-multi-select-item value="example"
        >An example option that is really long to show what should be done to
        handle long text</cds-multi-select-item
      >
      <cds-multi-select-item value="all">Option 1</cds-multi-select-item>
      <cds-multi-select-item value="cloudFoundry"
        >Option 2</cds-multi-select-item
      >
      <cds-multi-select-item disabled value="staging"
        >Option 3 - a disabled item</cds-multi-select-item
      >
      <cds-multi-select-item value="dea">Option 4</cds-multi-select-item>
      <cds-multi-select-item value="router">Option 5</cds-multi-select-item>
    </cds-multi-select>
  `;
};

Playground.decorators = [
  (story) => html` <div style="width:300px">${story()}</div> `,
];

export default {
  title: 'Components/Multi select',
  parameters: {
    ...storyDocs.parameters,
    knobs: {
      [`${prefix}-multi-select`]: () => ({
        clearSelectionDescription: textNullable(
          'Clear selection description for a11y (clear-selection-description)',
          'Total items selected: '
        ),
        clearSelectionText: textNullable(
          'Clear selection text for a11y (clear-selection-text)',
          'To clear selection, press Delete or Backspace.'
        ),
        disabled: boolean('Disabled (disabled)', false),
        direction: select(
          'Direction',
          directionOptions,
          DROPDOWN_DIRECTION.BOTTOM
        ),
        helperText: textNullable(
          'Helper text (helper-text)',
          'Optional helper text'
        ),
        hideLabel: boolean('Hide label (hide-label)', false),
        invalid: boolean('Show invalid state  (invalid)', false),
        invalidText: textNullable('Invalid text  (invalid-text)', 'whoopsie!'),
        titleText: textNullable(
          'Title text (title-text)',
          'This is a MultiSelect Title'
        ),
        toggleLabelClosed: textNullable(
          'a11y label for the UI indicating the closed state (toggle-label-closed)',
          ''
        ),
        toggleLabelOpen: textNullable(
          'a11y label for the UI indicating the closed state (toggle-label-open)',
          ''
        ),
        label: textNullable('Label of field (label)', 'This is a label'),
        size: select('Size (size)', sizes, DROPDOWN_SIZE.MEDIUM),
        type: select('UI type (type)', types, null),
        warn: boolean('Warn (warn)', false),
        warnText: textNullable('Warn text (warn-text)', 'whoopsie!'),
        disableSelection: boolean(
          `Disable user-initiated selection change (Call event.preventDefault() in ${prefix}-multi-select-beingselected event)`,
          false
        ),
        disableToggle: boolean(
          `Disable user-initiated toggle of open state (Call event.preventDefault() in ${prefix}-multi-select-beingtoggled event)`,
          false
        ),
        onBeforeSelect: action(`${prefix}-multi-select-beingselected`),
        onBeforeToggle: action(`${prefix}-multi-select-beingtoggled`),
        onSelect: action(`${prefix}-multi-select-selected`),
        onToggle: action(`${prefix}-multi-select-toggled`),
      }),
    },
  },
};
