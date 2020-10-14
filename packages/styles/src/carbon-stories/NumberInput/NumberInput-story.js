/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';

import { withKnobs, boolean, number, text, object } from '@storybook/addon-knobs';
import { NumberInput, NumberInputSkeleton } from 'carbon-components-react';

const props = () => ({
  className: 'some-class',
  id: 'tj-input',
  label: text('Label (label)', 'Number Input label'),
  hideLabel: boolean('No label (hideLabel)', false),
  min: number('Minimum value (min)', 0),
  max: number('Maximum value (max)', 100),
  value: number('Value (value)', 50),
  step: number('Step of up/down arrow (step)', 10),
  disabled: boolean('Disabled (disabled)', false),
  readOnly: boolean('Read only (readOnly)', false),
  invalid: boolean('Show form validation UI (invalid)', false),
  isMobile: boolean('Mobile variant', false),
  invalidText: text('Form validation UI content (invalidText)', 'Number is not valid'),
  helperText: text('Helper text (helperText)', 'Optional helper text.'),
  light: boolean('Light variant (light)', false),
  onChange: action('onChange'),
  onClick: action('onClick'),
  allowEmpty: boolean('Allow empty value (allowEmpty)', false),
  numberInputArrowTranslationIds: object(
    'Number input arrow icon translation IDs (for translateWithId callback)',
    {
      'increment.number': 'Increment number',
      'decrement.number': 'Decrement number',
    }
  ),
});

NumberInput.displayName = 'NumberInput';

export default {
  title: 'NumberInput',
  decorators: [withKnobs],
};

export const Default = () => {
  const { numberInputArrowTranslationIds, ...rest } = props();
  return <NumberInput translateWithId={id => numberInputArrowTranslationIds[id]} {...rest} />;
};

Default.story = {
  parameters: {
    info: {
      text: `
          Number inputs are similar to text fields, but contain controls used to increase or decrease an incremental value.
          The Number Input component can be passed a starting value, a min, a max, and the step.
        `,
    },
  },
};
