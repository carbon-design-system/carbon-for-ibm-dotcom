import mockAxios from 'axios';
import TranslationAPI from '../Translation';
import responseSuccess from './data/response.json';

const _lc = 'en'; // TODO: bake in tests where lc changes
const _cc = 'us'; // TODO: bake in tests where cc changes

describe('TranslationAPI', () => {
  beforeEach(function() {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: responseSuccess,
      })
    );
  });

  it('should fetch the i18n data', async () => {
    const endpoint = `${process.env.TRANSLATION_HOST}/common/v18/js/data/jsononly`;
    const fetchUrl = `${endpoint}/${_cc}${_lc}.json`;

    const response = await TranslationAPI.getTranslation();
    expect(response).toEqual(responseSuccess);

    expect(mockAxios.get).toHaveBeenCalledWith(fetchUrl, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  });
});
