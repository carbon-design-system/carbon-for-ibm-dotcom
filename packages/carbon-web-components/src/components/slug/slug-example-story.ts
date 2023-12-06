/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import View16 from '@carbon/icons/lib/view/16';
import FolderOpen16 from '@carbon/icons/lib/folder--open/16';
import Folders16 from '@carbon/icons/lib/folders/16';
import './index';
import '../icon-button/index';

const items = [
  {
    value: 'option-0',
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
  },
  {
    value: 'option-1',
    text: 'Option 1',
  },
  {
    value: 'option-2',
    text: 'Option 2',
  },
  {
    value: 'option-3',
    text: 'Option 3 - a disabled item',
    disabled: true,
  },
  {
    value: 'option-4',
    text: 'Option 4',
  },
  {
    value: 'option-5',
    text: 'Option 5',
  },
];

const content = html`
  <div slot="body-text">
    <p class="secondary">AI Explained</p>
    <h1>84%</h1>
    <p class="secondary bold">Confidence score</p>
    <p class="secondary">
      Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
    </p>
    <hr />
    <p class="secondary">Model type</p>
    <p class="bold">Foundation model</p>
  </div>
`;

const actions = html`
  <cds-icon-button kind="ghost" slot="actions" size="lg">
    ${View16({ slot: 'icon' })}
    <span slot="tooltip-content"> View </span>
  </cds-icon-button>
  <cds-icon-button kind="ghost" slot="actions" size="lg">
    ${FolderOpen16({ slot: 'icon' })}
    <span slot="tooltip-content"> Open folder</span>
  </cds-icon-button>
  <cds-icon-button kind="ghost" slot="actions" size="lg">
    ${Folders16({ slot: 'icon' })}
    <span slot="tooltip-content"> Folders </span>
  </cds-icon-button>
  <cds-slug-action-button>View Literature</cds-slug-action-button>
`;

export default {
  title: 'Experimental/Slug/Examples',
};

export const _Combobox = () => {
  return html` <div style="width: 400px">
    <cds-combo-box
      helper-text="This is some helper text"
      title-text="Combo box title"
      label="Filter...">
      <cds-slug alignment="bottom-left"> ${content}${actions}</cds-slug>

      <cds-combo-box-item value="all">Option 1</cds-combo-box-item>
      <cds-combo-box-item value="cloudFoundry">Option 2</cds-combo-box-item>
      <cds-combo-box-item value="staging">Option 3</cds-combo-box-item>
      <cds-combo-box-item value="dea">Option 4</cds-combo-box-item>
      <cds-combo-box-item value="router">Option 5</cds-combo-box-item>
      <cds-combo-box-item value="support">Option 6</cds-combo-box-item>
      <cds-combo-box-item value="services">Option 7</cds-combo-box-item>
      <cds-combo-box-item value="products">Option 8</cds-combo-box-item>
    </cds-combo-box>
  </div>`;
};

export const _DatePicker = () => {
  return html` <div style="width: 400px">
    <cds-date-picker>
      <cds-date-picker-input
        kind="single"
        label-text="Date Picker label"
        placeholder="mm/dd/yyyy">
        <cds-slug alignment="bottom-left"> ${content}${actions}</cds-slug>
      </cds-date-picker-input>
    </cds-date-picker>
  </div>`;
};

export const _Dropdown = () => {
  return html` <div style="width: 400px">
    <cds-dropdown
      helper-text="This is some helper text"
      title-text="Dropdown label"
      label="Dropdown menu options">
      <cds-slug alignment="bottom-left"> ${content}${actions}</cds-slug>
      ${items.map(
        (elem) => html`
          <cds-dropdown-item ?disabled=${elem.disabled} value="${elem.value}"
            >${elem.text}</cds-dropdown-item
          >
        `
      )}
    </cds-dropdown>
  </div>`;
};

export const _Multiselect = () => {
  return html` <div style="width: 400px">
    <cds-multi-select
      title-text="Multiselect title"
      label="Multiselect label"
      helper-text="This is helper text">
      <cds-slug alignment="bottom-left"> ${content}${actions}</cds-slug>
      <cds-multi-select-item value="example">
        An example option that is really long to show what should be done to
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
  </div>`;
};

export const _FilterableMultiselect = () => {
  return html` <div style="width: 400px">
    <cds-multi-select
      filterable="true"
      title-text="FilterableMultiselect title"
      helper-text="This is helper text">
      <cds-slug alignment="bottom-left"> ${content}${actions}</cds-slug>
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
  </div>`;
};

export const _NumberItem = () => {
  return html`
    <div style="width: 400px">
      <cds-number-input
        value="50"
        min="0"
        max="100"
        step="1"
        label="Number input">
        <cds-slug alignment="bottom-left"> ${content}${actions} </cds-slug>
      </cds-number-input>
    </div>
  `;
};

export const _Select = () => {
  return html`
    <div style="width: 400px">
      <cds-select
        helper-text="Optional helper text"
        label-text="Select"
        placeholder="Optional placeholder text">
        <cds-slug alignment="bottom-left"> ${content}${actions}</cds-slug>
        <cds-select-item-group label="Category 1">
          <cds-select-item value="all">Option 1</cds-select-item>
          <cds-select-item value="cloudFoundry">Option 2</cds-select-item>
        </cds-select-item-group>
        <cds-select-item-group label="Category 2">
          <cds-select-item value="staging">Option 3</cds-select-item>
          <cds-select-item value="dea">Option 4</cds-select-item>
          <cds-select-item value="router">Option 5</cds-select-item>
        </cds-select-item-group>
      </cds-select>
    </div>
  `;
};

export const _TextInput = () => {
  return html`
    <div style="width: 400px">
      <cds-text-input label="Text input label" placeholder="Placeholder text">
        <cds-slug alignment="bottom-left"> ${content}${actions}</cds-slug>
      </cds-text-input>
    </div>
  `;
};

export const _TextArea = () => {
  return html`
    <div style="width: 400px">
      <cds-textarea label="Text input label" placeholder="Placeholder text">
        <cds-slug alignment="bottom-left"> ${content}${actions}</cds-slug>
      </cds-textarea>
    </div>
  `;
};
