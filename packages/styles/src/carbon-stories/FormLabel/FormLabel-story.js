/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { FormLabel, Tooltip } from 'carbon-components-react';

const additionalProps = {
  className: 'some-class',
};

export default {
  title: 'FormLabel',
};

export const Default = () => <FormLabel {...additionalProps}>Label</FormLabel>;

Default.story = {
  parameters: {
    info: {
      text: 'Form label.',
    },
  },
};

export const WithTooltip = () => (
  <FormLabel {...additionalProps}>
    <Tooltip triggerText="Label">This is the content of the tooltip.</Tooltip>
  </FormLabel>
);

WithTooltip.story = {
  name: 'With tooltip',

  parameters: {
    info: {
      text: 'Form label with tooltip.',
    },
  },
};
