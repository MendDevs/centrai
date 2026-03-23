import imdbCsvRaw from '../../../backend/imdb_top_1000.csv?raw';

export interface Movie {
  id: number;
  title: string;
  genre: string;
  rating: number;
  votes: number;
  popularity: number;
  imageUrl: string;
  description?: string;
  predictedGenre?: string;
  year?: number;
}

type CsvMovie = Movie & {
  rawGenres: string;
};

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = '';
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const nextChar = text[index + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentCell += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === ',' && !inQuotes) {
      currentRow.push(currentCell);
      currentCell = '';
      continue;
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        index += 1;
      }
      currentRow.push(currentCell);
      const hasContent = currentRow.some((cell) => cell.trim().length > 0);
      if (hasContent) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentCell = '';
      continue;
    }

    currentCell += char;
  }

  if (currentCell.length > 0 || currentRow.length > 0) {
    currentRow.push(currentCell);
    const hasContent = currentRow.some((cell) => cell.trim().length > 0);
    if (hasContent) {
      rows.push(currentRow);
    }
  }

  return rows;
}

function normalizePosterUrl(url: string): string {
  if (!url) {
    return '';
  }
  return url.replace(/\._V1_.*\.jpg$/i, '._V1_.jpg');
}

function normalizeGenre(rawGenre: string): string {
  const firstGenre = rawGenre.split(',')[0]?.trim() || 'Unknown';
  return firstGenre;
}

function predictGenre(mainGenre: string): string {
  const map: Record<string, string> = {
    Crime: 'Thriller',
    Biography: 'Drama',
    Adventure: 'Action',
    Animation: 'Comedy',
    Mystery: 'Thriller',
    Fantasy: 'Action',
    Family: 'Comedy',
    'Film-Noir': 'Thriller',
    History: 'Drama',
    Music: 'Drama',
    Sport: 'Drama',
    Western: 'Action',
  };

  return map[mainGenre] || mainGenre;
}

function toNumber(value: string): number {
  const parsed = Number.parseFloat((value || '').replaceAll(',', '').trim());
  return Number.isFinite(parsed) ? parsed : 0;
}

function createMoviesFromCsv(rawCsv: string): CsvMovie[] {
  const rows = parseCsv(rawCsv);
  if (rows.length <= 1) {
    return [];
  }

  const headers = rows[0];
  const bodyRows = rows.slice(1);
  const headerIndex = (headerName: string) => headers.findIndex((header) => header === headerName);

  const posterIndex = headerIndex('Poster_Link');
  const titleIndex = headerIndex('Series_Title');
  const yearIndex = headerIndex('Released_Year');
  const genreIndex = headerIndex('Genre');
  const ratingIndex = headerIndex('IMDB_Rating');
  const votesIndex = headerIndex('No_of_Votes');
  const popularityIndex = headerIndex('Meta_score');
  const overviewIndex = headerIndex('Overview');

  const maxVotes = bodyRows.reduce((highestVotes, row) => {
    const value = toNumber(row[votesIndex]);
    return value > highestVotes ? value : highestVotes;
  }, 1);

  const movies = bodyRows
    .map((row, index) => {
      const title = (row[titleIndex] || '').trim();
      const rawGenres = (row[genreIndex] || '').trim();
      const mainGenre = normalizeGenre(rawGenres);
      const rating = toNumber(row[ratingIndex]);
      const votes = Math.round(toNumber(row[votesIndex]));
      const metaScore = toNumber(row[popularityIndex]);
      const popularity = metaScore > 0 ? metaScore : (votes / maxVotes) * 50 + (rating / 10) * 50;
      const yearText = (row[yearIndex] || '').trim();
      const year = /^\d{4}$/.test(yearText) ? Number.parseInt(yearText, 10) : undefined;
      const imageUrl = normalizePosterUrl((row[posterIndex] || '').trim());
      const description = (row[overviewIndex] || '').trim();
      const predictedGenre = predictGenre(mainGenre);

      return {
        id: index + 1,
        title,
        genre: mainGenre,
        rating,
        votes,
        popularity,
        imageUrl,
        description,
        predictedGenre,
        year,
        rawGenres,
      } satisfies CsvMovie;
    })
    .filter((movie) => movie.title && movie.imageUrl && movie.rating > 0 && movie.votes > 0);

  return movies;
}

function takeTop(movies: CsvMovie[], limit: number, sorter: (a: CsvMovie, b: CsvMovie) => number): Movie[] {
  return [...movies]
    .sort(sorter)
    .slice(0, limit)
    .map(({ rawGenres: _rawGenres, ...movie }) => movie);
}

function takeTopByGenre(movies: CsvMovie[], genre: string, limit: number): Movie[] {
  return movies
    .filter((movie) => movie.genre === genre)
    .sort((a, b) => b.rating - a.rating || b.votes - a.votes)
    .slice(0, limit)
    .map(({ rawGenres: _rawGenres, ...movie }) => movie);
}

const csvMovies = createMoviesFromCsv(imdbCsvRaw);

export const allCsvMovies: Movie[] = csvMovies.map(({ rawGenres: _rawGenres, ...movie }) => movie);

const topRatedMovies = takeTop(csvMovies, 12, (a, b) => b.rating - a.rating || b.votes - a.votes);
const trendingMovies = takeTop(csvMovies, 12, (a, b) => b.popularity - a.popularity || b.votes - a.votes);
const mostVotedMovies = takeTop(csvMovies, 12, (a, b) => b.votes - a.votes || b.rating - a.rating);

const genreOrder = ['Action', 'Drama', 'Comedy', 'Thriller', 'Sci-Fi', 'Horror', 'Romance'];
const dynamicGenreRows = Object.fromEntries(
  genreOrder
    .map((genre) => [genre, takeTopByGenre(csvMovies, genre, 10)] as const)
    .filter(([, movies]) => movies.length > 0)
    .map(([genre, movies]) => [`${genre} Collection`, movies]),
);

export const moviesByGenre: Record<string, Movie[]> = {
  'Trending Now': trendingMovies,
  'Top Rated': topRatedMovies,
  'Most Voted': mostVotedMovies,
  ...dynamicGenreRows,
};

const featured = [...csvMovies].sort((a, b) => b.rating - a.rating || b.votes - a.votes)[0];

export const featuredMovie: Movie = featured
  ? {
      id: featured.id,
      title: featured.title,
      genre: featured.genre,
      rating: featured.rating,
      votes: featured.votes,
      popularity: featured.popularity,
      imageUrl: featured.imageUrl,
      description: featured.description || 'Featured from the IMDb dataset.',
      predictedGenre: featured.predictedGenre,
      year: featured.year,
    }
  : {
      id: 0,
      title: 'IMDb Featured Movie',
      genre: 'Drama',
      rating: 9,
      votes: 1000000,
      popularity: 90,
      imageUrl: '',
      description: 'Featured from the IMDb dataset.',
      predictedGenre: 'Drama',
      year: 1994,
    };
