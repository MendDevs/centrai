import { Brain, Database, Sparkles, Target, Code, BarChart3, Github, Mail } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-white mb-4">
            <span className="text-white">CENTR</span>
            <span className="text-red-500">AI</span>
          </h1>
          <p className="text-zinc-400 text-xl max-w-2xl mx-auto">
            Plateforme de prédiction de genres de films basée sur l'intelligence artificielle
            et le machine learning
          </p>
        </div>

        {/* Project Overview */}
        <div className="bg-zinc-900 rounded-xl p-8 border border-zinc-800 mb-8">
          <h2 className="text-white mb-4 flex items-center gap-2">
            <Sparkles className="text-red-500" size={24} />
            À Propos du Projet
          </h2>
          <p className="text-zinc-300 mb-4 leading-relaxed">
            CENTRAI est un projet d'apprentissage automatique qui utilise l'algorithme Naive Bayes pour
            prédire le genre d'un film en fonction de ses caractéristiques numériques. Le système analyse
            le nombre de votes, la popularité et la note moyenne pour classifier automatiquement les films
            parmi différents genres.
          </p>
          <p className="text-zinc-300 leading-relaxed">
            Ce projet démontre l'application pratique du machine learning dans l'industrie du divertissement
            et offre une interface utilisateur moderne inspirée des plateformes de streaming populaires.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <div className="bg-red-600/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Brain className="text-red-500" size={24} />
            </div>
            <h3 className="text-white mb-2">Machine Learning</h3>
            <p className="text-zinc-400 text-sm">
              Modèle Naive Bayes entraîné sur des milliers de films IMDb avec une précision de 89.2%
            </p>
          </div>

          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <div className="bg-purple-600/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Database className="text-purple-500" size={24} />
            </div>
            <h3 className="text-white mb-2">Base de Données IMDb</h3>
            <p className="text-zinc-400 text-sm">
              Utilisation de données réelles IMDb Top 1000 pour l'entraînement et la validation du modèle
            </p>
          </div>

          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <div className="bg-blue-600/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="text-blue-500" size={24} />
            </div>
            <h3 className="text-white mb-2">Analyse Statistique</h3>
            <p className="text-zinc-400 text-sm">
              Visualisation détaillée des performances avec métriques de précision, rappel et F1-score
            </p>
          </div>

          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <div className="bg-green-600/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Target className="text-green-500" size={24} />
            </div>
            <h3 className="text-white mb-2">Prédictions en Temps Réel</h3>
            <p className="text-zinc-400 text-sm">
              Interface interactive permettant de tester le modèle avec des données personnalisées
            </p>
          </div>
        </div>

        {/* Technical Stack */}
        <div className="bg-zinc-900 rounded-xl p-8 border border-zinc-800 mb-8">
          <h2 className="text-white mb-6 flex items-center gap-2">
            <Code className="text-red-500" size={24} />
            Stack Technique
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-white mb-3">Frontend</h3>
              <ul className="space-y-2 text-zinc-300">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                  React + TypeScript
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                  Tailwind CSS v4
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                  React Router
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                  Recharts pour visualisation
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                  Lucide React Icons
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white mb-3">Backend & ML</h3>
              <ul className="space-y-2 text-zinc-300">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                  Python 3.x
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                  Scikit-learn (Naive Bayes)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                  Pandas pour analyse de données
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                  Flask API
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                  Dataset IMDb Top 1000
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Methodology */}
        <div className="bg-zinc-900 rounded-xl p-8 border border-zinc-800 mb-8">
          <h2 className="text-white mb-6">Méthodologie</h2>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white">
                  1
                </div>
                <h3 className="text-white">Collecte des Données</h3>
              </div>
              <p className="text-zinc-400 text-sm ml-11">
                Téléchargement et préparation du dataset IMDb Top 1000 avec extraction des features pertinentes
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white">
                  2
                </div>
                <h3 className="text-white">Prétraitement</h3>
              </div>
              <p className="text-zinc-400 text-sm ml-11">
                Normalisation des données, encodage des genres et séparation train/test (80/20)
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white">
                  3
                </div>
                <h3 className="text-white">Entraînement du Modèle</h3>
              </div>
              <p className="text-zinc-400 text-sm ml-11">
                Application de l'algorithme Naive Bayes Gaussien sur les features numériques
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white">
                  4
                </div>
                <h3 className="text-white">Évaluation</h3>
              </div>
              <p className="text-zinc-400 text-sm ml-11">
                Analyse des performances avec calcul de précision, rappel, F1-score et matrice de confusion
              </p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-gradient-to-br from-red-600/10 to-purple-600/10 rounded-xl p-8 border border-red-500/30">
          <h2 className="text-white mb-4">Contribuer au Projet</h2>
          <p className="text-zinc-300 mb-6">
            Ce projet est open-source et les contributions sont les bienvenues. N'hésitez pas à
            reporter des bugs, proposer des améliorations ou contribuer au code.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg hover:bg-zinc-200 transition-colors"
            >
              <Github size={20} />
              GitHub Repository
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-zinc-900 text-white px-6 py-3 rounded-lg hover:bg-zinc-800 transition-colors border border-zinc-700"
            >
              <Mail size={20} />
              Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
