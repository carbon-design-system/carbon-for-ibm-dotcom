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
import { TILE_COLOR_SCHEME } from './tile';
import './clickable-tile';
import './radio-tile';
import './selectable-tile';
import './expandable-tile';
import storyDocs from './tile-story.mdx';

const colorSchemes = {
  [`Regular`]: null,
  [`Light (${TILE_COLOR_SCHEME.LIGHT})`]: TILE_COLOR_SCHEME.LIGHT,
};

export const Default = (args) => {
  const { colorScheme } = args?.['cds-tile'] ?? {};
  return html`
    <cds-tile color-scheme="${ifNonNull(colorScheme)}">Default tile</cds-tile>
  `;
};

Default.storyName = 'Default';

export const clickable = (args) => {
  const { download, href, hreflang, ping, rel, target, type } =
    args?.['cds-clickable-tile'] ?? {};
  return html`
    <cds-clickable-tile
      download="${ifNonNull(download)}"
      href="${ifNonNull(href)}"
      hreflang="${ifNonNull(hreflang)}"
      ping="${ifNonNull(ping)}"
      rel="${ifNonNull(rel)}"
      target="${ifNonNull(target)}"
      type="${ifNonNull(type)}">
      Clickable tile
    </cds-clickable-tile>
  `;
};

clickable.parameters = {
  knobs: {
    'cds-clickable-tile': () => ({
      href: textNullable('Href for clickable UI (href)', ''),
    }),
  },
};

export const Radio = (args) => {
  const { checkmarkLabel, colorScheme, name, value, onInput } =
    args?.['cds-radio-tile'] ?? {};
  return html`
    <fieldset>
      <legend>Single-select tiles</legend>
      <cds-radio-tile
        checkmark-label="${ifNonNull(checkmarkLabel)}"
        color-scheme="${ifNonNull(colorScheme)}"
        name="${ifNonNull(name)}"
        value="${ifNonNull(value)}"
        @input="${onInput}">
        Single-select Tile
      </cds-radio-tile>
      <cds-radio-tile
        checkmark-label="${ifNonNull(checkmarkLabel)}"
        color-scheme="${ifNonNull(colorScheme)}"
        name="${ifNonNull(name)}"
        value="${ifNonNull(value)}"
        @input="${onInput}">
        Single-select Tile
      </cds-radio-tile>
      <cds-radio-tile
        checkmark-label="${ifNonNull(checkmarkLabel)}"
        color-scheme="${ifNonNull(colorScheme)}"
        name="${ifNonNull(name)}"
        value="${ifNonNull(value)}"
        @input="${onInput}">
        Single-select Tile
      </cds-radio-tile>
    </fieldset>
  `;
};

Radio.storyName = 'Single-selectable';

Radio.parameters = {
  knobs: {
    'cds-radio-tile': () => ({
      checkmarkLabel: textNullable(
        'Label text for the checkmark icon (checkmark-label)',
        ''
      ),
      colorScheme: select('Color scheme (color-scheme)', colorSchemes, null),
      name: textNullable('Name (name)', 'selectable-tile'),
      value: textNullable('Value (value)', ''),
      onInput: action('input'),
    }),
  },
};

export const multiSelectable = (args) => {
  const { checkmarkLabel, colorScheme, name, selected, value, onInput } =
    args?.['cds-selectable-tile'] ?? {};
  return html`
    <fieldset>
      <cds-selectable-tile
        checkmark-label="${ifNonNull(checkmarkLabel)}"
        color-scheme="${ifNonNull(colorScheme)}"
        name="${ifNonNull(name)}"
        ?selected="${selected}"
        value="${ifNonNull(value)}"
        @input="${onInput}">
        Option 1
      </cds-selectable-tile>
      <cds-selectable-tile
        checkmark-label="${ifNonNull(checkmarkLabel)}"
        color-scheme="${ifNonNull(colorScheme)}"
        name="${ifNonNull(name)}"
        ?selected="${selected}"
        value="${ifNonNull(value)}"
        @input="${onInput}">
        Option 2
      </cds-selectable-tile>
      <cds-selectable-tile
        checkmark-label="${ifNonNull(checkmarkLabel)}"
        color-scheme="${ifNonNull(colorScheme)}"
        name="${ifNonNull(name)}"
        ?selected="${selected}"
        value="${ifNonNull(value)}"
        @input="${onInput}">
        Option 3
      </cds-selectable-tile>
    </fieldset>
  `;
};

multiSelectable.storyName = 'Multi-selectable';

multiSelectable.parameters = {
  knobs: {
    'cds-selectable-tile': () => ({
      ...Radio.parameters.knobs['cds-radio-tile'](),
      selected: boolean('Selected (selected)', false),
    }),
  },
};

export const expandable = (args) => {
  const { colorScheme, expanded, disableChange, onBeforeChange, onChange } =
    args?.['cds-expandable-tile'] ?? {};
  const handleBeforeChanged = (event: CustomEvent) => {
    onBeforeChange(event);
    if (disableChange) {
      event.preventDefault();
    }
  };
  return html`
    <cds-expandable-tile
      color-scheme="${ifNonNull(colorScheme)}"
      ?expanded="${expanded}"
      @cds-expandable-tile-beingchanged=${handleBeforeChanged}
      @cds-expandable-tile-changed=${onChange}>
      <cds-tile-above-the-fold-content
        slot="above-the-fold-content"
        style="height: 200px">
        Above the fold content here
      </cds-tile-above-the-fold-content>
      <cds-tile-below-the-fold-content style="height: 300px">
        Below the fold content here
      </cds-tile-below-the-fold-content>
    </cds-expandable-tile>
  `;
};

expandable.parameters = {
  knobs: {
    'cds-expandable-tile': () => ({
      colorScheme: select('Color scheme (color-scheme)', colorSchemes, null),
      expanded: boolean('Expanded (expanded)', false),
      disableChange: boolean(
        'Disable user-initiated change in expanded state ' +
          '(Call event.preventDefault() in cds-expandable-tile-beingchanged event)',
        false
      ),
      onBeforeChange: action('cds-expandable-tile-beingchanged'),
      onChange: action('cds-expandable-tile-changed'),
    }),
  },
};

export default {
  title: 'Components/Tile',
  decorators: [(story) => html` <div>${story()}</div> `],
  parameters: {
    ...storyDocs.parameters,
  },
};
