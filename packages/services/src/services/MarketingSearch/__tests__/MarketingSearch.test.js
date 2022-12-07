/**
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import MarketingSearchAPI from '../MarketingSearch';
import mockAxios from 'axios';
import responseSuccess from './data/response.json';

const _lc = 'en'; // TODO: bake in tests where lc changes
const _cc = 'us'; // TODO: bake in tests where cc changes

describe('MarketingSearchAPI', () => {
  beforeEach(function () {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: responseSuccess,
      })
    );
  });

  it('should search for ibm.com marketing results', async () => {
    const query = 'red hat';
    const endpoint = `${process.env.MARKETING_SEARCH_HOST}/marketplace/api/search/${process.env.MARKETING_SEARCH_VERSION}/combined_suggestions`;
    const fetchUrl = `${endpoint}?locale=${_lc}-${_cc}&q=${encodeURIComponent(
      query
    )}`;

    const response = await MarketingSearchAPI.getResults(query);

    expect(response).toEqual(responseSuccess);
    expect(mockAxios.get).toHaveBeenCalledWith(fetchUrl, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
  });
});
