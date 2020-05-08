/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import CalloutWithMedia from '../CalloutWithMedia';
import React from 'react';
import { shallow } from 'enzyme';

describe('CalloutWithMedia', () => {
  it('renders as expected', () => {
    const contentblocksimple = {
      copy: 'Lorem  ipsum dolor sit amet',
      heading: 'Lorem  ipsum dolor sit amet',
    };

    const callout = shallow(
      <CalloutWithMedia contentblocksimple={contentblocksimple} />
    );

    expect(callout.find('.bx--callout-with-media')).toHaveLength(1);
  });
});
