/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import LegalNav from '../LegalNav';
import React from 'react';
import { shallow } from 'enzyme';

const FOOTER_NAV_DATA = require('../__data__/footer-thin.json');

describe('<LegalNav />', () => {
  let MOCK_DATA;

  beforeEach(() => {
    MOCK_DATA = JSON.parse(JSON.stringify(FOOTER_NAV_DATA));
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

    // adding an additional LI to legalNav for the `dds-privacy-cp` placeholder
    expect(legalNav.find('.bx--legal-nav__list-item')).toHaveLength(
      FOOTER_NAV_DATA.length
    );
  });

  it('does not render nav item when url is missing', () => {
    delete MOCK_DATA[0].url;

    const legalNav = shallow(<LegalNav links={MOCK_DATA} />);

    expect(legalNav.exists('.bx--legal-nav')).toBeTruthy();

    // adding an additional LI to legalNav for the `dds-privacy-cp` placeholder
    expect(legalNav.find('.bx--legal-nav__list-item')).toHaveLength(
      FOOTER_NAV_DATA.length
    );
  });

  it('renders as expected', () => {
    const legalNav = shallow(<LegalNav links={MOCK_DATA} />);

    expect(legalNav.exists('.bx--legal-nav')).toBeTruthy();

    // adding an additional LI to legalNav for the `dds-privacy-cp` placeholder
    expect(legalNav.find('.bx--legal-nav__list-item')).toHaveLength(
      FOOTER_NAV_DATA.length + 1
    );
  });
});
