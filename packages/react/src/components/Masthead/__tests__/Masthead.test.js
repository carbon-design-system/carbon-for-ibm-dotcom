/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Masthead from '../Masthead';
import { shallow } from 'enzyme';

describe('Masthead', () => {
  describe('Renders as expected', () => {
    const masthead = shallow(<Masthead type="branded" />);
    it('should render the masthead', () => {
      expect(masthead.find('.masthead')).toHaveLength(1);
    });
  });
});
