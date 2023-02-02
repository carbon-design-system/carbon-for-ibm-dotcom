/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import textNullable from '../../../.storybook/knob-text-nullable';
import ifNonNull from '../../globals/directives/if-non-null';
import {
  DROPDOWN_COLOR_SCHEME,
  DROPDOWN_SIZE,
  DROPDOWN_TYPE,
} from './dropdown';
import './dropdown-item';
import './dropdown-skeleton';
import storyDocs from './dropdown-story.mdx';

const colorSchemes = {
  [`Regular`]: null,
  [`Light (${DROPDOWN_COLOR_SCHEME.LIGHT})`]: DROPDOWN_COLOR_SCHEME.LIGHT,
};

const sizes = {
  'Regular size': null,
  [`Small size (${DROPDOWN_SIZE.SMALL})`]: DROPDOWN_SIZE.SMALL,
  [`Extra large size (${DROPDOWN_SIZE.EXTRA_LARGE})`]:
    DROPDOWN_SIZE.EXTRA_LARGE,
};

const types = {
  Regular: null,
  [`Inline (${DROPDOWN_TYPE.INLINE})`]: DROPDOWN_TYPE.INLINE,
};

export const Default = (args) => {
  const {
    open,
    colorScheme,
    disabled,
    helperText,
    labelText,
    size,
    type,
    value,
    triggerContent,
    disableSelection,
    disableToggle,
    onBeforeSelect,
    onBeforeToggle,
    onSelect,
    onToggle,
  } = args?.['bx-dropdown'] ?? {};
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
    <cds-dropdown
      ?open=${open}
      color-scheme="${ifNonNull(colorScheme)}"
      ?disabled=${disabled}
      helper-text=${ifNonNull(helperText)}
      label-text=${ifNonNull(labelText)}
      size="${ifNonNull(size)}"
      type="${ifNonNull(type)}"
      value=${ifNonNull(value)}
      trigger-content=${ifNonNull(triggerContent)}
      @bx-dropdown-beingselected=${handleBeforeSelect}
      @bx-dropdown-beingtoggled=${handleBeforeToggle}
      @bx-dropdown-selected=${onSelect}
      @bx-dropdown-toggled=${onToggle}>
      <cds-dropdown-item value="all">Option 1</cds-dropdown-item>
      <cds-dropdown-item value="cloudFoundry">Option 2</cds-dropdown-item>
      <cds-dropdown-item value="staging">Option 3</cds-dropdown-item>
      <cds-dropdown-item value="dea">Option 4</cds-dropdown-item>
      <cds-dropdown-item value="router">Option 5</cds-dropdown-item>
    </cds-dropdown>
  `;
};

Default.storyName = 'Default';

Default.parameters = {
  knobs: {
    'bx-dropdown': () => ({
      open: boolean('Open (open)', false),
      colorScheme: select('Color scheme (color-scheme)', colorSchemes, null),
      disabled: boolean('Disabled (disabled)', false),
      helperText: textNullable(
        'Helper text (helper-text)',
        'Optional helper text'
      ),
      labelText: textNullable('Label text (label-text)', 'Dropdown title'),
      size: select('Dropdown size (size)', sizes, null),
      type: select('Dropdown type (type)', types, null),
      value: textNullable('The value of the selected item (value)', ''),
      triggerContent: textNullable(
        'The default content of the trigger button (trigger-content)',
        'Select an item'
      ),
      disableSelection: boolean(
        'Disable user-initiated selection change (Call event.preventDefault() in bx-dropdown-beingselected event)',
        false
      ),
      disableToggle: boolean(
        'Disable user-initiated toggle of open state (Call event.preventDefault() in bx-dropdown-beingtoggled event)',
        false
      ),
      onBeforeSelect: action('bx-dropdown-beingselected'),
      onBeforeToggle: action('bx-dropdown-beingtoggled'),
      onSelect: action('bx-dropdown-selected'),
      onToggle: action('bx-dropdown-toggled'),
    }),
  },
};

export const skeleton = () =>
  html` <cds-dropdown-skeleton></cds-dropdown-skeleton> `;

skeleton.parameters = {
  percy: {
    skip: true,
  },
};

export default {
  title: 'Components/Dropdown',
  parameters: {
    ...storyDocs.parameters,
  },
};
