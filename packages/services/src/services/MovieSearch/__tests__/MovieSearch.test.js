import MovieSearchAPI from '../MovieSearch';
import fetchMock from 'fetch-mock';
import responseSuccess from './data/response.json';

describe('MovieSearchAPI', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should search for movies', async () => {
    const query = 'marvel';
    fetchMock.get(
      `https://api.themoviedb.org/3/search/movie?api_key=123abc&query=${query}`,
      responseSuccess
    );
    const response = await MovieSearchAPI.getMovies(query);
    expect(response).toEqual(responseSuccess);
  });
});
