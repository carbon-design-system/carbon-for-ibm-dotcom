/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';

import { withKnobs, boolean, number, text } from '@storybook/addon-knobs';
import { Slider, SliderSkeleton } from 'carbon-components-react';

const props = () => ({
  name: text('Form item name (name)', ''),
  inputType: text('The form element type (inputType)', 'number'),
  ariaLabelInput: text('The ARIA label for the <input> (ariaLabelInput)', 'Label for slider value'),
  disabled: boolean('Disabled (disabled)', false),
  light: boolean('Light variant (light)', false),
  hideTextInput: boolean('Without text input (hideTextInput)', false),
  // value: !sliderValuePropSync ? 50 : number('The value (value)', 50),
  value: 50,
  min: number('The minimum value (min)', 0),
  max: number('The maximum value (max)', 100),
  step: number('The step (step)', 1),
  stepMuliplier: number('The step factor for Shift+arrow keys (stepMuliplier)', 4),
  labelText: text('Label text (labelText)', 'Slider Label'),
  minLabel: text('Label for minimum value (minLabel)', ''),
  maxLabel: text('Label for maximum value (maxLabel)', ''),
  onChange: action('onChange'),
  onRelease: action('onRelease'),
});

export default {
  title: 'Slider',
  decorators: [withKnobs],
};

export const Default = () => <Slider id="slider" {...props()} />;

Default.story = {
  name: 'default',

  parameters: {
    info: {
      text: `
              Sliders provide a visual indication of adjustable content, where the user can move the handle along a horizontal track to increase or decrease the value.
            `,
    },
  },
};
