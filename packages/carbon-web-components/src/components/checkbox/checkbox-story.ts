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
import { boolean } from '@storybook/addon-knobs';
import { prefix } from '../../globals/settings';
import textNullable from '../../../.storybook/knob-text-nullable';
import './index';
import storyDocs from './checkbox-story.mdx';

const checkboxLabel = 'Checkbox label';

export const Default = () => {
  return html`
    <cds-checkbox-group legend-text="Group label">
      <cds-checkbox>${checkboxLabel}</cds-checkbox>
      <cds-checkbox>${checkboxLabel}</cds-checkbox>
    </cds-checkbox-group>
  `;
};

Default.storyName = 'Default';

export const Skeleton = () => {
  return html`
    <fieldset class="${prefix}--fieldset">
      <cds-checkbox-skeleton>${checkboxLabel}</cds-checkbox-skeleton>
    </fieldset>
  `;
};

export const Single = () => {
  return html`
    <cds-checkbox helper-text="Helper text goes here"
      >${checkboxLabel}</cds-checkbox
    >
    <br /><br />
    <cds-checkbox invalid invalid-text="Invalid test goes here"
      >${checkboxLabel}</cds-checkbox
    >
    <br /><br />
    <cds-checkbox warn warn-text="Warning test goes here"
      >${checkboxLabel}</cds-checkbox
    >
    <br /><br />
    <cds-checkbox readonly>${checkboxLabel}</cds-checkbox>
  `;
};

export const Playground = (args) => {
  const {
    disabled,
    readonly,
    onChange,
    helperText,
    invalid,
    invalidText,
    legendText,
    warn,
    warnText,
  } = args?.[`${prefix}-checkbox`] ?? {};
  return html`
    <cds-checkbox-group
      helper-text="${helperText}"
      ?disabled="${disabled}"
      ?invalid="${invalid}"
      invalid-text="${invalidText}"
      legend-text="${legendText}"
      ?readonly="${readonly}"
      ?warn="${warn}"
      warn-text="${warnText}">
      <cds-checkbox checked @cds-checkbox-changed="${onChange}"
        >Checkbox label</cds-checkbox
      >
      <cds-checkbox @cds-checkbox-changed="${onChange}"
        >Checkbox label</cds-checkbox
      >
      <cds-checkbox disabled @cds-checkbox-changed="${onChange}"
        >Checkbox label</cds-checkbox
      >
    </cds-checkbox-group>
  `;
};

Playground.parameters = {
  knobs: {
    [`${prefix}-checkbox`]: () => ({
      onChange: action(`${prefix}-checkbox-changed`),
      disabled: boolean('Disabled (disabled)', false),
      helperText: textNullable(
        'Helper text (helper-text)',
        'Helper text goes here'
      ),
      invalid: boolean('Invalid (invalid)', false),
      invalidText: textNullable(
        'Invalid text (invalid-text)',
        'Invalid message goes here'
      ),
      legendText: textNullable('Legend text (legend-text)', 'Group label'),
      readonly: boolean('Read only (readonly)', false),
      warn: boolean('Warn (warn)', false),
      warnText: textNullable('Warn text (warn-text)', 'Warn message goes here'),
    }),
  },
};

export default {
  title: 'Components/Checkbox',
  parameters: {
    ...storyDocs.parameters,
  },
};
