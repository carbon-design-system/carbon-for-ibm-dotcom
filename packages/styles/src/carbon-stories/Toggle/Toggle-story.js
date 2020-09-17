/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { Toggle, ToggleSkeleton } from 'carbon-components-react';

const a11yProps = () => ({
  labelText: text('Label toggle input control (labelText)', ''),
  ['aria-label']: text('ARIA label of the toggle (aria-label)', ''),
});

const toggleProps = () => ({
  ...a11yProps(),
  className: 'some-class',
  labelA: text('Label for untoggled state (labelA)', 'Off'),
  labelB: text('Label for toggled state (labelB)', 'On'),
  disabled: boolean('Disabled (disabled)', false),
  onChange: action('onChange'),
  onToggle: action('onToggle'),
});

export default {
  title: 'Toggle',
  decorators: [withKnobs],
};

export const Toggled = () => (
  <Toggle defaultToggled {...toggleProps()} className="some-class" id="toggle-1" />
);

Toggled.story = {
  name: 'toggled',

  parameters: {
    info: {
      text: `
          Toggles are controls that are used to quickly switch between two possible states. The example below shows
          an uncontrolled Toggle component. To use the Toggle component as a controlled component, set the toggled property.
          Setting the toggled property will allow you to change the value dynamically, whereas setting the defaultToggled
          prop will only set the value initially. This example has defaultToggled set to true.
        `,
    },
  },
};

export const Untoggled = () => <Toggle {...toggleProps()} className="some-class" id="toggle-1" />;

Untoggled.story = {
  name: 'untoggled',

  parameters: {
    info: {
      text: `
          Toggles are controls that are used to quickly switch between two possible states. The example below shows
          an uncontrolled Toggle component. To use the Toggle component as a controlled component, set the toggled property.
          Setting the toggled property will allow you to change the value dynamically, whereas setting the defaultToggled
          prop will only set the value initially. This example has defaultToggled set to false.
        `,
    },
  },
};
