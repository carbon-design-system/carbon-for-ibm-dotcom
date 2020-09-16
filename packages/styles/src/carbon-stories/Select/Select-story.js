/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';

import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { Select, SelectItem, SelectItemGroup, SelectSkeleton } from 'carbon-components-react';

const props = {
  select: () => ({
    className: 'some-class',
    light: boolean('Light variant (light in <Select>)', false),
    inline: boolean('Put control in-line with label (inline in <Select>)', false),
    disabled: boolean('Disabled (disabled in <Select>)', false),
    hideLabel: boolean('No label (hideLabel in <Select>)', false),
    invalid: boolean('Show form validation UI (invalid in <Select>)', false),
    invalidText: text(
      'Form validation UI content (invalidText in <Select>)',
      'A valid value is required'
    ),
    helperText: text('Helper text (helperText)', 'Optional helper text.'),
    onChange: action('onChange'),
  }),
  group: () => ({
    disabled: boolean('Disabled (disabled in <SelectItemGroup>)', false),
  }),
};

export default {
  title: 'Select',
  decorators: [withKnobs],
};

export const Default = () => {
  const groupProps = props.group();
  return (
    <Select {...props.select()} id="select-1" defaultValue="placeholder-item">
      <SelectItem disabled hidden value="placeholder-item" text="Choose an option" />
      <SelectItemGroup label="Category 1" {...groupProps}>
        <SelectItem value="option-1" text="Option 1" />
        <SelectItem value="option-2" text="Option 2" />
      </SelectItemGroup>
      <SelectItemGroup label="Category 2" {...groupProps}>
        <SelectItem value="option-3" text="Option 3" />
        <SelectItem value="option-4" text="Option 4" />
      </SelectItemGroup>
    </Select>
  );
};

Default.story = {
  parameters: {
    info: {
      text: `
          Select displays a list below its title when selected. They are used primarily in forms,
          where a user chooses one option from a list. Once the user selects an item, the dropdown will
          disappear and the field will reflect the user's choice. Create Select Item components for each
          option in the list. The example below shows an enabled Select component with three items.
        `,
    },
  },
};
