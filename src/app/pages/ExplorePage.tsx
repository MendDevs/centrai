import { useEffect, useMemo, useState } from 'react';
import { Search, Filter, TrendingUp } from 'lucide-react';
import { MovieCard } from '../components/MovieCard';
import { allCsvMovies } from '../data/mockMovies';
import { useSearchParams } from 'react-router';

const sortOptions = ["Popularity", "Rating", "Year", "Votes"];

export function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') ?? '');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('Popularity');

  const genres = useMemo(
    () => ['All', ...Array.from(new Set(allCsvMovies.map((movie) => movie.genre))).sort()],
    [],
  );

  useEffect(() => {
    setSearchQuery(searchParams.get('q') ?? '');
  }, [searchParams]);

  const updateSearchQuery = (value: string) => {
    setSearchQuery(value);
    const nextParams = new URLSearchParams(searchParams);
    if (value.trim()) {
      nextParams.set('q', value);
    } else {
      nextParams.delete('q');
    }
    setSearchParams(nextParams, { replace: true });
  };

  const filteredMovies = allCsvMovies
    .filter(movie =>
      (selectedGenre === 'All' || movie.genre === selectedGenre) &&
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'Rating': return b.rating - a.rating;
        case 'Year': return (b.year || 0) - (a.year || 0);
        case 'Votes': return b.votes - a.votes;
        default: return b.popularity - a.popularity;
      }
    });

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-white mb-2">
            Explorer les films
          </h1>
          <p className="text-zinc-400">
            Découvrez notre collection complète de films avec prédictions AI
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher un film..."
              value={searchQuery}
              onChange={(e) => updateSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 text-white pl-12 pr-4 py-3 rounded-lg border border-zinc-800 focus:border-red-500 focus:outline-none"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            {/* Genre Filter */}
            <div className="flex-1 min-w-[200px]">
              <div className="flex items-center gap-2 mb-2">
                <Filter size={16} className="text-zinc-400" />
                <span className="text-zinc-400 text-sm">Genre</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {genres.map(genre => (
                  <button
                    key={genre}
                    onClick={() => setSelectedGenre(genre)}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${
                      selectedGenre === genre
                        ? 'bg-red-600 text-white'
                        : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort By */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={16} className="text-zinc-400" />
                <span className="text-zinc-400 text-sm">Trier par</span>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-zinc-900 text-white px-4 py-2 rounded-lg border border-zinc-800 focus:border-red-500 focus:outline-none"
              >
                {sortOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-zinc-400 mb-6">
          {filteredMovies.length} film{filteredMovies.length > 1 ? 's' : ''} trouvé{filteredMovies.length > 1 ? 's' : ''}
        </div>

        {/* Movie Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredMovies.map(movie => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>

        {filteredMovies.length === 0 && (
          <div className="text-center py-16">
            <p className="text-zinc-400 text-lg">Aucun film trouvé</p>
            <p className="text-zinc-500 text-sm mt-2">Essayez de changer vos filtres</p>
          </div>
        )}
      </div>
    </div>
  );
}
