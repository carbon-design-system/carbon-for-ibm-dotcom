/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import * as knobs from '@storybook/addon-knobs';
import textNullable from '../../../.storybook/knob-text-nullable';
import { ifDefined } from 'lit/directives/if-defined.js';
import './number-input';
import './number-input-skeleton';
import '../form/form-item';
import createProps from './stories/helpers';
import storyDocs from './number-input-story.mdx';
import { prefix } from '../../globals/settings';

export const Default = (args) => {
  const {
    disabled,
    value,
    placeholder,
    invalid,
    mobile,
    min,
    max,
    size,
    step,
    onInput,
  } = args?.[`${prefix}-number-input`] ?? {};
  return html`
    <cds-form-item>
      <cds-number-input
        value="${ifDefined(value)}"
        placeholder="${ifDefined(placeholder)}"
        ?invalid="${invalid}"
        ?disabled="${disabled}"
        ?mobile="${mobile}"
        min="${ifDefined(min)}"
        max="${ifDefined(max)}"
        size="${ifDefined(size)}"
        step="${ifDefined(step)}"
        @input="${onInput}">
        <span slot="label-text">number-input label</span>
        <span slot="helper-text">Optional helper text</span>
        <span slot="validity-message">Number is not valid</span>
      </cds-number-input>
    </cds-form-item>
  `;
};

Default.storyName = 'Default';

Default.parameters = {
  knobs: {
    [`${prefix}-number-input`]: () => createProps({ ...knobs, textNullable }),
  },
};

export const skeleton = () =>
  html` <cds-number-input-skeleton></cds-number-input-skeleton> `;

skeleton.parameters = {
  percy: {
    skip: true,
  },
};

export const Playground = (args) => {
  const {
    disabled,
    hideLabel,
    hideSteppers,
    invalid,
    invalidText,
    label,
    readonly,
    warn,
    warnText,
    value,
    mobile,
    min,
    max,
    size,
    step,
    onInput,
  } = args?.[`${prefix}-number-input`] ?? {};
  return html`
    <cds-form-item>
      <cds-number-input
        ?hide-steppers="${hideSteppers}"
        ?hide-label="${hideLabel}"
        ?invalid="${invalid}"
        invalid-text="${ifDefined(invalidText)}"
        label="${ifDefined(label)}"
        ?readonly="${readonly}"
        value="${ifDefined(value)}"
        ?warn="${warn}"
        warn-text="${ifDefined(warnText)}"
        ?disabled="${disabled}"
        ?mobile="${mobile}"
        min="${ifDefined(min)}"
        max="${ifDefined(max)}"
        size="${ifDefined(size)}"
        step="${ifDefined(step)}"
        @input="${onInput}">
        <span slot="helper-text">Optional helper text</span>
      </cds-number-input>
    </cds-form-item>
  `;
};

Playground.storyName = 'Playground';

Playground.parameters = {
  knobs: {
    [`${prefix}-number-input`]: () => createProps({ ...knobs, textNullable }),
  },
};

export default {
  title: 'Components/Number Input',
  parameters: {
    ...storyDocs.parameters,
  },
};
