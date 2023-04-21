/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { boolean, number, select } from '@storybook/addon-knobs';
import textNullable from '../../../.storybook/knob-text-nullable';
import './progress-bar';
import storyDocs from './progress-bar-story.mdx';
import { prefix } from '../../globals/settings';

export const Default = () => {
  return html`
    <cds-progress-bar
      label="Progress bar label"
      helper-text="Optional helper text">
    </cds-progress-bar>
  `;
};

export const Playground = (args) => {
  const { helperText, hideLabel, label, max, size, status, type, value } =
    args?.[`${prefix}-progress-bar`] ?? {};
  return html`
    <cds-progress-bar
      max="${ifDefined(max)}"
      ?hide-label="${hideLabel}"
      label="${ifDefined(label)}"
      helper-text="${ifDefined(helperText)}"
      size="${ifDefined(size)}"
      status="${ifDefined(status)}"
      type="${ifDefined(type)}"
      value="${value}">
    </cds-progress-bar>
  `;
};

Playground.parameters = {
  knobs: {
    [`${prefix}-progress-bar`]: () => ({
      helperText: textNullable(
        'Helper text (helper-text)',
        'Optional helper text'
      ),
      hideLabel: boolean('Hide label (hide-label)', false),
      label: textNullable('Label (label)', 'Progress bar label'),
      max: number('Max (max)', 100),
      size: select('Size (size)', ['small', 'big'], 'big'),
      status: select(
        'Status (status)',
        ['active', 'finished', 'error'],
        'active'
      ),
      type: select('Type (type)', ['default', 'inline', 'indented'], 'default'),
      value: number('Value (value)', 75),
    }),
  },
};

export default {
  title: 'Components/Progress bar',
  parameters: {
    ...storyDocs.parameters,
  },
};
