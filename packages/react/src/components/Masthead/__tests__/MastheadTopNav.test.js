/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import MastheadTopNav from '../MastheadTopNav';
import mockData from './data/response.json';
import { mount } from 'enzyme';
import React from 'react';

const { stablePrefix } = ddsSettings;

describe('MastheadTopNav', () => {
  it('renders one MastheadTopNav', () => {
    const wrapper = mount(<MastheadTopNav navigation={[]} />);

    expect(wrapper).toHaveLength(1);
  });

  it('renders all the itens based in the `navigation` prop', () => {
    const wrapper = mount(<MastheadTopNav navigation={mockData.links} />);
    const menuItems = mockData.links.map((_itens, index) => {
      return wrapper.find(
        `a[data-autoid="${stablePrefix}--masthead__l0-nav--nav-${index}"]`
      );
    });

    expect(menuItems).toHaveLength(mockData.links.length);
  });

  it('uses the platform name and link correctly', () => {
    const platform = {
      name: 'IBM Cloud',
      url: 'https://www.ibm.com/cloud',
    };

    const wrapper = mount(
      <MastheadTopNav navigation={[]} platform={platform} />
    );
    const headerName = wrapper.find(
      `a[data-autoid="${stablePrefix}--masthead__platform-name"]`
    );
    expect(headerName.prop('href')).toMatch(platform.url);
    expect(headerName.text()).toMatch(platform.name);
  });
});
