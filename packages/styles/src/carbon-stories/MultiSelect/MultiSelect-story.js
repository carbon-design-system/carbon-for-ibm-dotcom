/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select, text, object } from '@storybook/addon-knobs';
import { withReadme } from 'storybook-readme';
import readme from './README.md';
import { MultiSelect } from 'carbon-components-react';

const items = [
  {
    id: 'downshift-1-item-0',
    text: 'Option 1',
  },
  {
    id: 'downshift-1-item-1',
    text: 'Option 2',
  },
  {
    id: 'downshift-1-item-2',
    text: 'Option 3',
  },
  {
    id: 'downshift-1-item-3',
    text: 'Option 4',
  },
  {
    id: 'downshift-1-item-4',
    text: 'An example option that is really long to show what should be done to handle long text',
  },
];

const defaultLabel = 'MultiSelect Label';
const defaultPlaceholder = 'Filter';

const types = {
  'Default (default)': 'default',
  'Inline (inline)': 'inline',
};

const props = () => ({
  id: text('MultiSelect ID (id)', 'carbon-multiselect-example'),
  titleText: text('Title (titleText)', 'Multiselect title'),
  helperText: text('Helper text (helperText)', 'This is not helper text'),
  filterable: boolean('Filterable (`<MultiSelect.Filterable>` instead of `<MultiSelect>`)', false),
  disabled: boolean('Disabled (disabled)', false),
  light: boolean('Light variant (light)', false),
  useTitleInItem: boolean('Show tooltip on hover', false),
  type: select('UI type (Only for `<MultiSelect>`) (type)', types, 'default'),
  label: text('Label (label)', defaultLabel),
  invalid: boolean('Show form validation UI (invalid)', false),
  invalidText: text('Form validation UI content (invalidText)', 'Invalid Selection'),
  onChange: action('onChange'),
  listBoxMenuIconTranslationIds: object(
    'Listbox menu icon translation IDs (for translateWithId callback)',
    {
      'close.menu': 'Close menu',
      'open.menu': 'Open menu',
      'clear.all': 'Clear all',
      'clear.selection': 'Clear selection',
    }
  ),
  selectionFeedback: select(
    'Selection feedback',
    ['top', 'fixed', 'top-after-reopen'],
    'top-after-reopen'
  ),
});

export default {
  title: 'MultiSelect',
  decorators: [withKnobs],
};

export const Default = withReadme(readme, () => {
  const {
    filterable,
    listBoxMenuIconTranslationIds,
    selectionFeedback,
    ...multiSelectProps
  } = props();
  const ComponentToUse = !filterable ? MultiSelect : MultiSelect.Filterable;
  const placeholder = !filterable ? undefined : defaultPlaceholder;
  return (
    <div style={{ width: 300 }}>
      <ComponentToUse
        {...multiSelectProps}
        items={items}
        itemToString={item => (item ? item.text : '')}
        placeholder={placeholder}
        translateWithId={id => listBoxMenuIconTranslationIds[id]}
        selectionFeedback={selectionFeedback}
      />
    </div>
  );
});

Default.story = {
  name: 'default',

  parameters: {
    info: {
      text: `
          MultiSelect
        `,
    },
  },
};

export const WithInitialSelectedItems = withReadme(readme, () => {
  const {
    filterable,
    listBoxMenuIconTranslationIds,
    selectionFeedback,
    ...multiSelectProps
  } = props();
  const ComponentToUse = !filterable ? MultiSelect : MultiSelect.Filterable;
  const placeholder = !filterable ? undefined : defaultPlaceholder;

  return (
    <div style={{ width: 300 }}>
      <ComponentToUse
        {...multiSelectProps}
        items={items}
        itemToString={item => (item ? item.text : '')}
        initialSelectedItems={[items[0], items[1]]}
        placeholder={placeholder}
        translateWithId={id => listBoxMenuIconTranslationIds[id]}
        selectionFeedback={selectionFeedback}
      />
    </div>
  );
});

WithInitialSelectedItems.story = {
  name: 'with initial selected items',

  parameters: {
    info: {
      text: `
          Provide a set of items to initially select in the control
        `,
    },
  },
};
