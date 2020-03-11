/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import FooterNav from '../FooterNav';
import React from 'react';
import { shallow } from 'enzyme';

const FOOTER_NAV_DATA = require('../__data__/footer-menu.json');

describe('<FooterNav />', () => {
  it('returns null if no "groups" prop', () => {
    const footerNav = shallow(<FooterNav />);
    expect(footerNav.isEmptyRender()).toBeTruthy();
  });

  it('returns null if "groups" prop has no length', () => {
    const footerNav = shallow(<FooterNav groups={[]} />);
    expect(footerNav.isEmptyRender()).toBeTruthy();
  });

  it('renders as expected', () => {
    const footerNav = shallow(<FooterNav groups={FOOTER_NAV_DATA} />);

    expect(footerNav.hasClass('bx--footer-nav')).toBeTruthy();
  });
});
