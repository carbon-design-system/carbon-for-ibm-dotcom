/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import * as knobs from '@storybook/addon-knobs';
import textNullable from '../../../.storybook/knob-text-nullable';
import ifNonNull from '../../globals/directives/if-non-null';
import './number-input';
import './number-input-skeleton';
import '../form/form-item';
import createProps from './stories/helpers';
import storyDocs from './number-input-story.mdx';

export const Default = (args) => {
  const {
    colorScheme,
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
    name,
  } = args?.['bx-number-input'] ?? {};
  return html`
    <cds-number-input
      color-scheme="${ifNonNull(colorScheme)}"
      ?disabled="${disabled}"
      value="${ifNonNull(value)}"
      placeholder="${ifNonNull(placeholder)}"
      ?invalid="${invalid}"
      name="${name}"
      ?mobile="${mobile}"
      min="${ifNonNull(min)}"
      max="${ifNonNull(max)}"
      size="${ifNonNull(size)}"
      step="${ifNonNull(step)}"
      @input="${onInput}"></cds-number-input>
  `;
};

Default.storyName = 'Default';

Default.parameters = {
  knobs: {
    'bx-number-input': () => createProps({ ...knobs, textNullable }),
  },
};

export const formItem = (args) => {
  const {
    colorScheme,
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
  } = args?.['bx-number-input'] ?? {};
  return html`
    <cds-form-item>
      <cds-number-input
        value="${ifNonNull(value)}"
        color-scheme="${ifNonNull(colorScheme)}"
        placeholder="${ifNonNull(placeholder)}"
        ?invalid="${invalid}"
        ?disabled="${disabled}"
        ?mobile="${mobile}"
        min="${ifNonNull(min)}"
        max="${ifNonNull(max)}"
        size="${ifNonNull(size)}"
        step="${ifNonNull(step)}"
        @input="${onInput}">
        <span slot="label-text">Label text</span>
        <span slot="helper-text">Optional helper text</span>
        <span slot="validity-message">Something isn't right</span>
        <span slot="validity-message-max"
          >Try a lower value, something less than ${max}</span
        >
        <span slot="validity-message-min"
          >Value must be larger than ${min}</span
        >
      </cds-number-input>
    </cds-form-item>
  `;
};

formItem.storyName = 'Form item';

formItem.parameters = {
  knobs: {
    'bx-number-input': () => createProps({ ...knobs, textNullable }),
  },
};

export const withoutFormItemWrapper = (args) => {
  const {
    colorScheme,
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
  } = args?.['bx-number-input'] ?? {};
  return html`
    <cds-number-input
      value="${ifNonNull(value)}"
      color-scheme="${ifNonNull(colorScheme)}"
      placeholder="${ifNonNull(placeholder)}"
      ?invalid="${invalid}"
      ?disabled="${disabled}"
      ?mobile="${mobile}"
      min="${ifNonNull(min)}"
      max="${ifNonNull(max)}"
      size="${ifNonNull(size)}"
      step="${ifNonNull(step)}"
      @input="${onInput}">
      <span slot="label-text">Label text</span>
      <span slot="helper-text">Optional helper text</span>
      <span slot="validity-message">Something isn't right</span>
    </cds-number-input>
  `;
};

withoutFormItemWrapper.storyName = 'Without form item wrapper';

withoutFormItemWrapper.parameters = {
  knobs: {
    'bx-number-input': () => createProps({ ...knobs, textNullable }),
  },
};

export const skeleton = () =>
  html` <cds-number-input-skeleton></cds-number-input-skeleton> `;

skeleton.parameters = {
  percy: {
    skip: true,
  },
};

export default {
  title: 'Components/Number Input',
  parameters: {
    ...storyDocs.parameters,
  },
};
