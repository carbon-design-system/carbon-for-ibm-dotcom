/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import LinkList from '../LinkList';
import React from 'react';
import { shallow } from 'enzyme';

const items = [
  {
    heading: 'Lorem ipsum dolor sit amet',
    type: 'local',
    cta: {
      href: 'https://example.com',
    },
  },
];

describe('<LinkList />', () => {
  it('renders as expected', () => {
    const linkList = shallow(<LinkList heading="Tutorials" items={items} />);

    expect(linkList.hasClass('bx--link-list')).toBeTruthy();
    expect(linkList.find('.bx--link-list__heading')).toHaveLength(1);
    expect(linkList.find('.bx--link-list__list')).toHaveLength(1);
    expect(linkList.find('.bx--link-list__CTA')).toHaveLength(0);
  });

  it('returns warning if no title provided', () => {
    const linkList = shallow(<LinkList items={items} />);
    expect(linkList.isEmptyRender()).toBeFalsy();
  });

  it("renders linklist's cta if provided", () => {
    const linkList = shallow(<LinkList items={items} heading="Hello world!" />);
    expect(linkList.find('.bx--link-list')).toHaveLength(1);
  });
});
