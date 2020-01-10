import SearchTypeaheadAPI from '../SearchTypeahead';
import mockAxios from 'axios';
import responseSuccess from './data/response.json';

const _lc = 'en'; // TODO: bake in tests where lc changes
const _cc = 'us'; // TODO: bake in tests where cc changes

describe('SearchTypeaheadAPI', () => {
  beforeEach(function() {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: responseSuccess,
      })
    );
  });

  it('should search for ibm.com results', async () => {
    const query = 'red hat';
    const endpoint = `${process.env.SEARCH_TYPEAHEAD_HOST}/search/typeahead/${process.env.SEARCH_TYPEAHEAD_VERSION}`;
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
