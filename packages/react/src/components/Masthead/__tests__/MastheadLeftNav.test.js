/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import MastheadLeftNav from '../MastheadLeftNav';
import { mount } from 'enzyme';
import React from 'react';
import { TranslationAPI } from '@carbon/ibmdotcom-services';

const { stablePrefix } = ddsSettings;

describe('MastheadLeftNav', () => {
  it('renders one MastheadLeftNav', () => {
    const wrapper = mount(<MastheadLeftNav navigation={[]} />);
    expect(wrapper).toHaveLength(1);
  });

  it('receives the `navigation` prop correctly', async () => {
    const data = await TranslationAPI.getTranslation();
    const wrapper = mount(
      <MastheadLeftNav navigation={data.mastheadNav.links} />
    );
    expect(wrapper.prop('navigation')).not.toBeUndefined();
  }, 10000);

  it('renders the platform name and link if there`s available', () => {
    const platform = {
      name: 'IBM Cloud',
      url: 'https://www.ibm.com/cloud',
    };

    const component = mount(
      <MastheadLeftNav navigation={[]} platform={platform} />
    );
    expect(
      component
        .find(`nav[data-autoid="${stablePrefix}--masthead__l0-sidenav"]`)
        .children()
    ).toHaveLength(2);
  });
});
