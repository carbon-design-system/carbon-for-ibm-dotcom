/**
 * Copyright IBM Corp. 2016, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import MastheadLeftNav from '../MastheadLeftNav';
import mockData from './data/response.json';
import { mount } from 'enzyme';
import React from 'react';

const { stablePrefix } = ddsSettings;

describe('MastheadLeftNav', () => {
  it('renders one MastheadLeftNav', () => {
    const wrapper = mount(<MastheadLeftNav navigation={[]} />);
    expect(wrapper).toHaveLength(1);
  });

  it('receives the `navigation` prop correctly', () => {
    const wrapper = mount(<MastheadLeftNav navigation={mockData.links} />);
    expect(wrapper.prop('navigation')).not.toBeUndefined();
  });

  it('receives the `platform` prop correctly', () => {
    const platform = {
      name: 'IBM Cloud',
      url: 'https://www.ibm.com/cloud',
    };

    const component = mount(
      <MastheadLeftNav navigation={[]} platform={platform} />
    );

    const anchor = component.find(
      `a[data-autoid="${stablePrefix}--masthead-eco__l0-side-nav__productname"]`
    );

    expect(anchor.text()).toMatch('IBM Cloud');
    expect(anchor.prop('href')).toMatch('https://www.ibm.com/cloud');
  });
});
