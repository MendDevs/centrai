import { useEffect, useMemo, useState } from 'react';
import { HeroBanner } from '../components/HeroBanner';
import { MovieRow } from '../components/MovieRow';
import { featuredMovie, moviesByGenre } from '../data/mockMovies';

export function HomePage() {
  const heroMovies = useMemo(() => {
    const uniqueMovies = new Map<number, (typeof featuredMovie)>();
    [featuredMovie, ...Object.values(moviesByGenre).flat()].forEach((movie) => {
      uniqueMovies.set(movie.id, movie);
    });
    return Array.from(uniqueMovies.values()).slice(0, 8);
  }, []);

  const [activeHeroIndex, setActiveHeroIndex] = useState(0);

  useEffect(() => {
    if (heroMovies.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveHeroIndex((previous) => (previous + 1) % heroMovies.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [heroMovies.length]);

  const activeHeroMovie = heroMovies[activeHeroIndex] ?? featuredMovie;

  return (
    <div>
      <div className="relative">
        <HeroBanner key={activeHeroMovie.id} {...activeHeroMovie} />
        {heroMovies.length > 1 && (
          <div className="absolute bottom-28 left-4 md:left-12 z-20 flex items-center gap-2">
            {heroMovies.map((movie, index) => (
              <button
                key={movie.id}
                onClick={() => setActiveHeroIndex(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === activeHeroIndex ? 'w-8 bg-white' : 'w-3 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Show featured movie ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
      <div className="relative z-10 -mt-32">
        {Object.entries(moviesByGenre).map(([category, movies]) => (
          <MovieRow key={category} title={category} movies={movies} />
        ))}
      </div>
    </div>
  );
}
