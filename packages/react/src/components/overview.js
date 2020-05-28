/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import README from '../../README.md';
import { withDocs } from 'storybook-readme';

export default {
  title: 'Overview|Get Started',
  parameters: {
    percy: {
      skip: true,
    },
  },
  decorators: [
    storyFn => <div className="storybook-center-container">{storyFn()}</div>,
  ],
};

export const Default = withDocs(README, () => <div />);

Default.story = {
  title: 'Read Me',
};
