/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { ComboBox, Button } from 'carbon-components-react';
import WithState from '../../carbon-tools/withState';

const items = [
  {
    id: 'option-0',
    text: 'Option 1',
  },
  {
    id: 'option-1',
    text: 'Option 2',
  },
  {
    id: 'option-2',
    text: 'Option 3',
    selected: true,
  },
  {
    id: 'option-3',
    text: 'Option 4',
  },
  {
    id: 'option-4',
    text: 'An example option that is really long to show what should be done to handle long text',
  },
];

const props = () => ({
  id: text('Combobox ID (id)', 'carbon-combobox-example'),
  placeholder: text('Placeholder text (placeholder)', 'Filter...'),
  titleText: text('Title (titleText)', 'Combobox title'),
  helperText: text('Helper text (helperText)', 'Optional helper text here'),
  light: boolean('Light (light)', false),
  disabled: boolean('Disabled (disabled)', false),
  invalid: boolean('Invalid (invalid)', false),
  invalidText: text('Invalid text (invalidText)', 'A valid value is required'),
  onChange: action('onChange'),
});

const itemToElement = item => {
  const itemAsArray = item.text.split(' ');
  return (
    <div>
      <span>{itemAsArray[0]}</span>
      <span style={{ color: 'blue' }}> {itemAsArray[1]}</span>
    </div>
  );
};

const ControlledComboBoxApp = props => {
  const [selectedItem, setSelectedItem] = useState(items[0]);
  let uid = items.length;
  return (
    <>
      <ComboBox
        {...props}
        items={items}
        itemToString={item => (item ? item.text : '')}
        onChange={({ selectedItem }) => setSelectedItem(selectedItem)}
        initialSelectedItem={items[0]}
        selectedItem={selectedItem}
      />
      <Button
        style={{ marginTop: '1rem' }}
        onClick={() => {
          items.push({
            id: `id-${uid++}`,
            text: `Option ${uid}`,
          });
          setSelectedItem(items[items.length - 1]);
        }}
      >
        Add new item
      </Button>
    </>
  );
};

export default {
  title: 'ComboBox',
  decorators: [withKnobs],
};

export const Default = () => (
  <div style={{ width: 300 }}>
    <ComboBox items={items} itemToString={item => (item ? item.text : '')} {...props()} />
  </div>
);

Default.story = {
  parameters: {
    info: {
      text: 'ComboBox',
    },
  },
};

export const ItemsAsComponents = () => (
  <div style={{ width: 300 }}>
    <ComboBox
      items={items}
      itemToString={item => (item ? item.text : '')}
      itemToElement={itemToElement}
      {...props()}
    />
  </div>
);

ItemsAsComponents.story = {
  name: 'items as components',

  parameters: {
    info: {
      text: 'ComboBox',
    },
  },
};

export const CustomTextInputHandling = () => (
  <WithState initialState={{ inputText: '' }}>
    {({ state, setState }) => (
      <div style={{ width: 300 }}>
        <ComboBox
          items={items}
          itemToString={item => (item ? `${item.text} queried with ${state.inputText}` : '')}
          shouldFilterItem={() => true}
          onInputChange={text => setState({ inputText: text })}
          {...props()}
        />
      </div>
    )}
  </WithState>
);

CustomTextInputHandling.story = {
  name: 'custom text input handling',

  parameters: {
    info: {
      text: `Sometimes you want to perform an async action to trigger a backend call on input change.`,
    },
  },
};

export const ApplicationLevelControlForSelection = () => <ControlledComboBoxApp {...props()} />;

ApplicationLevelControlForSelection.story = {
  name: 'application-level control for selection',

  parameters: {
    info: {
      text: `Controlled ComboBox example application`,
    },
  },
};
