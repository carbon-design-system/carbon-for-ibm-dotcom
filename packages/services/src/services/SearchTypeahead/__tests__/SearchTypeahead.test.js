/**
 * Copyright IBM Corp. 2020, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import mockAxios from 'axios';
import responseSuccess from './data/response.json';
import SearchTypeaheadAPI from '../SearchTypeahead';
import { LocaleAPI } from '../../Locale';

const _lc = 'en'; // TODO: bake in tests where lc changes
const _cc = 'us'; // TODO: bake in tests where cc changes

describe('SearchTypeaheadAPI', () => {
  beforeEach(function () {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: responseSuccess,
      })
    );

    // Restore any mocks back to a predictable state.
    jest.restoreAllMocks();
  });

  it('should search for ibm.com results with just lc param', async () => {
    jest.spyOn(LocaleAPI, 'getLang').mockReturnValue(
      Promise.resolve({
        lc: 'en',
      })
    );
    const query = 'red hat';
    const endpoint = `${process.env.SEARCH_TYPEAHEAD_API}/search/typeahead/${process.env.SEARCH_TYPEAHEAD_VERSION}`;
    const fetchUrl = `${endpoint}?lang=${_lc}&query=${encodeURIComponent(
      query
    )}`;

    const response = await SearchTypeaheadAPI.getResults(query);

    expect(response).toEqual(responseSuccess.response);
    expect(mockAxios.get).toHaveBeenCalledWith(fetchUrl, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  });

  it('should search for ibm.com results with both cc and lc param', async () => {
    jest.spyOn(LocaleAPI, 'getLang').mockReturnValue(
      Promise.resolve({
        lc: 'en',
        cc: 'us',
      })
    );

    const query = 'red hat';
    const endpoint = `${process.env.SEARCH_TYPEAHEAD_API}/search/typeahead/${process.env.SEARCH_TYPEAHEAD_VERSION}`;
    const fetchUrl = `${endpoint}?lang=${_lc}&cc=${_cc}&query=${encodeURIComponent(
      query
    )}`;

    const response = await SearchTypeaheadAPI.getResults(query);

    expect(response).toEqual(responseSuccess.response);
    expect(mockAxios.get).toHaveBeenCalledWith(fetchUrl, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  });
});
