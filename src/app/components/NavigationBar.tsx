import { Search, Bell, User, Brain } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';

export function NavigationBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const goToExploreSearch = () => {
    const query = searchValue.trim();
    if (query) {
      navigate(`/explore?q=${encodeURIComponent(query)}`);
    } else {
      navigate('/explore');
    }
    setIsSearchOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black' : 'bg-gradient-to-b from-black/80 to-transparent'
    }`}>
      <div className="flex items-center justify-between px-4 md:px-12 py-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 group">
            <Brain className="w-8 h-8 text-red-600 group-hover:text-red-500 transition" />
            <span className="text-2xl font-bold">
              <span className="text-white group-hover:text-zinc-200 transition">CENTR</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 group-hover:from-red-400 group-hover:via-purple-400 group-hover:to-pink-400 transition">AI</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-white">
            <Link
              to="/"
              className={`hover:text-zinc-300 transition ${isActive('/') ? 'text-red-500 font-semibold' : ''}`}
            >
              Accueil
            </Link>
            <Link
              to="/explore"
              className={`hover:text-zinc-300 transition ${isActive('/explore') ? 'text-red-500 font-semibold' : ''}`}
            >
              Explorer
            </Link>
            <Link
              to="/predict"
              className={`hover:text-zinc-300 transition ${isActive('/predict') ? 'text-red-500 font-semibold' : ''}`}
            >
              Prédiction
            </Link>
            <Link
              to="/stats"
              className={`hover:text-zinc-300 transition ${isActive('/stats') ? 'text-red-500 font-semibold' : ''}`}
            >
              Statistiques
            </Link>
            <Link
              to="/about"
              className={`hover:text-zinc-300 transition ${isActive('/about') ? 'text-red-500 font-semibold' : ''}`}
            >
              À propos
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              if (isSearchOpen) {
                goToExploreSearch();
                return;
              }
              setIsSearchOpen(true);
            }}
            className="text-white hover:text-zinc-300 transition"
            aria-label="Search movies"
          >
            <Search className="w-5 h-5" />
          </button>
          <button className="text-white hover:text-zinc-300 transition hidden md:block">
            <Bell className="w-5 h-5" />
          </button>
          <button
            className="text-white hover:text-zinc-300 transition"
            onClick={() => navigate('/about')}
            aria-label="Open user section"
          >
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="px-4 md:px-12 pb-4">
          <input
            type="text"
            placeholder="Rechercher des films, genres..."
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                goToExploreSearch();
              }
            }}
            className="w-full bg-zinc-900 text-white px-4 py-2 rounded-md border border-zinc-800 focus:border-red-500 focus:outline-none"
            autoFocus
          />
        </div>
      )}
    </nav>
  );
}
