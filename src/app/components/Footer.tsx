import { Brain, Github, Mail, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router';

export function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-400 py-12 px-4 md:px-12 mt-16 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Brain className="w-6 h-6 text-red-600" />
              <span className="text-xl font-bold">
                <span className="text-white">CENTR</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-pink-500">AI</span>
              </span>
            </div>
            <p className="text-sm">
              Plateforme de prédiction de genres de films utilisant l'intelligence artificielle et le modèle Naive Bayes.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition">Accueil</Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-white transition">Explorer</Link>
              </li>
              <li>
                <Link to="/predict" className="hover:text-white transition">Prédiction AI</Link>
              </li>
              <li>
                <Link to="/stats" className="hover:text-white transition">Statistiques</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">À propos</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Technologie</h3>
            <ul className="space-y-2 text-sm">
              <li>Naive Bayes ML</li>
              <li>React + TypeScript</li>
              <li>Tailwind CSS v4</li>
              <li>Python Backend</li>
              <li>Données IMDb</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Performances</h3>
            <ul className="space-y-2 text-sm">
              <li>Précision: <span className="text-green-400">89.2%</span></li>
              <li>Rappel: <span className="text-green-400">87.5%</span></li>
              <li>F1-Score: <span className="text-green-400">88.3%</span></li>
              <li>Données: 1,000 films</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-center md:text-left">
              © 2026 CENTRAI - Projet de Prédiction du genre des films avec Naive Bayes
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-white transition">
                <Github size={20} />
              </a>
              <a href="#" className="hover:text-white transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-white transition">
                <Linkedin size={20} />
              </a>
              <a href="#" className="hover:text-white transition">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
