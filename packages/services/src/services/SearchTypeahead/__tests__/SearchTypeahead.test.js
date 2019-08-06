import SearchTypeaheadAPI from '../SearchTypeahead';
import fetchMock from 'fetch-mock';
import responseSuccess from './data/response.json';

const _lc = 'en'; // TODO: bake in tests where lc changes
const _cc = 'us'; // TODO: bake in tests where cc changes

describe('SearchTypeaheadAPI', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should search for ibm.com results', async () => {
    const query = 'red hat';
    const endpoint = `${process.env.SEARCH_TYPEAHEAD_HOST}/search/typeahead/${process.env.SEARCH_TYPEAHEAD_VERSION}`;
    const fetchUrl = `${endpoint}&lang=${_lc}&cc=${_cc}&q=${encodeURIComponent(
      query
    )}`;

    fetchMock.getOnce(fetchUrl, responseSuccess);
    const response = await SearchTypeaheadAPI.getResults(query);
    expect(response).toEqual(responseSuccess);
  });
});
