/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import Callout from '../Callout';
import React from 'react';
import { shallow } from 'enzyme';

const children = <p>hello world</p>;

describe('Callout', () => {
  it('renders as expected', () => {
    const callout = shallow(<Callout children={children} />);
    expect(callout.find('.bx--callout__container')).toHaveLength(1);
    expect(callout.find('.bx--callout__column')).toHaveLength(1);
    expect(callout.find('.bx--callout__content')).toHaveLength(1);
  });
});
