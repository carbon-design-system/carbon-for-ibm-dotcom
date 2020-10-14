/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { ContentSwitcher, Switch } from 'carbon-components-react';

const props = {
  contentSwitcher: () => ({
    onChange: action('onChange'),
  }),
  switch: () => ({
    onClick: action('onClick - Switch'),
    disabled: boolean('Disabled (disabled)', false),
  }),
};

export default {
  title: 'ContentSwitcher',
  decorators: [withKnobs],
};

export const Default = () => {
  const switchProps = props.switch();
  return (
    <ContentSwitcher {...props.contentSwitcher()}>
      <Switch name="one" text="First section" {...switchProps} />
      <Switch name="two" text="Second section" {...switchProps} />
      <Switch name="three" text="Third section" {...switchProps} />
    </ContentSwitcher>
  );
};

Default.story = {
  parameters: {
    info: {
      text: `
          The Content Switcher component manipulates the content shown following an exclusive or “either/or” pattern.
          Create Switch components for each section in the content switcher.
        `,
    },
  },
};

export const Selected = () => {
  const switchProps = props.switch();
  return (
    <ContentSwitcher {...props.contentSwitcher()} selectedIndex={1}>
      <Switch name="one" text="First section" {...switchProps} />
      <Switch name="two" text="Second section" {...switchProps} />
      <Switch name="three" text="Third section" {...switchProps} />
    </ContentSwitcher>
  );
};

Selected.story = {
  parameters: {
    info: {
      text: `
           Render the Content Switcher with a different section automatically selected
         `,
    },
  },
};
