/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Callout from '../Callout';
import React from 'react';
import readme from '../README.stories.mdx';
import { withKnobs } from '@storybook/addon-knobs';

export default {
  title: 'Components|Callout',
  decorators: [withKnobs],

  parameters: {
    ...readme.parameters,
  },
};

export const SimpleExample = () => {
  const children = <p style={{ color: 'white' }}>hello world</p>;
  return (
    <div className="bx--grid">
      <div className="bx--row">
        <div className="bx--col-sm-4 bx--col-lg-8 bx--col-lg-12 bx--offset-lg-4">
          <Callout children={children} />
        </div>
      </div>
    </div>
  );
};

SimpleExample.story = {
  name: 'Simple example',
};
