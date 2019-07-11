import MovieSearchAPI from '../MovieSearch';

describe('MovieSearchAPI', () => {
  it('should search for movies', async () => {
    const response = await MovieSearchAPI.getMovies('marvel');
    console.log(response);
  });
});
