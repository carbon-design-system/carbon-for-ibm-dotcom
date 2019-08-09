/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Masthead from '../MastheadSearch';
import { mount } from 'enzyme';
import responseData from './data/response.json';
import { SearchTypeaheadAPI } from '@ibmdotcom/services';

jest.mock('@ibmdotcom/services');

describe('MastheadSearch', () => {
  beforeAll(() => {
    SearchTypeaheadAPI.mockImplementation(() => {
      return {
        getResults: jest.fn(() => Promise.resolve(responseData)),
      };
    });
  });

  beforeEach(() => {
    SearchTypeaheadAPI.mockClear();
  });

  it('should search for results if the user enters 3 or more characters', async () => {
    const masthead = mount(<Masthead />);
    const input = masthead.find('[data-autoid="masthead__search--input"]');
    input.instance().value = 'IBM';
    input.simulate('change');
    expect(SearchTypeaheadAPI.getResults).toHaveBeenCalled();
  });

  /*it('should redirect to the results page when a user clicks a suggestion', async () => {
    const masthead = mount(<Masthead />);

    // Set the search input value
    const input = masthead.find('[data-autoid="masthead__search--input"]');
    input.instance().value = 'IBM';
    input.simulate('change');

    // Trigger clicking the first result
    setImmediate(() => {
      const suggestion = masthead.find('[data-autoid="masthead__searchresults--suggestion"]');
      suggestion.simulate('click');
      expect(global.window.location.href).toEqual('/new-url');
    });

    // ${_redirectUrl}&q=${suggestionValue}&lang=${lang}&cc=${cc}
  })*/
});
