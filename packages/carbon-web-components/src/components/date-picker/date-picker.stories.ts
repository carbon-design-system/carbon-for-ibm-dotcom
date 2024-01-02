/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { INPUT_SIZE } from '../text-input/text-input';
import './date-picker';
import './date-picker-input-skeleton';
import '../layer/index';

const sizes = {
  [`Small (${INPUT_SIZE.SMALL})`]: INPUT_SIZE.SMALL,
  [`Medium (${INPUT_SIZE.MEDIUM})`]: INPUT_SIZE.MEDIUM,
  [`Large (${INPUT_SIZE.LARGE})`]: INPUT_SIZE.LARGE,
};

const defaultArgs = {
  dateFormat: 'm/d/Y',
  disabled: false,
  allowInput: true,
  closeOnSelect: true,
  minDate: '',
  maxDate: '',
  datePickerType: 'single',
  readonly: false,
  short: false,
  helperText: '',
  warning: false,
  warningText: '',
  invalid: false,
  invalidText: '',
  placeholder: 'mm/dd/yyyy',
  size: INPUT_SIZE.MEDIUM,
};

const controls = {
  dateFormat: {
    control: 'text',
  },
  disabled: { control: 'boolean' },
  allowInput: { control: 'boolean' },
  closeOnSelect: { control: 'boolean' },
  minDate: { control: 'text' },
  maxDate: { control: 'text' },
  datePickerType: {
    control: 'select',
    options: { Single: 'single', Simple: 'simple', Range: 'range' },
  },
  readonly: { control: 'boolean' },
  short: { control: 'boolean' },
  helperText: { control: 'text' },
  warning: { control: 'boolean' },
  warningText: { control: 'text' },
  invalid: { control: 'boolean' },
  invalidText: { control: 'text' },
  placeholder: { control: 'text' },
  size: { control: 'select', options: sizes },
};

export const Simple = {
  render: () => {
    return html`
      <cds-date-picker>
        <cds-date-picker-input
          label-text="Date Picker label"
          placeholder="mm/dd/yyyy">
        </cds-date-picker-input>
      </cds-date-picker>
    `;
  },
};

export const SimpleWithLayer = {
  render: () => {
    return html`
  <sb-template-layers>
    <cds-date-picker>
    <cds-date-picker-input
      label-text="Date Picker label"
      placeholder="mm/dd/yyyy">
    </cds-date-picker-input>
  </sb-template-layers>
  `;
  },
};

export const SingleWithCalendar = {
  render: () => {
    return html`
      <cds-date-picker>
        <cds-date-picker-input
          kind="single"
          label-text="Date Picker label"
          placeholder="mm/dd/yyyy">
        </cds-date-picker-input>
      </cds-date-picker>
    `;
  },
};

export const SingleWithCalendarWithLayer = {
  render: () => {
    return html`
      <sb-template-layers>
        <cds-date-picker>
          <cds-date-picker-input
            kind="single"
            label-text="Date Picker label"
            placeholder="mm/dd/yyyy">
          </cds-date-picker-input>
        </cds-date-picker>
      </sb-template-layers>
    `;
  },
};

export const RangeWithCalendar = {
  render: () => {
    return html`
      <cds-date-picker>
        <cds-date-picker-input
          kind="from"
          label-text="Start date"
          placeholder="mm/dd/yyyy">
        </cds-date-picker-input>
        <cds-date-picker-input
          kind="to"
          label-text="End date"
          placeholder="mm/dd/yyyy">
        </cds-date-picker-input>
      </cds-date-picker>
    `;
  },
};

export const RangeWithCalendarWithLayer = {
  render: () => {
    return html`
      <cds-layer>
        <cds-date-picker>
          <cds-date-picker-input
            kind="from"
            label-text="Start date"
            placeholder="mm/dd/yyyy">
          </cds-date-picker-input>
          <cds-date-picker-input
            kind="to"
            label-text="End date"
            placeholder="mm/dd/yyyy">
          </cds-date-picker-input>
        </cds-date-picker>
        <cds-layer>
          <cds-date-picker>
            <cds-date-picker-input
              kind="from"
              label-text="Start date"
              placeholder="mm/dd/yyyy">
            </cds-date-picker-input>
            <cds-date-picker-input
              kind="to"
              label-text="End date"
              placeholder="mm/dd/yyyy">
            </cds-date-picker-input>
          </cds-date-picker>
          <cds-layer>
            <cds-date-picker>
              <cds-date-picker-input
                kind="from"
                label-text="Start date"
                placeholder="mm/dd/yyyy">
              </cds-date-picker-input>
              <cds-date-picker-input
                kind="to"
                label-text="End date"
                placeholder="mm/dd/yyyy">
              </cds-date-picker-input>
            </cds-date-picker>
          </cds-layer>
        </cds-layer>
      </cds-layer>
    `;
  },
};

export const Skeleton = {
  render: () =>
    html`
      <cds-date-picker-input-skeleton
        kind="from"></cds-date-picker-input-skeleton>
      <cds-date-picker-input-skeleton
        kind="to"></cds-date-picker-input-skeleton>
    `,
  decorators: [(story) => html` <div>${story()}</div> `],
  parameters: {
    percy: {
      skip: true,
    },
  },
};

export const Playground = {
  decorators: [(story) => html` <div>${story()}</div> `],
  argTypes: controls,
  args: defaultArgs,
  render: (args) => {
    const {
      disabled,
      dateFormat,
      onChange,
      minDate,
      maxDate,
      size,
      helperText,
      placeholder,
      invalid,
      invalidText,
      warning,
      warningText,
      short,
      datePickerType,
      readonly,
      onInput,
    } = args || {};

    return html`
      <cds-date-picker
        ?disabled="${disabled}"
        date-format="${dateFormat}"
        ?readonly="${readonly}"
        min-date="${minDate}"
        max-date="${maxDate}"
        @cds-date-picker-changed="${onChange}">
        ${datePickerType === 'range'
          ? html`
              <cds-date-picker-input
                kind="from"
                label-text="Date Picker label"
                size="${size}"
                placeholder="${placeholder}"
                ?invalid="${invalid}"
                invalid-text="${invalidText}"
                ?short="${short}"
                ?warn="${warning}"
                warn-text="${warningText}"
                @input="${onInput}">
                ${helperText
                  ? html`<span slot="helper-text">${helperText}</span>`
                  : html``}
              </cds-date-picker-input>
              <cds-date-picker-input
                kind="to"
                label-text="Date Picker label"
                size="${size}"
                placeholder="${placeholder}"
                ?invalid="${invalid}"
                invalid-text="${invalidText}"
                ?short="${short}"
                ?warn="${warning}"
                warn-text="${warningText}"
                @input="${onInput}">
                ${helperText
                  ? html`<span slot="helper-text">${helperText}</span>`
                  : html``}
              </cds-date-picker-input>
            `
          : html`
              <cds-date-picker-input
                kind="${datePickerType}"
                label-text="Date Picker label"
                size="${size}"
                placeholder="${placeholder}"
                ?invalid="${invalid}"
                invalid-text="${invalidText}"
                ?short="${short}"
                ?warn="${warning}"
                warn-text="${warningText}"
                @input="${onInput}">
                ${helperText
                  ? html`<span slot="helper-text">${helperText}</span>`
                  : html``}
              </cds-date-picker-input>
            `}
      </cds-date-picker>
    `;
  },
};

const meta = {
  title: 'Components/Date picker',
};

export default meta;
