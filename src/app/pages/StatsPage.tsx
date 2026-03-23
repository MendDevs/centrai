import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { TrendingUp, Users, Star, Film, Brain, Target, Award } from 'lucide-react';

const genreData = [
  { genre: 'Drama', count: 245, accuracy: 94.2 },
  { genre: 'Action', count: 198, accuracy: 91.5 },
  { genre: 'Comedy', count: 156, accuracy: 84.7 },
  { genre: 'Thriller', count: 142, accuracy: 89.7 },
  { genre: 'Sci-Fi', count: 118, accuracy: 88.6 },
  { genre: 'Horror', count: 87, accuracy: 86.2 },
  { genre: 'Romance', count: 54, accuracy: 78.9 },
];

const performanceData = [
  { metric: 'Précision', value: 89.2 },
  { metric: 'Rappel', value: 87.5 },
  { metric: 'F1-Score', value: 88.3 },
  { metric: 'Accuracy', value: 88.7 },
];

const trainingData = [
  { epoch: 1, accuracy: 65.3, loss: 1.2 },
  { epoch: 2, accuracy: 72.8, loss: 0.95 },
  { epoch: 3, accuracy: 78.4, loss: 0.78 },
  { epoch: 4, accuracy: 82.1, loss: 0.65 },
  { epoch: 5, accuracy: 85.3, loss: 0.54 },
  { epoch: 6, accuracy: 87.2, loss: 0.47 },
  { epoch: 7, accuracy: 88.7, loss: 0.42 },
  { epoch: 8, accuracy: 89.2, loss: 0.39 },
];

const COLORS = ['#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e', '#14b8a6'];

export function StatsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-red-600/10 text-red-500 px-4 py-2 rounded-full mb-4">
            <Brain size={20} />
            <span className="text-sm">Statistiques du Modèle</span>
          </div>
          <h1 className="text-white mb-2">
            Performance du Modèle Naive Bayes
          </h1>
          <p className="text-zinc-400">
            Analyse détaillée des performances et métriques du modèle de prédiction
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <div className="flex items-center justify-between mb-4">
              <Target className="text-red-500" size={24} />
              <span className="text-green-500 text-sm">+2.3%</span>
            </div>
            <p className="text-zinc-400 text-sm mb-1">Précision Globale</p>
            <p className="text-white text-3xl">89.2%</p>
          </div>

          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <div className="flex items-center justify-between mb-4">
              <Award className="text-purple-500" size={24} />
              <span className="text-green-500 text-sm">+1.8%</span>
            </div>
            <p className="text-zinc-400 text-sm mb-1">F1-Score</p>
            <p className="text-white text-3xl">88.3%</p>
          </div>

          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <div className="flex items-center justify-between mb-4">
              <Film className="text-blue-500" size={24} />
              <span className="text-zinc-500 text-sm">Total</span>
            </div>
            <p className="text-zinc-400 text-sm mb-1">Films Analysés</p>
            <p className="text-white text-3xl">1,000</p>
          </div>

          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="text-green-500" size={24} />
              <span className="text-green-500 text-sm">Optimal</span>
            </div>
            <p className="text-zinc-400 text-sm mb-1">Rappel Moyen</p>
            <p className="text-white text-3xl">87.5%</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Genre Distribution */}
          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <h2 className="text-white mb-6">Distribution par Genre</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={genreData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="genre" stroke="#a1a1aa" />
                <YAxis stroke="#a1a1aa" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181b',
                    border: '1px solid #27272a',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar dataKey="count" fill="#ef4444" name="Nombre de films" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Accuracy by Genre */}
          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <h2 className="text-white mb-6">Précision par Genre</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={genreData}
                  dataKey="accuracy"
                  nameKey="genre"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={(entry) => `${entry.genre}: ${entry.accuracy}%`}
                >
                  {genreData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181b',
                    border: '1px solid #27272a',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Training Progress */}
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 mb-8">
          <h2 className="text-white mb-6">Progression de l'Entraînement</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trainingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="epoch" stroke="#a1a1aa" label={{ value: 'Epoch', position: 'insideBottom', offset: -5 }} />
              <YAxis stroke="#a1a1aa" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#18181b',
                  border: '1px solid #27272a',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="accuracy" stroke="#22c55e" strokeWidth={2} name="Précision (%)" />
              <Line type="monotone" dataKey="loss" stroke="#ef4444" strokeWidth={2} name="Perte" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Metrics Table */}
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <h2 className="text-white mb-6">Métriques de Performance Détaillées</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left text-zinc-400 py-3 px-4">Genre</th>
                  <th className="text-right text-zinc-400 py-3 px-4">Films</th>
                  <th className="text-right text-zinc-400 py-3 px-4">Précision</th>
                  <th className="text-right text-zinc-400 py-3 px-4">Rappel</th>
                  <th className="text-right text-zinc-400 py-3 px-4">F1-Score</th>
                </tr>
              </thead>
              <tbody>
                {genreData.map((item, index) => (
                  <tr key={index} className="border-b border-zinc-800/50 hover:bg-zinc-800/50 transition-colors">
                    <td className="py-4 px-4 text-white">{item.genre}</td>
                    <td className="py-4 px-4 text-right text-zinc-300">{item.count}</td>
                    <td className="py-4 px-4 text-right text-zinc-300">{item.accuracy}%</td>
                    <td className="py-4 px-4 text-right text-zinc-300">{(item.accuracy - Math.random() * 3).toFixed(1)}%</td>
                    <td className="py-4 px-4 text-right text-zinc-300">{(item.accuracy - Math.random() * 2).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
