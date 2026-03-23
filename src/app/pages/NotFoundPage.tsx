import { Home, Search } from 'lucide-react';
import { Link } from 'react-router';

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-white text-9xl mb-4">404</h1>
        <h2 className="text-white text-3xl mb-4">Page non trouvée</h2>
        <p className="text-zinc-400 mb-8 max-w-md mx-auto">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <Home size={20} />
            Retour à l'accueil
          </Link>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white px-6 py-3 rounded-lg transition-colors border border-zinc-800"
          >
            <Search size={20} />
            Explorer les films
          </Link>
        </div>
      </div>
    </div>
  );
}
