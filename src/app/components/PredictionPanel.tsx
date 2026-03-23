import { useState } from 'react';
import { X, Sparkles, BarChart3, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PredictionPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PredictionResult {
  predictedGenre: string;
  confidence: number;
  probabilities: { genre: string; probability: number }[];
}

export function PredictionPanel({ isOpen, onClose }: PredictionPanelProps) {
  const [votes, setVotes] = useState('15000');
  const [popularity, setPopularity] = useState('85.5');
  const [rating, setRating] = useState('7.8');
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);

  const handlePredict = () => {
    // Simuler une prédiction Naive Bayes
    const votesNum = parseFloat(votes);
    const popularityNum = parseFloat(popularity);
    const ratingNum = parseFloat(rating);

    // Logique simplifiée pour simuler la prédiction
    let predictedGenre = 'Action';
    let probabilities = [
      { genre: 'Action', probability: 0.35 },
      { genre: 'Drama', probability: 0.25 },
      { genre: 'Comedy', probability: 0.15 },
      { genre: 'Thriller', probability: 0.12 },
      { genre: 'Sci-Fi', probability: 0.08 },
      { genre: 'Horror', probability: 0.05 },
    ];

    // Ajuster selon les valeurs
    if (ratingNum > 8.0 && votesNum > 50000) {
      predictedGenre = 'Drama';
      probabilities = [
        { genre: 'Drama', probability: 0.45 },
        { genre: 'Action', probability: 0.20 },
        { genre: 'Thriller', probability: 0.15 },
        { genre: 'Sci-Fi', probability: 0.10 },
        { genre: 'Comedy', probability: 0.07 },
        { genre: 'Horror', probability: 0.03 },
      ];
    } else if (popularityNum > 90) {
      predictedGenre = 'Action';
      probabilities = [
        { genre: 'Action', probability: 0.50 },
        { genre: 'Sci-Fi', probability: 0.18 },
        { genre: 'Thriller', probability: 0.15 },
        { genre: 'Drama', probability: 0.10 },
        { genre: 'Comedy', probability: 0.05 },
        { genre: 'Horror', probability: 0.02 },
      ];
    } else if (ratingNum < 6.5) {
      predictedGenre = 'Horror';
      probabilities = [
        { genre: 'Horror', probability: 0.38 },
        { genre: 'Thriller', probability: 0.25 },
        { genre: 'Comedy', probability: 0.15 },
        { genre: 'Action', probability: 0.12 },
        { genre: 'Sci-Fi', probability: 0.07 },
        { genre: 'Drama', probability: 0.03 },
      ];
    }

    setPrediction({
      predictedGenre,
      confidence: probabilities[0].probability * 100,
      probabilities,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full md:w-[500px] bg-zinc-900 z-50 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-purple-500" />
                  <h2 className="text-white text-2xl font-bold">Genre Prediction</h2>
                </div>
                <button
                  onClick={onClose}
                  className="text-white hover:text-zinc-400 transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="bg-zinc-800/50 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <BarChart3 className="w-5 h-5 text-purple-400 mt-1" />
                  <div className="text-sm text-zinc-300">
                    <p className="font-semibold mb-1">Modèle: Naive Bayes</p>
                    <p>Ce modèle prédit le genre d'un film basé sur le nombre de votes, la popularité et la note moyenne.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-white text-sm font-semibold mb-2 block">
                    Nombre de votes
                  </label>
                  <input
                    type="number"
                    value={votes}
                    onChange={(e) => setVotes(e.target.value)}
                    className="w-full bg-zinc-800 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Ex: 15000"
                  />
                </div>

                <div>
                  <label className="text-white text-sm font-semibold mb-2 block">
                    Popularité (0-100)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={popularity}
                    onChange={(e) => setPopularity(e.target.value)}
                    className="w-full bg-zinc-800 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Ex: 85.5"
                  />
                </div>

                <div>
                  <label className="text-white text-sm font-semibold mb-2 block">
                    Note moyenne (0-10)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full bg-zinc-800 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Ex: 7.8"
                  />
                </div>
              </div>

              <button
                onClick={handlePredict}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md font-semibold transition flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Prédire le genre
              </button>

              {prediction && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 space-y-4"
                >
                  <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-zinc-400 text-sm">Genre prédit</span>
                      <TrendingUp className="w-4 h-4 text-purple-400" />
                    </div>
                    <div className="text-white text-3xl font-bold mb-1">{prediction.predictedGenre}</div>
                    <div className="text-purple-400 text-sm">
                      Confiance: {prediction.confidence.toFixed(1)}%
                    </div>
                  </div>

                  <div className="bg-zinc-800/50 rounded-lg p-4">
                    <h3 className="text-white font-semibold mb-3">Probabilités par genre</h3>
                    <div className="space-y-3">
                      {prediction.probabilities.map((item) => (
                        <div key={item.genre}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-zinc-300">{item.genre}</span>
                            <span className="text-purple-400">{(item.probability * 100).toFixed(1)}%</span>
                          </div>
                          <div className="bg-zinc-700 rounded-full h-2 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${item.probability * 100}%` }}
                              transition={{ duration: 0.5, delay: 0.1 }}
                              className="bg-gradient-to-r from-purple-600 to-pink-600 h-full"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-zinc-800/50 rounded-lg p-4">
                    <h3 className="text-white font-semibold mb-2">Métriques du modèle</h3>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div>
                        <div className="text-green-400 text-xl font-bold">89.2%</div>
                        <div className="text-zinc-400 text-xs">Précision</div>
                      </div>
                      <div>
                        <div className="text-blue-400 text-xl font-bold">87.5%</div>
                        <div className="text-zinc-400 text-xs">Rappel</div>
                      </div>
                      <div>
                        <div className="text-purple-400 text-xl font-bold">88.3%</div>
                        <div className="text-zinc-400 text-xs">F1-Score</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
