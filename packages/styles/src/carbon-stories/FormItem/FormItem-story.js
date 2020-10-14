/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { FormItem, NumberInput } from 'carbon-components-react';

export default {
  title: 'FormItem',
};

export const Default = () => (
  <FormItem>
    <NumberInput id="number-input-1" hideLabel />
  </FormItem>
);

Default.story = {
  parameters: {
    info: {
      text: 'Form item.',
    },
  },
};
