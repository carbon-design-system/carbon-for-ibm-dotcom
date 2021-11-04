/**
 * Copyright IBM Corp. 2016, 2021
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
  const hasCurrentUrl = () => {
    return null;
  };

  it('renders one MastheadTopNav', () => {
    const wrapper = mount(
      <MastheadTopNav navigation={[]} hasCurrentUrl={hasCurrentUrl} />
    );

    expect(wrapper).toHaveLength(1);
  });

  it('renders all the items based in the `navigation` prop', () => {
    const wrapper = mount(
      <MastheadTopNav
        navigation={mockData.links}
        hasCurrentUrl={hasCurrentUrl}
      />
    );
    const menuItems = mockData.links.map((_items, index) => {
      return wrapper.find(
        `a[data-autoid="${stablePrefix}--masthead-default__l1-nav${index}"]`
      );
    });

    expect(menuItems).toHaveLength(mockData.links.length);
  });

  it('uses the platform name and link correctly', () => {
    const platform = {
      name: 'IBM Cloud',
      url: 'https://www.ibm.com/cloud',
    };

    const navType = 'eco';

    const wrapper = mount(
      <MastheadTopNav
        navigation={[]}
        navType={navType}
        platform={platform}
        hasCurrentUrl={hasCurrentUrl}
      />
    );

    const headerName = wrapper.find(
      `a[data-autoid="${stablePrefix}--masthead-${navType}__l0-ecosystemname"]`
    );
    expect(headerName.prop('href')).toMatch(platform.url);
    expect(headerName.text()).toMatch(platform.name);
  });
});
