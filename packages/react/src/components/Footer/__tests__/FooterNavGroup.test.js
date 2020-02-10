/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import FooterNavGroup from '../FooterNavGroup';
import React from 'react';
import { shallow } from 'enzyme';

const FOOTER_NAV_DATA = require('../__data__/footer-menu.json');

describe('<FooterNavGroup />', () => {
  let MOCK_DATA;

  beforeEach(() => {
    MOCK_DATA = JSON.parse(JSON.stringify(FOOTER_NAV_DATA[0]));
  });

  it('returns null if no props', () => {
    const footerNavGroup = shallow(<FooterNavGroup />);

    expect(footerNavGroup.isEmptyRender()).toBeTruthy();
  });

  it('returns null if no "title" prop', () => {
    const footerNavGroup = shallow(<FooterNavGroup links={MOCK_DATA.links} />);

    expect(footerNavGroup.isEmptyRender()).toBeTruthy();
  });

  it('returns null if no "links" prop', () => {
    const footerNavGroup = shallow(<FooterNavGroup title={MOCK_DATA.title} />);

    expect(footerNavGroup.isEmptyRender()).toBeTruthy();
  });

  it('returns null if "links" prop has no length', () => {
    const footerNavGroup = shallow(
      <FooterNavGroup title={MOCK_DATA.title} links={[]} />
    );

    expect(footerNavGroup.isEmptyRender()).toBeTruthy();
  });

  it('item child returns null if "title" is missing', () => {
    delete MOCK_DATA.links[0].title;

    const footerNavGroup = shallow(
      <FooterNavGroup title={MOCK_DATA.title} links={MOCK_DATA.links} />
    );

    expect(footerNavGroup.exists('.bx--footer-nav-group')).toBeTruthy();
    expect(footerNavGroup.find('.bx--footer-nav-group__item')).toHaveLength(
      FOOTER_NAV_DATA[0].links.length - 1
    );
  });

  it('item child returns null if "url" is missing', () => {
    delete MOCK_DATA.links[0].url;

    const footerNavGroup = shallow(
      <FooterNavGroup title={MOCK_DATA.title} links={MOCK_DATA.links} />
    );

    expect(footerNavGroup.exists('.bx--footer-nav-group')).toBeTruthy();
    expect(footerNavGroup.find('.bx--footer-nav-group__item')).toHaveLength(
      FOOTER_NAV_DATA[0].links.length - 1
    );
  });

  it('renders as expected', () => {
    const footerNavGroup = shallow(
      <FooterNavGroup title={MOCK_DATA.title} links={MOCK_DATA.links} />
    );

    expect(footerNavGroup.exists('.bx--footer-nav-group')).toBeTruthy();
    expect(footerNavGroup.find('.bx--footer-nav-group__item')).toHaveLength(
      FOOTER_NAV_DATA[0].links.length
    );
  });
});
