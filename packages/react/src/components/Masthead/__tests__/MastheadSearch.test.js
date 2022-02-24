/**
 * Copyright IBM Corp. 2016, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import Masthead from '../Masthead';
import { mount } from 'enzyme';
import React from 'react';
import SearchTypeaheadAPI from '../../../internal/vendor/@carbon/ibmdotcom-services/services/SearchTypeahead/SearchTypeahead';

const { stablePrefix } = ddsSettings;

jest.mock(
  '../../../internal/vendor/@carbon/ibmdotcom-services/services/SearchTypeahead/SearchTypeahead',
  () => ({
    getResults: jest.fn(() =>
      Promise.resolve([
        ['red hat', '0'],
        ['red hat linux', '1'],
        ['red hat enterprise linux x3500 7977', '2'],
        ['red hat acquisition', '3'],
      ])
    ),
  })
);

describe('MastheadSearch', () => {
  it('should search for results if the user enters 3 or more characters', async () => {
    const masthead = mount(<Masthead searchOpenOnload />);
    const input = masthead.find(
      `[data-autoid="${stablePrefix}--header__search--input"]`
    );

    input.simulate('change', {
      target: {
        value: 'IBM',
      },
    });
    input.simulate('focus');
    expect(SearchTypeaheadAPI.getResults).toHaveBeenCalled();
  });
});
