/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { settings as ddsSettings } from '@carbon/ibmdotcom-utilities';
import MastheadSearch from '../MastheadSearch';
import { mount } from 'enzyme';
import React from 'react';
import { SearchTypeaheadAPI } from '@carbon/ibmdotcom-services';

const { stablePrefix } = ddsSettings;

jest.mock('@carbon/ibmdotcom-services', () => ({
  __esModule: true,
  SearchTypeaheadAPI: {
    getResults: jest.fn(() =>
      Promise.resolve([
        ['red hat', '0'],
        ['red hat linux', '1'],
        ['red hat enterprise linux x3500 7977', '2'],
        ['red hat acquisition', '3'],
      ])
    ),
  },
}));

/**
 * Helper function returns a promise that resolves after all other promise mocks,
 * even if they are chained like Promise.resolve().then(...)
 * Technically: this is designed to resolve on the next macrotask
 * From: https://stackoverflow.com/questions/37408834/testing-with-reacts-jest-and-enzyme-when-simulated-clicks-call-a-function-that
 *
 * @returns {Promise} Immediately resolved promise
 */
function tick() {
  return new Promise(resolve => {
    setTimeout(resolve, 0);
  });
}

// TODO: fix these tests
xdescribe('MastheadSearch', () => {
  it('should search for results if the user enters 3 or more characters', async () => {
    const masthead = mount(<MastheadSearch />);
    const input = masthead.find(
      `[data-autoid="${stablePrefix}--header__search--input"]`
    );

    input.simulate('change', {
      target: {
        value: 'IBM',
      },
    });
    input.simulate('focus');
    await tick();

    expect(SearchTypeaheadAPI.getResults).toHaveBeenCalled();
  });

  it('should redirect to the results page when a user clicks a suggestion', async () => {
    const masthead = mount(<MastheadSearch />);
    const input = masthead.find(
      `[data-autoid="${stablePrefix}--header__search--input"]`
    );

    input.simulate('change', {
      target: {
        value: 'IBM',
      },
    });
    input.simulate('focus');
    await tick();
    masthead.update();

    const suggestion = masthead
      .find('[data-autoid="masthead__searchresults--suggestion"]')
      .first();
    suggestion.simulate('click');
    await tick();
    expect(global.window.location.href).toEqual(
      'https://www.ibm.com/search?lnk=mhsrch&q=red%20hat&lang=en&cc=us'
    );
  });
});
