/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { shallow } from 'enzyme';
import LegalNav from '../LegalNav';

import LEGAL_NAV_DATA from './data/footer-legal';

describe('<LegalNav />', () => {
  let MOCK_DATA;

  beforeEach(() => {
    MOCK_DATA = JSON.parse(JSON.stringify(LEGAL_NAV_DATA));
  });

  it('returns null if no "links" prop', () => {
    const legalNav = shallow(<LegalNav />);

    expect(legalNav.isEmptyRender()).toBeTruthy();
  });

  it('returns null if "links" prop has no length', () => {
    const legalNav = shallow(<LegalNav links={[]} />);

    expect(legalNav.isEmptyRender()).toBeTruthy();
  });

  it('does not render nav item when title is missing', () => {
    delete MOCK_DATA[0].title;

    const legalNav = shallow(<LegalNav links={MOCK_DATA} />);

    expect(legalNav.exists('.bx--legal-nav')).toBeTruthy();
    expect(legalNav.find('.bx--legal-nav__list-item')).toHaveLength(
      LEGAL_NAV_DATA.length - 1
    );
  });

  it('does not render nav item when url is missing', () => {
    delete MOCK_DATA[0].url;

    const legalNav = shallow(<LegalNav links={MOCK_DATA} />);

    expect(legalNav.exists('.bx--legal-nav')).toBeTruthy();
    expect(legalNav.find('.bx--legal-nav__list-item')).toHaveLength(
      LEGAL_NAV_DATA.length - 1
    );
  });

  it('renders as expected', () => {
    const legalNav = shallow(<LegalNav links={MOCK_DATA} />);

    expect(legalNav.exists('.bx--legal-nav')).toBeTruthy();
    expect(legalNav.find('.bx--legal-nav__list-item')).toHaveLength(
      LEGAL_NAV_DATA.length
    );
  });
});
